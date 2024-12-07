const schedule = require("node-schedule");
const { sendBirthdayPromoCode } = require("../controllers/PromoCodeController");
const notifyTourists = require("./eventsNotifications");

const setupSchedulers = () => {
  // Schedule the promo code function to run every hour
  console.log("Initializing schedulers..."); // Add this log for debugging
  schedule.scheduleJob("* * * * *", () => {
    // console.log("Running birthday promo code function...");
    sendBirthdayPromoCode()
      // .then(() => console.log("Birthday promo codes processed successfully"))
      .catch((error) =>
        console.error("Error processing birthday promo codes:", error.message)
      );
  });

  // Schedule the notifications function to run every minute
  schedule.scheduleJob("* * * * *", () => {
    // console.log("Running notifications function...");
    notifyTourists()
      // .then(() => console.log("Notifications processed successfully"))
      .catch((error) =>
        console.error("Error processing notifications:", error.message)
      );
  });
};

module.exports = setupSchedulers;
