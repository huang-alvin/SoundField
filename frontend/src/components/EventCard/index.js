import { useSelector } from "react-redux";
import "./EventCard.css";

export default function EventCard({ event }) {
  return (
    <div className="event-card" key={event.id}>
      <div className="event-card__image-container">
        <img src=""></img>
      </div>
      <div className="event-card__detail-container">
        <div className="title"></div>
        <div className="date"></div>
        <div className="location"></div>
      </div>
    </div>
  );
}
