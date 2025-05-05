'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ChatOverlayProps {
  onClose: () => void;
}

export default function ChatOverlay({ onClose }: ChatOverlayProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input) return;
    const newMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    // TODO: call backend API for assistant response
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-neutral-900 w-full max-w-2xl h-5/6 rounded-lg overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-neutral-700">
          <h2 className="text-lg font-mono text-neutral-100">Chat</h2>
          <button onClick={onClose} aria-label="Close chat">
            <X className="w-5 h-5 text-neutral-300 hover:text-white" />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-sm text-neutral-100 bg-neutral-800">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <span
                className={`${
                  msg.role === 'user' ? 'bg-primary' : 'bg-neutral-700'
                } p-2 rounded-lg max-w-[80%]`}
              >
                {msg.content}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-neutral-700 bg-neutral-900 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-neutral-800 text-neutral-100 p-2 rounded-l-lg outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-primary text-white p-2 rounded-r-lg hover:bg-indigo-500 transition-colors"
          >
            Send
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
