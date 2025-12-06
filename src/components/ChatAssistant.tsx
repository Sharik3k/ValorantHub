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
    <section className="space-y-8">
      {/* Header */}
      <div className="valo-card p-8 valo-stripes relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--valo-red)] opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <p className="uppercase text-sm tracking-[0.6em] text-[var(--valo-red)] mb-3">🤖 AI-АСИСТЕНТ</p>
          <h2 className="text-5xl md:text-6xl font-black mb-4 glitch-text">
            ЧАТ З <span className="text-[var(--valo-red)]">ASTRA</span>
          </h2>
          <p className="text-lg text-[var(--valo-muted)] max-w-3xl">
            Отримайте професійні поради від AI-асистента. Оберіть категорію та задайте своє питання.
          </p>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="valo-card overflow-hidden">
        <div className="flex flex-col lg:flex-row h-[calc(100vh-300px)] min-h-[600px]">
          {/* Sidebar */}
          <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-[var(--valo-border)] p-6 space-y-6 bg-[var(--valo-card-dark)]">
            {/* Active Category */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-[var(--valo-red)] rounded-full animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-[var(--valo-muted)] font-bold">Активна категорія</span>
              </div>
              <h3 className="text-2xl font-black text-[var(--valo-red)]">{activeCategory.label}</h3>
              <p className="text-sm text-[var(--valo-muted)] leading-relaxed">{activeCategory.description}</p>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[var(--valo-muted)] font-bold">Категорії</span>
              <div className="space-y-2">
                {CHAT_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full px-4 py-3 rounded-lg text-left text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                      categoryId === cat.id
                        ? 'bg-[var(--valo-red)] text-[var(--valo-black)] shadow-lg scale-105'
                        : 'bg-[var(--valo-card)] text-[var(--valo-muted)] hover:text-white hover:bg-[var(--valo-card-dark)] border border-[var(--valo-border)]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Examples */}
            {activeCategory.examples.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[var(--valo-muted)] font-bold">Приклади питань</span>
                <div className="space-y-2">
                  {activeCategory.examples.map(example => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => setInput(example)}
                      className="w-full px-3 py-2 rounded-lg text-xs text-left border border-[var(--valo-border)] text-[var(--valo-muted)] hover:text-white hover:border-[var(--valo-red)] hover:bg-[var(--valo-card)] transition-all"
                    >
                      💡 {example}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[var(--valo-card)] to-[var(--valo-card-dark)]">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-2xl font-bold">Привіт! Я Astra</h3>
                  <p className="text-[var(--valo-muted)] max-w-md">
                    Готова допомогти з питаннями про Valorant. Оберіть категорію зліва або задайте своє питання.
                  </p>
                </div>
              )}
              
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div
                    className={`px-5 py-3 rounded-2xl max-w-[80%] shadow-lg transition-all hover:scale-[1.02] ${
                      msg.role === 'user'
                        ? 'bg-[var(--valo-red)] text-[var(--valo-black)] font-semibold'
                        : 'bg-[var(--valo-card-dark)] text-white border-2 border-[var(--valo-border)]'
                    }`}
                  >
                    <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
                      {msg.content}
                    </ReactMarkdown>
                    {msg.categoryId && (
                      <span className="mt-2 inline-block text-[10px] uppercase tracking-wider bg-black/30 px-2 py-1 rounded text-white/70">
                        {CHAT_CATEGORIES.find(cat => cat.id === msg.categoryId)?.label ?? 'Категорія'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start animate-fade-in-up">
                  <div className="px-5 py-3 rounded-2xl bg-[var(--valo-card-dark)] text-white border-2 border-[var(--valo-border)] flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[var(--valo-red)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-[var(--valo-red)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-[var(--valo-red)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span>Astra друкує...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-[var(--valo-border)] p-6 bg-[var(--valo-card-dark)]">
              <form
                className="flex gap-3"
                onSubmit={e => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <input
                  className="flex-1 px-6 py-4 rounded-lg bg-[var(--valo-card)] text-white placeholder:text-[var(--valo-muted)] outline-none border-2 border-[var(--valo-border)] focus:border-[var(--valo-red)] transition-all text-lg"
                  placeholder="Введіть ваше питання..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  disabled={loading}
                  maxLength={400}
                />
                <button
                  type="submit"
                  className="valo-btn disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !input.trim()}
                >
                  {loading ? '⏳' : '📤'} {loading ? 'Відправка...' : 'Відправити'}
                </button>
              </form>

              {error && (
                <div className="mt-3 p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-200 text-sm">
                  ❌ {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatAssistant;
