import { useState } from "react";
import IssuePage from "./pages/IssuePage";
import VerifyPage from "./pages/VerifyPage";

export default function App() {
  const [page, setPage] = useState<"issue" | "verify">("issue");

  return (
    <div className="min-h-screen bg-discord-dark text-discord-text flex flex-col relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[400px] -left-[200px] w-[800px] h-[800px] rounded-full bg-blurple/10 blur-[120px]" />
        <div className="absolute -top-[300px] -right-[200px] w-[600px] h-[600px] rounded-full bg-discord-fuchsia/10 blur-[120px]" />
        <div className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-discord-cyan/5 blur-[100px]" />
      </div>

      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blurple via-discord-fuchsia to-discord-cyan relative z-10" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 relative z-10">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <header className="mb-10 text-center">
            {/* Logo/Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blurple via-blurple-light to-discord-fuchsia mb-6 shadow-discord-glow-strong">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text">B-Lock</span>
              <span className="text-discord-text"> • Academic Credential Chain</span>
            </h1>
            <p className="text-base sm:text-lg text-discord-text-muted max-w-2xl mx-auto">
              Issue tamper-proof credentials and verify them on-chain with a single hash.
              <span className="text-blurple-soft"> Powered by blockchain technology.</span>
            </p>
          </header>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-discord-card border border-discord-border shadow-discord-elevated">
              <button
                type="button"
                className={`
                  relative px-6 py-3 text-sm sm:text-base font-medium rounded-xl
                  transition-all duration-300 ease-out
                  ${page === "issue"
                    ? "text-white"
                    : "text-discord-text-muted hover:text-discord-text"
                  }
                `}
                onClick={() => setPage("issue")}
              >
                {page === "issue" && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blurple to-discord-fuchsia rounded-xl shadow-discord-glow" />
                )}
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Issue Credential
                </span>
              </button>

              <button
                type="button"
                className={`
                  relative px-6 py-3 text-sm sm:text-base font-medium rounded-xl
                  transition-all duration-300 ease-out
                  ${page === "verify"
                    ? "text-white"
                    : "text-discord-text-muted hover:text-discord-text"
                  }
                `}
                onClick={() => setPage("verify")}
              >
                {page === "verify" && (
                  <span className="absolute inset-0 bg-gradient-to-r from-discord-cyan to-blurple rounded-xl shadow-discord-glow" />
                )}
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Verify Credential
                </span>
              </button>
            </div>
          </div>

          {/* Main Content Card */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 shadow-discord-card hover-lift">
            {page === "issue" ? <IssuePage /> : <VerifyPage />}
          </section>

          {/* Footer */}
          <footer className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-discord-card/50 border border-discord-border/50">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-discord-green animate-pulse" />
                <span className="text-xs text-discord-text-muted">Live on Ethereum</span>
              </div>
              <span className="text-discord-border">•</span>
              <span className="text-xs text-discord-text-faint">
                Prototype build for academic credential verification
              </span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}