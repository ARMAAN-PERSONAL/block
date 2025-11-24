import { useState } from "react";
import IssuePage from "./pages/IssuePage";
import VerifyPage from "./pages/VerifyPage";

export default function App() {
  const [page, setPage] = useState<"issue" | "verify">("issue");

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg via-[#050016] to-[#140014] text-gray-100 flex flex-col">
      {/* Top glow bar */}
      <div className="h-1 w-full bg-gradient-to-r from-neon-violet via-neon-red-strong to-neon-cyan shadow-neon-violet" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight neon-text">
              B-Lock • Academic Credential Chain
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
              Issue tamper-proof credentials and verify them on-chain with a single hash.
            </p>
          </header>

          {/* Page switch tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-full bg-gradient-to-r from-[#1a1030] to-[#2a0814] border border-[#312e81] shadow-neon-soft">
              <button
                type="button"
                className={`px-5 py-2.5 text-sm sm:text-base rounded-full transition
                  ${page === "issue"
                    ? "bg-gradient-to-r from-neon-violet to-neon-red text-white shadow-neon-violet"
                    : "text-gray-400 hover:text-gray-100"
                  }`}
                onClick={() => setPage("issue")}
              >
                Issue Credential
              </button>

              <button
                type="button"
                className={`px-5 py-2.5 text-sm sm:text-base rounded-full transition
                  ${page === "verify"
                    ? "bg-gradient-to-r from-neon-violet-soft to-neon-cyan text-white shadow-neon-soft"
                    : "text-gray-400 hover:text-gray-100"
                  }`}
                onClick={() => setPage("verify")}
              >
                Verify Credential
              </button>
            </div>
          </div>

          {/* Page container */}
          <section className="bg-bg-elevated/70 border border-[#312e81] rounded-2xl p-5 sm:p-7 shadow-neon-soft backdrop-blur-md card-hover">
            {page === "issue" ? <IssuePage /> : <VerifyPage />}
          </section>

          {/* Footer / small note */}
          <footer className="mt-6 text-center text-xs text-gray-500">
            Powered by Ethereum • Prototype build for academic credential verification.
          </footer>
        </div>
      </main>
    </div>
  );
}
