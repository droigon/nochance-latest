// ...existing code...
"use client";
import React, { useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  fileName?: string;
};

const CHAR_LIMIT = 500;

export default function ProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
  };

  const addProduct = () => {
    if (!name.trim() || !description.trim()) return;
    const p: Product = {
      id: String(Date.now()),
      name: name.trim(),
      category,
      description: description.trim(),
      fileName: fileName ?? undefined,
    };
    setProducts((s) => [...s, p]);
    setName("");
    setCategory("");
    setDescription("");
    setFileName(null);
  };

  const removeProduct = (id: string) => {
    setProducts((s) => s.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    window.dispatchEvent(
      new CustomEvent("products:save", { detail: { products } })
    );
    alert("Progress saved");
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:underline"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Previous
          </button>

          <button
            onClick={handleSave}
            className="text-sm text-indigo-600 hover:underline"
          >
            Save &amp; finish later
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="text-sm text-gray-400 mb-2">Step 3 of 3</div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Products &amp; Services Catalog
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Tell us about the products or services your enterprise offers. This
            helps us understand your business better and provide tailored
            solutions.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Product Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <div className="text-sm text-gray-600">Product/Service Name</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product/service name"
                className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="space-y-2">
              <div className="text-sm text-gray-600">Category</div>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 bg-white pr-8 focus:outline-none"
                >
                  <option value="">Select category</option>
                  <option>Software</option>
                  <option>Consulting</option>
                  <option>Hardware</option>
                  <option>Other</option>
                </select>
                <svg
                  className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </label>
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2">Description</div>
            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.slice(0, CHAR_LIMIT))
              }
              placeholder="Describe your product or service, including key features and benefits"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 min-h-[110px] resize-none focus:outline-none"
            />
            <div className="text-xs text-gray-400 mt-2">
              {description.length}/{CHAR_LIMIT} characters
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm text-gray-600 mb-2">Product image</div>
            <label className="flex items-center gap-3 border border-gray-200 rounded-md px-4 py-3 bg-white cursor-pointer hover:bg-gray-50">
              <svg
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 5v14M5 12h14"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-sm text-gray-600">
                <div className="font-medium">Click to upload</div>
                <div className="text-xs text-gray-400">
                  File type PDF or image (max 5mb)
                </div>
              </div>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={handleFile}
                className="hidden"
              />
            </label>
            {fileName && (
              <div className="mt-2 text-xs text-gray-500">
                Selected: {fileName}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center mt-6">
          <button
            onClick={addProduct}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-50"
            aria-label="Add product"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M12 5v14M5 12h14"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add product/service
          </button>
          <div className="text-xs text-gray-400 mt-2">
            At least one product/service
          </div>
        </div>

        {products.length > 0 && (
          <div className="mt-6 bg-white border border-gray-100 rounded-lg p-4 space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-start justify-between gap-4"
              >
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {p.category || "Unspecified"}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {p.description}
                  </div>
                  {p.fileName && (
                    <div className="text-xs text-gray-400 mt-1">
                      File: {p.fileName}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeProduct(p.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            disabled={products.length === 0}
            className={`rounded-full px-8 py-2 text-white font-medium ${
              products.length === 0
                ? "bg-indigo-100 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
