import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { loadAllEvents } from "../../store/event";
import { loadTickets } from "../../store/ticket";
import { loadBookmarks } from "../../store/bookmark";
function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(async () => {
    if (sessionUser) {
      await dispatch(loadAllEvents(sessionUser.id));
      await dispatch(loadTickets(sessionUser.id));
      await dispatch(loadBookmarks(sessionUser.id));
    }
  }, [dispatch]);
  return <div>home</div>;
}
export default HomePage;
