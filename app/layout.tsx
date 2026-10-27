import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sprite from "@/components/Sprite";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";
import Icon from "@/components/Icon";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/config";
import { waLink } from "@/lib/whatsapp";

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-400.woff", weight: "400", style: "normal" },
    { path: "./fonts/poppins-500.woff", weight: "500", style: "normal" },
    { path: "./fonts/poppins-700.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#181818",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fretur | Transporte Executivo, Turismo e Fretamento em São Paulo",
    template: "%s | Fretur",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Fretur" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Fretur",
    title: "Fretur | Transporte Executivo, Turismo e Fretamento",
    description:
      "Transfer, turismo, receptivo, fretamento corporativo e transporte para eventos em São Paulo com atendimento ágil pelo WhatsApp.",
    images: [{ url: "/og-fretur.jpg", width: 1200, height: 630, alt: "Fretur Fretamento e Turismo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fretur",
    description:
      "Transporte executivo, turismo e fretamento em São Paulo com foco em conforto, segurança e pontualidade.",
    images: ["/og-fretur.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  description:
    "Empresa de transporte executivo, turismo receptivo, fretamento e viagens em grupo em Guarulhos, São Paulo e região.",
  telephone: "+55 11 97745-2500",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Guarulhos",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  areaServed: "Guarulhos, São Paulo e região",
  logo: `${SITE_URL}/images/logo-fretur.png`,
  image: `${SITE_URL}/og-fretur.jpg`,
  url: SITE_URL,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Sprite />
        <Header />
        <main id="top">{children}</main>
        <Footer />
        <a
          className="fab"
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a Fretur no WhatsApp"
        >
          <Icon name="i-wa" />
        </a>
        <Effects />
      </body>
    </html>
  );
}
