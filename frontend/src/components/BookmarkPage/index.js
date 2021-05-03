import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import BookmarkCard from "../BookmarkCard";
import { loadBookmarks, deleteOneBookmark } from "../../store/bookmark";
import "./BookmarkPage.css";

// useHistory to redirect user to event when click on bookmark card
// add event listener and a callback function

function BookmarkPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadBookmarks(sessionUser.id));
  }, [dispatch]);
  const bookmarkList = useSelector((state) => state.bookmarks);

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
    bookmarks = <div className="empty-bookmark">No Bookmarks</div>;
  } else {
    bookmarks = [];
    console.log(bookmarkArr);
    for (const index in bookmarkArr) {
      let bookmark = bookmarkArr[index];
      let bookmarkTile = (
        <div className="bookmark-tile" key={bookmark.id}>
          <BookmarkCard bookmark={bookmark} />
          <div className="bookmark-delete-container">
            <button
              onClick={(e) => handleDelete(e, bookmark)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      );
      bookmarks.push(bookmarkTile);
    }
  }

  return (
    <div className="bookmark-container">
      <div className="bookmark-header">Your Bookmarks</div>
      {bookmarks}
    </div>
  );
}
export default BookmarkPage;
