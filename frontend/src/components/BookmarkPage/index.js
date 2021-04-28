import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import BookmarkCard from "../BookmarkCard";
import { loadBookmarks, deleteOneBookmark } from "../../store/bookmark";
import "./BookmarkPage.css";

function BookmarkPage() {
  const dispatch = useDispatch();
  // const [userBookmarks, setUserBookmarks] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  // const eventList = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(loadBookmarks(sessionUser.id));
  }, [dispatch]);
  const bookmarkList = useSelector((state) => state.bookmarks);
  // useEffect(() => {
  //   setUserBookmarks(Object.values(bookmarkList));
  // }, [dispatch]);

  const handleDelete = (e, bookmarkId) => {
    e.preventDefault();
    dispatch(deleteOneBookmark(bookmarkId));
  };

  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }
  let bookmarkArr = Object.values(bookmarkList);
  let bookmarks;
  if (isEmpty(bookmarkList)) {
    bookmarks = <div className="empty-bookmark">Hi</div>;
  } else {
    bookmarks = [];
    for (const index in bookmarkArr) {
      let bookmark = bookmarkArr[index];
      let bookmarkTile = (
        <div className="bookmark-tile" key={bookmark.id}>
          <BookmarkCard bookmark={bookmark} />

          <button
            onClick={(e) => handleDelete(e, bookmark)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      );
      bookmarks.push(bookmarkTile);
    }
  }

  return <div className="bookmark-container">{bookmarks}</div>;
}
export default BookmarkPage;
