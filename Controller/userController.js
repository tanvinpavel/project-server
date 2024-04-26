const { ObjectId } = require("mongodb");
const User = require("../Schema/user_modal");

//moduleScaffolding
const usersController = {};

//get profile data
usersController.getProfile = async (req, res) => {
  try {
    const userProfile = await User.where({ email: req?.userEmail }).findOne();
    res.status(200).json(userProfile);
  } catch (err) {
    res.status(500).json({
      error: "data fetch failed",
    });
  }
};

usersController.getAllUsersList = async (req, res) => {
  try {
    console.log(req.userEmail);
    const userList = await User.find({ email: { $ne: req.userEmail } });

    res.status(200).json(userList);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "data fetch failed",
    });
  }
};

usersController.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;

    await User.findOneAndUpdate({ email: req?.userEmail }, { firstName, lastName, birthDate });

    res.status(200).json({
      message: "Profile update successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: "Profile update failed",
    });
  }
};

module.exports = usersController;
