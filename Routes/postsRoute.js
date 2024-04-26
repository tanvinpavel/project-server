const express = require("express");
const postsController = require("../Controller/postsController");
const accessValidation = require("../Middleware/authMiddleware");
const verifyRoles = require("../Middleware/verifyRoles");
const upload = require("../Middleware/multer");

const route = express.Router();

//                      <== PRIVATE Route ==>

//load all data
route.get("/all", accessValidation, postsController.getAllPost);

//file upload
route.post("/file", accessValidation, upload.single("image"), postsController.fileUpload);

//load all data from single user
route.get("/all/:id", accessValidation, postsController.getAllPostByUserId);

// Create Post
route.post("/create", accessValidation, upload.single("image"), postsController.createPost);

route.post("/confirmPurchase", accessValidation, postsController.confirmPurchase);

//delete by id
route.delete("/delete", accessValidation, postsController.deletePostById);

module.exports = route;
