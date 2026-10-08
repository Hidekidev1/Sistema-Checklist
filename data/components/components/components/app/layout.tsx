// @ts-nocheck
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Checklist de Frota',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-100 min-h-screen text-slate-900 font-sans">
        <Navbar />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}