const express = require("express");
const userController = require("../Controller/userController");
const accessValidation = require("../Middleware/authMiddleware");
const verifyRoles = require("../Middleware/verifyRoles");
const { Admin } = require("../Config/roleList");

const route = express.Router();

//                                <== PRIVATE Route ==>

route.get("/getProfile", accessValidation, userController.getProfile);

route.get("/getAllUsers", accessValidation, verifyRoles(Admin), userController.getAllUsersList);

route.delete("/delete/:id", accessValidation, verifyRoles(Admin), userController.deleteUserById);

route.post("/updateProfile", accessValidation, userController.updateUserProfile);

module.exports = route;
