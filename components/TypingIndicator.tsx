import React from 'react';
import { BrainCircuitIcon } from './icons';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sky-500">
                    <BrainCircuitIcon className="w-5 h-5" />
                </div>
            </div>
            <div className="flex-1 pt-3">
                 <div className="flex items-center space-x-1.5 bg-slate-200 dark:bg-slate-700 px-4 py-3 rounded-xl shadow-sm w-fit">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
};