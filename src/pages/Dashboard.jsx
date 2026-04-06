export default function Dashboard({ setPage }) {

  const logout = () => {
    localStorage.clear();
    alert("Logged out!");
    setPage("login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center p-6">

      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-700">
              Admin Dashboard
            </h2>
            <p className="text-gray-500 text-sm">
              Manage meetings and finances لة
            </p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow"
          >
            Logout
          </button>
        </div>

        {/* MAIN CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* NEW MEETING */}
          <div
            onClick={() => setPage("newMeeting")}
            className="cursor-pointer bg-gradient-to-br from-pink-400 to-red-500 text-white p-8 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-xl font-bold mb-2">New Meeting</h3>
            <p className="text-sm opacity-90">
              Create and record a new meeting
            </p>
          </div>

          {/* MEETING RECORD */}
          <div
            onClick={() => setPage("meetingRecord")}
            className="cursor-pointer bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-8 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-xl font-bold mb-2">Meeting Record</h3>
            <p className="text-sm opacity-90">
              View all meeting details
            </p>
          </div>

          {/* FINANCE RECORD */}
          <div
            onClick={() => setPage("financeRecord")}
            className="cursor-pointer bg-gradient-to-br from-blue-400 to-indigo-600 text-white p-8 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-xl font-bold mb-2">Finance Record</h3>
            <p className="text-sm opacity-90">
              Check financial summary
            </p>
          </div>

        </div>

        {/* FOOTER INFO */}
        <div className="mt-10 text-center text-gray-400 text-sm">
          Church Reporting System Dashboard
        </div>

      </div>
    </div>
  );
}