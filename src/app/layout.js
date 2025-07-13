import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pixisphere - Find the Perfect Photographer',
  description: 'Connect with the best photographers for your special moments',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
