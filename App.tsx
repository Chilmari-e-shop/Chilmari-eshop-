import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { AGENTS } from './constants';
import { Agent, Message } from './types';
import { generateResponse } from './services/geminiService';

const App: React.FC = () => {
    const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0]);
    const [chats, setChats] = useState<Record<string, Message[]>>(() => {
        const initialChats: Record<string, Message[]> = {};
        for (const agent of AGENTS) {
            initialChats[agent.id] = []; // Start with empty chats
        }
        return initialChats;
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectAgent = useCallback((agent: Agent) => {
        setSelectedAgent(agent);
    }, []);
    
    const handleNewChat = useCallback(() => {
        setChats(prev => ({
            ...prev,
            [selectedAgent.id]: []
        }));
    }, [selectedAgent]);

    const handleSendMessage = useCallback(async (prompt: string) => {
        if (!prompt.trim()) return;

        const currentChat = chats[selectedAgent.id];
        const isFirstMessage = currentChat.length === 0;

        const userMessage: Message = { role: 'user', content: prompt };
        
        // Add user message to state
        setChats(prevChats => ({
            ...prevChats,
            [selectedAgent.id]: [...prevChats[selectedAgent.id], userMessage],
        }));
        
        setIsLoading(true);

        try {
            // Prepend initial greeting if it's the first message of a chat
            const messagesWithGreeting = isFirstMessage 
                ? [{ role: 'model', content: `Hello! I am ${selectedAgent.name}. How can I assist you today?` }, userMessage]
                : [...currentChat, userMessage];

            const aiResponse = await generateResponse(selectedAgent, prompt, messagesWithGreeting);
            
            const modelMessage: Message = { role: 'model', content: aiResponse };
            
            setChats(prevChats => ({
                ...prevChats,
                [selectedAgent.id]: [...prevChats[selectedAgent.id], modelMessage],
            }));

        } catch (error) {
            console.error("Error fetching AI response:", error);
            const errorMessage: Message = {
                role: 'model',
                content: "Sorry, I encountered an error. Please try again."
            };
            setChats(prevChats => ({
                ...prevChats,
                [selectedAgent.id]: [...prevChats[selectedAgent.id], errorMessage],
            }));
        } finally {
            setIsLoading(false);
        }
    }, [selectedAgent, chats]);


    return (
        <div className="flex h-screen font-sans bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-200">
            <Sidebar
                agents={AGENTS}
                selectedAgent={selectedAgent}
                onSelectAgent={handleSelectAgent}
                onNewChat={handleNewChat}
            />
            <main className="flex-1 flex flex-col h-screen bg-white dark:bg-gray-800">
                <ChatView
                    agent={selectedAgent}
                    messages={chats[selectedAgent.id] || []}
                    isLoading={isLoading}
                    onSendMessage={handleSendMessage}
                />
            </main>
        </div>
    );
};

export default App;