import { useState } from "react";

export default function Login({ setPage }) {
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE (IMAGE / COVER) */}
      <div className="md:w-1/2 w-full h-48 md:h-auto">
        <img
          src="/PAMI.png"
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE (LOGIN FORM) */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100 p-6">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center space-y-5 border">

          {/* LOGO */}
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="logo"
              className="w-16 h-16 rounded-full shadow"
            />
          </div>

          {/* TITLE */}
          <div>
            <h1 className="text-2xl font-bold text-gray-700">
              PAMI ICC
            </h1>
            <p className="text-pink-500 text-sm">
              Admin Login
            </p>
          </div>

          {/* INPUT */}
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:opacity-90 text-white py-2 rounded-lg shadow-md transition"
            onClick={() => {
              if (password === "admin123") setPage("dashboard");
              else alert("Wrong password");
            }}
          >
            LOGIN
          </button>

        </div>

      </div>
    </div>
  );
}