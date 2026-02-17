import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vyoma.sbs"),

  title: {
    default: "Vyoma — Cloud Development Sandboxes",
    template: "%s | Vyoma",
  },

  description:
    "Vyoma is a developer platform for creating and managing isolated cloud development sandboxes. Spin up secure environments instantly, test applications, and ship faster.",

  keywords: [
    "cloud development environment",
    "isolated dev sandbox",
    "remote development",
    "developer infrastructure",
    "cloud IDE backend",
    "containerized environments",
    "ephemeral environments",
    "dev sandbox platform",
  ],

  authors: [{ name: "Vyoma Team" }],
  creator: "Vyoma",
  publisher: "Vyoma",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://vyoma.sbs",
  },

  openGraph: {
    type: "website",
    url: "https://vyoma.sbs",
    title: "Vyoma — Cloud Development Sandboxes",
    description:
      "Create secure, isolated development environments in seconds. Vyoma gives developers programmable cloud sandboxes for building and testing applications.",
    siteName: "Vyoma",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vyoma Cloud Development Sandboxes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vyoma — Cloud Dev Sandboxes",
    description:
      "Spin up isolated development environments instantly. Build, test, and ship faster with Vyoma.",
    images: ["/og-image.png"],
    creator: "@heynakul",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
