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
        {filtered.map((agent, index) => (
          <article
            key={agent.id}
            className="agent-card p-0 overflow-hidden group"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={agent.img}
                alt={agent.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--valo-black)]" />
              
              {/* Роль бейдж */}
              <div className="absolute top-4 right-4">
                <span className="valo-badge bg-[var(--valo-red)] text-[var(--valo-black)] shadow-lg">
                  {agent.role}
                </span>
              </div>

              {/* Ім'я агента */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-3xl font-black glitch-text">{agent.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-[var(--valo-muted)] leading-relaxed">
                {agent.description}
              </p>

              {/* Статистика */}
              <div className="flex gap-3">
                <div className="flex-1 bg-[var(--valo-card-dark)] rounded-lg p-3 text-center border border-[var(--valo-border)]">
                  <div className="text-2xl font-black text-[var(--valo-red)]">{agent.pickRate}%</div>
                  <div className="text-xs text-[var(--valo-muted)] uppercase tracking-wider">Пікрейт</div>
                </div>
                <div className="flex-1 bg-[var(--valo-card-dark)] rounded-lg p-3 text-center border border-[var(--valo-border)]">
                  <div className="text-2xl font-black text-[var(--valo-red)]">{agent.winRate}%</div>
                  <div className="text-xs text-[var(--valo-muted)] uppercase tracking-wider">Вінрейт</div>
                </div>
              </div>

              {/* Здібності */}
              <div>
                <p className="text-xs uppercase text-[var(--valo-muted)] tracking-wider mb-2 font-bold">
                  Здібності
                </p>
                <div className="flex flex-wrap gap-2">
                  {agent.abilities.map((ability) => (
                    <span 
                      key={ability} 
                      className="px-3 py-1.5 rounded text-xs font-semibold bg-[var(--valo-card-dark)] border border-[var(--valo-border)] hover:border-[var(--valo-red)] hover:text-[var(--valo-red)] transition-colors"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="valo-card p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">Агентів не знайдено</h3>
          <p className="text-[var(--valo-muted)]">
            Спробуйте змінити фільтри або пошуковий запит
          </p>
        </div>
      )}
    </section>
  );
};

export default AgentsPage;
