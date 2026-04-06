import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function FinanceRecord({ setPage }) {

  const [meetings, setMeetings] = useState([]);

  // ✅ FETCH FROM FIREBASE
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "meetings"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMeetings(data);
    };

    fetchData();
  }, []);

  // ❌ OLD TOTAL (hindi na gagamitin pero di ko tinanggal para safe)
  const total = meetings.reduce(
    (sum, m) => sum + Number(m.remaining || 0),
    0
  );

  // ✅ NEW: LATEST MEETING ONLY
  const latestMeeting =
    meetings.length > 0
      ? [...meetings].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-6 flex justify-center">

      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border space-y-6">

        {/* HEADER */}
        <div className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold text-blue-700">
            Finance Record
          </h2>
          <p className="text-sm text-gray-500">
            Overview of all meeting finances
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border shadow-sm">
          <table className="w-full text-sm">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Previous</th>
                <th className="p-3 text-left">Expenses</th>
                <th className="p-3 text-left">Collection</th>
                <th className="p-3 text-left">Remaining</th>
              </tr>
            </thead>

            <tbody>
              {meetings.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No records found
                  </td>
                </tr>
              )}

              {meetings.map((m, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">

                  <td className="p-3 font-medium text-gray-700">
                    {m.date}
                  </td>

                  <td className="p-3 text-gray-600">
                    ₱ {m.previous?.amount || 0}
                  </td>

                  <td className="p-3 text-red-500 font-semibold">
                    ₱ {m.totalExpenses || 0}
                  </td>

                  <td className="p-3 text-gray-600">
                    ₱ {m.collection?.amount || 0}
                  </td>

                  <td className="p-3 font-bold text-green-600">
                    ₱ {m.remaining || 0}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* TOTAL SUMMARY CARD (NOW CURRENT FUND) */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-5 rounded-xl shadow-lg flex justify-between items-center">

          <div>
            <p className="text-sm opacity-80">Total Remaining Balance</p>
            <h3 className="text-2xl font-bold">
              ₱ {latestMeeting?.remaining || 0}
            </h3>
          </div>

          <div className="text-right text-sm opacity-90">
            <p>Total Meetings: {meetings.length}</p>
          </div>

        </div>

        {/* BACK BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={() => setPage("dashboard")}
            className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
}