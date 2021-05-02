import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { loadAllEvents } from "../../store/event";
import { loadTickets } from "../../store/ticket";
import { loadBookmarks } from "../../store/bookmark";
import { csrfFetch } from "../../store/csrf";
import CategoryTag from "../CategoryTag";
import EventCard from "../EventCard";

import "./HomePage.css";
function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [activeTags, setActiveTags] = useState({}); //[1,2,3,4,5]
  const [categories, setCategories] = useState([]);
  const [eventList, setEventList] = useState([]);

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  useEffect(async () => {
    if (sessionUser) {
      await dispatch(loadAllEvents(sessionUser.id));
      await dispatch(loadTickets(sessionUser.id));
      await dispatch(loadBookmarks(sessionUser.id));
    }
    let res = await csrfFetch("/api/categories");
    let categoriesArr = await res.json();
    setCategories(categoriesArr);
  }, [dispatch]);

  useEffect(async () => {
    if (!isEmpty(activeTags)) {
      let payload = Object.values(activeTags).map((tag) => parseInt(tag, 10));

      let res = await csrfFetch("/api/events/filter", {
        method: "POST",
        body: JSON.stringify({ payload }),
      });
      let result = await res.json();
      setEventList(result);
    } else {
      setEventList([]);
    }
  }, [activeTags]);

  const handleTagClick = (e) => {
    e.preventDefault();
    let button = document.querySelector(`#category-button-${e.target.value}`);
    let newState = { ...activeTags };
    if (activeTags[e.target.value]) {
      delete newState[e.target.value];
      button.classList.remove("active-tag");
      setActiveTags(newState);
    } else if (e.target.value) {
      newState[e.target.value] = e.target.value;
      button.classList.add("active-tag");
      setActiveTags(newState);
    }
  };

  let categoryTags = categories.map((category) => (
    <CategoryTag category={category} key={category.id} />
  ));

  return (
    <div className="home-container">
      <div className="home-header">Filter music events</div>
      <div className="tag-container" onClick={handleTagClick}>
        {categoryTags}
      </div>
      <div className="event-container">
        {eventList.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
export default HomePage;
