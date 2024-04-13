const mongoose = require("mongoose");

const DEV = "DEV";
const PROD = "PROD";

const currentEnvironment = DEV;

const environmentConfig = {
  PROD: {
    mongodbUrl: "",
    frontEndUrl: "",
  },
  DEV: {
    mongodbUrl:
      "mongodb+srv://avinashchandrabarik01:lAmd168QPqNaJmtZ@cluster0.uwzofsi.mongodb.net/",
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
