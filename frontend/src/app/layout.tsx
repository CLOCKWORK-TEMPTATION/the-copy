import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "النسخة - The Copy",
  description: "منصة للكتابة الإبداعية والتحليل الدرامي باللغة العربية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
