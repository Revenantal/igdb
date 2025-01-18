import Link from 'next/link';

export default function Header() {
    return (
      <header className="bg-slate-900 text-white p-5">
        <div className="container mx-auto flex justify-between items-center">
            <Link href={"/"}><h1 className="text-3xl font-semibold">Game Catalog</h1></Link>
            <Link href={"/"} className="hover:text-sky-400">Catalog</Link>
        </div>
    
      </header>
    );
}