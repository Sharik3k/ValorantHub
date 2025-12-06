import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const heroStats = [
  { value: '25+', label: 'Агентів', delay: 0 },
  { value: '10+', label: 'Карт', delay: 100 },
  { value: '40+', label: 'Одиниць зброї', delay: 200 },
  { value: '24/7', label: 'AI-підтримка', delay: 300 },
];

const featureCards = [
  {
    title: 'Агенти',
    description: 'Дізнавайтесь про здібності та стратегії всіх агентів.',
    cta: { label: 'Переглянути →', to: '/agents' },
    icon: '🎯',
    delay: 0,
  },
  {
    title: 'Карти',
    description: 'Вивчайте всі карти та знаходьте найкращі позиції.',
    cta: { label: 'Дослідити →', to: '/maps' },
    icon: '🗺️',
    delay: 100,
  },
  {
    title: 'Зброя',
    description: 'Статистика, відкат та поради по використанню зброї.',
    cta: { label: 'Переглянути →', to: '/weapons' },
    icon: '⚔️',
    delay: 200,
  },
  {
    title: 'AI-чат',
    description: 'Отримайте поради від Valorant AI-асистента.',
    cta: { label: 'Спробувати →', to: '/chat' },
    icon: '🤖',
    delay: 300,
  },
];

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="space-y-16">
      {/* Hero Section */}
      <div 
        className="valo-card valo-stripes p-8 md:p-12 relative overflow-hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Декоративний елемент */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--valo-red)] opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <p className="uppercase tracking-[0.6em] text-[var(--valo-red)] text-sm mb-6 animate-fade-in-up">
            VALORANT-HUB
          </p>
          <h1 
            className="text-5xl md:text-7xl font-black leading-tight mb-6 glitch-text"
            style={{
              animationDelay: '0.2s',
            }}
          >
            VALORANT
            <br />
            <span className="text-[var(--valo-red)]">ЦЕНТР ІНФОРМАЦІЇ</span>
          </h1>
          <p className="text-lg text-[var(--valo-muted)] max-w-2xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Вся необхідна інформація про агентів, карти, зброю та багато іншого. Покращуйте свою гру з нашим AI-асистентом.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <NavLink to="/agents" className="valo-btn">
              Переглянути агентів
            </NavLink>
            <NavLink to="/chat" className="valo-btn-outline pulse-glow">
              AI-чат Astra
            </NavLink>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((card, index) => (
          <div
            key={card.title}
            className="agent-card p-6 flex flex-col justify-between group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${card.delay}ms`,
            }}
          >
            <div>
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--valo-red)] transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-[var(--valo-muted)] mb-6 leading-relaxed">
                {card.description}
              </p>
            </div>
            <NavLink 
              to={card.cta.to} 
              className="text-[var(--valo-red)] font-bold text-sm tracking-wider uppercase hover:translate-x-2 transition-transform inline-flex items-center gap-2"
            >
              {card.cta.label}
            </NavLink>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div 
        className="valo-card p-8 md:p-12 relative overflow-hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
        }}
      >
        <div className="absolute inset-0 valo-stripes opacity-30" />
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {heroStats.map((stat, index) => (
            <div 
              key={stat.label}
              className="transform hover:scale-110 transition-transform duration-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.6 + stat.delay / 1000}s`,
              }}
            >
              <div className="text-5xl md:text-6xl font-black text-[var(--valo-red)] mb-2 glitch-text">
                {stat.value}
              </div>
              <p className="text-sm text-[var(--valo-muted)] uppercase tracking-wider font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div 
        className="valo-card p-8 md:p-12 text-center relative overflow-hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--valo-red)] to-transparent opacity-10" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            ГОТОВІ ПОКРАЩИТИ СВОЮ ГРУ?
          </h2>
          <p className="text-[var(--valo-muted)] mb-6 max-w-2xl mx-auto">
            Приєднуйтесь до тисяч гравців, які вже використовують Valorant HUB для покращення своїх навичок
          </p>
          <NavLink to="/chat" className="valo-btn inline-block">
            Почати зараз
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
