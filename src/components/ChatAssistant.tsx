  import React, { useMemo, useRef, useState } from 'react';
import { askAI, ChatMessage } from '../services/aiService';
import ReactMarkdown from 'react-markdown';

const STORAGE_KEY = 'valorant-hub-chat-history';

type LocalMessage = {
  id: string;
  role: ChatMessage['role'];
  content: string;
  payloadContent?: string;
  categoryId?: string;
};

const CHAT_CATEGORIES = [
  {
    id: 'rounds',
    label: 'Раунди',
    description: 'Економіка, buy-поради, таймінги раундів.',
    prompt: 'Відповідай як стратег VALORANT. Дай практичні рекомендації щодо економіки та buy-плану для раундів.',
    examples: ['Що купити на другому раунді після перемоги?', 'Коли варто робити форс?'],
  },
  {
    id: 'agents',
    label: 'Агенти',
    description: 'Підбір складу, синергії та ролі агентів.',
    prompt: 'Запропонуй агентів і ролі з урахуванням карти та стилю гри. Поясни, чому саме ці агенти.',
    examples: ['Кого брати на Haven у п’ятьох?', 'Які абілки KAY/O ключові проти Jett?'],
  },
  {
    id: 'tactics',
    label: 'Тактика / здібності',
    description: 'Комбинації утиліті, ретейки, сетапи.',
    prompt: 'Поясни, як застосувати здібності агентів у конкретних ситуаціях. Дай покрокові комбо.',
    examples: ['Як ретейкати B на Ascent?', 'Який сетап смоків для Bind A?'],
  },
  {
    id: 'freestyle',
    label: 'Вільний чат',
    description: 'Будь-які питання по VALORANT HUB.',
    prompt: '',
    examples: ['Розкажи про нову мапу Abyss', 'Що змінилося в останньому патчі?'],
  },
] as const;

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const SITE_KEYWORDS = ['вийти', 'зайти', 'захід', 'плент', 'site', 'plant', 'зайд', 'push', 'execute'];
const MAP_POINT_KEYWORDS = ['a site', 'b site', 'c site', 'mid', 'heaven', 'market', 'garage', 'hookah', 'showers'];

