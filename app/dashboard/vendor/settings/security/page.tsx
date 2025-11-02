// ...existing code...
"use client";
import { useState } from "react";

export default function SecurityPage() {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const checks = {
    lower: /[a-z]/.test(newPwd),
    upper: /[A-Z]/.test(newPwd),
    number: /\d/.test(newPwd),
    length: newPwd.length >= 10,
  };

  const updatePassword = () => {
    if (!newPwd || newPwd !== confirmPwd || !checks.length) {
      alert("Password requirements not met");
      return;
    }
    alert("Password updated");
    setOldPwd("");
    setNewPwd("");
    setConfirmPwd("");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800">Security settings</h2>
      <p className="text-sm text-gray-500 mb-4">Manage and change passwords</p>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-gray-600 mb-2">Old Password</div>
          <input
            type="password"
            value={oldPwd}
            onChange={(e) => setOldPwd(e.target.value)}
            placeholder="Enter old password"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <div className="text-xs text-gray-600 mb-2">New Password</div>
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            placeholder="Enter new password"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <div className="text-xs text-gray-600 mb-2">Confirm New Password</div>
          <input
            type="password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            placeholder="Confirm new password"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
          <ul className="list-disc pl-5">
            <li className={checks.lower ? "text-green-600" : "text-gray-400"}>
              Lowercase characters
            </li>
            <li className={checks.number ? "text-green-600" : "text-gray-400"}>
              Numbers
            </li>
          </ul>
          <ul className="list-disc pl-5">
            <li className={checks.upper ? "text-green-600" : "text-gray-400"}>
              Upper characters
            </li>
            <li className={checks.length ? "text-green-600" : "text-gray-400"}>
              10 characters minimum
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={updatePassword}
            className="bg-indigo-50 text-indigo-600 rounded-full px-6 py-2 disabled:opacity-50"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
// ...existing code...
