export default function Dashboard({ setPage }) {
  return (
    <div className="h-screen flex items-center justify-center bg-pink-200">
      <div className="bg-white p-10 rounded-xl shadow text-center space-y-4">

        <h2 className="font-bold text-lg">Admin Dashboard</h2>

        <button onClick={()=>setPage("newMeeting")}
          className="bg-red-300 w-full py-2 rounded">
          New Meeting
        </button>

        <button onClick={()=>setPage("meetingRecord")}
          className="bg-yellow-300 w-full py-2 rounded">
          Meeting Record
        </button>

        <button onClick={()=>setPage("financeRecord")}
          className="bg-blue-300 w-full py-2 rounded">
          Finance Record
        </button>

      </div>
    </div>
  );
}