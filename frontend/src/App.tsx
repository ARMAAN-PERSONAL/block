import { useState } from "react";
import IssuePage from "./pages/IssuePage";
import VerifyPage from "./pages/VerifyPage";

export default function App() {
  const [page, setPage] = useState<"issue" | "verify">("issue");

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>B-Lock: Credential System</h1>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2rem" }}>
        <button
          style={{
            padding: "0.8rem 1.4rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: page === "issue" ? "#4f46e5" : "#d1d5db",
            color: page === "issue" ? "white" : "black"
          }}
          onClick={() => setPage("issue")}
        >
          Issue Credential
        </button>

        <button
          style={{
            padding: "0.8rem 1.4rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: page === "verify" ? "#4f46e5" : "#d1d5db",
            color: page === "verify" ? "white" : "black"
          }}
          onClick={() => setPage("verify")}
        >
          Verify Credential
        </button>
      </div>

      {page === "issue" ? <IssuePage /> : <VerifyPage />}
    </div>
  );
}
