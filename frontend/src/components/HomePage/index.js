import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { loadAllEvents } from "../../store/event";
function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllEvents());
  }, [dispatch]);
  return <div>home</div>;
}
export default HomePage;
