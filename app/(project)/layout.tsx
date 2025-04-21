import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/app/components/header-wrapper"
import { Footer } from '@/app/components/footer';

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Kalli',
  description: 'Automatize seus agendamentos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} bg-gray-100 antialiased`}
      >
        <HeaderWrapper />
          <main className="min-h-screen">
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}
