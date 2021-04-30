import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ProfileButton.css";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    const closeMenu = () => {
      if (!showMenu) return;
      setShowMenu(false);
    };
    if (showMenu) {
      document.addEventListener("click", closeMenu);
    }
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();

    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button>
        <i className="fas fa-user" onClick={openMenu}></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>
            <Link to={`/user/bookmarks/${sessionUser.id}`}>My Bookmarks</Link>
          </div>
          <div>
            <Link to={`/user/tickets/${sessionUser.id}`}>My Tickets</Link>
          </div>
          <div>
            <Link to={`/user/events/${sessionUser.id}`}>My Events</Link>
          </div>
          <div>
            <button onClick={logout}>Log Out</button>
          </div>
        </ul>
      )}
    </>
  );
}
export default ProfileButton;
