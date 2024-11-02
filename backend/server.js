const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes/index");

const app = express();

// CORS : Cross-Origin Resource Sharing this is to allow the frontend to access the backend without any issues because of the same-origin policy
const cors = require("cors");
app.use(cors());

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

//Home route to verify basic server function
app.get("/home", (req, res) => {
  res.status(200).send("Server is running!");
});

// Routes
app.use("/api", routes);
