import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the AI Recruitment Dashboard</h1>
      <div className="bg-blue-100 p-6 rounded-md shadow-md">
        <p>This is the main dashboard. You can navigate to Jobs, Candidates, Insights, and Chatbot using the sidebar.</p>
      </div>
    </div>
  );
};

export default Dashboard;
