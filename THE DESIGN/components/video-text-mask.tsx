"use client";

import { forwardRef, useEffect, useState } from "react";

interface VideoTextMaskProps {
  videoSrc: string;
  text: string;
  className?: string;
}

export const VideoTextMask = forwardRef<HTMLDivElement, VideoTextMaskProps>(
  ({ videoSrc, text, className = "" }, ref) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return (
        <div className={`relative ${className}`}>
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <h1
              className="text-center m-0 p-0 leading-none text-white opacity-50"
              style={{
                fontSize: "clamp(8rem, 28vw, 40rem)",
                fontWeight: 900,
                fontFamily: "'Tajawal', 'Cairo', 'Noto Kufi Arabic', 'system-ui', sans-serif",
                letterSpacing: "-0.08em",
              }}
            >
              {text}
            </h1>
          </div>
        </div>
      );
    }

    return (
      <div className={`relative ${className}`}>
        <div ref={ref} className="absolute inset-0 w-full h-full">
          {/* الفيديو */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
            src={videoSrc}
          />

          {/* الماسك */}
          <div
            className="absolute inset-0 w-full h-full bg-white"
            style={{
              zIndex: 2,
              WebkitMask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='central' font-family='Tajawal,Cairo,system-ui' font-weight='900' font-size='280' fill='white'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E")`,
              mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='central' font-family='Tajawal,Cairo,system-ui' font-weight='900' font-size='280' fill='white'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E")`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          />
        </div>

        {/* خلفية احتياطية */}
        <div className="absolute inset-0 -z-10 bg-black" />
      </div>
    );
  }
);

VideoTextMask.displayName = "VideoTextMask";
