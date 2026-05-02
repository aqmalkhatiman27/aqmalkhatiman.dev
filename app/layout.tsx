import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aqmal Khatiman (Solihin)",
    template: "%s · Aqmal Khatiman",
  },
  description:
    "Personal platform: system architecture & technology, disability & inclusivity, finance & business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = 2026;

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        {children}
        <footer className="border-t border-border">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-6 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
            <p>{`© ${year} Aqmal Khatiman. All rights reserved.`}</p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:aqmalkhatiman27@gmail.com"
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              >
                Email
              </a>
              <a
                href="https://linkedin.com/in/aqmal-khatiman"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
