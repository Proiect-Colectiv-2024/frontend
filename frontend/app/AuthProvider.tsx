import React, { createContext, useState, ReactNode } from "react";

// Define props type for the AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Define the context structure
interface AuthContextType {
    user: string | null;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value of `null`
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
