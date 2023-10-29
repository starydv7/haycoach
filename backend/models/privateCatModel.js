import mongoose from "mongoose";

const privatecatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  subtitle:{
    type:String,
    required:true,
  },
  screenName:{
    type:String,
    required:true,
  }
});

export default mongoose.model("PrivateCat", privatecatSchema);