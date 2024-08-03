import React from "react";
import { USER_ROLE } from "../constants";
import "../styles/ConnectionRequest.css";

/**
 * OngoingConnection component displays details of an ongoing connection.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.ongoingConnection - The ongoing connection details.
 * @returns {JSX.Element} The OngoingConnection component.
 */
function OngoingConnection({ ongoingConnection }) {
  // Retrieve user role from local storage
  const userRole = localStorage.getItem(USER_ROLE);

  // Determine if the user is a student
  const isStudent = userRole === "student";

  // Format the creation date of the connection
  const dateTime = new Date(ongoingConnection.created_at).toLocaleDateString();

  return (
    <div className="ongoing-connection">
      {isStudent ? (
        <>
          <h3 className="connection-with">
            Connection with{" "}
            <a href={`/profile/${ongoingConnection.volunteer_username}`}>
              {ongoingConnection.volunteer_username}
            </a>{" "}
          </h3>
          <a href={`/profile/${ongoingConnection.volunteer_username}`}>
            <button className="view-profile">View Profile</button>
          </a>
          <br />
        </>
      ) : (
        <>
          <h3 className="connection-with">
            Connection with{" "}
            <a href={`/profile/${ongoingConnection.student_username}`}>
              {ongoingConnection.student_username}
            </a>{" "}
          </h3>
          <a href={`/profile/${ongoingConnection.student_username}`}>
            <button className="view-profile">View Profile</button>
          </a>
          <br />
        </>
      )}
      <i className="since-date">Since: {dateTime}</i>
      <p className="connection-email">
        Contact:{" "}
        {isStudent
          ? ongoingConnection.volunteer_email
          : ongoingConnection.student_email}
      </p>
    </div>
  );
}

export default OngoingConnection;
