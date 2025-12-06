import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Головна', icon: '🏠' },
  { to: '/agents', label: 'Агенти', icon: '🎯' },
  { to: '/maps', label: 'Карти', icon: '🗺️' },
  { to: '/weapons', label: 'Зброя', icon: '⚔️' },
  { to: '/chat', label: 'AI-чат', icon: '🤖' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--valo-border)] bg-[var(--valo-black)]/95 backdrop-blur-xl shadow-lg">
      <div className="valo-shell flex items-center justify-between py-4">
        {/* Logo */}
        <NavLink 
          to="/" 
          className="text-2xl md:text-3xl font-black tracking-[0.15em] glitch-text group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="text-[var(--valo-red)] group-hover:animate-pulse">VALORANT</span>
          <span className="text-[var(--valo-text)]">-HUB</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative pb-1 transition-all duration-300 hover:text-[var(--valo-red)] hover:scale-110 ${
                  isActive ? 'text-[var(--valo-red)]' : 'text-[var(--valo-text)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{link.icon}</span>
                    {link.label}
                  </span>
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-[var(--valo-red)] transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[var(--valo-red)] hover:bg-[var(--valo-card)] rounded transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="valo-shell pb-4 space-y-2">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--valo-red)] text-[var(--valo-black)] shadow-lg'
                    : 'bg-[var(--valo-card)] text-[var(--valo-text)] hover:bg-[var(--valo-card-dark)] hover:translate-x-2'
                }`
              }
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isMobileMenuOpen ? 'fadeInUp 0.3s ease-out forwards' : 'none',
              }}
            >
              <span className="text-2xl">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
