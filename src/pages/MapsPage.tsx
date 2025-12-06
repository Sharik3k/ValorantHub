import React, { useMemo, useState } from 'react';
import { maps } from '../data/maps';

const MapsPage = () => {
  const [search, setSearch] = useState('');
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
      <div>
        <p className="text-sm tracking-[0.6em] uppercase text-[var(--valo-red)]">тактика</p>
        <h2 className="text-4xl font-black mt-3 mb-2">Карти Valorant</h2>
        <p className="text-[var(--valo-muted)] max-w-3xl">
          Вивчайте кожну мапу, її особливості та ключові точки. Фільтруйте за назвою чи регіоном, щоб швидко знайти потрібну інформацію.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <input
          className="flex-1 px-4 py-3 rounded-full border border-white/10 bg-[var(--valo-card)] focus:outline-none focus:ring-2 focus:ring-[var(--valo-red)] transition"
          placeholder="Пошук карти або регіону..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((map) => (
          <article key={map.id} className="valo-card overflow-hidden border border-white/5">
            <div className="relative h-52 overflow-hidden">
              <img src={map.img} alt={map.name} className="h-full w-full object-cover opacity-90" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
              <div className="absolute bottom-4 left-6">
                <p className="uppercase text-[var(--valo-red)] tracking-[0.4em] text-xs">{map.region}</p>
                <h3 className="text-3xl font-semibold">{map.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-[var(--valo-muted)]">{map.description}</p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold text-[var(--valo-muted)]">
                <span>Сайти: {map.sites}</span>
                <span>Пікрейт: {map.pickRate}%</span>
                <span>Вінрейт: {map.winRate}%</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MapsPage;
