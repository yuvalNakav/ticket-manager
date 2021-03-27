import React, { useEffect, useState } from "react";

import "./App.css";
import Ticket from "./components/Ticket";
import network from "./network";
function App() {
  const [tickets, setTickets] = useState([]);
  network.get("/api/tickets").then((res) => {
    setTickets(res.data.map((ticket) => ticket));
  });
  return (
    <div className="app">
      <p className="hideTicketsCounter">counter</p>
      <button id="restoreHideTickets">restore</button>
      {tickets.map((ticket, i) => {
        return (
          <div>
            <Ticket ticket={ticket} key={i} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
