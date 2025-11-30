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
      {/* Page Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blurple to-discord-fuchsia flex items-center justify-center shadow-discord-glow">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          Issue Credential
        </h2>
        <p className="text-discord-text-muted">
          Upload the signed PDF, link to student wallet & anchor on-chain.
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid gap-5">
        {/* Student Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-discord-text-muted flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Student Name
          </label>
          <input
            className="input-discord"
            placeholder="Enter student's full name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        {/* Program */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-discord-text-muted flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Program
          </label>
          <input
            className="input-discord"
            placeholder="e.g., Bachelor of Computer Science"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
        </div>

        {/* Student Wallet */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-discord-text-muted flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Student Wallet
          </label>
          <input
            className="input-discord font-mono"
            placeholder="0x..."
            value={studentWallet}
            onChange={(e) => setStudentWallet(e.target.value)}
          />
        </div>

        {/* PDF Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-discord-text-muted flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Credential PDF
          </label>
          <FileDrop onFile={setPdf} />
          {pdf && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blurple/10 border border-blurple/30">
              <svg className="w-4 h-4 text-blurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-discord-text">
                Selected: <span className="text-blurple-light font-medium">{pdf.name}</span>
              </span>
            </div>
          )}
        </div>

        {/* Issue Button */}
        <button
          onClick={issue}
          disabled={disabled}
          className={`
            relative w-full px-6 py-3.5 rounded-xl font-semibold text-white
            transition-all duration-300 ease-out
            ${disabled
              ? "bg-discord-border cursor-not-allowed opacity-50"
              : "bg-gradient-to-r from-blurple via-blurple-light to-discord-fuchsia hover:shadow-discord-glow-strong hover:scale-[1.02] active:scale-[0.98]"
            }
          `}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Issuing Credential...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Issue Credential
            </span>
          )}
        </button>

        {/* Hash + Tx Output */}
        {(fileHash || txHash) && (
          <div className="mt-2 p-5 rounded-xl border border-discord-green/30 bg-discord-green/5 space-y-4">
            <div className="flex items-center gap-2 text-discord-green-light font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Successfully Issued
            </div>

            {fileHash && (
              <div className="space-y-1">
                <div className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
                  File Hash
                </div>
                <div className="font-mono text-sm text-blurple-light break-all bg-discord-darker/50 px-3 py-2 rounded-lg">
                  {fileHash}
                </div>
              </div>
            )}

            {txHash && (
              <div className="space-y-1">
                <div className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
                  Transaction Hash
                </div>

                  href={`https://www.oklink.com/amoy/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-discord-cyan break-all bg-discord-darker/50 px-3 py-2 rounded-lg block hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    {txHash}
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}