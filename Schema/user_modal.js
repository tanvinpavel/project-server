const { Schema, model } = require("mongoose");

const userSchema = Schema({
  firstName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  birthDate: {
    type: String,
    trim: true,
  },
});

const User = new model("User", userSchema);

module.exports = User;