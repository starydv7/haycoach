import express from "express";
import formidable from "express-formidable";
import fs from "fs";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productListController,
  productPhotoController,
  updateProductController,
} from "../controller/productController.js";

const router = express.Router();

//routes
router.post(
  "/create-product",
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
 
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);



//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);





export default router;