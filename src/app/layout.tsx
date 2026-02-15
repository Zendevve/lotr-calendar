import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shire Calendar — A Hobbit Calendar",
  description: "See today's date as a Hobbit would. Convert dates, explore the Shire Calendar, and find your Shire birthday. Based on J.R.R. Tolkien's Lord of the Rings, Appendix D.",
  keywords: ["Shire Calendar", "Hobbit", "Tolkien", "Lord of the Rings", "Shire Reckoning", "Appendix D", "Middle-earth", "LOTR"],
  authors: [{ name: "Shire Calendar" }],
  creator: "Shire Calendar",
  publisher: "Shire Calendar",
  openGraph: {
    title: "Shire Calendar — See Today's Date in the Shire",
    description: "Convert dates, explore the Shire Calendar, and find your Shire birthday",
    type: "website",
    locale: "en_US",
    siteName: "Shire Calendar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shire Calendar — See Today's Date in the Shire",
    description: "Convert dates, explore the Shire Calendar, and find your Shire birthday",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add if you have one
  },
  alternates: {
    canonical: "https://shire-calendar.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
