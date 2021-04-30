import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./EventPage.css";

function EventPage() {
  const { eventId } = useParams();

  const event = useSelector((state) => state.events[parseInt(eventId, 10)]);

  const userId = useSelector((state) => state.session.user.id);

  return (
    <div className="events-container">
      <div className="background-image-container">
        <img
          src="https://www.macmillandictionary.com/external/slideshow/full/148259_full.jpg"
          className="event-image"
        />
      </div>
      <div className="event-info-container">
        <div className="button-container"></div>
        <div className="event-body">
          <div className="event-title">{event.title}</div>
          <div className="event-description">{event.description}</div>
        </div>
        <div className="event-details">
          <div className="event-date-container ">
            <div className="event-date-header detail-header">Date and Time</div>
            <div className="event-date">{event.start_date}</div>
          </div>
          <div className="event-location-container">
            <div className="event-location-header detail-header">Location</div>
            <div className="event-location">{event.location}</div>
          </div>
          <div className="event-price-container">
            <div className="event-price-header detail-header">Price</div>
            <div className="event-price">${event.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
