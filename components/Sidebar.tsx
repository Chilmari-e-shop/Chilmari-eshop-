import React from 'react';
import { Agent } from '../types';
import { BrainCircuitIcon, PlusIcon, UserIcon, LogOutIcon } from './icons';

interface SidebarProps {
    agents: Agent[];
    selectedAgent: Agent;
    onSelectAgent: (agent: Agent) => void;
    onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ agents, selectedAgent, onSelectAgent, onNewChat }) => {
    return (
        <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white p-2 shrink-0">
            <div className="flex-1">
                <button 
                    onClick={onNewChat}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/70 transition-colors duration-200"
                >
                    <div className="flex items-center">
                        <BrainCircuitIcon className="w-7 h-7 text-white" />
                        <span className="text-lg font-semibold ml-2">New Chat</span>
                    </div>
                    <PlusIcon className="w-5 h-5" />
                </button>
                <nav className="mt-8 flex flex-col space-y-1">
                    {/* In a real app, this would be chat history. We use agents as stand-ins. */}
                    {agents.map((agent) => (
                        <button
                            key={agent.id}
                            onClick={() => onSelectAgent(agent)}
                            className={`flex items-center px-3 py-2 text-left rounded-lg transition-colors duration-200 text-sm w-full ${
                                selectedAgent.id === agent.id
                                    ? 'bg-gray-700/80'
                                    : 'hover:bg-gray-700/50 text-gray-300'
                            }`}
                        >
                            {agent.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="border-t border-gray-700 mt-auto">
                <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-700/70 transition-colors duration-200 text-left">
                     <UserIcon className="w-6 h-6 p-1 bg-sky-500 text-white rounded-full" />
                     <span className="ml-2 font-medium">User</span>
                     <LogOutIcon className="w-5 h-5 ml-auto text-gray-400" />
                </button>
            </div>
        </aside>
    );
};