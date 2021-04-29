import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import "./TicketCard.css";

function TicketCard({ ticket }) {
  //take new Date() - end_date on ticket:
  // if new Date() - end_date > 0, ticket is expired.
  // expired tickets have their own tab and are transparent
  // run this useEffect once a day?
  const eventList = useSelector((state) => state.events);

  let eventObj = eventList[ticket.id];

  return (
    <div className="ticket-card">
      <div className="ticket-card__image-container">
        <img src="" alt="ticket" className="image" />
      </div>
      <div className="ticket-card__detail-container">
        <div className="title">{eventObj.title}</div>
        <div className="date">{eventObj.start_date}</div>
        <div className="location">{eventObj.location}</div>
      </div>
    </div>
  );
}
export default TicketCard;
