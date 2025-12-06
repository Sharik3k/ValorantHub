import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Головна' },
  { to: '/agents', label: 'Агенти' },
  { to: '/maps', label: 'Карти' },
  { to: '/weapons', label: 'Зброя' },
  { to: '/chat', label: 'AI-чат' },
];

const Navbar = () => (
  <header className="border-b border-white/5 bg-[var(--valo-black)]/95 backdrop-blur">
    <div className="valo-shell flex items-center justify-between py-5">
      <div className="text-2xl font-black tracking-[0.2em]">
        <span className="text-[var(--valo-red)]">VALORANT</span>
        <span>-HUB</span>
      </div>
      <nav className="flex items-center gap-6 text-sm font-semibold uppercase tracking-wide">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `relative pb-1 transition-colors hover:text-[var(--valo-red)] ${
                isActive ? 'text-[var(--valo-red)]' : 'text-[var(--valo-muted)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full bg-[var(--valo-red)] transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
);

export default Navbar;
