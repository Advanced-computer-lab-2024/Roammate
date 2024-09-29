const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Adjust the path according to the actual location and name of the product controller
const { addProduct, viewproducts , searchproductbyname } = require('./routes/productsController');

const app = express();
const port = process.env.PORT || 8000;
const MongoURI = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(express.json());

mongoose.connect(MongoURI)
.then(() => {
  console.log("MongoDB is now connected!");
  // Starting server here only after successful database connection
  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
})
.catch(err => console.log(err));

// Home route to verify basic server function
app.get("/home", (req, res) => {
    res.status(200).send("hello worlddddddd");
});

// Route to add a product
app.post("/addproduct", addProduct);
app.get("/viewproducts",viewproducts);
app.get("/searchproduct/:name",searchproductbyname);
