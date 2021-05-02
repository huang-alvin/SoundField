import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import "./EventCard.css";

export default function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`}>
      <div className="event-card" key={event.id}>
        <div className="event-card__image-container">
          <img src={event.image} alt="event-image" />
        </div>
        <div className="event-card__detail-container">
          <div className="title">{event.title}</div>
          <div className="date">
            {DateTime.fromISO(event.start_date).toFormat("LLL dd")}
          </div>
        </div>
      </div>
    </Link>
  );
}
