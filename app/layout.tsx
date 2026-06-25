import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

export const metadata: Metadata = {
  title: "Devraj Singh | AI Systems Engineer",
  description:
    "Portfolio of Devraj Singh — AI Systems Engineer, BCA (Hons) at Christ University Delhi NCR. Building agentic AI systems, distributed infrastructure, and LLM-powered applications that run in production.",
  keywords: ["Devraj Singh", "AI Systems Engineer", "Agentic AI", "Distributed Systems", "MLOps", "Rust", "LangGraph", "FastAPI", "Next.js", "Portfolio"],
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
