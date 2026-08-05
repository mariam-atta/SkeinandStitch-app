'use client';

import Link from 'next/link';
import NavDropdown from './NavDropdown';

export default function DesktopNav({ scrolled }) {
  const linkClass = `relative text-[13px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${
    scrolled ? 'text-ink-900' : 'text-white'
  }`;

  return (
    <nav className="flex items-center gap-10">
      <NavDropdown label="Women" slug="women" scrolled={scrolled} />
      <NavDropdown label="Men" slug="men" scrolled={scrolled} />
      <NavDropdown label="Kids" slug="kids" scrolled={scrolled} />

      <Link href="/shop/bags" className={linkClass}>
        Bags
      </Link>

      <Link href="/customize" className={linkClass}>
        Customize
      </Link>

      
    </nav>
  );
}