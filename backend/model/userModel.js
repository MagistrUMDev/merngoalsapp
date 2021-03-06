const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name!"],
    },
    email: {
      type: String,
      required: [true, "Please add an email!"],
      uniqued: true,
      minLength: [2, "Email is too short!"],
    },
    password: {
      type: String,
      required: [true, "Please add a password!"],
      minLength: [6, "Password is too short!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
