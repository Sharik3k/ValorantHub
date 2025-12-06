import React, { useMemo, useState } from 'react';
import { weapons } from '../data/weapons';

const typeColors: Record<string, string> = {
  Гвинтівка: 'bg-red-500/20 text-red-200 border-red-500/40',
  'Пістолет': 'bg-blue-500/20 text-blue-200 border-blue-500/40',
  'Снайперська': 'bg-purple-500/20 text-purple-200 border-purple-500/40',
  'Пістолет-кулемет': 'bg-green-500/20 text-green-200 border-green-500/40',
  'Легкий кулемет': 'bg-yellow-500/20 text-yellow-200 border-yellow-500/40',
  'Важкий кулемет': 'bg-orange-500/20 text-orange-200 border-orange-500/40',
  'Дробовик': 'bg-pink-500/20 text-pink-200 border-pink-500/40',
  'Пістолет-дробовик': 'bg-amber-500/20 text-amber-100 border-amber-500/40',
};

const weaponTypes = ['Усі', ...new Set(weapons.map((w) => w.type))];

const WeaponsPage = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string>('Усі');

  const filtered = useMemo(
    () =>
      weapons.filter((weapon) => {
        const matchesText =
          weapon.name.toLowerCase().includes(search.toLowerCase()) ||
          weapon.type.toLowerCase().includes(search.toLowerCase());
        const matchesType = type === 'Усі' || weapon.type === type;
        return matchesText && matchesType;
      }),
    [search, type]
  );

  return (
    <section className="space-y-10">
      <div>
        <p className="text-sm tracking-[0.6em] uppercase text-[var(--valo-red)]">ARSENAL</p>
        <h2 className="text-4xl font-black mt-3 mb-2">Зброя Valorant</h2>
        <p className="text-[var(--valo-muted)] max-w-3xl">
          Повна інформація про характеристики, вартість та темп стрільби. Оберіть категорію або знайдіть конкретний ствол.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          className="flex-1 px-4 py-3 rounded-full border border-white/10 bg-[var(--valo-card)] focus:outline-none focus:ring-2 focus:ring-[var(--valo-red)] transition"
          placeholder="Пошук зброї..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {weaponTypes.map((option) => (
            <button
              key={option}
              onClick={() => setType(option)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                type === option
                  ? 'bg-[var(--valo-red)] text-black'
                  : 'bg-[var(--valo-card)] text-[var(--valo-muted)] hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((weapon) => (
          <article key={weapon.id} className="valo-card p-6 border border-white/5">
            <div className="w-full h-40 mb-6 rounded-xl border border-white/10 bg-gradient-to-b from-[#1a0f12] to-[#070506] flex items-center justify-center">
              <span className="text-5xl">🔫</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">{weapon.name}</h3>
                <p className="text-sm text-[var(--valo-muted)]">{weapon.type}</p>
              </div>
              <span className={`valo-badge border ${typeColors[weapon.type] ?? 'bg-white/10 text-white/90 border-white/20'}`}>
                {weapon.type}
              </span>
            </div>
            <div className="space-y-2 text-sm text-[var(--valo-muted)]">
              <div className="flex justify-between">
                <span>Шкода:</span>
                <span className="text-white font-semibold">{weapon.damage}</span>
              </div>
              <div className="flex justify-between">
                <span>Fire Rate:</span>
                <span className="text-white font-semibold">{weapon.fireRate}</span>
              </div>
              <div className="flex justify-between">
                <span>Ціна:</span>
                <span className="text-[var(--valo-red)] font-bold">{weapon.price}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WeaponsPage;
