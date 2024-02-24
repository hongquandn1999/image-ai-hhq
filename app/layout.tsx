import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'HHQ Image AI',
  description: 'AI-powered image recognition for HHQ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: '#9195F6' },
      }}
    >
      <html lang="en">
        <body className={cn('font-poppins antialiased', poppins.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
