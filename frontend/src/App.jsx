import React, { useState, useEffect, useRef } from 'react';
import { Send, Trash2, Moon, Sun, GraduationCap, User, Bot } from 'lucide-react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const RASA_API_URL = 'http://localhost:5005/webhooks/rest/webhook';

  // Load theme and welcome message on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
    
    // Add welcome message
    setTimeout(() => {
      addMessage('bot', 'Hello! I am the University Assistant. How can I help you today?');
    }, 500);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const clearChat = () => {
    setMessages([]);
    setTimeout(() => {
      addMessage('bot', 'Chat cleared. How can I help you?');
    }, 300);
  };

  const addMessage = (sender, text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), sender, text, time }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    addMessage('user', userMsg);
    setIsTyping(true);

    try {
      const response = await fetch(RASA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'student',
          message: userMsg
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsTyping(false);

      if (data && data.length > 0) {
        data.forEach(msg => {
          if (msg.text) {
            addMessage('bot', msg.text);
          }
          if (msg.image) {
             addMessage('bot', `<img src="${msg.image}" alt="Bot Image" style="max-width: 100%; border-radius: 8px;">`);
          }
        });
      } else {
        addMessage('bot', 'Sorry, I did not understand that. Could you rephrase?');
      }

    } catch (error) {
      console.error('Error communicating with Rasa:', error);
      setIsTyping(false);
      addMessage('bot', 'Sorry, I am having trouble connecting to the server right now. Please make sure the Rasa backend is running on localhost:5005.');
    }
  };

  return (
    <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="app-container">
        <main className="chat-container">
          <header className="chat-header">
            <div className="header-left">
              <div className="logo">
                <GraduationCap size={24} />
              </div>
              <div className="title-container">
                <h1>University Assistant</h1>
                <p>Ask me anything about the university</p>
              </div>
            </div>
            <div className="header-right">
              <button onClick={clearChat} className="icon-btn" title="Clear Chat">
                <Trash2 size={20} />
              </button>
              <button onClick={toggleTheme} className="icon-btn" title="Toggle Dark Mode">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="avatar">
                  {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className="message-content">
                  <div 
                    className="bubble" 
                    dangerouslySetInnerHTML={{ __html: msg.text }} 
                  />
                  <div className="timestamp">{msg.time}</div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="avatar">
                  <Bot size={20} />
                </div>
                <div className="message-content">
                  <div className="bubble">
                    <div className="typing-indicator">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <form onSubmit={handleSubmit} className="chat-form">
              <input 
                type="text" 
                className="chat-input"
                placeholder="Type your message here..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoComplete="off"
              />
              <button 
                type="submit" 
                className="send-btn" 
                disabled={!inputValue.trim()}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;