const { ObjectId } = require("mongodb");
const User = require("../Schema/user_modal");
const Registration = require("../Schema/registration_modal");

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
    const userList = await User.find({ email: { $ne: req.userEmail } });

    res.status(200).json(userList);
  } catch (err) {
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

usersController.deleteUserById = async (req, res) => {
  try {
    const _id = req.params.id;

    const result = await User.findByIdAndDelete(_id);

    await Registration.deleteOne({ email: result.email });

    res.status(200).json({
      message: "User delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = usersController;
