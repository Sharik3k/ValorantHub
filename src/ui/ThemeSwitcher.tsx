import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      aria-label="Перемкнути тему"
      className="fixed bottom-4 right-4 p-2 rounded-full bg-card shadow-lg transition-colors hover:bg-primary/20"
      onClick={() => setDark((v) => !v)}
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeSwitcher;
