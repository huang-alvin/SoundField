import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { loadAllEvents } from "../../store/event";
import { loadTickets } from "../../store/ticket";
function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(loadAllEvents(sessionUser.id));
    dispatch(loadTickets(sessionUser.id));
  }, [dispatch]);
  return <div>home</div>;
}
export default HomePage;
