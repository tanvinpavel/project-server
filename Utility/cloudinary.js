// import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
});

const uploadOnCloudinary = async (localPath) => {
  try {
    if (localPath) {
      console.log(localPath);
      const result = await cloudinary.uploader.upload(localPath, { resource_type: "image" });

      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localPath);
    return null;
  }
};

const deleteFromCloudinary = async (public_id) => {
  try {
    if (public_id) {
      
      const result = await cloudinary.uploader.destroy(public_id, { resource_type: "image" });

      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    
    return null;
  }
};

module.exports = {uploadOnCloudinary, deleteFromCloudinary};
