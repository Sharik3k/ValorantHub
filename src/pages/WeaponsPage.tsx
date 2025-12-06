import React, { useMemo, useState, useEffect } from 'react';
import { weapons } from '../data/weapons';
import { Crosshair, DollarSign, Zap } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      {/* Header */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <p className="text-sm tracking-[0.6em] uppercase text-[var(--valo-red)] mb-3 flex items-center gap-2">
          <Crosshair size={16} />
          АРСЕНАЛ
        </p>
        <h2 className="text-5xl md:text-6xl font-black mb-4 glitch-text">
          ЗБРОЯ <span className="text-[var(--valo-red)]">VALORANT</span>
        </h2>
        <p className="text-lg text-[var(--valo-muted)] max-w-3xl">
          Повна інформація про характеристики, вартість та темп стрільби. Оберіть категорію або знайдіть конкретний ствол.
        </p>
      </div>

      {/* Filters */}
      <div
        className="space-y-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
        }}
      >
        <input
          className="w-full px-6 py-4 rounded-lg border-2 border-[var(--valo-border)] bg-[var(--valo-card)] focus:outline-none focus:border-[var(--valo-red)] transition-all text-lg placeholder:text-[var(--valo-muted)]"
          placeholder="🔍 Пошук зброї..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-3">
          {weaponTypes.map((option) => (
            <button
              key={option}
              onClick={() => setType(option)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                type === option
                  ? 'bg-[var(--valo-red)] text-[var(--valo-black)] shadow-lg scale-105'
                  : 'bg-[var(--valo-card)] text-[var(--valo-muted)] hover:text-white hover:border-[var(--valo-red)] border-2 border-transparent'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Weapons Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((weapon, index) => (
          <article
            key={weapon.id}
            className="agent-card p-0 overflow-hidden group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.05}s`,
            }}
          >
            {/* Weapon Icon */}
            <div className="relative w-full h-48 bg-gradient-to-br from-[var(--valo-card)] via-[var(--valo-card-dark)] to-[var(--valo-black)] flex items-center justify-center overflow-hidden valo-stripes">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--valo-black)] to-transparent opacity-60" />
              <span className="text-7xl relative z-10 transform group-hover:scale-110 transition-transform duration-500">🔫</span>
              
              {/* Type Badge */}
              <div className="absolute top-4 right-4">
                <span className={`valo-badge border-2 ${typeColors[weapon.type] ?? 'bg-white/10 text-white/90 border-white/20'}`}>
                  {weapon.type}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <h3 className="text-2xl font-black glitch-text mb-1">{weapon.name}</h3>
                <p className="text-sm text-[var(--valo-muted)] uppercase tracking-wider font-semibold">{weapon.type}</p>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[var(--valo-card-dark)] rounded-lg border border-[var(--valo-border)] hover:border-[var(--valo-red)] transition-colors">
                  <div className="flex items-center gap-2 text-[var(--valo-muted)]">
                    <Crosshair size={16} />
                    <span className="text-sm font-semibold">Шкода</span>
                  </div>
                  <span className="text-white font-black">{weapon.damage}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[var(--valo-card-dark)] rounded-lg border border-[var(--valo-border)] hover:border-[var(--valo-red)] transition-colors">
                  <div className="flex items-center gap-2 text-[var(--valo-muted)]">
                    <Zap size={16} />
                    <span className="text-sm font-semibold">Fire Rate</span>
                  </div>
                  <span className="text-white font-black">{weapon.fireRate}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[var(--valo-red)]/10 rounded-lg border-2 border-[var(--valo-red)] hover:bg-[var(--valo-red)]/20 transition-colors">
                  <div className="flex items-center gap-2 text-[var(--valo-red)]">
                    <DollarSign size={16} />
                    <span className="text-sm font-bold uppercase">Ціна</span>
                  </div>
                  <span className="text-[var(--valo-red)] font-black text-lg">{weapon.price}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div className="valo-card p-12 text-center">
          <div className="text-6xl mb-4">⚔️</div>
          <h3 className="text-2xl font-bold mb-2">Зброю не знайдено</h3>
          <p className="text-[var(--valo-muted)]">
            Спробуйте змінити фільтри або пошуковий запит
          </p>
        </div>
      )}
    </section>
  );
};

export default WeaponsPage;
