import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg md:text-xl text-blue-400">FrotaCheck</h1>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/" className="hover:text-blue-300 transition-colors">Garagem</Link>
          <Link href="/relatorios" className="hover:text-blue-300 transition-colors">Relatórios</Link>
        </nav>
      </div>
    </header>
  );
}