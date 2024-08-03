import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";

// Non-authorized pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";

// Authorized pages
import Home from "./pages/Authorised/Home";
import VolunteerDashboard from "./pages/Authorised/Volunteer/VolunteerDashboard";
import YourResources from "./pages/Authorised/Volunteer/YourResources";
import FindTutor from "./pages/Authorised/Student/FindTutor";
import Resources from "./pages/Authorised/Student/Resources";
import ResourceDetailPage from "./pages/Authorised/ResourceDetails";
import ProfileDetails from "./pages/Authorised/ProfileDetails";
import EditProfile from "./pages/Authorised/EditProfile";

function Logout() {
  localStorage.clear();
  return <Navigate to="/landing" />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:username"
              element={
                <ProtectedRoute>
                  <ProfileDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources/:slug"
              element={
                <ProtectedRoute>
                  <ResourceDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/yourresources"
              element={
                <ProtectedRoute>
                  <YourResources />
                </ProtectedRoute>
              }
            />
            <Route
              path="/yourresources/:slug"
              element={
                <ProtectedRoute>
                  <ResourceDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/findtutor"
              element={
                <ProtectedRoute>
                  <FindTutor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volunteerdashboard"
              element={
                <ProtectedRoute>
                  <VolunteerDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
