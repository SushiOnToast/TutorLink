import React, { useState, useEffect } from "react";
import api from "../../../api";
import OngoingConnection from "../../../components/OngoingConnection";
import { ACCESS_TOKEN } from "../../../constants";
import ProfilePreview from "../../../components/ProfilePreview";
import LoadingIndicator from "../../../components/LoadingIndicator";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown";
import "../../../styles/FindTutor.css";

function FindTutor() {
  const [volunteers, setVolunteers] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allDays, setAllDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVolunteers();
    fetchSubjects();
    fetchDays();
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    setLoading(true);
    const token = localStorage.getItem(ACCESS_TOKEN);
    try {
      const response = await api.get("/api/connections/ongoing/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConnections(response.data);
    } catch (error) {
      setError(
        "Error fetching ongoing connections: " +
          (error.response?.data?.detail || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchVolunteers = () => {
    let url = "/api/users/volunteers/";

    const params = [];
    if (selectedSubjects.length > 0) {
      params.push(...selectedSubjects.map((id) => `subjects=${id}`));
    }
    if (selectedDays.length > 0) {
      params.push(...selectedDays.map((id) => `days=${id}`));
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    api
      .get(url)
      .then((res) => {
        setVolunteers(res.data);
      })
      .catch((err) => {
        setError(
          "Failed to fetch volunteers: " +
            (err.response?.data?.detail || err.message)
        );
      });
  };

  const fetchSubjects = () => {
    api
      .get("/api/users/subjects/")
      .then((res) => {
        setAllSubjects(res.data);
      })
      .catch((err) => {
        setError(
          "Failed to fetch subjects: " +
            (err.response?.data?.detail || err.message)
        );
      });
  };

  const fetchDays = () => {
    api
      .get("/api/users/days/")
      .then((res) => {
        setAllDays(res.data);
      })
      .catch((err) => {
        setError(
          "Failed to fetch days: " + (err.response?.data?.detail || err.message)
        );
      });
  };

  const handleSubjectSelect = (id) => {
    setSelectedSubjects((prevSubjects) =>
      prevSubjects.includes(id)
        ? prevSubjects.filter((subjectId) => subjectId !== id)
        : [...prevSubjects, id]
    );
  };

  const handleDaySelect = (id) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(id)
        ? prevDays.filter((dayId) => dayId !== id)
        : [...prevDays, id]
    );
  };

  useEffect(() => {
    fetchVolunteers();
  }, [selectedSubjects, selectedDays]);

  if (loading) return <LoadingIndicator />;

  if (error) return <p>{error}</p>;

  return (
    <div className="find-tutor-page">
      <h2 className="ongoing-connection-title">My Tutors</h2>
      <div className="ongoing-connection-list">
        {connections.length > 0 && (
          <>
            
            {connections.map((connection) => (
              <OngoingConnection
                key={connection.id}
                ongoingConnection={connection}
              />
            ))}
          </>
        )}
      </div>

      <h1 className="find-tutor">Find Tutor</h1>
      <div className="filter-volunteers">
        <MultiSelectDropdown
          items={allSubjects}
          selectedItems={selectedSubjects}
          onSelectItem={handleSubjectSelect}
          placeholder="Select subjects"
        />
        <MultiSelectDropdown
          items={allDays}
          selectedItems={selectedDays}
          onSelectItem={handleDaySelect}
          placeholder="Select days"
        />
      </div>
      <div className="volunteers">
        {volunteers.length > 0 ? (
          volunteers.map((volunteer) => (
            <ProfilePreview user={volunteer} key={volunteer.id} />
          ))
        ) : (
          <p>No volunteers found.</p>
        )}
      </div>
    </div>
  );
}

export default FindTutor;
