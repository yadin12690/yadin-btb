export interface User {
    id: string;
    email: string;
    role: 'admin' | 'non-admin';
    password: string;
}

export const mockUsers: User[] = [
    { id: '1', email: 'admin@system.com', role: 'admin', password: 'adminPassword' },
    { id: '2', email: 'user@system.com', role: 'non-admin', password: 'nonAdminPassword' },
];


export const authenticate = (username: string, password: string): User | null => {
    const user = mockUsers.find(u => u.email === username && u.password === password);
    return user || null;
};
