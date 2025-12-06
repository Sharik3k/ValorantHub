# Valorant HUB

Сучасний сайт для фанатів Valorant з AI-чатом "Astra" (GPT-4o). 

## Запуск локально

1. Скопіюйте `.env.example` у `.env` і додайте свій OpenAI API ключ
2. Встановіть залежності:
   ```
   npm install
   ```
3. Запустіть dev-сервер:
   ```
   npm run dev
   ```

## Деплой на Vercel

1. Залийте код на GitHub
2. Підключіть репозиторій до Vercel
3. Додайте змінні оточення з `.env`

## Стек
- React (Vite, TypeScript)
- TailwindCSS
- Node.js (серверless-функція для OpenAI)

## Основні сторінки
- Головна
- Агенти
- Карти
- Зброя
- AI-чат

## Безпека
- API ключ OpenAI лише на сервері
- Всі AI-запити через `/api/chat`
