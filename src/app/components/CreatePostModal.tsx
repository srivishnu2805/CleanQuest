"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { createPost } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";

const CreatePostModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [step, setStep] = useState<"upload" | "caption">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImg(e.target?.result as string);
      setStep("caption");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!desc.trim()) return;
    setIsPosting(true);
    try {
      const result = await createPost({ desc: desc.trim(), img });
      if (result.success) {
        setDesc("");
        setImg(null);
        setStep("upload");
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  };

  const handleClose = () => {
    setDesc("");
    setImg(null);
    setStep("upload");
    onClose();
  };

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm" onClick={handleClose}>
      <div
        className="rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-y-auto shadow-2xl animate-fade-in-scale relative"
        style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ borderBottom: "1px solid var(--border-color)" }}>
          {step === "caption" ? (
            <button onClick={() => { setStep("upload"); setImg(null); }} className="transition hover:opacity-70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }}>
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
          ) : (
            <div className="w-5" />
          )}
          <h2 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Create new post</h2>
          {step === "caption" ? (
            <button
              onClick={handleSubmit}
              disabled={isPosting || !desc.trim()}
              className="font-bold text-sm transition hover:opacity-70 disabled:opacity-30"
              style={{ color: "var(--green-primary)" }}
            >
              {isPosting ? "Sharing..." : "Share"}
            </button>
          ) : (
            <button onClick={handleClose} className="transition hover:opacity-70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-tertiary)" }}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {step === "upload" ? (
          /* Upload Step */
          <div
            className={`flex flex-col items-center justify-center p-12 transition-colors ${dragActive ? "bg-emerald-500/5" : ""}`}
            style={{ minHeight: "380px" }}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          >
            <div className="mb-6">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-tertiary)" }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p className="text-lg font-medium mb-2" style={{ color: "var(--text-primary)" }}>
              Drag photos here
            </p>
            <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
              or click the button below to select
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition shadow-lg shadow-emerald-500/20"
            >
              Select from computer
            </button>
            <button
              onClick={() => setStep("caption")}
              className="mt-4 text-sm font-medium transition hover:opacity-70"
              style={{ color: "var(--text-tertiary)" }}
            >
              Skip — post without image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
            />
          </div>
        ) : (
          /* Caption Step */
          <div className="flex flex-col md:flex-row" style={{ minHeight: "380px" }}>
            {/* Image Preview */}
            {img && (
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto flex-shrink-0" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                <Image src={img} fill className="object-cover" alt="Preview" />
              </div>
            )}

            {/* Caption Area */}
            <div className={`flex flex-col flex-1 ${img ? "" : "w-full"}`}>
              {/* User */}
              <div className="flex items-center gap-3 p-4 pb-2">
                <Image
                  src={user?.imageUrl || "/noAvatar.png"}
                  alt=""
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  {user?.username || user?.firstName || "You"}
                </span>
              </div>

              {/* Caption Input */}
              <div className="flex-1 px-4">
                <textarea
                  placeholder="Write a caption about your sustainability action..."
                  className="w-full h-full outline-none resize-none text-sm bg-transparent min-h-[120px]"
                  style={{ color: "var(--text-primary)" }}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  maxLength={1000}
                  autoFocus
                />
              </div>

              {/* Character count */}
              <div className="px-4 pb-4 flex items-center justify-between">
                <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                  🌿 Share your impact with the community
                </span>
                <span
                  className="text-[11px] font-mono"
                  style={{ color: desc.length > 900 ? "#ef4444" : "var(--text-tertiary)" }}
                >
                  {desc.length}/1000
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CreatePostModal;
