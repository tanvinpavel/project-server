const { ObjectId } = require("mongodb");
const Post = require("../Schema/post_modal");
const uploadOnCloudinary = require("../Utility/cloudinary");
const fs = require("fs");

//module scaffolding
const postsController = {};

//controllers
postsController.createPost = async (req, res) => {
  try {
    const { post, private } = req.body;
    console.log(req?.file?.path);
    const localFilePath = req?.file?.path ?? './public/temp/default.jpg';

    const result = await uploadOnCloudinary(localFilePath);

    if(result) {
      const createPost = new Post({
        creator: req?.userEmail,
        image: result?.url,
        post: post,
        private: private,
      });
      
      await createPost.save();
      //remove local file after upload to cloudinary
      fs.unlinkSync(localFilePath);
      
      res.status(200).json({
        message: "Post create successfully",
      });
    } else {
      res.status(500).json({
        error: "Post creation failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Post creation failed",
    });
  }
};

postsController.getAllPost = async (req, res) => {
  const aggregation = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "email",
        as: "userDetails",
      },
    },
    {
      $addFields: {
        userDetails: {
          $arrayElemAt: ["$userDetails", 0],
        },
      },
    },
  ]);

  if (!aggregation) {
    res.status(500).json({
      error: "data fetch failed",
    });
  }

  res.status(200).json(aggregation);
};

postsController.getAllPostByUserId = async (req, res) => {
  const userId = req.userEmail;
  console.log(userId);
  const aggregation = await Post.aggregate([
    {
      $match: {
        creator: userId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "email",
        as: "userDetails",
      },
    },
    {
      $addFields: {
        userDetails: {
          $arrayElemAt: ["$userDetails", 0],
        },
      },
    },
  ]);

  if (!aggregation) {
    res.status(500).json({
      error: "data fetch failed",
    });

    return;
  }

  res.status(200).json(aggregation);
};

postsController.deletePostById = async (req, res) => {
  try {
    const _id = req.params.id;

    const result = await Post.findByIdAndDelete(_id);

    res.status(200).json({
      message: "Post delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

postsController.fileUpload = async (req, res) => {
  const localFilePath = req?.file?.path;
  const result = await uploadOnCloudinary(localFilePath);
  if (result) {
    fs.unlinkSync(localFilePath);

    res.status(200).json({
      message: "File upload successfully",
    });
  } else {
    res.status(500).json({
      error: "File upload failed",
    });
  }
};

module.exports = postsController;
