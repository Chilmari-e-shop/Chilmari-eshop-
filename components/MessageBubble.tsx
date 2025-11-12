import React from 'react';
import { marked } from 'marked';
import { Message } from '../types';
import { BrainCircuitIcon, UserIcon } from './icons';

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'user';

    const Avatar = isUser 
        ? <div className="w-8 h-8 rounded-sm bg-sky-500 flex items-center justify-center text-white"><UserIcon className="w-5 h-5" /></div>
        : <div className="w-8 h-8 rounded-sm bg-emerald-500 flex items-center justify-center text-white"><BrainCircuitIcon className="w-5 h-5" /></div>;
    
    const parsedContent = { __html: marked(message.content) };

    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                {Avatar}
            </div>
            <div className="flex-1">
                 <div 
                    className="prose prose-slate dark:prose-invert max-w-none 
                               prose-p:mt-0 prose-p:mb-4 
                               prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg"
                    dangerouslySetInnerHTML={parsedContent}
                 />
            </div>
        </div>
    );
};