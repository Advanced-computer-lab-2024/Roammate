const schedule = require("node-schedule");
const { sendBirthdayPromoCode } = require("../controllers/PromoCodeController");

const setupSchedulers = () => {
  // Schedule the promo code function to run every hour
  console.log("Initializing schedulers..."); // Add this log for debugging
  schedule.scheduleJob("* * * * *", () => {
    console.log("Running birthday promo code function...");
    sendBirthdayPromoCode()
      .then(() => console.log("Birthday promo codes processed successfully"))
      .catch((error) =>
        console.error("Error processing birthday promo codes:", error.message)
      );
  });
};

module.exports = setupSchedulers;
