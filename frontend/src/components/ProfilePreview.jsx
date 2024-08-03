import React from "react";
import "../styles/ProfileDetails.css";

/**
 * ProfilePreview component displays a summary of a user's profile.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user data to display.
 * @returns {JSX.Element} The ProfilePreview component.
 */
function ProfilePreview({ user }) {
  return (
    <div className="profile-card">
      <h2 className="name-preview">{user.name}</h2>
      <a href={`/profile/${user.username}`} className="username-preview">
        @{user.username}
      </a>
      <br />
      <p className="role-preview">{user.role}</p>
      <a href={`/profile/${user.username}`}>
        <button className="view-profile">View profile</button>
      </a>
      <p className="age">Age: {user.age}</p>
      <div className="subject-details">
        <label className="subject-label">Subjects:</label>
        {user.subjects.map((subject) => (
          <p className="subject" key={subject.id}>
            {subject.name}
          </p>
        ))}
      </div>
      <p className="time-zone">Time zone: {user.time_zone}</p>
      <div className="day-details">
        <label className="day-label">Days Available:</label>
        {user.days.map((day) => (
          <p className="day" key={day.id}>
            {day.name}
          </p>
        ))}
      </div>

      <br />
    </div>
  );
}

export default ProfilePreview;
