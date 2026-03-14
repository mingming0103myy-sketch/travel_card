import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 pt-10 pb-28">
      <div className="mx-auto w-full max-w-[420px]">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-ink-600/80">Good morning</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900">
              Where to next?
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="icon-btn" aria-label="Notifications">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22a2.25 2.25 0 0 0 2.2-1.8h-4.4A2.25 2.25 0 0 0 12 22Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                <path
                  d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="icon-btn" aria-label="Profile">
              <div className="h-7 w-7 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffd6aa,transparent_55%),radial-gradient(circle_at_70%_70%,#a8dcff,transparent_55%),linear-gradient(135deg,#ffcab7,#c2f1dd)]" />
            </button>
          </div>
        </header>

        <div className="mt-6 search">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-ink-600/70"
            aria-hidden="true"
          >
            <path
              d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M16.2 16.2 21 21"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <input
            className="w-full bg-transparent outline-none text-ink-800 placeholder:text-ink-600/50"
            placeholder="Search destinations, trips, postcards…"
            aria-label="Search"
          />
          <button className="icon-btn h-10 w-10" aria-label="Filters">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7h10M4 17h16M14 7l2-2 2 2M8 17l2-2 2 2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-ink-900">
              Inspiration
            </h2>
            <Link href="/create" className="text-sm font-medium text-ink-700">
              Create postcard →
            </Link>
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
            <Link
              href="/create"
              className="card min-w-[280px] p-5 border-0 shadow-postcard bg-white/75"
              aria-label="Turn your photo into a postcard"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="inline-flex items-center gap-2 text-xs font-medium text-ink-700/80">
                    <span className="h-2 w-2 rounded-full bg-[#ffb27d]" />
                    AI Postcard
                  </p>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-ink-900">
                    Turn photos into cute postcards
                  </h3>
                  <p className="text-sm text-ink-600/80">
                    Upload → generate → email to someone special.
                  </p>
                </div>
                <span className="icon-btn shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17 17 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <div className="mt-5 rounded-[20px] bg-[linear-gradient(135deg,rgba(255,178,125,0.35),rgba(168,220,255,0.30),rgba(186,236,208,0.35))] p-4">
                <svg
                  viewBox="0 0 320 140"
                  className="h-[96px] w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0" y="0" width="320" height="140" rx="18" fill="rgba(255,255,255,0.35)" />
                  <circle cx="72" cy="54" r="18" fill="#a8dcff" opacity="0.9" />
                  <path d="M38 122c28-34 58-52 90-54 32-2 56 12 76 28 22 18 40 28 78 26v0H38Z" fill="#b8f0d4" opacity="0.9" />
                  <path d="M0 124c42-22 78-34 114-32 36 2 58 18 82 30 28 14 58 18 124 10v8H0Z" fill="#ffcab7" opacity="0.85" />
                  <g transform="translate(206 20)">
                    <path d="M30 8c-12 0-22 6-22 14s10 14 22 14 22-6 22-14S42 8 30 8Z" fill="#ffb27d"/>
                    <path d="M30 14c-8 0-14 4-14 8s6 8 14 8 14-4 14-8-6-8-14-8Z" fill="#ffd6aa"/>
                    <path d="M30 36c-7 0-12 4-12 10 0 8 12 22 12 22s12-14 12-22c0-6-5-10-12-10Z" fill="#a8dcff"/>
                    <rect x="26.5" y="42" width="7" height="10" rx="3.5" fill="#ffffff" opacity="0.7"/>
                  </g>
                </svg>
              </div>
            </Link>

            <div className="card min-w-[220px] p-5 bg-white/65">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink-800">Hot air balloon</p>
                <span className="h-9 w-9 rounded-full bg-[#ffcab7]/60 border border-white/50" />
              </div>
              <div className="mt-4 rounded-[20px] bg-[#ffcab7]/45 p-4">
                <svg
                  viewBox="0 0 220 120"
                  className="h-[92px] w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="110" cy="52" r="34" fill="#ffb27d" />
                  <circle cx="96" cy="46" r="10" fill="#ffd6aa" opacity="0.9" />
                  <path d="M92 86c12-10 24-10 36 0-3 10-10 18-18 18s-15-8-18-18Z" fill="#a8dcff" />
                  <rect x="102" y="92" width="16" height="10" rx="3" fill="#ffffff" opacity="0.75"/>
                  <path d="M50 112c18-16 40-24 66-22 26 2 44 14 62 22H50Z" fill="#b8f0d4" opacity="0.9" />
                </svg>
              </div>
              <p className="mt-3 text-xs text-ink-600/75">
                Pastel skies & soft vibes.
              </p>
            </div>

            <div className="card min-w-[220px] p-5 bg-white/65">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink-800">Snowy escape</p>
                <span className="h-9 w-9 rounded-full bg-[#a8dcff]/55 border border-white/50" />
              </div>
              <div className="mt-4 rounded-[20px] bg-[#a8dcff]/40 p-4">
                <svg
                  viewBox="0 0 220 120"
                  className="h-[92px] w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="170" cy="34" r="14" fill="#ffd6aa" opacity="0.9" />
                  <path d="M30 110 82 50l28 34 18-22 62 48H30Z" fill="#ffffff" opacity="0.85"/>
                  <path d="M30 110 82 54l28 34 18-22 62 44v10H30Z" fill="#b8f0d4" opacity="0.55"/>
                  <circle cx="62" cy="38" r="3" fill="#ffffff" opacity="0.9"/>
                  <circle cx="86" cy="26" r="2" fill="#ffffff" opacity="0.9"/>
                  <circle cx="104" cy="38" r="2.5" fill="#ffffff" opacity="0.9"/>
                </svg>
              </div>
              <p className="mt-3 text-xs text-ink-600/75">
                Cozy, clean, and bright.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-7">
          <h2 className="font-display text-xl font-semibold text-ink-900">
            Quick picks
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="chip">Mountains</button>
            <button className="chip">City walks</button>
            <button className="chip">Beach</button>
            <button className="chip">Snow</button>
            <button className="chip">Balloon</button>
          </div>
        </section>
      </div>

      <nav className="bottom-nav" aria-label="Bottom navigation">
        <div className="grid grid-cols-4 gap-2">
          <button className="flex flex-col items-center gap-1 text-ink-900">
            <span className="icon-btn h-10 w-10 bg-white/85">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-[11px] font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-ink-700/80">
            <span className="icon-btn h-10 w-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            </span>
            <span className="text-[11px] font-medium">Explore</span>
          </button>
          <Link
            href="/create"
            className="flex flex-col items-center gap-1 text-ink-700/80"
          >
            <span className="icon-btn h-10 w-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="text-[11px] font-medium">Create</span>
          </Link>
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
