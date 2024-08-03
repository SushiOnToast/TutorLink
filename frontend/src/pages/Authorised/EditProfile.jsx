import React, { useState, useEffect } from "react";
import api from "../../api";
import { USERNAME, ACCESS_TOKEN } from "../../constants";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";

function EditProfile() {
  const username = localStorage.getItem(USERNAME);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [days, setDays] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allDays, setAllDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      console.error("No access token found in localStorage");
      return;
    }

    console.log("Fetching profile for user:", username);
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/users/profile/${username}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Profile fetch response:", response.data);
        const data = response.data;
        setUser(data);
        setName(data.name || "");
        setAbout(data.about_me || "");
        setSubjects(data.subjects.map((subject) => subject.id) || []);
        setDays(data.days.map((day) => day.id) || []);
      } catch (err) {
        console.error("Error fetching profile:", err.response ? err.response.data : err.message);
        alert(`Error fetching profile: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubjects = async () => {
      console.log("Fetching subjects");
      try {
        const response = await api.get("/api/users/subjects/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Subjects fetch response:", response.data);
        setAllSubjects(response.data);
      } catch (err) {
        console.error("Error fetching subjects:", err.response ? err.response.data : err.message);
        alert(`Error fetching subjects: ${err.message}`);
      }
    };

    const fetchDays = async () => {
      console.log("Fetching days");
      try {
        const response = await api.get("/api/users/days/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Days fetch response:", response.data);
        setAllDays(response.data);
      } catch (err) {
        console.error("Error fetching days:", err.response ? err.response.data : err.message);
        alert(`Error fetching days: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchSubjects();
    fetchDays();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting profile update with data:", { name, subject_ids: subjects, about_me: about, day_ids: days });

    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        console.error("No access token found in localStorage during submit");
        return;
      }

      const response = await api.patch(
        `/api/users/profile/edit/`,
        { name, subject_ids: subjects, about_me: about, day_ids: days },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile update response:", response.data);
      alert("Profile updated successfully");
      navigate(`/profile/${username}`);
    } catch (err) {
      console.error("Error updating profile:", err.response ? err.response.data : err.message);
      alert(`Error updating profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingIndicator />;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Edit Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            console.log("Name input changed:", e.target.value);
            setName(e.target.value);
          }}
          placeholder={name || "Enter name"}
        />
      </div>
      <div>
        <label>Edit About Me:</label>
        <textarea
          value={about || ""}
          onChange={(e) => {
            console.log("About Me input changed:", e.target.value);
            setAbout(e.target.value);
          }}
          placeholder={about || "Enter details about yourself"}
        />
      </div>
      <div>
        <label>Edit Subjects:</label>
        <select
          multiple
          value={subjects}
          onChange={(e) => {
            const selectedSubjects = [...e.target.selectedOptions].map(option => option.value);
            console.log("Subjects selection changed:", selectedSubjects);
            setSubjects(selectedSubjects);
          }}
        >
          {allSubjects.map((subject) => (
            <option value={subject.id} key={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Edit Days Available:</label>
        <select
          multiple
          value={days}
          onChange={(e) => {
            const selectedDays = [...e.target.selectedOptions].map(option => option.value);
            console.log("Days selection changed:", selectedDays);
            setDays(selectedDays);
          }}
        >
          {allDays.map((day) => (
            <option value={day.id} key={day.id}>
              {day.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditProfile;
