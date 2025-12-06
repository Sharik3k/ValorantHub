# 🚀 Інструкція з деплою Valorant HUB на Vercel

## Підготовка завершена ✅

Проект готовий до деплою! Всі необхідні файли створено:
- ✅ `vercel.json` — конфігурація для Vercel
- ✅ `.env.example` — шаблон змінних оточення
- ✅ `package.json` — оновлено з залежностями для Vercel
- ✅ Код відправлено на GitHub

## Крок 1: Створіть OpenAI Assistant

Перед деплоєм потрібно створити AI-асистента:

1. Зайдіть на https://platform.openai.com/assistants
2. Натисніть **"Create Assistant"**
3. Налаштуйте асистента:
   - **Name**: Valorant HUB Assistant (або Astra)
   - **Model**: gpt-4o або gpt-4o-mini
   - **Instructions**: Скопіюйте системний промпт з файлу `api/chat.ts`
4. Збережіть **Assistant ID** (формат: `asst_...`)

## Крок 2: Деплой на Vercel

### Варіант А: Через веб-інтерфейс (рекомендовано)

1. **Зайдіть на Vercel**
   - Відкрийте https://vercel.com
   - Увійдіть через GitHub

2. **Імпортуйте проект**
   - Натисніть **"Add New..."** → **"Project"**
   - Виберіть репозиторій `ValorantHub`
   - Натисніть **"Import"**

3. **Налаштуйте змінні оточення**
   
   У розділі **"Environment Variables"** додайте:
   
   ```
   OPENAI_API_KEY=sk-proj-...ваш_ключ
   OPENAI_ASSISTANT_ID=asst_...ваш_id
   AI_MODEL=    
   ```
   
   ⚠️ **Важливо**: Переконайтеся, що змінні додано для всіх середовищ (Production, Preview, Development)

4. **Задеплойте**
   - Натисніть **"Deploy"**
   - Зачекайте 2-3 хвилини
   - Готово! 🎉

### Варіант Б: Через Vercel CLI

```bash
# Встановіть Vercel CLI
npm i -g vercel

# Увійдіть
vercel login

# Задеплойте
vercel

# Додайте змінні оточення
vercel env add OPENAI_API_KEY
vercel env add OPENAI_ASSISTANT_ID
vercel env add AI_MODEL

# Задеплойте в production
vercel --prod
```

## Крок 3: Перевірка

1. Відкрийте ваш сайт (URL буде у форматі `https://valorant-hub-xxx.vercel.app`)
2. Перейдіть на сторінку **"AI-чат"**
3. Надішліть тестове повідомлення
4. Якщо асистент відповідає — все працює! ✅

## Можливі проблеми та рішення

### ❌ Помилка: "Assistant not found"
**Рішення**: Перевірте, чи правильно вказано `OPENAI_ASSISTANT_ID` у змінних оточення Vercel

### ❌ Помилка: "Invalid API key"
**Рішення**: 
- Перевірте `OPENAI_API_KEY` у змінних оточення
- Переконайтеся, що ключ активний на https://platform.openai.com/api-keys

### ❌ Помилка: "Module not found: @vercel/node"
**Рішення**: 
```bash
npm install @vercel/node --save-dev
git add package.json package-lock.json
git commit -m "Add @vercel/node dependency"
git push
```

### ❌ AI-чат не відповідає
**Рішення**:
1. Відкрийте консоль браузера (F12)
2. Перевірте помилки в Network tab
3. Перегляньте логи на Vercel: https://vercel.com/dashboard → ваш проект → Logs

## Оновлення проекту

Після кожного push на GitHub, Vercel автоматично задеплоїть нову версію:

```bash
# Внесіть зміни
git add .
git commit -m "Update feature"
git push origin master

# Vercel автоматично задеплоїть за ~2 хвилини
```

## Корисні посилання

- 📊 Vercel Dashboard: https://vercel.com/dashboard
- 🤖 OpenAI Platform: https://platform.openai.com
- 📖 Vercel Docs: https://vercel.com/docs
- 🔑 OpenAI API Keys: https://platform.openai.com/api-keys
- 🤖 OpenAI Assistants: https://platform.openai.com/assistants

## Моніторинг витрат

⚠️ **Важливо**: OpenAI API — платний сервіс

- Встановіть ліміти витрат: https://platform.openai.com/account/limits
- Моніторте використання: https://platform.openai.com/usage
- Рекомендований ліміт для тестування: $5-10/місяць

---

**Готово!** Ваш Valorant HUB тепер онлайн 🚀
