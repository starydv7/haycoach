import slugify from "slugify";
import brandModel from "../models/brandModel.js";
export const createBrandController = async (req, res) => {
  try {
    const { name,address,contact } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is Required" });
    }
    if (!address || !contact) {
        return res.status(401).send({ message: "address and contact is Required" });
      }
     
    const existingBrand = await brandModel.findOne({ name: name });
    if (existingBrand) {
      return res.status(200).send({
        message: "Brand already exists",
      });
    }
    const brand = await new brandModel({
      name,
      address,
      contact,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Brand Created",
      brand,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in Brand",
    });
  }
};
//update category
export const updateBrandController = async (req, res) => {
  try {
    const { name } = req.body;
    const { address } = req.body;
    const { contact } = req.body;
    const { id } = req.params;
    const brand = await brandModel.findByIdAndUpdate(
      id,
      { name,address,contact, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Brand Updated Successfully",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};
export const brandControlller = async (req, res) => {
  try {
    const brand = await brandModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleBrandController = async (req, res) => {
  try {
    const brand = await brandModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Brand Successfully",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteBrandController = async (req, res) => {
  try {
    const { id } = req.params;
    await brandModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Brand Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Brand",
      error,
    });
  }
};
