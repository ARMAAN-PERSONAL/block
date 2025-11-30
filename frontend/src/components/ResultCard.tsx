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
      <div className="rounded-xl border border-discord-red/50 bg-discord-red/10 px-5 py-4 shadow-discord-red-glow">
        <div className="flex items-start gap-3">
          {/* Error Icon */}
          <div className="w-10 h-10 rounded-full bg-discord-red/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-discord-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-discord-red-light text-base">
              Credential Not Found
            </h3>
            <p className="text-sm text-discord-text-muted mt-1 leading-relaxed">
              No on-chain record exists for this hash. Please verify the hash value or confirm that the credential has been issued.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const dt =
    issuedAt != null
      ? new Date(issuedAt * 1000).toLocaleString()
      : undefined;

  return (
    <div className="rounded-xl border border-discord-green/50 bg-discord-green/10 px-5 py-4 shadow-discord-green-glow hover-lift">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-discord-green/20">
        <div className="w-10 h-10 rounded-full bg-discord-green/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-discord-green-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-discord-green-light text-lg">
          Credential Verified
        </h3>
      </div>

      {/* Details Grid */}
      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
            Student
          </span>
          <span className="text-discord-text font-medium">
            {student || "Unknown"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
            Issuer / Wallet
          </span>
          <span className="font-mono text-sm text-discord-text-muted break-all bg-discord-darker/50 px-2 py-1 rounded">
            {issuer || "Unknown"}
          </span>
        </div>

        {dt && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-discord-text-faint">
              Issued At
            </span>
            <span className="text-discord-text">
              {dt}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}