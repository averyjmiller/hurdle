import "./navbar.css";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="navbar-container">
      <header>
        <nav className="navbar">
          <div className="navbar-logo">
            <h1>Hurdle</h1>
          </div>
          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            {Auth.loggedIn() ? (
              <>
                <li>
                  <Link to="/profile">Account</Link>
                </li>
                <button onClick={logout}>Log Out</button>
              </>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
