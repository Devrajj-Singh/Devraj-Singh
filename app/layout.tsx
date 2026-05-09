import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

export const metadata: Metadata = {
  title: "Devraj Singh | AI/ML & Full-Stack Developer",
  description:
    "Portfolio of Devraj Singh, a BCA (Hons) student at Christ University Delhi NCR focused on AI, machine learning, and full-stack development.",
  keywords: ["Devraj Singh", "AI", "Machine Learning", "Full-Stack", "React", "Next.js", "Python", "Portfolio"],
  authors: [{ name: "Devraj Singh" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Devraj Singh | Portfolio",
    description: "AI/ML and Full-Stack Developer | Christ University Delhi NCR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
