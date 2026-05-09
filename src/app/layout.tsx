import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ajuice Frozen & Fresh | Jus Buah & Sayuran Segar Premium",
  description:
    "Ajuice Frozen & Fresh - Jus buah dan sayuran segar dengan kualitas premium untuk hidup lebih sehat. Tanpa pengawet, 100% alami, fresh setiap hari. Tersedia dalam berbagai ukuran.",
  keywords: [
    "Ajuice",
    "jus segar",
    "jus buah",
    "jus sayuran",
    "minuman sehat",
    "detox juice",
    "diet juice",
    "fresh juice",
    "healthy drink",
    "jus alami",
    "tanpa pengawet",
    "premium juice",
  ],
  authors: [{ name: "Ajuice Frozen & Fresh" }],
  openGraph: {
    title: "Ajuice Frozen & Fresh | Jus Buah & Sayuran Segar Premium",
    description:
      "Jus buah dan sayuran segar dengan kualitas premium untuk hidup lebih sehat. Tanpa pengawet, 100% alami.",
    type: "website",
    locale: "id_ID",
    siteName: "Ajuice Frozen & Fresh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajuice Frozen & Fresh | Jus Segar Premium",
    description:
      "Jus buah dan sayuran segar dengan kualitas premium. Tanpa pengawet, 100% alami.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
