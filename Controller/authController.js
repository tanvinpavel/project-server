const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Registration = require("../Schema/registration_modal");
const User = require("../Schema/user_modal");

// moduleScaffolding
const authController = {};

authController.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    let encryptPassword = null;

    if (email) {
      const result = await Registration.findOne({ email });
      console.log(result);
      if (result) return res.status(409).json("Already have an account.");
    }

    if (password) {
      encryptPassword = await bcrypt.hash(password, 11);
    }
    const accessToken = CreateAccessToken({ email });

    const role = email === "admin@gamil.com" ? "8274" : "3986";

    const createUser = new Registration({
      name: name,
      email: email,
      password: encryptPassword,
      role: role,
    });

    const newUser = await createUser.save();

    const createUserProfile = new User({
      firstName: name,
      email: email,
      lastName: "",
      birthDate: "",
    });

    await createUserProfile.save();

    res.status(200).json({ name: newUser.name, email: newUser.email, accessToken, role: role });
  } catch (err) {
    //     console.log(err);
    res.status(500).json(err);
  }
};

const CreateAccessToken = (info) => {
  return jwt.sign(info, process.env.ACCESSTOKEN);
};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await Registration.findOne({ email });

    if (!result) return res.status(401).json("Wrong email & password");

    const isValidPassword = await bcrypt.compare(password, result.password);

    if (!isValidPassword) return res.status(401).json("Wrong email & password");

    const accessToken = CreateAccessToken({ email: result.email });

    res.status(200).json({ name: result.name, email, accessToken, userId: result._id, role: result.role });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = authController;
