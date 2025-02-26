import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { PWAInstallPrompt } from "@/components/ui/PWAInstallPrompt";
import { Header } from "@/components/layout/Header";
import { Toaster } from "sonner";
export { metadata, viewport } from "./metadata";

// import styles
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            className: "",
          }}
        />
        <Header />
        {children}
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
