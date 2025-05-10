import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Insights from "./pages/Insights";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 bg-gray-100">
                  <TopNav />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/candidates" element={<Candidates />} />
                    <Route path="/insights" element={<Insights />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
