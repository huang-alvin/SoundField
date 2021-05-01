import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import BookmarkPage from "./components/BookmarkPage";
import HomePage from "./components/HomePage";
import TicketPage from "./components/TicketPage";
import EventPage from "./components/EventPage";
import UserEventPage from "./components/UserEventPage";
import LandingPage from "./components/LandingPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/user/bookmarks/:userId">
            <BookmarkPage />
          </Route>
          <Route path="/user/tickets/:userId">
            <TicketPage />
          </Route>
          <Route path="/user/events/:userId">
            <UserEventPage />
          </Route>
          <Route path="/events/:eventId">
            <EventPage />
          </Route>
          <Route path exact="/">
            <LandingPage />
          </Route>
          {/* <Route path="/events/:eventId">
            <EventPage />
          </Route> */}
          <Route path="/home">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
