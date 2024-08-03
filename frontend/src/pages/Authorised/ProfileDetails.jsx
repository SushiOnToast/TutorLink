import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { USER_ROLE, USERNAME, ACCESS_TOKEN } from "../../constants";
import api from "../../api";
import LoadingIndicator from "../../components/LoadingIndicator";
import "../../styles/ProfileDetails.css";

const ProfileDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const userRole = localStorage.getItem(USER_ROLE);
  const viewerUsername = localStorage.getItem(USERNAME);
  const isStudent = userRole === "student";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/users/profile/${username}/`);
        setUser(response.data);
      } catch (error) {
        alert("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleConnect = async () => {
    setLoading(true);
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      alert("You must be logged in to send a connection request.");
      setLoading(false);
      return;
    }

    if (!user.id) {
      alert("User ID is not available.");
      setLoading(false);
      return;
    }

    try {
      await api.post(
        "/api/connections/",
        { receiver: user.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Connection request sent successfully.");
      setRequestSent(true);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("You are not authorized to perform this action.");
      } else {
        alert("Failed to send connection request.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingIndicator />;

  return (
    <div className="profile-page">
      <div className="profile-details">
        <h1 className="name">{user.name}</h1>
        <p className="username">@{username}</p>
        <h2 className="role">{user.role}</h2>
        {viewerUsername === username && (
          <button
            className="edit-profile"
            onClick={() =>
              alert(
                "This feature is under maintenance - please try again soon!"
              )
            }
          >
            Edit Profile
          </button>
        )}
        {isStudent && user.role === "volunteer" && (
          <button
            className="connect-button"
            onClick={handleConnect}
            disabled={loading || requestSent}
          >
            {requestSent ? "Request sent" : "Connect"}
          </button>
        )}
        <p className="age">Age: {user.age}</p>
        <div className="subject-details">
          <p className="subject-label">Subjects:</p>
          {user.subjects?.map((subject) => (
            <p className="subject" key={subject.id}>
              {subject.name}
            </p>
          ))}
        </div>
        <p className="time-zone">Time zone: {user.time_zone}</p>
        <div className="day-details">
          <p className="day-label">Days Available:</p>
          {user.days?.map((day) => (
            <p className="day" key={day.id}>
              {day.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
