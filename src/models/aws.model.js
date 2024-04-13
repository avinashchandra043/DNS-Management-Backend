const mongoose = require("mongoose");

const awsSchema = new mongoose.Schema({
  accessKeyId: {
    type: String,
    required: true,
  },
  secretAccessKey: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
});

const AWS = mongoose.model("aws", awsSchema);

module.exports = AWS;
