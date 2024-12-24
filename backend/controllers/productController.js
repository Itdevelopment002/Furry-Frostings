const db = require("../models/db");
const upload = require("../models/multerConfig");

exports.getProducts = async (req, res) => {
  try {
    db.query("SELECT * FROM products", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching products",
        error: error.message,
      });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching the product",
        error: error.message,
      });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    db.query(
      "SELECT * FROM products WHERE category_id = ?",
      [categoryId],
      (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
          res.status(200).json(results);
        } else {
          res.status(404).json({ message: "No products found for this category" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching products by category",
      error: error.message,
    });
  }
};


exports.addProduct = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, off, originalPrice, flavour, type, available, size } = req.body;

    // Validate input
    if (!name || !description || !off || !originalPrice || !flavour || !type || !available || !size ) {
      return res.status(400).json({ message: "Name and originalPrice are required" });
    }

    // Handle uploaded files
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const thumbnails = req.files?.thumbnails?.map((file) => `/uploads/${file.filename}`) || [];

    // Validate flavour (should be an array of objects)
    if (!Array.isArray(flavour)) {
      return res.status(400).json({ message: "Flavour should be an array of objects" });
    }

    // Validate size (should be an object with a 'name' and 'quantity' array)
    if (typeof size !== 'object' || !Array.isArray(size.quantity)) {
      return res.status(400).json({ message: "Size should be an object with a 'name' and 'quantity' array" });
    }

    // Insert product into the database
    db.query(
      "INSERT INTO products SET ?",
      {
        name,
        description,
        off,
        original_price: originalPrice,
        flavour: JSON.stringify(flavour), // Store flavour as a JSON string
        type,
        available,
        size: JSON.stringify(size), // Store size as a JSON string
        image,
        thumbnails: JSON.stringify(thumbnails),
        category_id: categoryId,
      },
      (err, result) => {
        if (err) throw err;

        res.status(201).json({
          message: "Product added successfully",
          product: {
            id: result.insertId,
            name,
            description,
            off,
            originalPrice,
            flavour,
            type,
            available,
            size,
            image,
            thumbnails,
            category_id: categoryId,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the product",
      error: error.message,
    });
  }
};


// Update a product with image and thumbnails
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, off, originalPrice, flavour, type, available, size } = req.body;

    // Validate input
    if (!name || !description || !off || !originalPrice || !flavour || !type || !available || !size) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Handle uploaded files
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const thumbnails = req.files?.thumbnails?.map((file) => `/uploads/${file.filename}`) || [];

    // Update the product
    db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      db.query(
        "UPDATE products SET ? WHERE id = ?",
        [
          {
            name,
            description,
            off,
            original_price: originalPrice,
            flavour,
            type,
            available,
            rating,
            size,
            ...(image && { image }),
            ...(thumbnails.length > 0 && { thumbnails: JSON.stringify(thumbnails) }),
          },
          id,
        ],
        (updateErr) => {
          if (updateErr) throw updateErr;

          res.status(200).json({
            message: "Product updated successfully",
            updatedProduct: {
              id,
              name,
              description,
              off,
              originalPrice,
              flavour,
              type,
              available,
              rating,
              size,
              ...(image && { image }),
              ...(thumbnails.length > 0 && { thumbnails }),
            },
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the product",
      error: error.message,
    });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
      if (err) throw err;
      res.json({ message: "Product deleted" });
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while deleting the product",
        error: error.message,
      });
  }
};
