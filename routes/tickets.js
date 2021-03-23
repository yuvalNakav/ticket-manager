const { Router } = require("express");
const MongoDB = require("mongodb");
const mongoose = require("mongoose");
const tickets = Router();
const Ticket = require("../model");

tickets.get("/", async (req, res) => {
  const searchText = req.query;
  console.log(searchText);
  //   console.log(Object.keys(searchText));
  //   console.log(searchText.hello);

  Ticket.find({ title: new RegExp(searchText.title, "i") }, (err, userArr) => {
    if (!err) {
      //   console.log(userArr.length);
      res.json(userArr);
    }
  });
});
tickets.patch("/:ticketId/done", async (req, res) => {
  const ticketId = req.params.ticketId;
  console.log(ticketId);
  Ticket.findOneAndUpdate(
    { _id: ticketId },
    { done: true },
    { new: true },
    (err, updatedUser) => {
      console.log("im here");
      if (!err) {
        console.log("hi");
        res.status(200).send(`ticket #${ticketId} is done`);
      } else {
        console.log(err);
      }
    }
  );
});
tickets.patch("/:ticketId/undone", async (req, res) => {
  const ticketId = req.params.ticketId;
  console.log(ticketId);
  Ticket.findOneAndUpdate(
    { _id: ticketId },
    { done: false },
    { new: true },
    (err, updatedUser) => {
      if (!err) {
        res.status(200).send(`ticket #${ticketId} is undone`);
      } else {
        console.log(err);
      }
    }
  );
});
module.exports = tickets;
