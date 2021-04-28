import { useSelector } from "react-redux";
import "./BookmarkCard.css";

// use the eventId from bookmark object
// find the event obj
function BookmarkCard({ bookmark }) {
  const { eventId } = bookmark;
  const eventList = useSelector((state) => state.events);
  let eventObj = eventList[eventId];

  return (
    <div className="bookmark-card">
      <div className="bookmark-card__image-container">
        <img src={eventObj.image} alt="bookmark" className="image"></img>
      </div>
      <div className="bookmark-card__detail-container">
        <div className="title">{eventObj.title}</div>
        <div className="date">{eventObj.start_date}</div>
        <div className="location">{eventObj.location}</div>
      </div>
    </div>
  );
}
export default BookmarkCard;
