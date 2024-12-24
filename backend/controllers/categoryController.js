const db = require("../models/db");
const upload = require("../models/multerConfig");

exports.getCategories = async (req, res) => {
  try {
    db.query("SELECT * FROM categories", (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching categories",
      error: error.message,
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    db.query("SELECT * FROM categories WHERE id = ?", [id], (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the category",
      error: error.message,
    });
  }
};

exports.addCategory = async (req, res) => {
  const uploadImage = upload.single("image");
  
  uploadImage(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Image upload failed",
        error: err.message,
      });
    }
    
    try {
      const { name } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; 
      
      db.query("INSERT INTO categories SET ?", { name, image_path: imageUrl }, (err, result) => {
        if (err) throw err;
        res.status(200).json({ id: result.insertId, name, image_path: imageUrl });
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while adding the category",
        error: error.message,
      });
    }
  });
};

exports.updateCategory = async (req, res) => {
  const uploadImage = upload.single("image"); 

  uploadImage(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Image upload failed",
        error: err.message,
      });
    }

    try {
      const { id } = req.params;
      const { name } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; 

      db.query(
        "UPDATE categories SET name = ?, image_path = ? WHERE id = ?",
        [name, imageUrl, id],
        (err) => {
          if (err) throw err;
          res.status(200).json({ message: "Category updated" });
        }
      );
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while updating the category",
        error: error.message,
      });
    }
  });
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    db.query("SELECT image_path FROM categories WHERE id = ?", [id], (err, result) => {
      if (err) throw err;

      const imagePath = result[0]?.image_path;
      if (imagePath) {
        const fs = require("fs");
        fs.unlink(imagePath, (err) => {
          if (err) console.log("Error deleting image:", err);
        });
      }

      db.query("DELETE FROM categories WHERE id = ?", [id], (err) => {
        if (err) throw err;
        res.status(200).json({ message: "Category deleted" });
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the category",
      error: error.message,
    });
  }
};
