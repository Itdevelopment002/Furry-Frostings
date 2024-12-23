const db = require("../models/db");

exports.getCategories = async (req, res) => {
  try {
    db.query("SELECT * FROM categories", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    res
      .status(500)
      .json({
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
        res.json(result[0]);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching the category",
        error: error.message,
      });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    db.query("INSERT INTO categories SET ?", { name }, (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, name });
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while adding the category",
        error: error.message,
      });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    db.query("UPDATE categories SET ? WHERE id = ?", [{ name }, id], (err) => {
      if (err) throw err;
      res.json({ message: "Category updated" });
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while updating the category",
        error: error.message,
      });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    db.query("DELETE FROM categories WHERE id = ?", [id], (err) => {
      if (err) throw err;
      res.json({ message: "Category deleted" });
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while deleting the category",
        error: error.message,
      });
  }
};
