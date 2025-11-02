"use client";
import { useEffect, useState } from "react";

interface PremblyWidgetProps {
  email: string;
  firstName: string;
  lastName: string;
  userRef: string;
  configId: string; // different for Personal, Identity, Business
}

export default function PremblyWidget({
  email,
  firstName,
  lastName,
  userRef,
  configId,
}: PremblyWidgetProps) {
  const [widgetId, setWidgetId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWidget() {
      const res = await fetch("/api/prembly/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, userRef, configId }),
      });
      const data = await res.json();
      setWidgetId(data.widgetId);
    }
    fetchWidget();
  }, [email, firstName, lastName, userRef, configId]);

  if (!widgetId) return <p>Loading verification widget...</p>;

  return (
    <iframe
      src={`https://checker.prembly.com/sdk/widget/${widgetId}`}
      width="100%"
      height="600px"
      allow="camera; microphone"
      className="rounded-lg border shadow"
    />
  );
}
