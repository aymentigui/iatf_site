import "./globals.css";
import { Cairo } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { init } from "@/actions/init/init";

const cairo = Cairo({
  subsets: ['latin'], // Sous-ensembles pour les caractères spécifiques
  weight: ['400', '700'], // Ajouter les épaisseurs nécessaires (normal, bold)
});

export const metadata: Metadata = {
  title: "Intra-African Trade Fair 2025 | IATF 2025",
  description:
    "The Intra-African Trade Fair (IATF2025) is Africa’s premier trade and investment fair, connecting businesses, policy makers, and investors to boost intra-African trade and accelerate the AfCFTA.",
  openGraph: {
    title: "Intra-African Trade Fair 2025 | IATF 2025",
    description:
      "The Intra-African Trade Fair (IATF2025) is Africa’s premier trade and investment fair, connecting businesses, policy makers, and investors to boost intra-African trade and accelerate the AfCFTA.",
    url: "https://2025.iatf.africa",
    siteName: "IATF 2025",
    images: [
      {
        url: "/iatf_image.jpeg",
        width: 1200,
        height: 630,
        alt: "IATF 2025",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();
  const messages = await getMessages();
  await init();

  return (
    <html suppressHydrationWarning lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`
          ${cairo.className}
          antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <div><Toaster /></div>
      </body>
    </html>
  );
}
