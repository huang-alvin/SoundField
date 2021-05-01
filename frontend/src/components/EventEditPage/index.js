import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./EventEditPage.css";

function EventEditPage() {
  const { eventId } = useParams();

  let event = useSelector((state) => state.events[parseInt(eventId)]);
  useEffect(() => {
    setTitle(event.title);
    setDescription(event.description);
    setImage(event.image);
    setDate(event.start_date);
    setLocation(event.location);
    setPrice(event.price);
  }, []);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [date, setDate] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();

  return (
    <div className="events-container">
      <div className="background-image-container">
        <img
          src={
            "https://www.macmillandictionary.com/external/slideshow/full/148259_full.jpg"
          }
          // src={event.image}
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

export default EventEditPage;
