import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewMeeting from "./pages/NewMeeting";
import MeetingRecord from "./pages/MeetingRecord";
import FinanceRecord from "./pages/FinanceRecord";

export default function App() {
  const [page, setPage] = useState("login");
  

  if (page === "login") return <Login setPage={setPage} />;
  if (page === "dashboard") return <Dashboard setPage={setPage} />;
  if (page === "newMeeting") return <NewMeeting setPage={setPage} />;
  if (page === "meetingRecord") return <MeetingRecord setPage={setPage} />;
  if (page === "financeRecord") return <FinanceRecord setPage={setPage} />;

  return <div>Page not found</div>;
}