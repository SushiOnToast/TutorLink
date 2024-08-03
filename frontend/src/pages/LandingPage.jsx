import { useNavigate } from "react-router-dom";
import "../styles/LoginRegister.css";
import "../styles/Landing.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1 className="main-title">TutorLink</h1>
      <h1 form-title>Your Future starts here.</h1>
      <div className="auth-options">
        <button className="form-button" onClick={() => navigate("/register")}>
          Register
        </button>
        <button className="form-button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
