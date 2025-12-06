import React from 'react';
import { NavLink } from 'react-router-dom';

const heroStats = [
  { value: '25+', label: 'Агентів' },
  { value: '10+', label: 'Карт' },
  { value: '40+', label: 'Одиниць зброї' },
  { value: '24/7', label: 'AI-підтримка' },
];

const featureCards = [
  {
    title: 'Агенти',
    description: 'Дізнавайтесь про здібності та стратегії всіх агентів.',
    cta: { label: 'Переглянути →', to: '/agents' },
  },
  {
    title: 'Карти',
    description: 'Вивчайте всі карти та знаходьте найкращі позиції.',
    cta: { label: 'Дослідити →', to: '/maps' },
  },
  {
    title: 'Зброя',
    description: 'Статистика, відкат та поради по використанню зброї.',
    cta: { label: 'Переглянути →', to: '/weapons' },
  },
  {
    title: 'AI-чат',
    description: 'Отримайте поради від Valorant AI-асистента.',
    cta: { label: 'Спробувати →', to: '/chat' },
  },
];

const HomePage = () => (
  <section className="space-y-16">
    <div className="valo-card p-8 md:p-12">
      <p className="uppercase tracking-[0.6em] text-[var(--valo-red)] text-sm mb-6">VALORANT-HUB</p>
      <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
        VALORANT
        <br />
        ЦЕНТР ІНФОРМАЦІЇ
      </h1>
      <p className="text-lg text-[var(--valo-muted)] max-w-2xl mb-8">
        Вся необхідна інформація про агентів, карти, зброю та багато іншого. Покращуйте свою гру з нашим AI-асистентом.
      </p>
      <div className="flex flex-wrap gap-4">
        <NavLink
          to="/agents"
          className="px-6 py-3 rounded-full bg-[var(--valo-red)] text-black font-semibold tracking-wide hover:bg-[var(--valo-red-dark)] transition"
        >
          Переглянути агентів
        </NavLink>
        <NavLink
          to="/chat"
          className="px-6 py-3 rounded-full border border-[var(--valo-red)] text-[var(--valo-red)] font-semibold tracking-wide hover:bg-[var(--valo-card)] transition"
        >
          AI-чат
        </NavLink>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {featureCards.map((card) => (
        <div key={card.title} className="valo-card p-6 flex flex-col justify-between border border-white/5">
          <div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-sm text-[var(--valo-muted)] mb-8">{card.description}</p>
          </div>
          <NavLink to={card.cta.to} className="text-[var(--valo-red)] font-semibold text-sm tracking-wide hover:underline">
            {card.cta.label}
          </NavLink>
        </div>
      ))}
    </div>

    <div className="valo-card p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {heroStats.map((stat) => (
        <div key={stat.label}>
          <div className="text-4xl font-black text-[var(--valo-red)] mb-2">{stat.value}</div>
          <p className="text-sm text-[var(--valo-muted)] uppercase tracking-wide">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HomePage;
