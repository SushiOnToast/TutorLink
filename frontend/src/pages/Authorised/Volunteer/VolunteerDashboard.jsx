import React, { useState, useEffect } from "react";
import api from "../../../api";
import { ACCESS_TOKEN } from "../../../constants";
import LoadingIndicator from "../../../components/LoadingIndicator";
import ConnectRequest from "../../../components/ConnectRequest";
import OngoingConnection from "../../../components/OngoingConnection";
import "../../../styles/FindTutor.css";
import "../../../styles/VolunteerDashboard.css";

function VolunteerDashboard() {
  const [requests, setRequests] = useState([]); // State to hold connection requests
  const [connections, setConnections] = useState([]); // State to hold ongoing connections
  const [loading, setLoading] = useState(false); // Loading state to show a spinner while data is being fetched

  // Fetch requests and connections when the component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true); // Set loading to true while fetching data
      const token = localStorage.getItem(ACCESS_TOKEN);
      try {
        const response = await api.get("api/connections/requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching connection requests:", error);
        alert(
          "Error fetching connection requests: " +
            (error.response?.data?.detail || error.message)
        );
      }
    };

    const fetchConnections = async () => {
      setLoading(true); // Set loading to true while fetching data
      const token = localStorage.getItem(ACCESS_TOKEN);
      try {
        const response = await api.get("/api/connections/ongoing/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConnections(response.data);
      } catch (error) {
        console.error("Error fetching ongoing connections:", error);
        alert(
          "Error fetching ongoing connections: " +
            (error.response?.data?.detail || error.message)
        );
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchRequests();
    fetchConnections();
  }, []);

  // Handle status change for a connection request
  const handleStatusChange = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  // Display loading indicator while data is being fetched
  if (loading) return <LoadingIndicator />;

  return (
    <div className="volunteer-dashboard">
      <h1 className="volunteer-dashboard-title">Volunteer Dashboard</h1>
      <h2 className="ongoing-connection-title">My students</h2>
      {/* Display ongoing connections */}
      <div className="ongoing-connection-list">
        {connections && (
          <>
            {connections.length > 0 ? (
              connections.map((connection) => (
                <OngoingConnection
                  key={connection.id}
                  ongoingConnection={connection}
                />
              ))
            ) : (
              <p>No ongoing connections.</p>
            )}
          </>
        )}
      </div>

      {/* Display connection requests */}
      <h2 className="connection-request-title">Connection Requests</h2>
      {requests.length > 0 ? (
        requests.map((request) => (
          <ConnectRequest
            key={request.id}
            request={request}
            onStatusChange={handleStatusChange}
          />
        ))
      ) : (
        <>
          <h3>No connection requests!</h3>
          <p>
            Consider <a href="/yourresources/">making some resources!</a>
          </p>
        </>
      )}
    </div>
  );
}

export default VolunteerDashboard;
