import React, { useRef, useState, useCallback, useEffect } from "react";
import { X, FileText, Upload } from "lucide-react";

interface UploadedFile {
  name: string;
  size: number;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
}

interface EvidenceUploadProps {
  value?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
}

export default function EvidenceUpload({
  value = [],
  onChange,
}: EvidenceUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>(value);
  const [isDragging, setIsDragging] = useState(false);

  // Sync parent → local
  useEffect(() => {
    setFiles(value);
  }, [value]);

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const validFiles = Array.from(fileList).filter((file) =>
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type)
      );

      const newFiles = validFiles.map((file) => ({
        name: file.name,
        size: Math.round(file.size / 1024 / 1024), // MB
        progress: 0,
        status: "pending" as const,
      }));

      const updatedFiles = [...files, ...newFiles].slice(0, 3); // limit 3
      setFiles(updatedFiles);
      onChange?.(updatedFiles); // 🔥 notify parent
    },
    [files, onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange?.(updated); // 🔥 notify parent
  };

  const openFileDialog = () => fileInputRef.current?.click();

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-700">
        Upload any evidence you have.{" "}
        <span className="text-gray-500">
          This helps us investigate your report more effectively.
        </span>
      </label>

      {/* Upload area */}
      <div
        onClick={openFileDialog}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`cursor-pointer border-2 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors duration-200 ${
          isDragging
            ? "border-violet-400 bg-violet-50"
            : "border-gray-300 hover:border-violet-300"
        }`}
      >
        <Upload className="w-7 h-7 text-gray-500 mb-2" />
        <p className="text-sm font-medium text-gray-700">
          Click or drag files to upload
        </p>
        <p className="text-xs text-gray-400">
          File type JPG, PNG, PDF (max 5mb, up to 3 files)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="truncate text-sm">{file.name}</span>
                <span className="text-gray-500 text-xs shrink-0">
                  ({file.size}mb)
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="ml-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
