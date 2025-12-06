import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const SYSTEM_PROMPT = `Ти — AI чат-асистент для веб-додатку VALORANT HUB. Твої задачі:
- Відповідати на питання користувача максимально коректно, стисло і по суті
- Використовувати модель OpenAI GPT-4o (або іншу, вказану у змінній AI_MODEL)
- Не вигадувати відповіді, якщо немає впевненості — пропонувати уточнення
- Бути ввічливим, дружнім, але не фамільярним
- Пояснювати складне простими словами
- Підтримувати українську та англійську мови
- Якщо питання не стосується VALORANT HUB — попереджати про це

Технічні вимоги:
- Використовуй OpenAI API через сервісний шар (наприклад, aiService.ts)
- Не зберігай персональні дані користувача
- Логи зберігай лише для дебагу (не для аналітики)
- Підтримуй змінні середовища: OPENAI_API_KEY, AI_MODEL
- Всі відповіді повинні бути у форматі markdown`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не дозволений' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Невірний формат повідомлень' });
  }

  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.AI_MODEL || 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.7,
        max_tokens: 700,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const answer = openaiRes.data.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (error: any) {
    res.status(500).json({ error: 'Помилка AI-сервісу', details: error?.response?.data || error.message });
  }
}
