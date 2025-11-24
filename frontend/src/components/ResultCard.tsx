interface ResultCardProps {
  ok: boolean;
  issuer?: string | null;
  student?: string | null;
  issuedAt?: number | null;
}

export default function ResultCard({
  ok,
  issuer,
  student,
  issuedAt,
}: ResultCardProps) {
  if (!ok) {
    return (
      <div className="rounded-xl border border-neon-red-strong bg-[#19020a]/80 px-4 py-3 text-sm text-gray-200 shadow-neon-red">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">⚠️</span>
          <span className="font-semibold text-neon-red-strong">
            Credential not found
          </span>
        </div>
        <p className="text-xs text-gray-400">
          No on-chain record exists for this hash. Double-check the value or
          confirm that the credential has been issued.
        </p>
      </div>
    );
  }

  const dt =
    issuedAt != null
      ? new Date(issuedAt * 1000).toLocaleString()
      : undefined;

  return (
    <div className="rounded-xl border border-[#22c55e] bg-[#02140c]/80 px-4 py-3 text-sm text-gray-100 shadow-neon-soft card-hover">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">✅</span>
          <span className="font-semibold text-[#4ade80] neon-text">
            Credential Verified
          </span>
        </div>
      </div>

      <div className="grid gap-2 text-xs text-gray-300">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-gray-500">
            Student
          </div>
          <div>{student || "Unknown"}</div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wide text-gray-500">
            Issuer / Wallet
          </div>
          <div className="font-mono break-all text-[11px]">
            {issuer || "Unknown"}
          </div>
        </div>

        {dt && (
          <div>
            <div className="text-[11px] uppercase tracking-wide text-gray-500">
              Issued At
            </div>
            <div>{dt}</div>
          </div>
        )}
      </div>
    </div>
  );
}
