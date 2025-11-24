import { useState } from "react";
import { api } from "../lib/api";
import ResultCard from "../components/ResultCard";

export default function VerifyPage() {
  const [hash, setHash] = useState("");
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const go = async () => {
    try {
      setLoading(true);
      const clean = hash.trim().toLowerCase();

      // Basic bytes32 validation
      if (!clean.startsWith("0x") || clean.length !== 66) {
        setRes({ verified: false });
        return;
      }

      const r = await api.get(`/verify/${clean}`);
      console.log("VERIFY RESPONSE:", r.data);

      const normalized = {
        verified: r.data?.verified ?? r.data?.found ?? false,
        issuer: r.data?.issuer ?? r.data?.credential?.studentWallet ?? null,
        student: r.data?.student ?? r.data?.credential?.studentName ?? null,
        issuedAt: r.data?.issuedAt ?? r.data?.credential?.createdAt ?? null,
        raw: r.data,
      };

      setRes(normalized);
    } catch (err) {
      console.error("VERIFY ERROR:", err);
      setRes({ verified: false });
    } finally {
      setLoading(false);
    }
  };

  const disabled = !hash.trim() || loading;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1">
          Verify Credential
        </h2>
        <p className="text-sm text-gray-400">
          Paste the stored file hash to confirm if a credential exists on-chain
          and view metadata.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wide text-gray-400">
            Credential File Hash (bytes32)
          </label>
          <input
            className="w-full rounded-lg bg-[#0b0615] border border-[#312e81] px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 neon-focus font-mono"
            placeholder="0x…"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={go}
          disabled={disabled}
          className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium
            bg-gradient-to-r from-neon-violet-soft to-neon-cyan text-white
            shadow-neon-soft hover:shadow-neon-violet transition
            disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? "Checking…" : "Verify"}
        </button>
      </div>

      <div className="pt-2">
        {res && (
          <div className="space-y-4">
            <ResultCard
              ok={res.verified}
              issuer={res.issuer}
              student={res.student}
              issuedAt={res.issuedAt}
            />

            {/* Debug panel – keep for now */}
            <details className="rounded-xl bg-[#05000f] border border-[#272262] px-3 py-2 text-xs text-gray-300">
              <summary className="cursor-pointer text-[11px] text-gray-400 mb-1">
                Raw response (debug)
              </summary>
              <pre className="mt-2 max-w-full overflow-auto text-[11px] leading-snug">
                {JSON.stringify(res.raw, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
