import React from "react";

interface Candidate {
  name: string;
  role: string;
  stage: "Applied" | "Interview" | "Offer" | "Rejected";
}

const candidateData: Candidate[] = [
  { name: "John Doe", role: "Software Engineer", stage: "Interview" },
  { name: "Jane Smith", role: "Data Analyst", stage: "Offer" },
  { name: "Robert Brown", role: "Project Manager", stage: "Rejected" },
  { name: "Alice Green", role: "UX Designer", stage: "Applied" },
];

const Candidates: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Candidates</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Stage</th>
            </tr>
          </thead>
          <tbody>
            {candidateData.length > 0 ? (
              candidateData.map((candidate, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{candidate.name}</td>
                  <td className="py-2 px-4">{candidate.role}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      candidate.stage === "Applied"
                        ? "text-blue-600"
                        : candidate.stage === "Interview"
                        ? "text-yellow-600"
                        : candidate.stage === "Offer"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {candidate.stage}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No candidates available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidates;
