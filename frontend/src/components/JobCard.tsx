import React from "react";

interface JobCardProps {
  title: string;
  location: string;
  status: "Open" | "Closed";
  applicants: number;
}

const JobCard: React.FC<JobCardProps> = ({ title, location, status, applicants }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">📍 {location}</p>
      <p className={`mt-2 ${status === "Open" ? "text-green-500" : "text-red-500"}`}>
        {status}
      </p>
      <div className="mt-2 text-gray-800">
        <span>👥 {applicants} Applicants</span>
      </div>
    </div>
  );
};

export default JobCard;
