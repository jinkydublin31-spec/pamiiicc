import { useState, useEffect } from "react";

export default function MeetingRecord({ setPage }) {
  const [meetings, setMeetings] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    setMeetings(JSON.parse(localStorage.getItem("meetings")) || []);
  }, []);

  const years = [...new Set(meetings.map(m => new Date(m.date).getFullYear()))];

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const filtered = meetings.filter(m => {
    const d = new Date(m.date);

    const matchYear = year ? d.getFullYear().toString() === year : true;
    const matchMonth = month
      ? d.toLocaleString("default", { month: "long" }) === month
      : true;

    return matchYear && matchMonth;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-6 flex justify-center">

      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border space-y-6">

        {/* HEADER */}
        <div className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold text-emerald-700">
            Meeting Records (Full Details)
          </h2>
          <p className="text-sm text-gray-500">
            Complete information per meeting
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col md:flex-row gap-4">

          <select
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-lg p-2 w-full md:w-1/3"
          >
            <option value="">All Years</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded-lg p-2 w-full md:w-1/3"
          >
            <option value="">All Months</option>
            {months.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

        </div>

        {/* RECORDS */}
        <div className="space-y-6">

          {filtered.length === 0 && (
            <p className="text-center text-gray-500">No records found</p>
          )}

          {filtered.map((m, i) => (
            <div key={i} className="bg-white border rounded-xl shadow p-5 space-y-4">

              {/* DATE HEADER */}
              <div className="flex justify-between border-b pb-2">
                <h3 className="font-bold text-emerald-700">{m.date}</h3>
                <span className="text-sm text-gray-500">
                  Remaining: ₱ {m.remaining}
                </span>
              </div>

              {/* ATTENDANCE */}
              <div>
                <h4 className="font-semibold mb-2 text-emerald-600">Attendance</h4>
                <table className="w-full text-sm border">
                  <thead className="bg-emerald-500 text-white">
                    <tr>
                      <th className="p-2">Role</th>
                      <th className="p-2">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {m.attendance?.map((a, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{a.label}</td>
                        <td className="p-2">{a.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* AGENDA */}
              <div>
                <h4 className="font-semibold mb-2 text-pink-600">Agenda</h4>
                <ul className="list-disc pl-5 text-sm">
                  {m.agendas?.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              </div>

              {/* ACTIVITIES */}
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">Activities</h4>
                <table className="w-full text-sm border">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="p-2">Date</th>
                      <th className="p-2">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {m.activities?.map((a, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{a.date}</td>
                        <td className="p-2">{a.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* NOTES */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-600">Notes</h4>
                <ul className="list-disc pl-5 text-sm">
                  {m.notes?.map((n, idx) => (
                    <li key={idx}>{n}</li>
                  ))}
                </ul>
              </div>

              {/* FINANCE */}
              <div>
                <h4 className="font-semibold mb-2 text-purple-600">Finance</h4>

                <div className="grid md:grid-cols-4 gap-3 text-sm">

                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-500">Previous</p>
                    <p className="font-bold">₱ {m.previous?.amount || 0}</p>
                    <p className="text-xs text-gray-400">{m.previous?.date}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-500">Expenses</p>
                    <p className="font-bold">₱ {m.totalExpenses}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-500">Collection</p>
                    <p className="font-bold">₱ {m.collection?.amount || 0}</p>
                    <p className="text-xs text-gray-400">{m.collection?.date}</p>
                  </div>

                  <div className="bg-emerald-100 p-3 rounded">
                    <p className="text-gray-600">Remaining</p>
                    <p className="font-bold text-emerald-700">
                      ₱ {m.remaining}
                    </p>
                  </div>

                </div>
              </div>

            </div>
          ))}

        </div>

        {/* BACK */}
        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={() => setPage("dashboard")}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
}