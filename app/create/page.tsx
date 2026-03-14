"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { applyPostcardFilter } from "../../lib/postcardFilter";

type Step = "upload" | "generating" | "form";

export default function CreatePage() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    recipientName: "",
    recipientEmail: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.).");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setGeneratedImageUrl(null);
  }, [previewUrl]);

  const handleGenerate = useCallback(async () => {
    if (!file) {
      setError("Please upload a photo first.");
      return;
    }
    setError(null);
    setStep("generating");
    try {
      const dataUrl = await applyPostcardFilter(file);
      setGeneratedImageUrl(dataUrl);
      setStep("form");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate. Try another image.");
      setStep("upload");
    }
  }, [file]);

  const handleRegenerate = useCallback(() => {
    setStep("generating");
    setError(null);
    handleGenerate();
  }, [handleGenerate]);

  const handleStartOver = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setGeneratedImageUrl(null);
    setStep("upload");
    setError(null);
    setFormData({
      senderName: "",
      senderEmail: "",
      recipientName: "",
      recipientEmail: "",
      message: "",
    });
  }, [previewUrl]);

  const handleSend = useCallback(async () => {
    if (!generatedImageUrl) return;
    const trimmedEmail = formData.recipientEmail.trim();
    if (!trimmedEmail) {
      setSendError("Please enter the recipient email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setSendError("Please enter a valid recipient email address.");
      return;
    }
    setSendError(null);
    setSending(true);
    try {
      const res = await fetch("/api/send-postcard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...(generatedImageUrl.startsWith("data:")
            ? { postcardImageDataUrl: generatedImageUrl }
            : { postcardImageUrl: generatedImageUrl }),
        }),
      });
      const text = await res.text();
      let data: { error?: string };
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setSendError("Send failed. Please check your connection and try again.");
        return;
      }
      if (!res.ok) throw new Error(data.error || "Send failed.");
      if (typeof window !== "undefined") {
        if (generatedImageUrl.length < 400000) {
          sessionStorage.setItem("postcard_sent_url", generatedImageUrl);
        } else {
          sessionStorage.setItem("postcard_sent", "1");
        }
      }
      window.location.href = "/success";
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Send failed. Please try again.");
    } finally {
      setSending(false);
    }
  }, [generatedImageUrl, formData]);

  return (
    <main className="min-h-screen px-4 pt-10 pb-28">
      <div className="mx-auto w-full max-w-[420px]">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="icon-btn" aria-label="Back">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18 9 12l6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <div className="space-y-0.5">
              <h1 className="font-display text-2xl font-semibold text-ink-900">
                Create postcard
              </h1>
              <p className="text-sm text-ink-600/80">
                Upload a photo · AI illustrates · Send by email
              </p>
            </div>
          </div>
          <Link href="/success" className="icon-btn" aria-label="Sent">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 8 12 13 2 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M2 8v10h20V8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </header>

        {step === "upload" && (
          <section className="mt-6 card space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="font-display text-xl font-semibold text-ink-900">
                  Upload your travel photo
                </h2>
                <p className="text-sm text-ink-600/80">
                  JPG/PNG · up to 10MB
                </p>
              </div>
              <span className="h-11 w-11 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,178,125,0.7),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(168,220,255,0.65),transparent_55%),linear-gradient(135deg,rgba(255,202,183,0.9),rgba(186,236,208,0.9))] border border-white/50" />
            </div>

            <div className="rounded-[22px] border border-white/50 bg-white/50 p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-ink-700 file:mr-4 file:py-2.5 file:px-4 file:rounded-[18px] file:border-0 file:bg-white/80 file:text-ink-800 file:font-medium hover:file:bg-white"
              />
              <p className="mt-2 text-xs text-ink-600/70">
                Tip: photos with clear landmarks work best.
              </p>
            </div>
            {previewUrl && (
              <div className="rounded-[22px] overflow-hidden bg-white/40 aspect-[4/3] relative border border-white/45 shadow-sm">
                <Image
                  src={previewUrl}
                  alt="Your photo"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            {error && (
              <p className="text-red-600 text-sm" role="alert">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!file}
              className="btn-primary w-full disabled:opacity-50"
            >
              Generate Postcard
            </button>
          </section>
        )}

        {step === "generating" && (
          <section className="mt-6 card text-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-ink-600/30 border-t-ink-700 animate-spin" />
              <p className="text-ink-600 font-medium">Creating your postcard...</p>
              <p className="text-sm text-ink-600/80">This may take a moment.</p>
            </div>
          </section>
        )}

        {step === "form" && generatedImageUrl && (
          <div className="mt-6 space-y-6">
            <section className="card">
              <h2 className="font-display text-xl font-semibold text-ink-800 mb-4">
                Your postcard (illustrated)
              </h2>
              <div className="rounded-[22px] overflow-hidden bg-white/40 aspect-[4/3] relative mb-5 border border-white/45 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={generatedImageUrl}
                  alt="Generated postcard"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="btn-secondary"
                >
                  Regenerate
                </button>
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="btn-secondary"
                >
                  Start Over
                </button>
              </div>
            </section>

            <section className="card space-y-4">
              <h2 className="font-display text-xl font-semibold text-ink-800">
                Send your postcard
              </h2>
              <p className="text-sm text-ink-600/80">
                The postcard will be sent to the <strong>recipient email</strong> below. Please double-check it.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={formData.senderName}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, senderName: e.target.value }))
                    }
                    className="input-field"
                    placeholder="e.g. Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Your email
                  </label>
                  <input
                    type="email"
                    value={formData.senderEmail}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, senderEmail: e.target.value }))
                    }
                    className="input-field"
                    placeholder="your@email.com"
                  />
                  <p className="mt-1 text-xs text-ink-600/70">Used for reply-to</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Recipient name
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, recipientName: e.target.value }))
                    }
                    className="input-field"
                    placeholder="e.g. John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Recipient email <span className="text-red-500">*required</span>
                  </label>
                  <input
                    type="email"
                    value={formData.recipientEmail}
                    onChange={(e) => {
                      setFormData((d) => ({ ...d, recipientEmail: e.target.value }));
                      setSendError(null);
                    }}
                    className="input-field"
                    placeholder="recipient@email.com"
                    required
                  />
                  <p className="mt-1 text-xs text-ink-600/70">Postcard will be sent here</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  Personal message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, message: e.target.value }))
                  }
                  className="input-field min-h-[120px] resize-y"
                  placeholder="Write a message for them…"
                  rows={4}
                />
              </div>
              {sendError && (
                <p className="text-red-600 text-sm" role="alert">
                  {sendError}
                </p>
              )}
              <button
                type="button"
                onClick={handleSend}
                disabled={sending || !formData.recipientEmail.trim()}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "Sending…" : "Send postcard"}
              </button>
            </section>
          </div>
        )}
      </div>

      <nav className="bottom-nav" aria-label="Bottom navigation">
        <div className="grid grid-cols-4 gap-2">
          <Link href="/" className="flex flex-col items-center gap-1 text-ink-700/80">
            <span className="icon-btn h-10 w-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-[11px] font-medium">Home</span>
          </Link>
          <button className="flex flex-col items-center gap-1 text-ink-700/80">
            <span className="icon-btn h-10 w-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            </span>
            <span className="text-[11px] font-medium">Explore</span>
          </button>
          <div className="flex flex-col items-center gap-1 text-ink-900">
            <span className="icon-btn h-10 w-10 bg-white/85">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="text-[11px] font-medium">Create</span>
          </div>
          <button className="flex flex-col items-center gap-1 text-ink-700/80">
            <span className="icon-btn h-10 w-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            </span>
            <span className="text-[11px] font-medium">Profile</span>
          </button>
        </div>
      </nav>

      <footer className="fixed left-0 right-0 bottom-24 py-1 text-center pointer-events-none">
        <p className="text-[11px] text-ink-600/60">Made by Arria Zhang</p>
      </footer>
    </main>
  );
}
