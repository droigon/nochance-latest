"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Input, Textarea } from "../../ui";

type Props = {
  initial?: Record<string, any>;
  onContinue?: (values: Record<string, any>) => Promise<any>;
};

export default function PersonalDetailsForm({
  initial = {},
  onContinue,
}: Props) {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    address: "",
    ...initial,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial && Object.keys(initial).length > 0) {
      setForm((prev) => ({ ...prev, ...initial }));
    }
  }, [initial]);

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = useCallback(async () => {
    if (submitting || !onContinue) return;
    setSubmitting(true);
    await onContinue(form);
    setSubmitting(false);
  }, [form, onContinue, submitting]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-900">
        Personal Details
      </h2>
      <p className="text-sm text-gray-500 text-center mt-2 mb-6">
        Let’s start with the basics
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <Input
            type="text"
            placeholder="Enter your first name"
            value={form.firstname}
            onChange={(e) => handleChange("firstname", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <Input
            type="text"
            placeholder="Enter your last name"
            value={form.lastname}
            onChange={(e) => handleChange("lastname", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={form.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Full Address
        </label>
        <Textarea
          rows={3}
          placeholder="Enter your full address"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 shadow-md disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
