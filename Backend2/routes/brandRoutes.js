import express from "express";
import { brandControlller, createBrandController,updateBrandController ,singleBrandController, deleteBrandController} from "../controller/BrandController.js";

const router = express.Router();

router.post(
  "/create-brand",
  createBrandController
);
//update category
router.put(
  "/update-brand/:id",
  updateBrandController
);
router.get("/get-brand",brandControlller);

//single category
router.get("/single-brand/:slug", singleBrandController);

//delete category
router.delete(
  "/delete-brand/:id",
  deleteBrandController
);

export default router;
