"use client";

import { useChangePassword } from "@/hooks/settings/useChangePassword";

export default function ChangePasswordForm() {
  const {
    oldPassword,
    newPassword,
    confirmPassword,
    setField,
    loading,
    error,
    success,
    handleSubmit,
  } = useChangePassword();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md p-4 border rounded-xl shadow"
    >
      <h2 className="text-lg font-semibold">Change Password</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">Password updated!</p>}

      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setField("oldPassword", e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setField("newPassword", e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setField("confirmPassword", e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </form>
  );
}
