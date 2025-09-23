import React, { useState, useRef, useEffect } from "react";
import { PaperPlaneTilt, Sun, Moon, Clipboard, Trash } from "@phosphor-icons/react";
import "./App.css";

const OLLAMA_API_URL = "http://localhost:11434/api/chat";
const OLLAMA_MODEL = "llama3:latest";

function formatBotReply(reply) {
  const sections = [
    { pattern: /problem[\s:-]*/i, replacement: "🧩 Problem:" },
    { pattern: /target audience[\s:-]*/i, replacement: "🎯 Target Audience:" },
    { pattern: /market potential[\s:-]*/i, replacement: "📊 Market Potential:" },
    { pattern: /competitors?[\s:-]*/i, replacement: "⚔️ Competitors:" },
    { pattern: /risks?[\s:-]*/i, replacement: "⚠️ Risks:" },
    { pattern: /pitch[\s:-]*/i, replacement: "🚀 Pitch:" },
  ];
  let formatted = reply;
  sections.forEach(({ pattern, replacement }) => {
    formatted = formatted.replace(pattern, replacement);
  });
  return formatted;
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi 👋! I'm your Startup Mentor. Share your startup idea, and I'll analyze it like an expert founder.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const systemPrompt = `
You are a helpful expert startup mentor. 
When analyzing a startup idea, ALWAYS respond in the following exact structure (do not change wording or symbols):

🧩 Problem: ...
🎯 Target Audience: ...
📊 Market Potential: ...
⚔️ Competitors: ...
⚠️ Risks: ...
🚀 Pitch: ...

Do not add extra headings or reorder them. Keep them exactly as above.`;

    const ollamaMessages = [
      { role: "system", content: systemPrompt },
      ...[...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    try {
      const res = await fetch(OLLAMA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          messages: ollamaMessages,
          stream: false
        }),
      });
      const data = await res.json();
      let botMsg =
        data?.message?.content ||
        "Sorry, I couldn't analyze your idea. Please try again!";
      botMsg = formatBotReply(botMsg);
      setMessages((m) => [...m, { role: "assistant", content: botMsg }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "❌ Error connecting to Ollama. Make sure Ollama is running and the Llama 3 model is pulled.",
        },
      ]);
    }
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend();
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi 👋! I'm your Startup Mentor. Share your startup idea, and I'll analyze it like an expert founder.",
      },
    ]);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  function LoadingDots() {
    return (
      <div className="loading-dots">
        <span className="dot dot1"></span>
        <span className="dot dot2"></span>
        <span className="dot dot3"></span>
      </div>
    );
  }

  return (
    <div className={`gradient-bg${darkMode ? " dark-bg" : ""}`}>
      <header className="chat-header">
        <h1 className="chat-title neon-text">🚀 Startup Mentor Chatbot</h1>
        <div className="header-actions">
          <button className="header-btn" onClick={clearChat} title="Clear Chat">
            <Trash size={18} /> Clear Chat
          </button>
          <button
            className="header-btn"
            onClick={() => setDarkMode((dm) => !dm)}
            title="Toggle light/dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </header>
      <main className="chat-main">
        <div className="chat-card">
          <div className="chat-history">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.role === "user"
                    ? "chat-bubble chat-bubble-user"
                    : "chat-bubble chat-bubble-bot"
                }
              >
                <div className="chat-content">
                  {msg.content}
                </div>
                {msg.role === "assistant" && idx !== 0 && (
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard(msg.content)}
                    title="Copy Response"
                  >
                    <Clipboard size={16} />
                    Copy
                  </button>
                )}
              </div>
            ))}
            {loading && <LoadingDots />}
            <div ref={chatEndRef}></div>
          </div>
          <div className="chat-input-row">
            <input
              type="text"
              className="chat-input"
              placeholder="Describe your startup idea..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              autoFocus
              maxLength={400}
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              title="Send"
            >
              <PaperPlaneTilt size={24} weight="fill" color="#fff" />
            </button>
          </div>
        </div>
      </main>
      <footer className="chat-footer">
      </footer>
    </div>
  );
}
