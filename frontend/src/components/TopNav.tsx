import React from "react";

const TopNav: React.FC = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center mb-4">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 bg-gray-200 rounded-full">🔔</button>
        <button className="p-2 bg-gray-200 rounded-full">👤</button>
      </div>
    </div>
  );
};

export default TopNav;
