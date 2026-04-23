import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JACKSON PARTY | 프리미엄 예약 시스템",
  description: "세련된 프리미엄 파티 예약 시스템 JACKSON PARTY입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
