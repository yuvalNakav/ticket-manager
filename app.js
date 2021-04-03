const express = require("express");
const app = express();

app.use(express.static("client/build"));

const MongoDB = require("mongodb");
const mongoose = require("mongoose");
const TicketModel = require("./model");

app.get("/api/tickets", async (req, res) => {
  const searchText = req.query;
  // console.log(req);
  console.log(searchText);
  if (searchText.searchText !== undefined) {
    console.log("bye");
    TicketModel.find(
      { title: { $regex: searchText.searchText, $options: "i" } },
      (err, ticketArr) => {
        if (!err) {
          res.json(ticketArr);
        }
      }
    );
  } else {
    TicketModel.find({}, (err, ticketArr) => {
      console.log("hi");
      err ? console.log({ message }) : res.json(ticketArr);
    });
  }
});

app.patch("/api/tickets/:ticketId/done", async (req, res) => {
  const ticketId = req.params.ticketId;
  TicketModel.findOneAndUpdate(
    { _id: ticketId },
    { done: true },
    { new: true },
    (err, updatedTicket) => {
      if (!err) {
        res.json({ updated: true });
      } else {
        console.log(err);
      }
    }
  );
});
app.patch("/api/tickets/:ticketId/undone", async (req, res) => {
  const ticketId = req.params.ticketId;
  // console.log(ticketId);
  TicketModel.findOneAndUpdate(
    { _id: ticketId },
    { done: false },
    { new: true },
    (err, updatedTicket) => {
      if (!err) {
        res.json({ updated: true });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = app;
