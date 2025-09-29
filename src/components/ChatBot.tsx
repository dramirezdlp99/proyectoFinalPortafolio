'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{from: 'me'|'ai'; text: string}[]>([]);
  const [input, setInput] = useState('');

  async function send() {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'me', text: input }]);
    const payload = { message: input, history: messages.map(m=>({role: m.from==='me'?'user':'assistant', content: m.text})) };
    setInput('');
    try {
      const res = await axios.post('/api/gemini', payload);
      // Intentamos leer la respuesta en el formato OpenAI-compatible:
      const aiText = res.data?.choices?.[0]?.message?.content ?? (res.data?.result ?? JSON.stringify(res.data));
      setMessages(prev => [...prev, { from: 'ai', text: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'ai', text: 'Error al conectar con la IA' }]);
    }
  }

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50">
        <button onClick={() => setOpen(v=>!v)} className="w-14 h-14 rounded-full bg-white text-primary chat-btn">🤖</button>
      </div>

      {open && (
        <div className="fixed right-6 bottom-24 w-96 bg-white rounded shadow-lg p-3 z-50">
          <div className="h-60 overflow-auto">
            {messages.map((m,i)=>(
              <div key={i} className={`mb-2 ${m.from==='me'?'text-right':'text-left'}`}>
                <div className="inline-block px-3 py-1 rounded" style={{background: m.from==='me'?'#e5e7eb':'#060E28', color: m.from==='me'?'#000':'#fff'}}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 border rounded px-2" />
            <button onClick={send} className="px-3 py-1 bg-primary text-white rounded">Enviar</button>
          </div>
        </div>
      )}
    </>
  );
}
