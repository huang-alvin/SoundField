import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import BookmarkPage from "./components/BookmarkPage";
import HomePage from "./components/HomePage";
import TicketPage from "./components/TicketPage";
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
          <Route path="/bookmark">
            <BookmarkPage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/ticket">
            <TicketPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
