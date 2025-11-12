
export type Role = 'user' | 'model';

export interface Message {
    role: Role;
    content: string;
}

export interface Agent {
    id: string;
    name: string;
    description: string;
    systemInstruction: string;
}
