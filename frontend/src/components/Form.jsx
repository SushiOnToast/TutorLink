import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ROLE, USERNAME } from "../constants";
import {jwtDecode} from "jwt-decode"; // Correct import
import "../styles/LoginRegister.css";
import MultiSelectDropdown from "./MultiSelectDropdown";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [email, setEmail] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [student, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timezone, setTimezone] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(0);
  const [days, setDays] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const navigate = useNavigate();

  const type = method === "login" ? "Login" : "Register";
  const toggleRoute = method === "login" ? "/register" : "/login";
  const toggleName = method === "login" ? "Register" : "Login";

  useEffect(() => {
    getSubjects();
    getDays();
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const calculateAge = (dob) => {
    const dateOfBirth = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const validateDate = (dateStr) => {
    const today = new Date();
    const dob = new Date(dateStr);
    return dob <= today;
  };

  const getSubjects = () => {
    api
      .get("/api/users/subjects/")
      .then((res) => {
        setSubjects(res.data);
      })
      .catch(() => {
        alert("Error fetching subjects");
      });
  };

  const getDays = () => {
    api
      .get("/api/users/days/")
      .then((res) => {
        setDays(res.data);
      })
      .catch(() => {
        alert("Error fetching days");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (method === "register" && password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    const data = {
      name,
      username,
      password,
      email,
      role: student ? "student" : "volunteer",
      subject_ids: selectedSubjects,
      time_zone: timezone,
      age,
      day_ids: selectedDays,
    };

    try {
      const res = await api.post(route, data);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        const token = localStorage.getItem(ACCESS_TOKEN);
        const decodedToken = jwtDecode(token);

        const userRole = decodedToken.role;
        localStorage.setItem(USER_ROLE, userRole);
        localStorage.setItem(USERNAME, username);

        navigate("/");
      } else {
        navigate("/login");
      }
    } catch {
      alert("Error during form submission");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSubject = (id) => {
    if (selectedSubjects.includes(id)) {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== id));
    } else {
      setSelectedSubjects([...selectedSubjects, id]);
    }
  };

  const handleSelectDay = (id) => {
    if (selectedDays.includes(id)) {
      setSelectedDays(selectedDays.filter((item) => item !== id));
    } else {
      setSelectedDays([...selectedDays, id]);
    }
  };

  return (
    <div className="login-register-page">
      <h1 className="form-title">{type}</h1>
      <p className="or">or</p>
      <button
        type="button"
        className="toggle-button"
        onClick={() => navigate(toggleRoute)}
      >
        {toggleName}
      </button>
      <form onSubmit={handleSubmit} className="form-container">
        {type === "Register" && (
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        )}
        <br />
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <br />
        {type === "Register" && (
          <>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <br />
            <input
              className="form-input"
              type="date"
              value={dob}
              onChange={(e) => {
                const newDob = e.target.value;
                if (validateDate(newDob)) {
                  setDob(newDob);
                  setAge(calculateAge(newDob));
                } else {
                  alert("Invalid Date of Birth");
                }
              }}
              placeholder="Date of Birth"
              required
            />
            <br />
            <div id="role-selector">
              <label>
                <input
                  className="role"
                  type="radio"
                  checked={student}
                  onChange={() => setIsStudent(true)}
                />
                Student
              </label>
              <label>
                <input
                  className="role"
                  type="radio"
                  checked={!student}
                  onChange={() => setIsStudent(false)}
                />
                Volunteer
              </label>
            </div>
            <br />
            <MultiSelectDropdown
              items={subjects}
              selectedItems={selectedSubjects}
              onSelectItem={handleSelectSubject}
              placeholder="Select Subjects"
            />
            <br />
            <MultiSelectDropdown
              items={days}
              selectedItems={selectedDays}
              onSelectItem={handleSelectDay}
              placeholder="Select Days Available"
            />
          </>
        )}
        <br />
        <input
          className="form-input password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {type === "Register" && (
          <>
            <br />
            <input
              className="form-input password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </>
        )}
        <br />
        <button className="form-button" type="submit" disabled={loading}>
          {type}
        </button>
      </form>
    </div>
  );
}

export default Form;
