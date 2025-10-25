import { create } from "zustand"
import Get_auth_state, { Get_user } from "../services/api/api";
import type { Profile } from "../types/shared";


interface AuthState {
    user: Profile | null;
    isAuthenticated: boolean;
    isGettingAuth: boolean;
    isGettingUser: boolean;

    setUser: (user: Profile | null) => void;
    setAuthenticated: (value: boolean) => void;
    setIsGettingAuth: (value: boolean) => void;
    setIsGettingUser: (value: boolean) => void;

    fetchAuth: () => Promise<void>;
    fetchUser: () => Promise<void>;
    // fetchSocials: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isGettingAuth: false,
    isGettingUser: false,

    setUser: (user) => set({ user }),
    setAuthenticated: (value) => set({ isAuthenticated: value }),
    setIsGettingAuth: (value) => set({ isGettingAuth: value }),
    setIsGettingUser: (value) => set({ isGettingUser: value }),

    fetchAuth: async () => {
        set({ isGettingAuth: true });
        try {
            const res = await Get_auth_state();
            set({ isAuthenticated: res?.data?.auth ?? false });
        } catch (err) {
            console.error("Auth check failed", err);
            set({ isAuthenticated: false });
        } finally {
            set({ isGettingAuth: false });
        }
    },

    fetchUser: async () => {
        set({ isGettingUser: true });
        try {
            const res = await Get_user();
            if (res) set({ user: res });
        } catch (err) {
            console.error("User fetch failed", err);
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isGettingUser: false });
        }
    },

}));

export default useAuthStore





    // fetchSocials: async () => {
    //     try {
    //         const res = await get_socials();
    //         if (res) set({ socials: res });
    //     } catch (err) {
    //         console.error("User socials failed", err);
    //     }
    // },