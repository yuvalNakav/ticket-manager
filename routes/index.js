const express = require("express");
const api = express.Router();
const tickets = require("./tickets.js");
api.use("/tickets", tickets);

module.exports = api;
