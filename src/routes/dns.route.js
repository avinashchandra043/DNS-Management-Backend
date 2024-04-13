const express = require("express");
const router = express.Router();
const dnsController = require("../controller/dns.controller");
const authenticate = require("../middleware/authenticate");

router.post("/create", authenticate, dnsController.createHostedZone);
router.get("/list", authenticate, dnsController.listHostedZones);

router.post("/record/create", authenticate, dnsController.createDNSRecord);
router.get("/record/list", authenticate, dnsController.listDNSRecords);
router.put("/record/update", authenticate, dnsController.updateDNSRecord);
router.delete("/record/delete", authenticate, dnsController.deleteDNSRecord);

module.exports = router;
