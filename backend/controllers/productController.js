const db = require("../models/db");

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

exports.addProduct = async (req, res) => {
  try {
    const { name, price, category_id } = req.body;
    db.query(
      "INSERT INTO products SET ?",
      { name, price, category_id },
      (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, price, category_id });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while adding the product",
        error: error.message,
      });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category_id } = req.body;
    db.query(
      "UPDATE products SET ? WHERE id = ?",
      [{ name, price, category_id }, id],
      (err, result) => {
        if (err) throw err;
        res.json({ message: "Product updated" });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({
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
