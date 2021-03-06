import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import "./BookmarkCard.css";

// use the eventId from bookmark object
// find the event obj
function BookmarkCard({ bookmark }) {
  const { eventId } = bookmark;
  const eventList = useSelector((state) => state.events);
  let eventObj = eventList[eventId];

  return (
    <Link to={`/events/${eventId}`}>
      <div className="bookmark-card">
        <div className="bookmark-card__image-container">
          <img
            src={eventObj.image}
            alt="bookmark"
            className="bookmark-image"
          ></img>
        </div>
        <div className="bookmark-card__detail-container">
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
export default BookmarkCard;
