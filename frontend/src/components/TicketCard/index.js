import { useSelector } from "react-redux";
import { useEffect } from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

import "./TicketCard.css";

function TicketCard({ ticket }) {
  const eventList = useSelector((state) => state.events);

  let eventObj = eventList[ticket.id];
  useEffect(() => {});
  return (
    <Link to={`/events/${eventObj.id}`}>
      <div className="ticket-card">
        <div className="ticket-card__image-container">
          <img src={eventObj.image} alt="ticket" className="ticket-image" />
        </div>
        <div className="ticket-card__detail-container">
          <div className="title">{eventObj.title}</div>
          <div className="date">
            {DateTime.fromISO(eventObj.start_date).toFormat("LLL dd")}
          </div>
          <div className="location">{eventObj.location}</div>
        </div>
      </div>
    </Link>
  );
}
export default TicketCard;
