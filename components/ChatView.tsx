import React, { useState, useRef, useEffect } from 'react';
import { Agent, Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { SendIcon, BrainCircuitIcon } from './icons';

interface ChatViewProps {
    agent: Agent;
    messages: Message[];
    isLoading: boolean;
    onSendMessage: (prompt: string) => void;
}

const WelcomeScreen: React.FC<{agentName: string}> = ({ agentName }) => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <BrainCircuitIcon className="w-16 h-16 text-slate-400 mb-4" />
        <h2 className="text-3xl font-bold text-slate-700 dark:text-slate-200">Chilmari AI</h2>
        <p className="text-slate-500 mt-2">Start a conversation with {agentName}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 max-w-lg">
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg text-left">
                <h3 className="font-semibold text-sm">Explain quantum computing</h3>
                <p className="text-xs text-slate-500">in simple terms</p>
            </div>
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg text-left">
                <h3 className="font-semibold text-sm">Got any creative ideas</h3>
                <p className="text-xs text-slate-500">for a 10 year old’s birthday?</p>
            </div>
        </div>
    </div>
);


export const ChatView: React.FC<ChatViewProps> = ({ agent, messages, isLoading, onSendMessage }) => {
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSendMessage(inputText);
        setInputText('');
    };

    return (
        <div className="relative flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="max-w-3xl mx-auto h-full">
                    {messages.length === 0 && !isLoading ? (
                        <WelcomeScreen agentName={agent.name} />
                    ) : (
                        <div className="space-y-6">
                            {messages.map((msg, index) => (
                                <MessageBubble key={index} message={msg} />
                            ))}
                            {isLoading && <TypingIndicator />}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="w-full px-4 md:px-6 pb-4 md:pb-6 bg-gradient-to-t from-white dark:from-gray-800 to-transparent">
                <div className="max-w-3xl mx-auto">
                     <p className="text-center text-xs text-slate-400 dark:text-slate-500 mb-2">
                        Chilmari AI can make mistakes. Consider checking important information.
                    </p>
                    <form onSubmit={handleSubmit} className="relative flex items-center w-full">
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            placeholder={`Message ${agent.name}...`}
                            className="w-full h-12 px-4 pr-14 py-3 bg-white dark:bg-gray-700 border border-slate-300 dark:border-slate-600 rounded-2xl shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                            disabled={isLoading}
                            rows={1}
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-lg hover:opacity-90 disabled:bg-slate-300 dark:disabled:bg-slate-500 disabled:cursor-not-allowed transition-all"
                            disabled={isLoading || !inputText.trim()}
                            aria-label="Send message"
                        >
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};