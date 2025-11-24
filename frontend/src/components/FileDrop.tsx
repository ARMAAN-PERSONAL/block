import { useRef } from "react";

interface FileDropProps {
  onFile: (f: File) => void;
}

export default function FileDrop({ onFile }: FileDropProps) {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className="group cursor-pointer rounded-xl border border-dashed border-[#4c1d95]
                 bg-[#070214]/80 px-4 py-6 text-sm text-gray-300
                 flex flex-col items-center justify-center gap-2
                 hover:border-neon-violet-soft hover:bg-[#0b031f] neon-border-soft transition card-hover"
      onClick={() => ref.current?.click()}
    >
      <input
        type="file"
        accept="application/pdf"
        ref={ref}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />

      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-gray-400">
        <span className="h-6 w-6 rounded-full border border-neon-violet-soft flex items-center justify-center text-[11px] text-neon-violet-soft">
          PDF
        </span>
        <span>Drop or click to choose credential file</span>
      </div>

      <p className="text-[11px] text-gray-500">
        Accepted: <span className="text-gray-300">PDF only</span>
      </p>
    </div>
  );
}
