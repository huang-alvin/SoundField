import { useSelector } from "react-redux";
import { NavLink, Link, Redirect } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <span className="user-nav">
        <span>Welcome {sessionUser.username}</span>
        <ProfileButton user={sessionUser} />
      </span>
    );
  } else {
    sessionLinks = (
      <div className="dropdown">
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }
  return (
    <>
      <div className="navbar-container">
        <span className="nav-header__group logo">
          <Link to="/">SoundField</Link>
        </span>
        <span className="nav-header__group">
          <Link exact to="/home">
            Home
          </Link>
        </span>
        <span className="nav-header__group ">{isLoaded && sessionLinks}</span>
      </div>
      <div className="footer">
        <a href="https://github.com/huang-alvin/SoundField/wiki">Github</a>
      </div>
    </>
  );
}
