import { useEffect, useRef, useState } from 'react';
import { ChatDotsFill, XLg, SendFill, Robot } from 'react-bootstrap-icons';

const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
const MODEL =
  process.env.REACT_APP_OPENROUTER_MODEL || 'openai/gpt-4o-mini';

const SYSTEM_PROMPT = `You are the "Digital Twin" of Krystian Kluba, speaking in first person as Krystian on his portfolio website. Be friendly, concise and professional. Answer in the same language the visitor writes in (Polish or English).

Facts about me you can rely on:
- I have been working in the IT industry for nearly 5 years, primarily in software testing / QA.
- Current job: QA Regular Automation at Deviniti (since 02.2023). Functional and regression testing, writing automated tests with Playwright in JavaScript and TypeScript.
- Previous job: Junior Test Engineer at Mc Comp (07.2021 - 01.2023). Creating and planning test scenarios, working with Git, responsible for preparing and releasing versions.
- Education: IT Engineer degree (inz.) from Wyzsza Szkola Ekonomii i Informatyki w Krakowie (2019-2023).
- Kodilla "Full Stack Developer" bootcamp (06.2025 - 01.2026): HTML, CSS, Sass, JavaScript, React, Redux, TypeScript, Node.js, Express, NestJS, MongoDB, MySQL/Prisma.
- Certificates: ACP-620 "Managing Jira Projects for Cloud" (Atlassian, 07.2024), Cambridge B2 First / FCE English certificate (05.2025).
- Full stack skills: HTML/CSS/Sass, JavaScript, TypeScript, React, Redux, Bootstrap, Node.js, Express, NestJS, MongoDB, MySQL/Prisma, unit testing. Daily driver at work: Playwright test automation. Working knowledge of SQL and basic Linux.
- AI-assisted development ("vibe coding") tools I use: Claude Code, Cursor, GitHub Copilot; prompt engineering, context management, AI code review.
- Portfolio projects: "El Tigre" (coffee shop landing page - vanilla JS, Sass, Handlebars), "Waiter App" (restaurant table management - React, Redux, json-server), "Pizzeria" (online pizzeria with menu, cart and booking - vanilla JS, Sass, ES Modules). All on GitHub: github.com/klubus.
- This portfolio website itself was built with Claude Code (AI pair programming).
- I am always looking for new challenges to grow as a developer.
- Contact: LinkedIn linkedin.com/in/krystian-kluba, GitHub github.com/klubus.

Rules:
- Only answer questions about me, my career, skills, education, projects and this website.
- If asked about something unrelated (politics, coding help, general knowledge...), politely say you are just Krystian's digital twin and steer back to Krystian's work.
- Do not invent facts that are not listed above. If you do not know, say the real Krystian would be happy to answer - point to LinkedIn.
- Keep answers short: 1-3 sentences unless the visitor asks for details.`;

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content:
      "Hi! I'm Krystian's Digital Twin 🤖 Ask me anything about his career, skills or projects. English and Polish are both fine!",
  },
];

export const DigitalTwin = () => {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');

    if (!API_KEY) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content:
            'The chat is not configured yet (missing API key). Please reach out to Krystian on LinkedIn instead!',
        },
      ]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'X-Title': 'Krystian Kluba - Digital Twin',
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              // keep the request small: only the last 12 turns
              ...nextMessages.slice(-12),
            ],
            max_tokens: 400,
          }),
        },
      );
      if (!response.ok) {
        throw new Error(`OpenRouter responded with ${response.status}`);
      }
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        throw new Error('Empty response');
      }
      setMessages([...nextMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content:
            'Sorry, something went wrong on my side. Please try again in a moment.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="digital-twin">
      {open && (
        <div className="digital-twin-panel">
          <div className="digital-twin-header">
            <Robot size={22} />
            <div>
              <h4>Digital Twin</h4>
              <span>AI version of Krystian</span>
            </div>
            <button
              type="button"
              className="digital-twin-close"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <XLg size={16} />
            </button>
          </div>
          <div className="digital-twin-messages" ref={listRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`digital-twin-msg ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="digital-twin-msg assistant typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
          <form className="digital-twin-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              placeholder="Ask about Krystian..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Send" disabled={loading}>
              <SendFill size={16} />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        className="digital-twin-toggle"
        aria-label={open ? 'Close Digital Twin chat' : 'Open Digital Twin chat'}
        onClick={() => setOpen(!open)}
      >
        {open ? <XLg size={22} /> : <ChatDotsFill size={22} />}
      </button>
    </div>
  );
};
