"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for saved session
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        // Mock login
        await new Promise(r => setTimeout(r, 1000))
        const mockUser = { id: "1", name: "Guest User", email, avatar: "GU" }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        setIsLoading(false)
        router.push("/");
    }

    const register = async (name: string, email: string, password: string) => {
        setIsLoading(true)
        // Mock register
        await new Promise(r => setTimeout(r, 1000))
        const mockUser = { id: "1", name, email, avatar: name[0].toUpperCase() }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        setIsLoading(false)
        router.push("/");
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        router.push("/login");
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
