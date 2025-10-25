import { Poppins, Space_Grotesk, Titillium_Web } from 'next/font/google';

export const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['300', '200', '400', '600', '700', '900'],
  variable: '--font-titillium',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '200', '400', '600', '700', '900'],
  variable: '--font-poppins',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-space-grotesk',
});