const ChatAssistant = () => {
  const [messages, setMessages] = useState<LocalMessage[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as LocalMessage[];
      return parsed.map(msg => ({ ...msg, id: msg.id || createId() }));
    } catch (error) {
      console.warn('[ChatAssistant] Failed to parse stored messages', error);
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [categoryId, setCategoryId] = useState<typeof CHAT_CATEGORIES[number]['id']>('rounds');
  const [pendingTacticQuestion, setPendingTacticQuestion] = useState<string | null>(null);

  const handleCategoryChange = (id: typeof CHAT_CATEGORIES[number]['id']) => {
    if (id === categoryId) return;
    setCategoryId(id);
    setInput('');
    setMessages([]);
    setPendingTacticQuestion(null);
  };

  const activeCategory = useMemo(
    () => CHAT_CATEGORIES.find(cat => cat.id === categoryId) ?? CHAT_CATEGORIES[0],
    [categoryId]
  );

  const needsAgentFollowUp = (text: string) => {
    if (categoryId !== 'tactics') return false;
    const normalized = text.toLowerCase();
    const hitsKeyword = SITE_KEYWORDS.some(word => normalized.includes(word));
    const hitsPoint = MAP_POINT_KEYWORDS.some(word => normalized.includes(word));
    return hitsKeyword && hitsPoint;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);

    if (!pendingTacticQuestion && needsAgentFollowUp(input)) {
      const promptMsg: LocalMessage = {
        id: createId(),
        role: 'assistant',
        content: 'Щоб дати точну тактику виходу на плент, перелічіть, будь ласка, агентів вашої команди.',
        categoryId,
      };
      const userMsg: LocalMessage = {
        id: createId(),
        role: 'user',
        content: input,
        payloadContent: input,
        categoryId,
      };
      setMessages(prev => [...prev, userMsg, promptMsg]);
      setPendingTacticQuestion(input);
      setInput('');
      setLoading(false);
      return;
    }

    const contextualContent = activeCategory.prompt
      ? `[Категорія: ${activeCategory.label}]\n${activeCategory.prompt}\n\nПитання: ${
          pendingTacticQuestion ? `${pendingTacticQuestion}\n\nАгенти користувача: ${input}` : input
        }`
      : input;
    const userMsg: LocalMessage = {
      id: createId(),
      role: 'user',
      content: pendingTacticQuestion ? `${input} (агенти команди)` : input,
      payloadContent: contextualContent,
      categoryId,
    };
    setMessages(prev => [...prev, { ...userMsg }]);
    setInput('');
    try {
      const answer = await askAI(
        [...messages, userMsg].map(({ role, payloadContent, content }) => ({
          role,
          content: payloadContent || content,
        }))
      );
      const assistantMsg: LocalMessage = {
        id: createId(),
        role: 'assistant',
        content: answer,
        payloadContent: answer,
        categoryId,
      };
      setMessages(prev => [...prev, assistantMsg]);
      if (pendingTacticQuestion) {
        setPendingTacticQuestion(null);
      }
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Помилка AI-асистента');
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.warn('[ChatAssistant] Failed to persist messages', error);
    }
  }, [messages]);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <section className="w-full px-0 py-8">
      <div className="valo-card border-y border-white/10 w-full bg-black/30 px-6 md:px-16 py-10">
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          <div className="lg:w-80 flex flex-col gap-6">
            <div className="grid gap-2">
              <p className="uppercase text-xs tracking-[0.5em] text-[var(--valo-muted)]">AI-асистент</p>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-black text-white">Чат із «Astra»</h2>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20 uppercase tracking-[0.3em]">
                  {activeCategory.label}
                </span>
              </div>
              <p className="text-sm text-[var(--valo-muted)]">{activeCategory.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CHAT_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-full border text-sm transition ${
                    categoryId === cat.id
                      ? 'bg-[var(--valo-red)] text-black border-[var(--valo-red)] shadow-lg shadow-[var(--valo-red)]/30'
                      : 'border-white/15 text-white/70 hover:text-white hover:border-white/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {activeCategory.examples.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeCategory.examples.map(example => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setInput(example)}
                    className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-white/70 hover:text-black hover:bg-white transition"
                  >
                    {example}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 flex flex-col gap-3 max-h-[65vh] overflow-y-auto shadow-inner shadow-black/50">
              {messages.length === 0 && <div className="text-[var(--valo-muted)] text-center py-10">Почніть діалог з Astra…</div>}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-line transition-all shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-[var(--valo-red)] text-black'
                        : 'bg-white/10 text-white border border-white/10'
                    }`}
                    title={msg.role === 'user' ? 'Ви' : 'Astra'}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                    {msg.categoryId && (
                      <span className="mt-2 inline-block text-[10px] uppercase tracking-[0.3em] bg-black/20 px-2 py-0.5 rounded-full text-white/70">
                        {CHAT_CATEGORIES.find(cat => cat.id === msg.categoryId)?.label ?? 'Категорія'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl max-w-[80%] bg-white/10 text-white animate-pulse border border-white/10">Astra друкує…</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form
              className="flex flex-col gap-3 md:flex-row"
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                className="flex-1 px-4 py-3 rounded-full bg-white text-black placeholder:text-black/50 outline-none focus:ring-2 focus:ring-[var(--valo-red)] transition"
                placeholder="Введіть питання…"
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                maxLength={400}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[var(--valo-red)] text-black font-semibold tracking-wide disabled:opacity-50 transition"
                disabled={loading || !input.trim()}
              >
                {loading ? '...' : 'Відправити'}
              </button>
            </form>

            {error && <div className="text-red-500 animate-fadeIn">{error}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatAssistant;
