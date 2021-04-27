import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <span>
        <span>Welcome {sessionUser.username}</span>
        <ProfileButton user={sessionUser} />
      </span>
    );
  } else {
    sessionLinks = (
      <div className="dropdown">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }
  return (
    <div className="navbar-container">
      <span className="nav-header__group">
        <NavLink to="/">SoundField</NavLink>
      </span>
      <span className="nav-header__group">
        <NavLink exact to="/home">
          Home
        </NavLink>
      </span>
      <span className="nav-header__group">{isLoaded && sessionLinks}</span>
    </div>
  );
}
