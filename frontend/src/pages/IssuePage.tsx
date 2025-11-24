import React, { useState } from "react";
import { api } from "../lib/api";
import { getSigner } from "../lib/ethers";
import { REGISTRY_ADDRESS, REGISTRY_ABI } from "../config/contracts";
import FileDrop from "../components/FileDrop";
import { ethers } from "ethers";

export default function IssuePage() {
  const [studentName, setName] = useState('');
  const [program, setProgram] = useState('');
  const [studentWallet, setWallet] = useState('');
  const [pdf, setPdf] = useState<File | null>(null);
  const [fileHash, setHash] = useState('');
  const [tx, setTx] = useState('');

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "#1e1f22",
    color: "#e3e5e8",
    border: "1px solid #3a3c43",
    borderRadius: 8,
    outline: "none",
    fontSize: 15,
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#313338",
    color: "#e3e5e8",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 520,
    background: "#2b2d31",
    padding: 24,
    borderRadius: 12,
    border: "1px solid #1e1f22",
    display: "grid",
    gap: 12,
  };

  const fileDropWrapper: React.CSSProperties = {
    background: "#1e1f22",
    padding: 16,
    borderRadius: 8,
    border: "1px solid #3a3c43",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "#5865f2",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  };

  const tagStyle: React.CSSProperties = {
    marginTop: 20,
    background: "#2b2d31",
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid #1e1f22",
  };

  const issue = async () => {
    if (!pdf) return alert('Pick a PDF');

    const meta = new Blob([JSON.stringify({ studentName, program, studentWallet })], {
      type: 'application/json'
    });

    const fd = new FormData();
    fd.append('meta', meta);
    fd.append('pdf', pdf);

    const r = await api.post('/credentials/issue', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    const hashHex = r.data.fileHashHex as string;
    setHash(hashHex);

    const signer = await getSigner();
    const contract = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, signer);
    const txResp = await contract.issueCredential(hashHex, studentWallet);
    const receipt = await txResp.wait();
    setTx(receipt.hash);

    await api.post('/credentials/attach-tx', null, {
      params: { fileHashHex: hashHex, txHash: receipt.hash }
    });

    alert('Issued on-chain!');
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: "white" }}>
        Issue Credential
      </h2>

      <div style={cardStyle}>
        <input
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Student Wallet (0x...)"
          value={studentWallet}
          onChange={(e) => setWallet(e.target.value)}
          style={inputStyle}
        />

        <div style={fileDropWrapper}>
          <FileDrop onFile={setPdf} />
        </div>

        <button onClick={issue} style={buttonStyle}>
          Issue
        </button>
      </div>

      {fileHash && (
        <p style={tagStyle}>
          <span style={{ fontWeight: 700, color: "#5865f2" }}>Hash:</span> {fileHash}
        </p>
      )}

      {tx && (
        <p style={{ ...tagStyle, marginTop: 10 }}>
          <span style={{ fontWeight: 700, color: "#43b581" }}>Tx:</span> {tx}
        </p>
      )}
    </div>
  );
}
