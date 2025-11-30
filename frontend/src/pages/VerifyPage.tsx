import { useState } from "react";
import api from "../api";

export default function VerifyPage() {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    const clean = hash.trim().toLowerCase();
    if (!clean) return;

    try {
      setLoading(true);
      setResult(null);

      const resp = await api.get(`/verify/${clean}`);
      setResult(resp.data);
    } catch (err) {
      console.error("VERIFY ERROR:", err);
      setResult({ verified: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-discord-cyan to-blurple flex items-center justify-center shadow-discord-glow">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          Verify Credential
        </h2>
        <p className="text-discord-text-muted">
          Paste the stored transaction hash to confirm if a credential exists on-chain.
        </p>
      </div>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-discord-text-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            className="w-full pl-12 pr-4 py-3.5 rounded-xl font-mono text-sm
                       bg-discord-darker border border-discord-border
                       text-discord-text placeholder-discord-text-faint
                       focus:outline-none focus:border-blurple focus:ring-2 focus:ring-blurple/30
                       transition-all duration-200"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="0xabc123..."
            onKeyDown={(e) => e.key === "Enter" && verify()}
          />
        </div>

        <button
          onClick={verify}
          disabled={loading || !hash.trim()}
          className={`
            px-8 py-3.5 rounded-xl font-semibold text-white
            transition-all duration-300 ease-out flex items-center justify-center gap-2
            ${loading || !hash.trim()
              ? "bg-discord-border cursor-not-allowed opacity-50"
              : "bg-gradient-to-r from-discord-cyan to-blurple hover:shadow-discord-glow-strong hover:scale-[1.02] active:scale-[0.98]"
            }
          `}
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Verify
            </>
          )}
        </button>
      </div>

      {/* Result Card */}
      {result && (
        <div className={`
          rounded-xl border p-6 transition-all duration-300
          ${result.verified
            ? "border-discord-green/50 bg-discord-green/5 shadow-discord-green-glow"
            : "border-discord-red/50 bg-discord-red/5 shadow-discord-red-glow"
          }
        `}>
          {result.verified ? (
            <div className="space-y-5">
              {/* Success Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-discord-green/20">
                <div className="w-12 h-12 rounded-full bg-discord-green/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-discord-green-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-discord-green-light">
                    Credential Verified
                  </h3>
                  <p className="text-sm text-discord-text-muted">
                    This credential exists on the blockchain
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
                    Student
                  </span>
                  <p className="text-discord-text font-semibold text-lg">
                    {result.studentName}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
                    Program
                  </span>
                  <p className="text-discord-text font-semibold text-lg">
                    {result.program}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
                  Issuer / Wallet
                </span>
                <p className="font-mono text-sm text-discord-text-muted break-all bg-discord-darker/50 px-3 py-2 rounded-lg">
                  {result.wallet}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
                  File Hash
                </span>
                <p className="font-mono text-sm text-blurple-light break-all bg-discord-darker/50 px-3 py-2 rounded-lg">
                  {result.fileHashHex}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
                    Transaction Hash
                  </span>
                  <p className="font-mono text-sm text-discord-cyan break-all bg-discord-darker/50 px-3 py-2 rounded-lg">
                    {result.txHash}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
                    Issued At
                  </span>
                  <p className="text-discord-text bg-discord-darker/50 px-3 py-2 rounded-lg">
                    {new Date(result.issuedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-discord-red/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-discord-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-discord-red-light">
                  Credential Not Found
                </h3>
                <p className="text-discord-text-muted mt-1">
                  No on-chain record exists for this hash. Please verify the hash value or confirm that the credential has been issued.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!result && !loading && (
        <div className="text-center py-12 px-6 rounded-xl border border-dashed border-discord-border bg-discord-card/30">
          <div className="w-16 h-16 rounded-full bg-discord-card mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-discord-text-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-discord-text mb-1">
            Ready to Verify
          </h3>
          <p className="text-discord-text-muted text-sm">
            Enter a transaction hash above to check if a credential exists on-chain
          </p>
        </div>
      )}
    </div>
  );
}