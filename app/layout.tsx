import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Passeios a Cavalo Melides | Quinta do Almargem",
  description:
    "Experiências únicas a cavalo entre a Serra de Grândola e a Praia de Melides. Passeios, aulas de equitação, degustação de vinhos e gastronomia alentejana desde 2010.",
  keywords: ["passeios a cavalo", "Melides", "Comporta", "Alentejo", "equitação", "turismo equestre"],
  openGraph: {
    title: "Passeios a Cavalo Melides",
    description: "Experiências únicas a cavalo no Alentejo Litoral",
    images: ["https://images.unsplash.com/photo-1640262653870-c3f1b394fef9?w=1200&q=80&auto=format&fit=crop"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        {/* Skip navigation — WCAG 2.4.1 */}
        <a href="#main-content" className="skip-nav">
          Saltar para o conteúdo principal
        </a>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
