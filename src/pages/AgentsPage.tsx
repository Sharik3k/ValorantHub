import React, { useMemo, useState } from 'react';
import { agents, type AgentRole, type Agent } from '../data/agents';
import { X, Target, TrendingUp, Users } from 'lucide-react';

const filters: (AgentRole | 'Усі')[] = ['Усі', 'Дуеліст', 'Контролер', 'Ініціатор', 'Страж'];

const AgentsPage = () => {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<(typeof filters)[number]>('Усі');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

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
            className="agent-card p-0 overflow-hidden group cursor-pointer"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
            onClick={() => setSelectedAgent(agent)}
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

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[var(--valo-red)]/0 group-hover:bg-[var(--valo-red)]/10 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Детальніше →
                </span>
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

      {/* Modal */}
      {selectedAgent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setSelectedAgent(null)}
        >
          <div 
            className="valo-card max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAgent(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-[var(--valo-black)]/80 hover:bg-[var(--valo-red)] transition-colors"
            >
              <X size={24} />
            </button>

            {/* Header with Image */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={selectedAgent.img}
                alt={selectedAgent.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--valo-black)]/50 to-[var(--valo-black)]" />
              
              {/* Agent Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="valo-badge bg-[var(--valo-red)] text-[var(--valo-black)] mb-3 inline-block">
                      {selectedAgent.role}
                    </span>
                    <h2 className="text-6xl font-black glitch-text mb-2">{selectedAgent.name}</h2>
                    <p className="text-xl text-[var(--valo-muted)]">{selectedAgent.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[var(--valo-card-dark)] rounded-lg p-6 text-center border-2 border-[var(--valo-border)] hover:border-[var(--valo-red)] transition-colors">
                  <div className="flex justify-center mb-2">
                    <Users className="text-[var(--valo-red)]" size={32} />
                  </div>
                  <div className="text-4xl font-black text-[var(--valo-red)] mb-1">{selectedAgent.pickRate}%</div>
                  <div className="text-xs text-[var(--valo-muted)] uppercase tracking-wider font-bold">Пікрейт</div>
                </div>

                <div className="bg-[var(--valo-card-dark)] rounded-lg p-6 text-center border-2 border-[var(--valo-border)] hover:border-[var(--valo-red)] transition-colors">
                  <div className="flex justify-center mb-2">
                    <TrendingUp className="text-[var(--valo-red)]" size={32} />
                  </div>
                  <div className="text-4xl font-black text-[var(--valo-red)] mb-1">{selectedAgent.winRate}%</div>
                  <div className="text-xs text-[var(--valo-muted)] uppercase tracking-wider font-bold">Вінрейт</div>
                </div>

                <div className="bg-[var(--valo-card-dark)] rounded-lg p-6 text-center border-2 border-[var(--valo-border)] hover:border-[var(--valo-red)] transition-colors">
                  <div className="flex justify-center mb-2">
                    <Target className="text-[var(--valo-red)]" size={32} />
                  </div>
                  <div className="text-4xl font-black text-[var(--valo-red)] mb-1">{selectedAgent.abilities.length}</div>
                  <div className="text-xs text-[var(--valo-muted)] uppercase tracking-wider font-bold">Здібності</div>
                </div>

                <div className="bg-[var(--valo-card-dark)] rounded-lg p-6 text-center border-2 border-[var(--valo-border)] hover:border-[var(--valo-red)] transition-colors">
                  <div className="flex justify-center mb-2">
                    <span className="text-4xl">⭐</span>
                  </div>
                  <div className="text-4xl font-black text-[var(--valo-red)] mb-1">
                    {selectedAgent.winRate > 52 ? 'S' : selectedAgent.winRate > 50 ? 'A' : 'B'}
                  </div>
                  <div className="text-xs text-[var(--valo-muted)] uppercase tracking-wider font-bold">Тір</div>
                </div>
              </div>

              {/* Abilities Section */}
              <div>
                <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <Target className="text-[var(--valo-red)]" size={32} />
                  ЗДІБНОСТІ
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedAgent.abilities.map((ability, index) => (
                    <div
                      key={ability}
                      className="bg-[var(--valo-card-dark)] rounded-lg p-6 border-2 border-[var(--valo-border)] hover:border-[var(--valo-red)] transition-all hover:scale-105"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-[var(--valo-red)]/20 border border-[var(--valo-red)] flex items-center justify-center">
                          <span className="text-[var(--valo-red)] font-black">{String.fromCharCode(65 + index)}</span>
                        </div>
                        <h4 className="text-xl font-black">{ability}</h4>
                      </div>
                      <p className="text-sm text-[var(--valo-muted)]">
                        {index === selectedAgent.abilities.length - 1 ? 'Ультимативна здібність' : `Базова здібність ${index + 1}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Role Description */}
              <div className="bg-gradient-to-r from-[var(--valo-red)]/10 to-transparent rounded-lg p-6 border-l-4 border-[var(--valo-red)]">
                <h3 className="text-2xl font-black mb-3">РОЛЬ: {selectedAgent.role.toUpperCase()}</h3>
                <p className="text-[var(--valo-muted)] leading-relaxed">
                  {selectedAgent.role === 'Дуеліст' && 'Дуелісти — це агенти для агресивної гри та першого контакту. Їхня мета — створювати простір для команди та отримувати перші фраги.'}
                  {selectedAgent.role === 'Контролер' && 'Контролери керують полем бою за допомогою смоків та зонування. Вони блокують огляд ворогів та контролюють ключові точки карти.'}
                  {selectedAgent.role === 'Ініціатор' && 'Ініціатори збирають інформацію та створюють можливості для команди. Вони використовують флеші та розвідку для безпечного виходу.'}
                  {selectedAgent.role === 'Страж' && 'Стражі захищають позиції та уповільнюють просування ворога. Вони використовують пастки та утиліті для контролю точок.'}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="valo-btn"
                >
                  Закрити
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
