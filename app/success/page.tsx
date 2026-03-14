"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const MAX_PREVIEW_LENGTH = 350000;

export default function SuccessPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    try {
      const url = sessionStorage.getItem("postcard_sent_url");
      const sent = sessionStorage.getItem("postcard_sent");
      if (url && url.length < MAX_PREVIEW_LENGTH) {
        setImageUrl(url);
      } else if (sent) {
        setImageUrl("");
      }
    } catch {
      setImageUrl("");
    }
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen px-4 pt-10 pb-28 flex items-center justify-center">
        <p className="text-ink-600/80">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pt-10 pb-28">
      <div className="mx-auto w-full max-w-[420px]">
        <header className="flex items-center justify-between">
          <Link href="/" className="icon-btn" aria-label="Home">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link href="/create" className="icon-btn" aria-label="Create another">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </header>

        <section className="mt-6 card text-center space-y-3">
          <div className="mx-auto h-14 w-14 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,178,125,0.75),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(168,220,255,0.7),transparent_55%),linear-gradient(135deg,rgba(255,202,183,0.95),rgba(186,236,208,0.95))] border border-white/55" />
          <h1 className="font-display text-2xl font-semibold text-ink-900">
            Your postcard has been sent!
          </h1>
          <p className="text-sm text-ink-600/80">They&apos;ll receive it soon.</p>
        </section>

        {imageUrl && imageUrl.length > 0 && (
          <section className="mt-6 card p-5">
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">
              Preview
            </h2>
            <div className="rounded-[22px] overflow-hidden bg-white/40 aspect-[4/3] relative border border-white/45 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Your postcard"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        )}

        <div className="mt-6">
            <Link href="/create" className="btn-primary w-full">
              Create another
            </Link>
        </div>
      </div>

      <footer className="fixed left-0 right-0 bottom-6 py-1 text-center pointer-events-none">
        <p className="text-[11px] text-ink-600/60">Made by Arria Zhang</p>
      </footer>
    </main>
  );
}
