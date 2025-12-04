import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create(persist<AuthState>((set) => ({
    isLoggedIn: false,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false })
}),
    {
        name: 'auth-storage',
        storage : createJSONStorage(()=> sessionStorage)
    }
));