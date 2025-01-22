'use client';

import Link from 'next/link';

export default function PageLink({
    children,
    href,
    className = '',
    active = false,
  }: Readonly<{
    children: React.ReactNode;
    href?: string;
    className?: string;
    active?: boolean;
  }>) {

    return (
        <>
            { !active && href ? 
                <Link className={"hover:bg-blue-900 transition min-w-10 h-12 p-2 flex justify-center items-center bg-slate-900 rounded" + className} href={href}>{children}</Link>
            : 
                <div className={"transition min-w-10 h-12 p-2 flex justify-center items-center bg-blue-900 rounded " + className}>{children}</div>
            }
        </>  
    )
}