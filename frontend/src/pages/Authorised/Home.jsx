import React from "react";
import "../../styles/Landing.css";
import "../../styles/LoginRegister.css"
import { USER_ROLE } from "../../constants";

function Home() {
  const userRole = localStorage.getItem(USER_ROLE);
  const isStudent = userRole === "student";

  return (
    <div className="home-page">
      <h1 className="form-title">Home</h1>
      <p className="inspo-quote">
        “There is no better exercise for your heart than reaching down and
        helping to lift someone up.“
      </p>
      <h2 className="welcome">Welcome!</h2>
      {isStudent ? (
        <div className="home-options">
          <a href="/resources"><button className="form-button">Browse Resources</button></a>
          <a href="/findtutor"><button className="form-button">Find a Tutor</button></a>
        </div>
      ) : (
        <div className="home-options">
          <a href="/yourresources"><button className="form-button">Create a Resource</button></a>
          <a href="/volunteerdashboard"><button className="form-button">View your students</button></a>
        </div>
      )}
    </div>
  );
}

export default Home;
