import React, { useEffect, useState } from "react";
import "./App.css";
import Ticket from "./components/Ticket";
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
      <h1 className="headline">Ticket Manager</h1>
      <input
        id="searchInput"
        onChange={searchTickets}
        placeholder="enter text here"
      ></input>
      <div className="head-wrapper">
        {/* <p id = "show-line"><p/>
          showing {tickets.length} results 
          (<span id="hideTicketsCounter">{hidden.length}<span/> hidden) */}
        <p id="show-line">
          showing {tickets.length} results(
          <span id="hideTicketsCounter">{hidden.length}</span> hidden)
        </p>

        <button
          id="restoreHideTickets"
          onClick={() => {
            restoreTickets();
          }}
        >
          restore
        </button>
      </div>
      {tickets.map((ticket, i) => {
        return (
          <div>
            <Ticket ticket={ticket} key={i} hideTicket={hideTicket} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
