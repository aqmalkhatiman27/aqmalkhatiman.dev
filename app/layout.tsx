import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aqmalkhatiman.dev"),
  title: {
    default: "Aqmal Khatiman (Solihin)",
    template: "%s · Aqmal Khatiman",
  },
  description:
    "Aqmal Khatiman's professional digital platform featuring system architecture insights, applied AI execution notes, inclusive design advocacy, and business-focused learning resources.",
  keywords: [
    "Aqmal Khatiman",
    "System Architecture",
    "AI",
    "Cloud",
    "Accessibility",
    "Digital Garden",
  ],
  authors: [{ name: "Aqmal Khatiman" }],
  creator: "Aqmal Khatiman",
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "/",
    siteName: "aqmalkhatiman.dev",
    title: "Aqmal Khatiman (Solihin)",
    description:
      "Aqmal Khatiman's professional digital platform featuring system architecture insights, applied AI execution notes, inclusive design advocacy, and business-focused learning resources.",
    images: [
      {
        url: "/api/og?title=Aqmal%20Khatiman%20(Solihin)&tag=Technology",
        width: 1200,
        height: 630,
        alt: "Aqmal Khatiman — Personal Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqmal Khatiman (Solihin)",
    description:
      "Aqmal Khatiman's professional digital platform featuring system architecture insights, applied AI execution notes, inclusive design advocacy, and business-focused learning resources.",
    images: ["/api/og?title=Aqmal%20Khatiman%20(Solihin)&tag=Technology"],
  },
  alternates: {
    canonical: "/",
  },
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
