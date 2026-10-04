import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'أهلاً بك! أنا مساعد الأفلام والمسلسلات. كيف يمكنني مساعدتك اليوم؟' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setLoading(true);

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3.6-flash', // الموديل المطلوب والموصى به من الـ API
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: 'You are a Movie and TV Assistant. Only answer questions related to movies and TV shows. User Question: ' + currentInput
                            }
                        ]
                    }
                ]
            });

            const botReply = response.text;
            if (botReply) {
                setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
            } else {
                throw new Error('Empty response from model');
            }
        } catch (error) {
            console.error("SDK Error Details:", error);
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: 'عذراً، حدث خطأ في الرد. حاول مرة أخرى.' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}>
            {isOpen && (
                <div style={{ width: '350px', height: '450px', background: '#fff', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', marginBottom: '15px', overflow: 'hidden' }}>

                    <div style={{ background: '#1e3d2f', color: '#fff', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
                        <span>Movie AI Assistant</span>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>×</button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '12px', background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    background: msg.sender === 'user' ? '#1e3d2f' : '#e0e0e0',
                                    color: msg.sender === 'user' ? '#fff' : '#000',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    maxWidth: '80%',
                                    wordBreak: 'break-word',
                                    fontSize: '14px'
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div style={{ alignSelf: 'flex-start', color: '#666', fontStyle: 'italic', fontSize: '13px' }}>جاري الكتابة...</div>}
                    </div>

                    <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '10px', background: '#fff', borderTop: '1px solid #eee', gap: '8px' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="اسأل عن فيلم أو مسلسل..."
                            style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '13px' }}
                        />
                        <button
                            type="submit"
                            style={{ background: '#1e3d2f', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                        >
                            إرسال
                        </button>
                    </form>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#1e3d2f',
                    color: '#fff',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    fontSize: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s'
                }}
                title="اسأل مساعد الأفلام"
            >
                💬
            </button>
        </div>
    );
}

export default ChatBot;