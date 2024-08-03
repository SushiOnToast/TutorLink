import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { USER_ROLE, USERNAME } from "../constants";
import "../styles/Navbar.css";

/**
 * Navbar component for navigating the application.
 *
 * @returns {JSX.Element} The Navbar component.
 */
function Navbar() {
  // Retrieve user role and username from local storage
  const userRole = localStorage.getItem(USER_ROLE);
  const username = localStorage.getItem(USERNAME);

  // Determine if the user is a student
  const isStudent = userRole === "student";

  // Use navigate hook for navigation
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <nav className="navbar-home">
        <div
          className="tutorlink"
          style={{
            color: "#313131",
            fontSize: 18,
            fontFamily: "DM Sans",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          TutorLink
        </div>
        <div className="nav-links">
          {/* Navigation links */}
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/resources" className="nav-link">
            Resource Library
          </NavLink>
          {isStudent ? (
            <NavLink to="/findtutor" className="nav-link">
              Find Tutor
            </NavLink>
          ) : (
            <NavLink to="/volunteerdashboard" className="nav-link">
              Volunteer Dashboard
            </NavLink>
          )}
          <NavLink to={`/profile/${username}`} className="nav-link">
            Profile
          </NavLink>
        </div>

        <button className="logout-button" onClick={() => navigate("/logout")}>
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
