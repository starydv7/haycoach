import express from "express";
import formidable from "express-formidable";

import {
  createPrivateCatController,
  // deleteProductController,

} from "../controller/privateCatController.js";

const router = express.Router();

//routes
router.post(
  "/create-list",
  createPrivateCatController
);

//delete rproduct
// router.delete("/delete-product/:pid", deleteProductController);



export default router;