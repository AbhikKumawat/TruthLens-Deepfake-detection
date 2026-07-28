import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TruthLens - AI Video Authenticity & Deepfake Detection",
  description: "Verify before you publish. Advanced AI deepfake detection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-primary min-h-screen flex flex-col`}>
        <QueryProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ 
            style: { background: '#111111', color: '#fff', border: '1px solid #27272a' }
          }}/>
        </QueryProvider>
      </body>
    </html>
  );
}
