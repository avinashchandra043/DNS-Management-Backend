const awsService = require("../services/aws.service");

const registerAws = async (req, res) => {
  try {
    const user = await req.user;
    const dns = await awsService.createAws(user, req.body);
    return res.status(200).send({ message: "register success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
module.exports = {
  registerAws,
};
