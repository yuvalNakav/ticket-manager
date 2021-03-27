import React, { useEffect, useState } from "react";
import "./App.css";
import Ticket from "./components/Ticket";
import SearchInput from "./components/SearchInput";
import network from "./network";
function App() {
  const [tickets, setTickets] = useState([]);
  const getTickets = () => {
    network.get("/api/tickets").then((res) => {
      setTickets(res.data.map((ticket) => ticket));
    });
  };
  useEffect(() => {
    getTickets();
    console.log("hi");
  }, []);
  return (
    <div className="app">
      <SearchInput tickets={tickets} setTickets={setTickets} />
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
