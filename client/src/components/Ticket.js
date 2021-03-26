import React from "react";
// import tickets from "../../../index";

function Ticket({ ticket }) {
  async function getLocalTimeString(time) {
    return await time.toLocalTimeString();
  }
  return (
    <div className="ticket-wraper">
      <button>hide me</button>
      <h1 className="ticket-title">{ticket.title}</h1>
      <p className="ticket-content">{ticket.content}</p>
      <div className="ticket-labeles">{ticket.labels}</div>
      <div className="ticket-details">
        <span>{ticket.userEmail}</span>
        <span>{ticket.creationTime}</span>
      </div>
      <button className="check">check</button>
      <span>{ticket.done ? "✔" : "X"}</span>
    </div>
  );
}

export default Ticket;
