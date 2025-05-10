import React from "react";

interface Job {
  title: string;
  location: string;
  status: "Open" | "Closed";
  applicants: number;
}

const jobData: Job[] = [
  {
    title: "Software Developer",
    location: "Remote",
    status: "Open",
    applicants: 12,
  },
  {
    title: "Data Scientist",
    location: "New Delhi",
    status: "Open",
    applicants: 5,
  },
  {
    title: "Product Manager",
    location: "Bangalore",
    status: "Open",
    applicants: 8,
  },
  {
    title: "UI/UX Designer",
    location: "Mumbai",
    status: "Closed",
    applicants: 3,
  },
];

const Jobs: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Applicants</th>
            </tr>
          </thead>
          <tbody>
            {jobData.length > 0 ? (
              jobData.map((job, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{job.title}</td>
                  <td className="py-2 px-4">{job.location}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      job.status === "Open" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {job.status}
                  </td>
                  <td className="py-2 px-4">{job.applicants}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No jobs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jobs;
