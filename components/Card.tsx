import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export default function Card({ children, className }: CardProps) {
    return (
      <div className={"bg-slate-900 rounded p-10 " + className}>
        {children}
      </div>
    );
  }