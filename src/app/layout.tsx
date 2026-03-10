import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ecoyaan Checkout',
  description: 'Conscious checkout flow for Ecoyaan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
