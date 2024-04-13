const AWS = require("aws-sdk");

const accessKeyId = "AKIA2UC3DQ4QW4UJTPPA";
const secretAccessKey = "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";

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region: "eu-north-1",
});

const route53 = new AWS.Route53();

module.exports = { route53 };
