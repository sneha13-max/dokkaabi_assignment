import React from "react";

interface CandidateCardProps {
  name: string;
  role: string;
  stage: "Applied" | "Interview" | "Offer" | "Rejected";
}

const CandidateCard: React.FC<CandidateCardProps> = ({ name, role, stage }) => {
  const stageColors = {
    Applied: "bg-blue-100 text-blue-600",
    Interview: "bg-yellow-100 text-yellow-600",
    Offer: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-600">Role: {role}</p>
      <span className={`mt-2 inline-block px-2 py-1 rounded ${stageColors[stage]}`}>
        {stage}
      </span>
    </div>
  );
};

export default CandidateCard;
