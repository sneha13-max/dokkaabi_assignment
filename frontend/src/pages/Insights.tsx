import React from "react";

interface Insight {
  title: string;
  value: string | number;
  bgColor: string;
}

const insightsData: Insight[] = [
  { title: "Total Applicants", value: 120, bgColor: "bg-blue-500" },
  { title: "Interviews Scheduled", value: 35, bgColor: "bg-green-500" },
  { title: "Offers Extended", value: 15, bgColor: "bg-yellow-500" },
  { title: "Rejected Candidates", value: 10, bgColor: "bg-red-500" },
];

const Insights: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Insights & Analytics</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {insightsData.length > 0 ? (
              insightsData.map((insight, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="py-4 px-6 font-semibold">{insight.title}</td>
                  <td
                    className={`py-4 px-6 font-bold text-white ${insight.bgColor}`}
                  >
                    {insight.value}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-6 text-center text-gray-500">
                  No insights available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Analytics Overview</h2>
        <p className="text-gray-600">
          Detailed analytics and graphical representation of recruitment data
          will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default Insights;
