import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

const siteUrl = "https://larajur.netlify.app";
const title = "Lara Coelho | Assistente Jurídica na ACF";
const description =
  "Lara Coelho, Assistente Jurídica na ACF, oferece acolhimento inicial, organização e encaminhamento para atendimento presencial em Minas Gerais e online.";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Lara Coelho | Assistente Jurídica na ACF",
      url: siteUrl,
      inLanguage: "pt-BR",
    },
    {
      "@type": "Person",
      name: "Lara Coelho",
      jobTitle: "Assistente Jurídica",
      url: siteUrl,
      worksFor: {
        "@type": "Organization",
        name: "ACF",
      },
      areaServed: "Minas Gerais",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Lara Coelho",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  generator: "v0.app",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#142B4A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${cormorant.variable} ${dmMono.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
