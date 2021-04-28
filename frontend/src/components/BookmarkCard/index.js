import "./BookmarkCard.css";
// use the eventId from bookmark object
// find the event obj
function BookmarkCard({ bookmark }) {
  return (
    <div className="bookmark-card">
      <div className="bookmark-card__image-container">
        <img src="" alt="bookmark"></img>
      </div>
      <div className="bookmark-card__detail-container">
        <div className="title"></div>
        <div className="date"></div>
        <div className="location"></div>
      </div>
    </div>
  );
}
export default BookmarkCard;
