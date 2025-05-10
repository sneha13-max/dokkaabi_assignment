import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/jobs", label: "Jobs" },
    { path: "/candidates", label: "Candidates" },
    { path: "/insights", label: "Insights" },
    { path: "/chatbot", label: "Chatbot" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-gray-300 w-64 min-h-screen p-6 flex flex-col shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-white">AI Recruitment</h2>

      <ul className="flex-1 space-y-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block p-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-8 rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
