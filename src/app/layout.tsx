import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { UseMnemonicsWrapper } from '@/components/wrappers/mnemonics';
import { poppins, spaceGrotesk, titilliumWeb } from '@/fonts';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Karmsetu',
  description: 'My Portfolio Website',
  icons: { icon: '/icon.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${titilliumWeb.variable}
      ${geistSans.variable}
      ${geistMono.variable}
      ${poppins.variable}
      ${spaceGrotesk.variable}
      antialiased
      font-titillium
      `}
      >
        <UseMnemonicsWrapper>{children}</UseMnemonicsWrapper>
        <Toaster />
      </body>
    </html>
  );
}
