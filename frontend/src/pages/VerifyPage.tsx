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
    <div className="p-8 max-w-3xl mx-auto text-white">

      <h1 className="text-3xl font-bold mb-6">Verify Credential</h1>

      <p className="mb-6 text-gray-300">
        Paste the stored transaction hash to confirm if a credential exists.
      </p>

      {/* Input */}
      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 w-full rounded bg-black text-white border-gray-600"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="0xabc..."
        />

        <button
          onClick={verify}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded">

          {result.verified ? (
            <div>
              <div className="text-green-400 font-semibold mb-3">
                ✅ Credential Verified
              </div>

              <div className="mb-2">Student: <b>{result.studentName}</b></div>
              <div className="mb-2">Program: <b>{result.program}</b></div>
              <div className="mb-2">
                Issuer / Wallet: <b>{result.wallet}</b>
              </div>
              <div className="mb-2">
                File Hash: <b>{result.fileHashHex}</b>
              </div>
              <div className="mb-2">
                Transaction Hash: <b>{result.txHash}</b>
              </div>
              <div>
                Issued At:{" "}
                <b>{new Date(result.issuedAt).toLocaleString()}</b>
              </div>
            </div>
          ) : (
            <div className="text-red-400 font-semibold">
              ⚠️ Credential not found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
