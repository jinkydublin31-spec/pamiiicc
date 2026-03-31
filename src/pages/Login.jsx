import { useState } from "react";

export default function Login({ setPage }) {
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-screen">

      {/* LEFT IMAGE */}
      <div className="w-1/2">
        <img src="/logo.png" className="w-full h-full object-cover"/>
      </div>

      {/* RIGHT LOGIN */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 to-white">

        <h1 className="text-2xl font-bold mb-2 text-gray-700">PAMI ICC</h1>
        <p className="text-pink-400 mb-4">Admin Login</p>

        <input
          type="password"
          placeholder="Enter Password"
          className="border p-2 rounded w-64 shadow-sm focus:outline-pink-300"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 mt-4 rounded shadow"
          onClick={()=>{
            if(password==="admin123") setPage("dashboard");
            else alert("Wrong password");
          }}
        >
          LOGIN
        </button>

      </div>
    </div>
  );
}