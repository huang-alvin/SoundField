import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import BookmarkCard from "../BookmarkCard";
import { loadBookmarks, deleteOneBookmark } from "../../store/bookmark";
import "./BookmarkPage.css";

function BookmarkPage() {
  const dispatch = useDispatch();
  const [userBookmarks, setUserBookmarks] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadBookmarks(sessionUser.id));
  }, [dispatch]);
  const bookmarkList = useSelector((state) => state.bookmarks);

  const handleDelete = (e, bookmarkId) => {
    e.preventDefault();
    dispatch(deleteOneBookmark(bookmarkId));
    setUserBookmarks(...bookmarkList);
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

  let bookmarks;
  if (isEmpty(userBookmarks)) {
    bookmarks = <div className="empty-bookmark"></div>;
  } else {
    bookmarks = [];
    for (const bookmark in userBookmarks) {
      let bookmarkTile = (
        <div className="bookmarkTile" key={bookmark.id}>
          <BookmarkCard bookmark={bookmark} />
          <button
            onClick={(e) => handleDelete(e, bookmark.id)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      );
      bookmarks.push(bookmarkTile);
    }
  }

  return (
    <div className="bookmark-container">
      {bookmarks}
      <div>Hi</div>
    </div>
  );
}
export default BookmarkPage;

/*
1. when the user is signed in and goes to bookmarks
    initial render grab all bookmarks under user and display (useEffect)

*/
