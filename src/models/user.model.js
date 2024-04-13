const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  aws: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "aws",
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
