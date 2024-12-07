const { default: mongoose } = require("mongoose");
const {
    Activity,
    ActivityBooking,
    ItineraryBooking,
    Tourist,
    Itinerary,
} = require("../models");
const sendEmail = require("./nodeMailer");

const notifyTourists = async () => {
    try {
        // Find all activity bookings that have not been notified and date is in less than 2 days
        const activityBookings = await ActivityBooking.find({
            notified: false,
            date: { $lte: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
        })
            .populate("activity")
            .populate("user");

        // Send notifications to the tourists
        activityBookings.forEach(async (activityBooking) => {
            const tourist = await Tourist.findById(activityBooking.user._id);
            const activity = await Activity.findById(activityBooking.activity._id);
            const formattedDate = new Date(activityBooking.date).toLocaleDateString(
                "en-GB",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }
            );
            // Send notification to the tourist
            console.log(`Sending notification to ${tourist.email} for the activity ${activity.title}`);
            tourist.notifications.push({
                message: `Don't forget your activity ${activity.title} on ${formattedDate}`,
            });
            tourist.save();
            sendEmail(
                tourist.email,
                "Activity Reminder",
                `Don't forget your activity ${activity.title} on ${formattedDate}`
            );
            // Update the booking status to notified
            activityBooking.notified = true;
            await activityBooking.save();
        });

        const itineraryBookings = await ItineraryBooking.find({
            notified: false,
            date: { $lte: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
        })
            .populate("itinerary")
            .populate("user");

        // Send notifications to the tourists
        itineraryBookings.forEach(async (itineraryBooking) => {
            const tourist = await Tourist.findById(itineraryBooking.user._id);
            const itinerary = await Itinerary.findById(
                itineraryBooking.itinerary._id
            );
            const formattedDate = new Date(itineraryBooking.date).toLocaleDateString(
                "en-GB",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }
            );
            // Send notification to the tourist
            console.log(`Sending notification to ${tourist.email} for the itinerary ${itinerary.title}`);
            tourist.notifications.push({
                message: `Don't forget your itinerary ${itinerary.title} on ${formattedDate}`,
            });
            await tourist.save();
            sendEmail(
                tourist.email,
                "Itinerary Reminder",
                `Don't forget your itinerary ${itinerary.title} on ${formattedDate}`
            );

            // Update the booking status to notified
            itineraryBooking.notified = true;
            await itineraryBooking.save();
        });
    } catch (error) {
        console.error("Error notifying tourists:", error);
    }
};

module.exports = notifyTourists;
