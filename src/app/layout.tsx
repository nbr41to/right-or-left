import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import './globals.css';
import '@mantine/core/styles.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Right or Left!!!',
  description: 'あの心理戦のボードゲームを作ったよ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <div className="mx-auto w-[400px]">{children}</div>
        </MantineProvider>
      </body>
    </html>
  );
}
