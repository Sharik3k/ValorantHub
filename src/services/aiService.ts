import axios from 'axios';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function askAI(messages: ChatMessage[]): Promise<string> {
  const res = await axios.post('/api/chat', { messages });
  return res.data.answer as string; // Очікуємо markdown
}
