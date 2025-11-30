import { useRef, useState } from "react";

interface FileDropProps {
  onFile: (f: File) => void;
}

export default function FileDrop({ onFile }: FileDropProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      onFile(file);
    }
  };

  return (
    <div
      className={`
        group cursor-pointer rounded-xl border-2 border-dashed
        px-6 py-8 text-sm transition-all duration-300 ease-out
        flex flex-col items-center justify-center gap-3
        ${isDragging
          ? "border-blurple bg-blurple/10 shadow-discord-glow"
          : "border-discord-border bg-discord-darker/60 hover:border-blurple-light hover:bg-discord-card"
        }
      `}
      onClick={() => ref.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
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

      {/* Upload Icon */}
      <div className={`
        w-14 h-14 rounded-full flex items-center justify-center
        transition-all duration-300
        ${isDragging
          ? "bg-blurple shadow-discord-glow-strong"
          : "bg-gradient-to-br from-blurple to-blurple-dark group-hover:shadow-discord-glow"
        }
      `}>
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-1">
        <p className="text-discord-text font-medium">
          {isDragging ? "Drop your file here" : "Drop or click to upload"}
        </p>
        <p className="text-discord-text-muted text-xs">
          Credential PDF file
        </p>
      </div>

      {/* File Type Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-discord-card border border-discord-border">
        <span className="w-5 h-5 rounded flex items-center justify-center bg-discord-red/20 text-discord-red text-[10px] font-bold">
          PDF
        </span>
        <span className="text-xs text-discord-text-muted">
          Accepted format
        </span>
      </div>
    </div>
  );
}