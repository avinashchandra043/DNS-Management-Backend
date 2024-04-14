const express = require("express");
const router = express.Router();
const dnsController = require("../controller/dns.controller");
const authenticate = require("../middleware/authenticate");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", authenticate, dnsController.createHostedZone);
router.get("/list", authenticate, dnsController.listHostedZones);

router.post("/record/create", authenticate, dnsController.createDNSRecord);
router.get("/record/list", authenticate, dnsController.listDNSRecords);
router.put("/record/update", authenticate, dnsController.updateDNSRecord);
router.delete("/record/delete", authenticate, dnsController.deleteDNSRecord);

router.post(
  "/bulk/create",
  authenticate,
  upload.single("file"),
  dnsController.bulkDomainCreate
);
router.post(
  "/record/bulk/create",
  authenticate,
  upload.single("file"),
  dnsController.bulkRecordCreate
);

module.exports = router;
