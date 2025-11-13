"use client";

import { forwardRef } from "react";

interface VideoTextMaskProps {
  videoSrc: string;
  text: string;
  className?: string;
}

export const VideoTextMask = forwardRef<HTMLDivElement, VideoTextMaskProps>(
  ({ videoSrc, text, className = "" }, ref) => {
    return (
      <div className={`relative ${className} bg-white`}>
        {/* Wrapper للفيديو والماسك معاً - هذا الـ ref للتحريك */}
        <div ref={ref} className="absolute inset-0 w-full h-full" style={{ isolation: "isolate" }}>
          {/* الفيديو في الخلف */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={videoSrc}
          />

          {/* الطبقة البيضاء مع النص الأسود */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-white"
            style={{
              mixBlendMode: "screen",
            }}
          >
            {/* النص بلون أسود يخرق الطبقة البيضاء ويكشف الفيديو */}
            <h1
              className="text-center m-0 p-0 leading-none"
              style={{
                fontSize: "clamp(8rem, 28vw, 40rem)",
                fontWeight: 900,
                color: "#000000",
                fontFamily: "'Tajawal', 'Cairo', 'Noto Kufi Arabic', 'system-ui', '-apple-system', 'Segoe UI', 'Arial Black', sans-serif",
                letterSpacing: "-0.08em",
                fontStretch: "ultra-expanded",
              }}
            >
              {text}
            </h1>
          </div>
        </div>
      </div>
    );
  }
);

VideoTextMask.displayName = "VideoTextMask";
