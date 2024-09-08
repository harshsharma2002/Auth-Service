const express = require("express");
const router = express.Router();

const authroutes = require("./routers/auth.router");

router.use("/auth", authroutes);

module.exports = router;
