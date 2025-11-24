import { useState } from 'react'
import { api } from '../lib/api'
import ResultCard from '../components/ResultCard'

export default function VerifyPage() {

  const [hash, setHash] = useState('')
  const [res, setRes] = useState<any>(null)

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#313338",
    color: "#e3e5e8",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 520,
    background: "#2b2d31",
    padding: 24,
    borderRadius: 12,
    border: "1px solid #1e1f22",
    display: "grid",
    gap: 12,
    marginTop: 24
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "#1e1f22",
    color: "#e3e5e8",
    border: "1px solid #3a3c43",
    borderRadius: 8,
    outline: "none",
    fontSize: 15
  }

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "#5865f2",
    color: "white",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15
  }

  const resultWrapper: React.CSSProperties = {
    marginTop: 16
  }

  const go = async () => {
    try {
      const r = await api.get(`/verify/${hash}`)
      setRes(r.data)
    } catch {
      setRes({ verified: false })
    }
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: "white" }}>
        Verify Credential
      </h2>

      <div style={cardStyle}>
        <input
          placeholder="0x... file hash"
          value={hash}
          onChange={e => setHash(e.target.value)}
          style={inputStyle}
        />

        <button onClick={go} style={buttonStyle}>
          Verify
        </button>

        <div style={resultWrapper}>
          {res && (
            <ResultCard
              ok={res.verified}
              issuer={res.issuer}
              student={res.student}
              issuedAt={res.issuedAt}
            />
          )}
        </div>
      </div>
    </div>
  )
}
