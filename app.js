const express = require("express");
const app = express();

app.use(express.static("client/build"));

const MongoDB = require("mongodb");
const mongoose = require("mongoose");
const TicketModel = require("./model");

app.get("/api/tickets", async (req, res) => {
  const searchText = req.query;
  TicketModel.find(
    { title: new RegExp(searchText.title, "i") },
    (err, userArr) => {
      if (!err) {
        res.json(userArr);
      }
    }
  );
});

app.patch("/api/tickets/:ticketId/done", async (req, res) => {
  const ticketId = req.params.ticketId;
  TicketModel.findOneAndUpdate(
    { _id: ticketId },
    { done: true },
    { new: true },
    (err, updatedUser) => {
      if (!err) {
        res.status(200).send(`"${updatedUser.title}" is done`);
      } else {
        console.log(err);
      }
    }
  );
});
app.patch("/api/tickets/:ticketId/undone", async (req, res) => {
  const ticketId = req.params.ticketId;
  console.log(ticketId);
  TicketModel.findOneAndUpdate(
    { _id: ticketId },
    { done: false },
    { new: true },
    (err, updatedUser) => {
      if (!err) {
        res.status(200).send(`"${updatedUser.title}" is undone`);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = app;
