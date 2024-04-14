const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://dnsmananagement.netlify.app"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Welcome to e-commerce API - Node",
    status: "true",
  });
});

const authRouters = require("./routes/auth.route");
app.use("/auth", authRouters);

const userRouters = require("./routes/user.route");
app.use("/api/user", userRouters);

const dnsRouters = require("./routes/dns.route");
app.use("/api/dns", dnsRouters);

const awsRouters = require("./routes/aws.route");
app.use("/api/aws", awsRouters);

module.exports = app;
