const AWS = require("../models/aws.model");

const createAws = async (user, awsData) => {
  const aws = new AWS(awsData);
  aws.user = user._id;
  await aws.save();
  user.aws = aws._id;
  await user.save();
  return user;
};

module.exports = { createAws };
