const Product = require('../models/productModel');  // Ensure this path is correct
const { default: mongoose } = require('mongoose');

// Handler for adding a product
const addProduct = async (req, res) => {
    const product = req.body;

    // Validate required fields
    if (!product.name || !product.image || !product.price || !product.description || !product.seller) {
      return res.status(400).json({message: "All fields are required"});
    }
  
    const newProduct = new Product(product);  // Creating a new product instance
    try {
      await newProduct.save();  // Attempt to save the new product
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({message: "Error in creating product"});
    }
};

// Handler for viewing all products 
const viewproducts =async(req,res)=>{
  try {
    const products = await Product.find();
    res.status(200).json(products);
} catch (error) {
    // Handle potential errors during database query
    res.status(500).json({ message: "Error retrieving products", error: error });
}

}


const searchproductbyname = async (req, res) => {
  const productName = req.params.name.trim(); // Trim whitespace just in case

  try {
      console.log("Searching for products starting with:", productName);
      const regex = new RegExp("^" + productName, "i"); // Using RegExp constructor for clarity
      console.log("Regex used:", regex);

      const products = await Product.find({ name: { $regex: regex } });
      console.log("Products found:", products);
      
      if (products.length > 0) {
          res.status(200).json(products);
      } else {
          res.status(404).json({ message: "No products found starting with: " + productName });
      }
  } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Error searching for products", error: error });
  }
};




module.exports = { addProduct, viewproducts , searchproductbyname };
