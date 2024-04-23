const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Registration = require("../Schema/registration_modal");
const User = require("../Schema/User_modal");

// moduleScaffolding
const authController = {};

authController.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    let encryptPassword = null;

    if(password) {
        encryptPassword = await bcrypt.hash(password, 11);
    }
    const accessToken = CreateAccessToken({ email });

    const createUser = new Registration({
        name: name,
        email: email,
        password: encryptPassword
    });

    const newUser = await createUser.save();
    
    const createUserProfile = new User({
        firstName: name,
        email: email,
        lastName: "",
        birthDate: ""
    });
    
    const newProfile = await createUserProfile.save();

    res.status(200).json({ name: newUser.name, email: newUser.email, accessToken });

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

    const accessToken = CreateAccessToken({ email });

    res.status(200).json({ name: result.name, email, accessToken, userId: result._id });
  } catch (error) {
    res.status(500).json(error);
  }
};

// authController.logout = async (req, res) => {
//   try {
//     const cookies = req?.signedCookies;
//     const { email } = req.body;
//     if (!cookies) return res.status(204);
//     const refreshToken = cookies.jwt;

//     //remove refreshToken from db
//     // const filter = { email: email };
//     // const query = { $pull: { log: refreshToken } };

//     // const response = await userCollection.updateOne(filter, query);

//     //remove cookie
//     res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });

//     res.clearCookie("yoodaHostel");

//     res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json("Internal server error");
//   }
// };

// authController.newAccessToken = async (req, res) => {
//   try {
//     const token = req?.signedCookies?.jwt;

//     if (!token) return res.status(401).json("Authorization Failed");
//     const validToken = await jwt.verify(token, process.env.REFRESHTOKEN);

//     if (!validToken) return res.status(401).json("Authorization Failed");

//     // const query = {log: { $elemMatch: {$eq: token} } };

//     const findUser = await userCollection.findOne({ email: validToken.email });

//     if (!findUser) return res.status(401).json("Authorization Failed");
//     const roles = Object.values(findUser.roles);

//     const userObj = {
//       UserInfo: {
//         email: findUser.email,
//         roles,
//       },
//     };

//     const accessToken = CreateAccessToken(userObj);

//     res.json({ roles, accessToken });
//   } catch (error) {
//     res.json(error);
//   }
// };

module.exports = authController;
