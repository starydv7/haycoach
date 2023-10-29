/* eslint-disable default-case */
import privateCatModel from "../models/privateCatModel.js";
import fs from "fs";
import slugify from "slugify";

export const createPrivateCatController = async (req, res) => {
  try {
    const { name, slug, screenName, subtitle } = req.fields;
    
    // Validation
    if (!name) {
      return res.status(500).send({ error: "Name is Required" });
    }
    if (!screenName) {
      return res.status(500).send({ error: "ScreenName is Required" });
    }
    if (!subtitle) {
      return res.status(500).send({ error: "Subtitle is Required" });
    }

    const priCat = new privateCatModel({ ...req.fields, slug: slugify(name) });
    await priCat.save();
    
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      priCat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating BrandPage Products",
    });
  }
};
