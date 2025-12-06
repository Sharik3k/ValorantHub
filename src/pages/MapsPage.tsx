import React, { useMemo, useState, useEffect } from 'react';
import { maps } from '../data/maps';
import { MapPin, Target } from 'lucide-react';

const MapsPage = () => {
  const [search, setSearch] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filtered = useMemo(
    () =>
      maps.filter(
        (map) =>
          map.name.toLowerCase().includes(search.toLowerCase()) ||
          map.region.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
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
          <MapPin size={16} />
          ТАКТИКА
        </p>
        <h2 className="text-5xl md:text-6xl font-black mb-4 glitch-text">
          КАРТИ <span className="text-[var(--valo-red)]">VALORANT</span>
        </h2>
        <p className="text-lg text-[var(--valo-muted)] max-w-3xl">
          Вивчайте кожну мапу, її особливості та ключові точки. Фільтруйте за назвою чи регіоном, щоб швидко знайти потрібну інформацію.
        </p>
      </div>

      {/* Search */}
      <div
        className="flex flex-col md:flex-row gap-4 md:items-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
        }}
      >
        <div className="relative flex-1">
          <input
            className="w-full px-6 py-4 rounded-lg border-2 border-[var(--valo-border)] bg-[var(--valo-card)] focus:outline-none focus:border-[var(--valo-red)] transition-all text-lg placeholder:text-[var(--valo-muted)]"
            placeholder="🔍 Пошук карти або регіону..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Maps Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {filtered.map((map, index) => (
          <article
            key={map.id}
            className="agent-card overflow-hidden group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.1}s`,
            }}
          >
            {/* Image */}
            <div className="relative h-72 overflow-hidden">
              <img 
                src={map.img} 
                alt={map.name} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--valo-black)]" />
              
              {/* Region Badge */}
              <div className="absolute top-4 right-4">
                <span className="valo-badge bg-[var(--valo-red)] text-[var(--valo-black)] shadow-lg flex items-center gap-2">
                  <MapPin size={14} />
                  {map.region}
                </span>
              </div>

              {/* Map Name */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-4xl font-black glitch-text mb-2">{map.name}</h3>
                <div className="flex items-center gap-2 text-[var(--valo-red)] text-sm font-bold uppercase tracking-wider">
                  <Target size={16} />
                  <span>{map.sites} сайти</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <p className="text-[var(--valo-muted)] leading-relaxed">
                {map.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--valo-card-dark)] rounded-lg p-4 text-center border border-[var(--valo-border)] hover:border-[var(--valo-red)] transition-colors">
                  <div className="text-3xl font-black text-[var(--valo-red)] mb-1">{map.pickRate}%</div>
                  <div className="text-xs text-[var(--valo-muted)] uppercase tracking-wider font-bold">Пікрейт</div>
                </div>
                <div className="bg-[var(--valo-card-dark)] rounded-lg p-4 text-center border border-[var(--valo-border)] hover:border-[var(--valo-red)] transition-colors">
                  <div className="text-3xl font-black text-[var(--valo-red)] mb-1">{map.winRate}%</div>
                  <div className="text-xs text-[var(--valo-muted)] uppercase tracking-wider font-bold">Вінрейт</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div className="valo-card p-12 text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-2xl font-bold mb-2">Карт не знайдено</h3>
          <p className="text-[var(--valo-muted)]">
            Спробуйте змінити пошуковий запит
          </p>
        </div>
      )}
    </section>
  );
};

export default MapsPage;
