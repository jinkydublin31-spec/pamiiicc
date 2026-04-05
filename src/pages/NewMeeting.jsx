import { useState } from "react";

export default function NewMeeting({ setPage }) {
  const [form, setForm] = useState({
    date: "",
    attendance: [
      { label: "Opening Prayer", name: "" },
      { label: "Worship Leader", name: "" },
      { label: "Short Message", name: "" },
      { label: "Closing Prayer", name: "" }
    ],
    previous: { amount: "", date: "" },
    expenses: [{ name: "", amount: "" }],
    collection: { amount: "", date: "" },
    agendas: [""],
    activities: [{ date: "", text: "" }],
    notes: [""]
  });

  const addAttendance = () => {
    setForm({
      ...form,
      attendance: [...form.attendance, { label: "New Role", name: "" }]
    });
  };

  const addExpense = () => {
    setForm({
      ...form,
      expenses: [...form.expenses, { name: "", amount: "" }]
    });
  };

  const addAgenda = () => {
    setForm({
      ...form,
      agendas: [...form.agendas, ""]
    });
  };

  const addActivity = () => {
    setForm({
      ...form,
      activities: [...form.activities, { date: "", text: "" }]
    });
  };

  const addNote = () => {
    setForm({
      ...form,
      notes: [...form.notes, ""]
    });
  };

  const totalExpenses = form.expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const balanceAfterExpenses =
    Number(form.previous.amount || 0) - totalExpenses;

  const finalRemaining =
    balanceAfterExpenses + Number(form.collection.amount || 0);

  const save = () => {
    if (!form.date) return alert("Lagyan ng meeting date");

    const data = JSON.parse(localStorage.getItem("meetings")) || [];

    data.push({
      ...form,
      totalExpenses,
      remaining: finalRemaining
    });

    localStorage.setItem("meetings", JSON.stringify(data));

    alert("Saved!");
    setPage("dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center p-6">

      <div className="bg-white/90 backdrop-blur-lg w-full max-w-3xl rounded-2xl shadow-2xl p-6 space-y-6 border border-gray-200">

        {/* HEADER */}
        <div className="text-center pb-4 border-b">
          <h2 className="text-2xl font-bold text-indigo-700">
            New Meeting
          </h2>
          <p className="text-sm text-gray-500">
            Record meeting details with organized sections
          </p>
        </div>

        {/* DATE */}
        <div>
          <label className="text-sm font-medium text-gray-600">Meeting Date</label>
          <input
            type="date"
            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />
        </div>

        {/* ATTENDANCE */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border">
          <h3 className="font-semibold mb-3 text-indigo-700">Attendance</h3>

          {form.attendance.map((a, i) => (
            <div key={i} className="mb-2">
              <p className="text-xs text-gray-500">{a.label}</p>
              <input
                placeholder="Enter name"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-300"
                onChange={(e) => {
                  const arr = [...form.attendance];
                  arr[i].name = e.target.value;
                  setForm({ ...form, attendance: arr });
                }}
              />
            </div>
          ))}

          <button
            onClick={addAttendance}
            className="mt-2 text-sm bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600"
          >
            + Add Attendance
          </button>
        </div>

        {/* FINANCE */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border">
          <h3 className="font-semibold mb-3 text-purple-700">Finance</h3>

          {/* Previous Funds */}
          <div className="mb-3">
            <label className="text-sm text-gray-600">Previous Funds</label>

            <input
              placeholder="Amount"
              className="w-full border rounded-lg p-2 mt-1"
              onChange={(e) =>
                setForm({
                  ...form,
                  previous: { ...form.previous, amount: e.target.value }
                })
              }
            />

            <input
              type="month"
              className="w-full border rounded-lg p-2 mt-2"
              onChange={(e) =>
                setForm({
                  ...form,
                  previous: { ...form.previous, date: e.target.value }
                })
              }
            />
          </div>

          {/* EXPENSE TABLE */}
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <tr>
                  <th className="p-2 text-left">Expense</th>
                  <th className="p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {form.expenses.map((e, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-1">
                      <input
                        className="w-full p-2 outline-none"
                        placeholder="Name"
                        onChange={(ev) => {
                          const arr = [...form.expenses];
                          arr[i].name = ev.target.value;
                          setForm({ ...form, expenses: arr });
                        }}
                      />
                    </td>
                    <td className="p-1">
                      <input
                        className="w-full p-2 outline-none"
                        placeholder="₱"
                        onChange={(ev) => {
                          const arr = [...form.expenses];
                          arr[i].amount = ev.target.value;
                          setForm({ ...form, expenses: arr });
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ ADD BUTTON (ito lang ang dinagdag) */}
          <button
            onClick={addExpense}
            className="mt-2 text-sm bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
          >
            + Add Another Expense
          </button>

          <p className="text-sm mt-2">Total Expenses: ₱ {totalExpenses}</p>
          <p className="text-sm">Balance: ₱ {balanceAfterExpenses}</p>

          <p className="font-semibold mt-2 text-indigo-700">
            Final Remaining: ₱ {finalRemaining}
          </p>

          {/* Monthly Collection */}
          <div className="mt-3">
            <label className="text-sm text-gray-600">Monthly Collection</label>

            <input
              placeholder="Amount"
              className="w-full border rounded-lg p-2 mt-1"
              onChange={(e) =>
                setForm({
                  ...form,
                  collection: {
                    ...form.collection,
                    amount: e.target.value
                  }
                })
              }
            />

            <input
              type="month"
              className="w-full border rounded-lg p-2 mt-2"
              onChange={(e) =>
                setForm({
                  ...form,
                  collection: {
                    ...form.collection,
                    date: e.target.value
                  }
                })
              }
            />
          </div>
        </div>

        {/* (rest of your code unchanged...) */}
      </div>
    </div>
  );
}