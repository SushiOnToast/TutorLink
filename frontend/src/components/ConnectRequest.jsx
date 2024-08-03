import React, { useState } from "react";
import api from "../api";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/ConnectionRequest.css";
/**
 * ConnectRequest component for handling connection requests.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.request - The connection request data.
 * @param {Function} props.onStatusChange - Callback function to update the request status.
 * @returns {JSX.Element} The ConnectRequest component.
 */
const ConnectRequest = ({ request, onStatusChange }) => {
  // State to manage loading status of accept/reject actions
  const [loading, setLoading] = useState(false);

  /**
   * Handles the acceptance of the connection request.
   * Sends a POST request to update the status to 'accepted'.
   */
  const handleAccept = async () => {
    setLoading(true);
    try {
      await api.post(`/api/connections/update/${request.id}/accepted/`);
      onStatusChange(request.id, "accepted");
      alert("Request accepted!");
    } catch {
      alert("There was an issue accepting the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the rejection of the connection request.
   * Sends a POST request to update the status to 'rejected'.
   */
  const handleReject = async () => {
    setLoading(true);
    try {
      await api.post(`/api/connections/update/${request.id}/rejected/`);
      onStatusChange(request.id, "rejected");
      alert("Request rejected!");
    } catch {
      alert("There was an issue rejecting the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingIndicator />;

  return (
    <div className="connect-request">
      <h4 className="sender-username">
        {/* Link to the sender's profile */}
        <a href={`/profile/${request.sender_username}`}>
          @{request.sender_username}
        </a>
      </h4>
      {/* Button to view the sender's profile */}
      <a href={`/profile/${request.sender_username}`}>
        <button className="view-profile">View profile</button>
      </a>
      <p className="connection-email">{request.sender_email}</p>
      {request.status === "pending" ? (
        <div>
          {/* Buttons to accept or reject the request */}
          <button className="accept-request" onClick={handleAccept} disabled={loading}>
            Accept
          </button>
          <br />
          <button className="reject-request" onClick={handleReject} disabled={loading}>
            Reject
          </button>
        </div>
      ) : (
        <p className="status">Status: {request.status}</p> // Display current status of the request
      )}
    </div>
  );
};

export default ConnectRequest;
