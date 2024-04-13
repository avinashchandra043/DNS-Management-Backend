const dnsService = require("../services/dns.service");
const AWS = require("aws-sdk");

const createAWSClient = (user) => {
  const { accessKeyId, secretAccessKey, region } = user.aws;
  const awsClient = new AWS.Route53({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
  });
  return awsClient;
};

const listHostedZones = async (req, res) => {
  try {
    const user = req.user;
    const route53 = createAWSClient(user);
    const data = await route53.listHostedZones().promise();
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createHostedZone = async (req, res) => {
  try {
    const hostedZone = await dnsService.createHostedZone(
      req.user,
      req.body.domainName
    );
    return res.status(200).send(hostedZone);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createDNSRecord = async (req, res) => {
  try {
    const params = {
      HostedZoneId: req.body.hostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: "CREATE",
            ResourceRecordSet: {
              Name: req.body.name,
              Type: req.body.type,
              TTL: req.body.ttl,
              ResourceRecords: [
                {
                  Value: req.body.value,
                },
              ],
            },
          },
        ],
      },
    };
    const route53 = createAWSClient(req.user);
    const data = await route53.changeResourceRecordSets(params).promise();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listDNSRecords = async (req, res) => {
  try {
    const params = {
      HostedZoneId: req.query.HostedZoneId,
    };
    const route53 = createAWSClient(req.user);
    const data = await route53.listResourceRecordSets(params).promise();
    res.status(200).json(data.ResourceRecordSets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDNSRecord = async (req, res) => {
  try {
    const params = {
      HostedZoneId: req.body.hostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: "UPSERT",
            ResourceRecordSet: {
              Name: req.body.name,
              Type: req.body.type,
              TTL: req.body.ttl,
              ResourceRecords: [
                {
                  Value: req.body.value,
                },
              ],
            },
          },
        ],
      },
    };
    const route53 = createAWSClient(req.user);
    const data = await route53.changeResourceRecordSets(params).promise();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDNSRecord = async (req, res) => {
  try {
    const { hostedZoneId, name, type, ttl, value, ResourceRecords } = req.body;

    const resourceRecords = value
      ? value.map((record) => ({ Value: record.Value }))
      : ResourceRecords
      ? ResourceRecords.map((record) => ({ Value: record.Value }))
      : [];

    if (
      !hostedZoneId ||
      !name ||
      !type ||
      !ttl ||
      resourceRecords.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required parameters" });
    }

    const params = {
      HostedZoneId: hostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: "DELETE",
            ResourceRecordSet: {
              Name: name,
              Type: type,
              TTL: ttl,
              ResourceRecords: resourceRecords,
            },
          },
        ],
      },
    };

    const route53 = createAWSClient(req.user);

    const data = await route53.changeResourceRecordSets(params).promise();

    res.status(200).json({ message: "Delete success" });
  } catch (error) {
    console.error("Error deleting DNS record:", error);

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listHostedZones,
  createHostedZone,
  createDNSRecord,
  listDNSRecords,
  updateDNSRecord,
  deleteDNSRecord,
};
