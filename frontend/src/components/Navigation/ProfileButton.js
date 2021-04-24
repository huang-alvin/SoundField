import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

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
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}
export default ProfileButton;
