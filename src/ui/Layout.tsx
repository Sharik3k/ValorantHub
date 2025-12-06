import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="min-h-screen flex flex-col bg-[var(--valo-black)] text-[var(--valo-text)]">
    <Navbar />
    <main className="flex-1 valo-shell py-10 space-y-10">
      <Outlet />
    </main>
    <footer className="py-8 text-center text-sm text-[var(--valo-muted)] border-t border-white/5">
      Valorant HUB © {new Date().getFullYear()}
    </footer>
  </div>
);

export default Layout;
