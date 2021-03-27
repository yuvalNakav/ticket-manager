import React from "react";
import network from "../network";
function Ticket({ ticket, i }) {
  const checkTicket = (ticket) => {
    if (!ticket.done) {
      try {
        network.patch(`/api/tickets/${ticket._id}/done`);
      } catch ({ massage }) {
        console.log(massage);
      }
    } else {
      try {
        network.patch(`/api/tickets/${ticket._id}/undone`);
      } catch ({ massage }) {
        console.log(massage);
      }
    }
  };
  return (
    <div className="ticket-wraper" key={i}>
      <button className="hideTicketButton">hide me</button>
      <h1 className="ticket-title">{ticket.title}</h1>
      <p className="ticket-content">{ticket.content}</p>
      <div className="ticket-labels">
        {ticket.labels.map((label) => {
          return (
            <span className="label" id={label}>
              {label}{" "}
            </span>
          );
        })}
      </div>
      <div className="ticket-details">
        <span>{ticket.userEmail} </span>
        <span>{new Date(ticket.creationTime).toLocaleString("en-GB")}</span>
      </div>
      <button
        className="check"
        onClick={() => {
          checkTicket(ticket);
        }}
      >
        check
      </button>
      <span>{ticket.done ? "✔" : "X"}</span>
    </div>
  );
}

export default Ticket;
