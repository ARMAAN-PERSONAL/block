import React, { useState } from "react";
import { api } from "../lib/api";
import FileDrop from "../components/FileDrop";
import { ethers } from "ethers";

export default function IssuePage() {
  const [studentName, setStudentName] = useState("");
  const [program, setProgram] = useState("");
  const [studentWallet, setStudentWallet] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);

  const issue = async () => {
    if (!pdf) return alert("Attach a PDF first.");

    if (!ethers.isAddress(studentWallet.trim())) {
      return alert("Invalid wallet address.");
    }

    try {
      setLoading(true);

      // Prepare metadata to send to backend
      const meta = new Blob(
        [
          JSON.stringify({
            studentName,
            program,
            studentWallet,
          }),
        ],
        { type: "application/json" }
      );

      const form = new FormData();
      form.append("meta", meta);
      form.append("pdf", pdf);

      // 1️⃣ Send file + metadata → backend hashes it
      const issueRes = await api.post("/credentials/issue", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const backendHash = issueRes.data.fileHashHex.toLowerCase();
      setFileHash(backendHash);

      // 2️⃣ Trigger on-chain issue using backend-generated hash
      const chainRes = await api.post("/credentials/issue-onchain", {
        fileHashHex: backendHash,
        studentWallet: studentWallet.trim(),
      });

      setTxHash(chainRes.data.txHash);

      alert("Credential issued on-chain ✔");
    } catch (err) {
      console.error("ISSUE ERROR:", err);
      alert("Failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const disabled =
    !studentName.trim() ||
    !program.trim() ||
    !studentWallet.trim() ||
    !pdf ||
    loading;

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1">
        Issue Credential
      </h2>
      <p className="text-sm text-gray-400">
        Upload the signed PDF, link to student wallet & anchor on-chain.
      </p>

      <div className="grid gap-4">
        {/* Student Name */}
        <input
          className="rounded-lg bg-[#0b0615] border border-[#312e81] px-3 py-2 text-sm text-gray-100"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        {/* Program */}
        <input
          className="rounded-lg bg-[#0b0615] border border-[#312e81] px-3 py-2 text-sm text-gray-100"
          placeholder="Program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        />

        {/* Wallet */}
        <input
          className="rounded-lg bg-[#0b0615] border border-[#312e81] px-3 py-2 text-sm text-gray-100"
          placeholder="Student Wallet 0x..."
          value={studentWallet}
          onChange={(e) => setStudentWallet(e.target.value)}
        />

        {/* PDF Upload */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Credential PDF</label>
          <FileDrop onFile={setPdf} />
          {pdf && (
            <p className="text-xs text-gray-400 mt-1">
              Selected: <span className="text-neon-cyan">{pdf.name}</span>
            </p>
          )}
        </div>

        {/* Issue Button */}
        <button
          onClick={issue}
          disabled={disabled}
          className="px-5 py-2.5 bg-gradient-to-r from-neon-violet to-neon-red-strong text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Issuing…" : "Issue Credential"}
        </button>

        {/* Hash + Tx Output */}
        {(fileHash || txHash) && (
          <div className="mt-4 p-4 border border-[#312e81] rounded-lg bg-[#090414] text-xs">
            {fileHash && (
              <div className="mb-2">
                <div className="text-gray-500">File Hash:</div>
                <div className="font-mono break-all text-neon-cyan">{fileHash}</div>
              </div>
            )}

            {txHash && (
              <div>
                <div className="text-gray-500">Transaction Hash:</div>
                <a
                  href={`https://www.oklink.com/amoy/tx/${txHash}`}
                  target="_blank"
                  className="font-mono break-all text-neon-violet-soft underline"
                >
                  {txHash}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
