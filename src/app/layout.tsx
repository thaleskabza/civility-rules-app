import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civility Protocol - George Washington's 110 Rules",
  description: "Experience George Washington's 110 Rules of Civility & Decent Behavior reimagined for 2025 with a futuristic interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
