
import { Agent } from './types';

export const AGENTS: Agent[] = [
    {
        id: 'h2o-gpt',
        name: 'H2O GPT',
        description: 'An advanced, helpful AI assistant.',
        systemInstruction: 'You are H2O GPT, an advanced and helpful AI assistant created by H2O.ai. You provide clear, concise, and accurate information.'
    },
    {
        id: 'bloom',
        name: 'BLOOM',
        description: 'A large, open-access multilingual model.',
        systemInstruction: 'You are BLOOM, a large-scale, open-access multilingual language model. You are capable of generating text in 46 natural languages and 13 programming languages.'
    }
];
