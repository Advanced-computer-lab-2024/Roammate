const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes/index");

const app = express();

const cors = require("cors");
app.use(cors());

const {
  adminRouter,
  advertiserRouter,
  sellerRouter,
  tourGuideRouter,
  touristRouter,
  //   tourismGovernerRouter,
} = require("./routers/index");

const port = process.env.PORT || 8000;
const MongoURI = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(express.json());

mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server here only after successful database connection
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

// Home route to verify basic server function
app.get("/home", (req, res) => {
  res.status(200).send("hello worlddddddd");
});

// Routes
app.use("/api", routes);

// New routes
app.use("/api/admin", adminRouter);
app.use("/api/advertiser", advertiserRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/tourGuide", tourGuideRouter);
app.use("/api/tourist", touristRouter);