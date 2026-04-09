"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageUpload({
  name,
  currentUrl,
  label = "Image",
  hint,
  accept = "image/*",
}: {
  name: string;
  currentUrl?: string | null;
  label?: string;
  hint?: string;
  accept?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File | null) => {
    if (!file) {
      setPreview(null);
      setFileName(null);
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFile(e.target.files?.[0] ?? null);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      // Update the input element
      const dt = new DataTransfer();
      dt.items.add(file);
      if (inputRef.current) inputRef.current.files = dt.files;
      handleFile(file);
    }
  }

  function clearFile() {
    setPreview(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const showPreview = preview || currentUrl;

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>

      {showPreview && (
        <div className="relative inline-block mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview ?? currentUrl ?? ""}
            alt="Preview"
            className="h-32 w-auto rounded-lg object-cover border border-kp-green-100"
          />
          {preview && (
            <button
              type="button"
              onClick={clearFile}
              className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 cursor-pointer transition-colors",
          dragging
            ? "border-kp-gold-500 bg-kp-gold-100/30"
            : "border-kp-green-100 hover:border-kp-green-700/40 hover:bg-kp-green-100/30"
        )}
      >
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
            dragging ? "bg-kp-gold-100 text-kp-gold-500" : "bg-kp-green-100 text-kp-green-700"
          )}
        >
          {dragging ? (
            <ImageIcon className="h-5 w-5" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
        </div>

        {fileName ? (
          <p className="text-sm text-kp-green-900 font-medium">{fileName}</p>
        ) : (
          <>
            <p className="text-sm text-kp-black/70">
              <span className="font-medium text-kp-green-800">Click to upload</span> or
              drag and drop
            </p>
            <p className="text-xs text-kp-black/50">PNG, JPG, WebP up to 10MB</p>
          </>
        )}

        <input
          ref={inputRef}
          name={name}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
      </div>

      {hint && <p className="text-xs text-kp-black/50 mt-1.5">{hint}</p>}
    </div>
  );
}
