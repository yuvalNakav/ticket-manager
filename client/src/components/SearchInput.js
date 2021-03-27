import React from "react";
import network from "../network";
function SearchInput({ tickets, setTickets }) {
  const searchTickets = async (e) => {
    const input = e.target.value;
    const query = `/api/tickets?title=${input}`;
    const newTickets = await network.get(query).then((res) => {
      setTickets(res.data.map((ticket) => ticket));
    });
  };
  return (
    <div>
      <input id="searchInput" onChange={searchTickets}></input>
      <p className="hideTicketsCounter">
        showing {tickets.length} results ({} hidden)
      </p>
      <button id="restoreHideTickets">restore</button>
    </div>
  );
}

export default SearchInput;
