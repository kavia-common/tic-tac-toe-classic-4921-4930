import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tic Tac Toe',
  description: 'A modern Tic Tac Toe game with player vs player and computer modes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
