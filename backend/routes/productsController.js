const Product = require('../models/productModel');  // Ensure this path is correct
const { default: mongoose } = require('mongoose');

// Handler for adding a product
const addProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.image || !product.price || !product.description || !product.seller) {
      return res.status(400).json({message: "All fields are required"});
    }
  
    const newProduct = new Product(product);  
    try {
      await newProduct.save();  
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
    res.status(500).json({ message: "Error retrieving products", error: error });
}

}


const searchproductbyname = async (req, res) => {
  const productName = req.params.name.trim(); 

  try {
      console.log("Searching for products starting with:", productName);
      const regex = new RegExp("^" + productName, "i"); 
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

const filterbyprice = async(req, res)=>{
  const { minPrice, maxPrice } = req.query;
  let filter = {};
  
  if (minPrice && maxPrice) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice) {
    filter.price = { $gte: minPrice };
  } else if (maxPrice) {
    filter.price = { $lte: maxPrice };
  }
  
  try {
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
}

const sortbyrating = async(req,res)=>{
  const { order } = req.query; // order can be 'asc' or 'desc'
  
  let sortOrder;
  // Use an if-else statement to determine sorting order
  if (order === 'asc') {
    sortOrder = 1; // Ascending order
  } else if (order === 'desc') {
    sortOrder = -1; // Descending order
  } else {
    sortOrder = 1; // Default to ascending if no order is specified
  }

  try {
    // Find products and sort by rating
    const products = await Product.find().sort({ ratings: sortOrder });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
  
}


const editproduct= async(req, res)=>{
  const { id } = req.params; // Get the product ID from the URL
  const { name, image, price, description, seller, ratings, reviews, quantity } = req.body; // Get the fields to update from the request body

  try {
    // Find the product by ID and update it with the new details
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        image,
        price,
        description,
        seller,
        ratings,
        reviews,
        quantity
      },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
}




module.exports = { addProduct, viewproducts , searchproductbyname, filterbyprice, sortbyrating, editproduct };

