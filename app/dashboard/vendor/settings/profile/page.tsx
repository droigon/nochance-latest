// ...existing code...
"use client";
import React, { useState } from "react";

export default function ProfileSettingsPage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Benny",
    lastName: "Mulla",
    email: "BennyMulla@nochance.com",
    phone: "+2348123456789",
    position: "CEO",
    businessName: "BMA Studio",
    businessCategory: "Photography",
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-800">
            Profile Settings
          </h2>
          <p className="text-sm text-gray-500">
            Manage your profile information
          </p>
        </div>
        <div>
          <button
            onClick={() => setEditing((s) => !s)}
            className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700"
          >
            {editing ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="space-y-2">
            <div className="text-xs text-gray-600">First name</div>
            <input
              disabled={!editing}
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-2">
            <div className="text-xs text-gray-600">Last name</div>
            <input
              disabled={!editing}
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div>
          <div className="text-xs text-gray-600 mb-2">Email address</div>
          <input
            disabled={!editing}
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <div className="text-xs text-gray-600 mb-2">Phone Number</div>
          <input
            disabled={!editing}
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <div className="text-xs text-gray-600 mb-2">Position in company</div>
          <select
            disabled={!editing}
            value={profile.position}
            onChange={(e) =>
              setProfile({ ...profile, position: e.target.value })
            }
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          >
            <option>CEO</option>
            <option>CTO</option>
            <option>Manager</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <div className="text-xs text-gray-600 mb-2">Business name</div>
          <input
            disabled={!editing}
            value={profile.businessName}
            onChange={(e) =>
              setProfile({ ...profile, businessName: e.target.value })
            }
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <div className="text-xs text-gray-600 mb-2">Category</div>
          <input
            disabled={!editing}
            value={profile.businessCategory}
            onChange={(e) =>
              setProfile({ ...profile, businessCategory: e.target.value })
            }
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
// ...existing code...
