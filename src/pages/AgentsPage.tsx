import React, { useMemo, useState } from 'react';
import { agents, type AgentRole } from '../data/agents';

const filters: (AgentRole | 'Усі')[] = ['Усі', 'Дуеліст', 'Контролер', 'Ініціатор', 'Страж'];

const AgentsPage = () => {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<(typeof filters)[number]>('Усі');

  const filtered = useMemo(
    () =>
      agents.filter((agent) => {
        const matchesSearch =
          agent.name.toLowerCase().includes(search.toLowerCase()) ||
          agent.role.toLowerCase().includes(search.toLowerCase());
        const matchesRole = role === 'Усі' || agent.role === role;
        return matchesSearch && matchesRole;
      }),
    [role, search]
  );

  return (
    <section className="space-y-10">
      <div>
        <p className="text-sm tracking-[0.6em] uppercase text-[var(--valo-red)]">АНАЛІТИКА</p>
        <h2 className="text-4xl font-black mt-3 mb-2">Агенти</h2>
        <p className="text-[var(--valo-muted)] max-w-3xl">
          Кожен агент має унікальні здібності та роль у команді. Оберіть свого ідеального дуеліста, контролера, ініціатора чи стримуючого.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <input
          className="flex-1 px-4 py-3 rounded-full border border-white/10 bg-[var(--valo-card)] focus:outline-none focus:ring-2 focus:ring-[var(--valo-red)] transition"
          placeholder="Пошук за ім'ям чи роллю..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                role === item
                  ? 'bg-[var(--valo-red)] text-black'
                  : 'bg-[var(--valo-card)] text-[var(--valo-muted)] hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((agent) => (
          <article
            key={agent.id}
            className="valo-card p-6 border border-white/5 hover:-translate-y-1 hover:border-[var(--valo-red)]/50 transition"
          >
            <div className="relative mb-4 h-52 overflow-hidden rounded-xl border border-white/10">
              <img
                src={agent.img}
                alt={agent.name}
                className="absolute inset-0 h-full w-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
              <div className="absolute bottom-4 left-4">
                <p className="text-sm uppercase tracking-widest text-[var(--valo-muted)]">{agent.role}</p>
                <h3 className="text-2xl font-bold">{agent.name}</h3>
              </div>
            </div>

            <p className="text-sm text-[var(--valo-muted)] mb-4">{agent.description}</p>

            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <span className="valo-badge bg-white/10 text-white">Пікрейт {agent.pickRate}%</span>
              <span className="valo-badge bg-[var(--valo-red)]/20 text-[var(--valo-red)]">Вінрейт {agent.winRate}%</span>
            </div>

            <div className="mt-5">
              <p className="text-xs uppercase text-[var(--valo-muted)] tracking-wider mb-2">Здібності</p>
              <div className="flex flex-wrap gap-2">
                {agent.abilities.map((ability) => (
                  <span key={ability} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10">
                    {ability}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AgentsPage;
