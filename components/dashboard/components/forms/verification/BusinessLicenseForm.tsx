"use client";
import { useState } from "react";

export default function PersonalDetailsForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
  });

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center">Personal Details</h2>
      <p className="text-gray-500 text-center mb-6">
        Let’s start with the basics
      </p>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First name"
          className="border rounded-lg p-3"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last name"
          className="border rounded-lg p-3"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
      </div>

      <input
        type="email"
        placeholder="Email address"
        className="border rounded-lg p-3 w-full mt-4"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="border rounded-lg p-3 w-full mt-4"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <select
        className="border rounded-lg p-3 w-full mt-4"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      >
        <option value="">Select position</option>
        <option value="CEO">CEO</option>
        <option value="Manager">Manager</option>
        <option value="Staff">Staff</option>
      </select>

      <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg">
        Verify Email, Phone & Continue
      </button>
    </div>
  );
}
