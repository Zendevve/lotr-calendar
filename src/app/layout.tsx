import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shire Calendar — A Hobbit Calendar",
  description: "See today's date as a Hobbit would. Explore the Shire Calendar and convert dates between Gregorian and Shire reckoning.",
  keywords: ["Shire Calendar", "Hobbit", "Tolkien", "Lord of the Rings", "Shire Reckoning", "Appendix D"],
  openGraph: {
    title: "Shire Calendar",
    description: "See today's date as a Hobbit would",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
