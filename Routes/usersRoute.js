const express = require("express")
const userController = require('../Controller/userController');
const accessValidation = require('../Middleware/authMiddleware');
const verifyRoles = require('../Middleware/verifyRoles');
const {Admin, MealManager, User} = require('../Utility/roleList');

const route = express.Router();

//                                <== PRIVATE Route ==>

route.get('/getProfile', accessValidation, userController.getProfile);

route.post('/updateProfile', accessValidation, userController.updateUserProfile);

module.exports = route;