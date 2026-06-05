"use client";
import { useState, useRef } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import Image from "next/image";

interface FeaturedImageProps {
  url: string;
  alt: string;
  onUrlChange: (url: string) => void;
  onAltChange: (alt: string) => void;
}

export function FeaturedImageUpload({ url, alt, onUrlChange, onAltChange }: FeaturedImageProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) onUrlChange(data.url);
    setUploading(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">
      {url ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={alt || "Featured"} className="w-full h-64 object-cover" />
          <button
            type="button"
            onClick={() => onUrlChange("")}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-gray-600 hover:text-[#EF3C36] transition-colors"
          >
            <FiX size={14} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-[#F15C20] hover:bg-orange-50 transition-colors"
        >
          <FiUpload className="mx-auto text-gray-400 mb-2" size={20} />
          <p className="text-xs text-gray-500">
            {uploading ? "Uploading..." : "Click or drag to upload featured image"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WebP, GIF</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {/* Alt text */}
      {url && (
        <input
          type="text"
          value={alt}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Alt text (for accessibility & SEO)"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#F15C20] focus:ring-1 focus:ring-[#F15C20]"
        />
      )}
    </div>
  );
}
