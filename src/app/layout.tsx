import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Perfumery | Premium Fragrances',
  description: 'A curated collection of exclusive perfumes and decants.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}
