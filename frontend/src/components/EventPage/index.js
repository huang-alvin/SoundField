import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addOneBookmark } from "../../store/bookmark";
import { addOneTicket } from "../../store/ticket";

import "./EventPage.css";

function EventPage() {
  const [hasBookmark, setHasBookmark] = useState(false);
  const [hasTicket, setHasTicket] = useState(false);
  const { eventId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.events[parseInt(eventId, 10)]);

  const userId = useSelector((state) => state.session.user.id);
  const userBookmarksArr = useSelector((state) =>
    Object.values(state.bookmarks)
  );
  const userTicketsArr = useSelector((state) => Object.values(state.tickets));

  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/events/edit/${event.id}`);
  };
  const handleBookmark = (e) => {
    e.preventDefault();
    dispatch(addOneBookmark(userId, event.id)); //i'm thinking i dont need to await. could be wrong
    setHasBookmark(true);
  };
  const handleTicket = (e) => {
    e.preventDefault();
    dispatch(addOneTicket(userId, event.id));
    setHasTicket(true);
  };

  useEffect(() => {
    userBookmarksArr.forEach((bookmark) => {
      if (bookmark.eventId === parseInt(eventId, 10)) setHasBookmark(true);
    });
    userTicketsArr.forEach((ticket) => {
      if (ticket.eventId === parseInt(eventId, 10)) setHasTicket(true);
    });
  }, []);

  let bookmarkButton;
  if (hasBookmark) {
    bookmarkButton = (
      <div className="have-bookmark">This event is in your Bookmarks</div>
    );
  } else {
    bookmarkButton = (
      <button
        className="bookmark-button"
        type="button"
        onClick={handleBookmark}
      >
        Add to my Bookmarks
      </button>
    );
  }

  let editButton;
  if (event.userId === userId) {
    editButton = (
      <button type="button" className="edit-button" onClick={handleEdit}>
        Edit
      </button>
    );
  } else {
    editButton = <div />;
  }

  let buyButton;
  if (hasTicket) {
    buyButton = <div className="has-ticket">Already have ticket</div>;
  } else {
    buyButton = (
      <button className="ticket-button" onClick={handleTicket}>
        Buy Ticket
      </button>
    );
  }

  return (
    <div className="events-container">
      <div className="background-image-container">
        <img
          src="https://www.macmillandictionary.com/external/slideshow/full/148259_full.jpg"
          className="event-image"
        />
      </div>
      <div className="event-info-container">
        <div className="button-container">
          {bookmarkButton}
          {editButton}
          {buyButton}
        </div>
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
