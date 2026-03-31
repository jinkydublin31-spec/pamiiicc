import { useEffect,useState } from "react";

export default function FinanceRecord({ setPage }) {

  const [meetings,setMeetings]=useState([]);

  useEffect(()=>{
    setMeetings(JSON.parse(localStorage.getItem("meetings"))||[]);
  },[]);

  const total=meetings.reduce((s,m)=>s+Number(m.remaining||0),0);

  return (
    <div className="bg-blue-100 min-h-screen p-6">

      <h2 className="font-bold">Finance Record</h2>

      {meetings.map((m,i)=>(
        <div key={i} className="bg-white p-3 mt-2 rounded">
          <p>{m.date}</p>
          <p>Remaining: ₱ {m.remaining}</p>
        </div>
      ))}

      <h3 className="mt-3">Total Balance: ₱ {total}</h3>

      <button onClick={()=>setPage("dashboard")} className="mt-3">BACK</button>
    </div>
  );
}