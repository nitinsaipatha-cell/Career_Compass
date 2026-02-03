import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

const AIMentor = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your AI Career Mentor. Tell me about your interests, and I can suggest a career path or learning roadmap.",
            sender: 'bot'
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const generateResponse = (query) => {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('roadmap') || lowerQuery.includes('path')) {
            return "Here is a suggested roadmap for you: \n1. Master the Fundamentals (HTML/CSS/JS or Python)\n2. Learn a Framework (React, Django)\n3. Build 3 Key Projects\n4. Contribute to Open Source\n5. Apply for Internships.";
        }
        if (lowerQuery.includes('salary') || lowerQuery.includes('money')) {
            return "Salaries vary by region, but currently:\n- Junior Dev: $60k - $90k\n- Mid-Level: $90k - $130k\n- Senior: $140k+\nSpecialized roles like AI Engineers can command even higher premiums.";
        }
        if (lowerQuery.includes('python') || lowerQuery.includes('coding')) {
            return "Python is an excellent choice! It's great for Data Science, AI, and Backend Web Development. I'd recommend starting with 'Automate the Boring Stuff with Python'.";
        }
        return "That's an interesting point. To give you the best advice, could you share more about your current skills or what subjects you enjoy the most?";
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                text: generateResponse(userMsg.text),
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col glass-panel overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Bot size={20} color="white" />
                </div>
                <div>
                    <h2 className="font-bold text-lg">AI Mentor</h2>
                    <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.sender === 'user' ? 'bg-[var(--accent-primary)]' : 'bg-[var(--bg-secondary)] border border-[var(--glass-border)]'
                                }`}>
                                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                            </div>
                            <div className={`rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                    ? 'bg-[var(--accent-primary)] text-white rounded-tr-sm'
                                    : 'glass-panel border text-[var(--text-primary)] rounded-tl-sm'
                                }`}>
                                <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-[var(--bg-secondary)] rounded-2xl rounded-tl-sm p-4 border border-[var(--glass-border)] flex gap-1 items-center">
                            <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[var(--bg-secondary)]/30 border-t border-[var(--glass-border)]">
                <form onSubmit={handleSend} className="relative flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        className="input-field pr-12"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="absolute right-2 p-2 bg-[var(--accent-primary)] rounded-lg text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIMentor;
