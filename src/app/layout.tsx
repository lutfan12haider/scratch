import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "FLEX | Student Portal - FAST NUCES",
  description:
    "FLEX Student Portal for academic management, marks verification, attendance sheets, and academic records tracking at National University of Computer and Emerging Sciences (FAST-NUCES), Karachi Campus.",
  keywords: [
    "FLEX Portal", "FAST Student Portal", "NUCES FLEX", "FLEX Karachi",
    "FAST Karachi", "Academic Portal", "Grade Sheet", "FAST NUCES", "flexstudent"
  ],
  openGraph: {
    title: "FLEX | Student Portal - FAST NUCES",
    description: "FLEX Student Academic Management Portal — FAST NUCES Karachi Campus",
    type: "website",
    locale: "en_PK",
    siteName: "FLEX FAST NUCES",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1A365D",
              color: "#fff",
              border: "1px solid rgba(0, 147, 221, 0.4)",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              borderRadius: "6px",
              padding: "12px 16px",
            },
            success: {
              iconTheme: { primary: "#10b981", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
