const Post = require("../Schema/post_modal");
const { uploadOnCloudinary, deleteFromCloudinary } = require("../Utility/cloudinary");
const fs = require("fs");

//module scaffolding
const postsController = {};

//controllers
postsController.createPost = async (req, res) => {
  try {
    const { post, price, private } = req.body;
    console.log(req?.file?.path);
    const localFilePath = req?.file?.path ?? "./public/temp/default.jpg";

    const result = await uploadOnCloudinary(localFilePath);

    if (result) {
      const createPost = new Post({
        creator: req?.userEmail,
        image: result?.url,
        publicId: result?.public_id,
        post: post,
        price: price,
        private: private,
        status: null,
      });

      await createPost.save();
      //remove local file after upload to cloudinary
      if (localFilePath !== "./public/temp/default.jpg") {
        fs.unlinkSync(localFilePath);
      }

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
  const userId = req.userEmail;
  console.log(userId);
  const aggregation = await Post.aggregate([
    {
      $match: {
        creator: { $ne: userId },
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
    { $unwind: "$userDetails" },
    {
      $addFields: {
        userDetails: "$userDetails",
      },
    },
    { $sort: { date: -1 } },
  ]);

  if (!aggregation) {
    res.status(500).json({
      error: "data fetch failed",
    });
  }

  res.status(200).json(aggregation);
};

postsController.getAllPostByUserId = async (req, res) => {
  const userId = req.params.id;
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
        localField: "email",
        foreignField: "creator",
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
    { $sort: { date: -1 } },
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
    const _id = req.query.id;
    const _publicId = req.query.publicId;

    const resultCludinary = await deleteFromCloudinary(_publicId);

    if (resultCludinary?.result === "ok") {
      await Post.findByIdAndDelete(_id);
    }

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
    if (localFilePath !== "./public/temp/default.jpg") {
      fs.unlinkSync(localFilePath);
    }

    res.status(200).json({
      message: "File upload successfully",
    });
  } else {
    res.status(500).json({
      error: "File upload failed",
    });
  }
};

postsController.confirmPurchase = async (req, res) => {
  try {
    await Post.findOneAndUpdate({ _id: req?.body?.postId }, { status: "sold" }, { new: true });

    res.status(200).json({
      message: "Update successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Update failed",
    });
  }
};

module.exports = postsController;
