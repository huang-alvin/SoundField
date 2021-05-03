import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { loadTickets } from "../../store/ticket";
import TicketCard from "../TicketCard";
import "./TicketPage.css";

function TicketPage() {
  const [currentTab, setCurrentTab] = useState(0);
  // const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const eventList = useSelector((state) => state.events);
  let history = useHistory();

  if (!sessionUser) {
    history.push("/home");
  }

  let ticketList = useSelector((state) => Object.values(state.tickets));
  let eventIdList = ticketList.map((ticket) => ticket.eventId);
  let userEventList = eventIdList.map((eventId) => eventList[eventId]);

  let folders = [{ title: "Upcoming" }, { title: "Past Events" }];
  let activeTickets = [];
  let expiredTickets = [];

  const sortTickets = () => {
    const today = new Date();
    userEventList.forEach((event) => {
      let endDate = event.end_date;
      if (Date.parse(today) - Date.parse(endDate) > 0) {
        expiredTickets.push(event);
      } else {
        activeTickets.push(event);
      }
    });
    folders[0]["tickets"] = activeTickets;
    folders[1]["tickets"] = expiredTickets;
  };
  sortTickets();

  let tabs = folders.map((tabObj, idx) => {
    const headerClass = idx === currentTab ? "active" : null;
    return (
      <span
        key={idx}
        id={idx}
        className={`${headerClass} tabs`}
        onClick={(e) => setCurrentTab(parseInt(e.target.id, 10))}
      >
        {tabObj.title}
      </span>
    );
  });
  const Headers = () => {
    return <div className="tab-header">{tabs}</div>;
  };
  let tickets;

  if (folders[currentTab].tickets.length) {
    tickets = [];
    folders[currentTab].tickets.forEach((event) => {
      let ticketTile = (
        <div className="ticket-tile" key={event.id}>
          <TicketCard ticket={event} key={event.id} />
        </div>
      );
      tickets.push(ticketTile);
    });
  } else {
    tickets = <div>No Tickets </div>;
  }

  return (
    <div className="ticket-container">
      <div className="tickets-header">Your Tickets</div>
      <Headers />
      <div className="ticket-card-container">{tickets}</div>
    </div>
  );
}
export default TicketPage;
