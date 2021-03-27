import React, { useEffect, useState } from "react";
import "./App.css";
import Ticket from "./components/Ticket";
import SearchInput from "./components/SearchInput";
import network from "./network";
function App() {
  const [tickets, setTickets] = useState([]);
  const [hidden, setHidden] = useState([]);
  const getTickets = () => {
    network.get("/api/tickets").then((res) => {
      setTickets(res.data.map((ticket) => ticket));
    });
  };
  useEffect(() => {
    getTickets();
    console.log("hi");
  }, []);
  const hideTicket = (ticket) => {
    hidden.push(ticket);
    setHidden(hidden);
    const FilteredTickets = tickets.filter(
      (item) => item.title !== ticket.title
    );
    setTickets(FilteredTickets);
  };
  const restoreTickets = () => {
    const allTickets = hidden.concat(tickets);
    setHidden([]);
    setTickets(allTickets);
  };
  const searchTickets = async (e) => {
    const input = e.target.value;
    const query = `/api/tickets?title=${input}`;
    const newTickets = await network.get(query).then((res) => {
      setTickets(res.data.map((ticket) => ticket));
    });
  };
  return (
    <div className="app">
      <input id="searchInput" onChange={searchTickets}></input>
      <p className="hideTicketsCounter">
        showing {tickets.length} results ({hidden.length} hidden)
      </p>
      <button
        id="restoreHideTickets"
        onClick={() => {
          restoreTickets();
        }}
      >
        restore
      </button>
      {tickets.map((ticket, i) => {
        return (
          <div>
            <Ticket
              ticket={ticket}
              key={i}
              hideTicket={hideTicket}
              // hidden={hidden}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
