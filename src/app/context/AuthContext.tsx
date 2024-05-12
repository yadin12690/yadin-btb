import { ReactNode, createContext, useContext, useState } from 'react';
import { User } from '../services/authService';
import { authenticate } from '../services/authService';
import { toast } from 'react-toastify';

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<User | null>;
    logout: () => void;
}

type AuthProviderProps = {
    children?: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const notifyErr = () => toast.error("User Not Found!");
    const notifyAdminLoginSuccess = () => toast.success("Admin Login Success!");
    const notifyUserLoginSuccess = () => toast.success("User Login Success!");


    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        const user = await authenticate(username, password);
        if (user) {
            setUser(user);
            localStorage.setItem("userRole", user.role);
            if (user.role === "admin") {
                notifyAdminLoginSuccess();
            } else {
                notifyUserLoginSuccess();
            }
        } else {
            notifyErr();
        }
        return user;
    };

    //Todo logout the user
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
