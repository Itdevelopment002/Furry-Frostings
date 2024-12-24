const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post(
  "/products/:categoryId",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnails", maxCount: 5 },
  ]),
  productController.addProduct
);

router.put(
  "/product/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnails", maxCount: 5 },
  ]),
  productController.updateProduct
);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
