"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../../ui/Input";

type Social = { id: string; label: string; value: string; placeholder: string };

type Props = {
  embedded?: boolean;
  initial?: Social[] | Record<string, string>;
  onSaveDraft?: (values: Record<string, any>) => Promise<any> | void;
  onNext?: (values: Record<string, any>) => Promise<any> | void;
};

export default function SocialMediaForm({
  embedded = false,
  initial = undefined,
  onSaveDraft,
  onNext,
}: Props) {
  const normalizeInitial = (i?: Social[] | Record<string, string>) => {
    if (!i) return undefined;
    if (Array.isArray(i)) return i;
    // convert object shape -> array
    return Object.entries(i).map(([k, v]) => ({
      id: k,
      label: k[0].toUpperCase() + k.slice(1),
      value: v,
      placeholder: `e.g. https://...`,
    }));
  };

  const [handles, setHandles] = useState<Social[]>(
    normalizeInitial(initial) ?? [
      {
        id: "facebook",
        label: "Facebook",
        value: "",
        placeholder: "e.g. www.facebook.com/nochance",
      },
      {
        id: "instagram",
        label: "Instagram",
        value: "",
        placeholder: "e.g. www.instagram.com/nochance",
      },
      {
        id: "telegram",
        label: "Telegram",
        value: "",
        placeholder: "e.g. www.telegram.com/nochance",
      },
      {
        id: "whatsapp",
        label: "Whatsapp",
        value: "",
        placeholder: "e.g. wa.me/+2348161790418",
      },
    ]
  );

  // safe merge of incoming initial (avoid update loops)
  useEffect(() => {
    const ni = normalizeInitial(initial);
    if (!ni) return;
    // shallow compare by id/value
    if (
      ni.length === handles.length &&
      ni.every(
        (h, i) => h.value === handles[i]?.value && h.id === handles[i]?.id
      )
    )
      return;
    setHandles(ni);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const addMore = () =>
    setHandles((s) => [
      ...s,
      {
        id: `${Date.now()}`,
        label: "Other",
        value: "",
        placeholder: "e.g. https://...",
      },
    ]);

  const update = (index: number, value: string) =>
    setHandles((s) => s.map((h, i) => (i === index ? { ...h, value } : h)));

  const remove = (index: number) =>
    setHandles((s) => s.filter((_, i) => i !== index));

  const saveDraftLocal = async () => {
    const payload = handles.reduce<Record<string, string>>((acc, h) => {
      if (h.value && h.value.trim()) acc[h.id] = h.value.trim();
      return acc;
    }, {});
    await onSaveDraft?.(payload);
    return payload;
  };

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    try {
      const payload = await saveDraftLocal();

      // persist to API (adjust path if needed)
      await fetch("/api/v1/verification/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "social", values: payload }),
      });

      await onNext?.(payload);
    } catch (err) {
      console.error("SocialMediaForm submit error:", err);
    }
  };

  const onSaveClick = async () => {
    try {
      await saveDraftLocal();
    } catch (err) {
      console.error("SocialMediaForm save error:", err);
    }
  };

  return (
    <div
      className={
        embedded ? "" : "min-h-screen bg-gray-50 py-12 px-6 flex justify-center"
      }
    >
      <div className={embedded ? "w-full" : "w-full max-w-2xl"}>
        {!embedded && (
          <div className="flex items-center justify-between mb-6">
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <button
              onClick={onSaveClick}
              className="text-sm text-purple-600 hover:underline"
            >
              Save & finish later
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow py-10 px-8">
          {!embedded && (
            <div className="text-center mb-6">
              <div className="text-xs text-gray-400 mb-2">Step 2 of 5</div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Social Media handles
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Add your key social accounts (Instagram, X/Twitter, TikTok,
                YouTube, etc.)
              </p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            {handles.map((h, i) => (
              <div key={h.id} className="flex items-start gap-3">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {h.label}
                  </label>
                  <Input
                    type="text"
                    placeholder={h.placeholder}
                    value={h.value}
                    onChange={(e) => update(i, e.target.value)}
                  />
                </div>

                {i >= 4 && (
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="mt-6 text-sm text-red-500 hover:underline"
                    aria-label={`Remove ${h.label}`}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addMore}
              className="flex items-center text-purple-600 text-sm hover:underline"
            >
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14M5 12h14"
                />
              </svg>
              Add more
            </button>

            <div className="flex justify-center mt-4 gap-3">
              <button
                type="button"
                onClick={onSaveClick}
                className="px-4 py-2 border rounded-md"
              >
                Save draft
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-sm"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
