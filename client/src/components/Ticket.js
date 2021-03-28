import React, { useEffect, useState } from "react";
import network from "../network";
function Ticket({ ticket, i, hideTicket }) {
  const [checked, setChecked] = useState(false);
  const checkTicket = (ticket) => {
    if (!ticket.done) {
      try {
        network.patch(`/api/tickets/${ticket._id}/done`);
        setChecked(true);
        ticket.done = !ticket.done;
      } catch ({ massage }) {
        console.log(massage);
      }
    } else {
      try {
        network.patch(`/api/tickets/${ticket._id}/undone`);
        setChecked(false);
        ticket.done = !ticket.done;
      } catch ({ massage }) {
        console.log(massage);
      }
    }
  };

  return (
    <div className="ticket" key={i}>
      <button
        className="hideTicketButton"
        onClick={() => {
          hideTicket(ticket);
        }}
      >
        hide me
      </button>
      <h1 className="ticket-title">{ticket.title}</h1>
      <p className="ticket-content">{ticket.content}</p>
      {/* <div className="ticket-labels"> */}
      {ticket.labels &&
        ticket.labels.map((label) => {
          return (
            <span className="label" id={label}>
              {label}{" "}
            </span>
          );
        })}
      {/* </div> */}
      <div className="ticket-details">
        <span className="email">{ticket.userEmail} </span>
        <span className="date">
          {new Date(ticket.creationTime).toLocaleString("en-GB")}
        </span>
      </div>
      <button
        className="check"
        onClick={() => {
          checkTicket(ticket);
        }}
      >
        {checked ? "un-check X" : "check ✔"}
      </button>
    </div>
  );
}

export default Ticket;
