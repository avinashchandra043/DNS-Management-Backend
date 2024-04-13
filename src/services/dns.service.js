const AWS = require("aws-sdk");
const DNS = require("../models/aws.model");

const createAWSClient = (user) => {
  const { accessKeyId, secretAccessKey, region } = user.aws;
  const awsClient = new AWS.Route53({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
  });
  return awsClient;
};

async function createHostedZone(user, domainName) {
  try {
    const params = {
      Name: domainName,
      CallerReference: `create-hosted-zone-${Date.now()}`,
    };
    const route53 = createAWSClient(user);
    const data = await route53.createHostedZone(params).promise();
    return data.HostedZone.Id;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createHostedZone,
};
