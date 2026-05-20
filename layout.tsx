
export const metadata = {
  title: 'E1RM Pro',
  description: 'Premium strength calculator'
};

import './globals.css';

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
