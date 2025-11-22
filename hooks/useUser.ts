// hooks/useUser.ts
"use client";

import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Example: Fetch user info from localStorage or API
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return { user, setUser };
}
