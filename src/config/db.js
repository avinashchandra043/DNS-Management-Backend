const mongoose = require("mongoose");
require("dotenv").config();
const DEV = "DEV";
const PROD = "PROD";

const currentEnvironment = DEV;

const environmentConfig = {
  PROD: {
    mongodbUrl: "",
    frontEndUrl: "",
  },
  DEV: {
    mongodbUrl: process.env.MONGODB_URI,
    frontEndUrl: "http://localhost:3000",
  },
};

const getUrls = (enviroment) => {
  switch (enviroment) {
    case DEV:
      return environmentConfig.DEV;
    case PROD:
      return environmentConfig.PROD;
    default:
      return environmentConfig.DEV;
  }
};

const frontEndUrl = getUrls(currentEnvironment).frontEndUrl;

const connectDb = () => {
  return mongoose.connect(getUrls(currentEnvironment).mongodbUrl);
};

module.exports = { connectDb, frontEndUrl };
