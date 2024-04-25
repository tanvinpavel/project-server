const express = require('express');
const postsController = require('../Controller/postsController');
const accessValidation = require('../Middleware/authMiddleware');
const verifyRoles = require('../Middleware/verifyRoles');
const upload = require('../Middleware/multer');

const route = express.Router();


//                      <== PRIVATE Route ==>

//load all data
route.get('/all', accessValidation, postsController.getAllPost);

//file upload
route.post('/file', accessValidation, upload.single("image"), postsController.fileUpload);

//load all data from single user
route.get('/all/userId', accessValidation, postsController.getAllPostByUserId);

// Create Post
route.post('/create', accessValidation, upload.single("image"), postsController.createPost);

route.post('/confirmPurchase', accessValidation, postsController.confirmPurchase);

//update by id
// route.put('/update/:id', accessValidation, verifyRoles(Admin, MealManager), mealController.updateMealById);

//delete by id
route.delete('/delete', accessValidation, postsController.deletePostById);

//bulk action
// route.delete('/deleteMany', accessValidation, verifyRoles(Admin, MealManager), mealController.deleteMany);


module.exports = route;