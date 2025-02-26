import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "@/styles/globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Perfect",
  description:
    "projet conçu pour regrouper et illustrer les meilleures pratiques en matière de développement avec Next.js 15, TypeScript, et Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="dark scheme-light dark:scheme-dark bg-background text-text "
      data-theme="exemple"
    >
      <body className={`${raleway.variable} antialiased `}>{children}</body>
    </html>
  );
}
