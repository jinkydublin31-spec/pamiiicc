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

        <div className="text-center pb-4 border-b">
          <h2 className="text-2xl font-bold text-indigo-700">
            New Meeting
          </h2>
          <p className="text-sm text-gray-500">
            Record meeting details with organized sections
          </p>
        </div>

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

        {/* AGENDA */}
        <div className="bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-xl border">
          <h3 className="font-semibold mb-3 text-pink-700">Agenda</h3>

          {form.agendas.map((a, i) => (
            <textarea
              key={i}
              className="w-full border rounded-lg p-2 mb-2 focus:ring-2 focus:ring-pink-300"
              placeholder="Enter agenda"
              onChange={(e) => {
                const arr = [...form.agendas];
                arr[i] = e.target.value;
                setForm({ ...form, agendas: arr });
              }}
            />
          ))}

          <button
            onClick={addAgenda}
            className="text-sm bg-pink-500 text-white px-3 py-1 rounded-lg hover:bg-pink-600"
          >
            + Add Agenda
          </button>
        </div>

        {/* NOTES */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-4 rounded-xl border">
          <h3 className="font-semibold mb-3 text-gray-700">Notes</h3>

          <table className="w-full text-sm border bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              {form.notes.map((n, i) => (
                <tr key={i} className="border-t">
                  <td className="p-1">
                    <input
                      className="w-full p-2 outline-none"
                      placeholder="Enter note"
                      onChange={(e) => {
                        const arr = [...form.notes];
                        arr[i] = e.target.value;
                        setForm({ ...form, notes: arr });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addNote}
            className="mt-2 text-sm bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
          >
            + Add Another Note
          </button>
        </div>

        {/* ACTIVITIES */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border">
          <h3 className="font-semibold mb-3 text-blue-700">Activities</h3>

          {form.activities.map((a, i) => (
            <div key={i} className="mb-3">
              <input
                type="date"
                className="w-full border rounded-lg p-2 mb-1 focus:ring-2 focus:ring-blue-300"
                onChange={(e) => {
                  const arr = [...form.activities];
                  arr[i].date = e.target.value;
                  setForm({ ...form, activities: arr });
                }}
              />
              <textarea
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-300"
                placeholder="Activity details"
                onChange={(e) => {
                  const arr = [...form.activities];
                  arr[i].text = e.target.value;
                  setForm({ ...form, activities: arr });
                }}
              />
            </div>
          ))}

          {/* ✅ ADDED ONLY */}
          <button
            onClick={addActivity}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
          >
            + Add Another Activity
          </button>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <button
            onClick={() => setPage("dashboard")}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Back
          </button>

          <button
            onClick={save}
            className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-lg hover:opacity-90"
          >
            Save Meeting
          </button>
        </div>
      </div>
    </div>
  );
}