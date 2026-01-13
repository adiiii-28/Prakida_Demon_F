import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const checkSession = async () => {
            try {
                // If the Supabase client is not properly initialized, this might throw
                const { data } = await supabase.auth.getSession();
                setUser(data?.session?.user ?? null);
            } catch (error) {
                console.error("Auth initialization error:", error);
                // Fallback to null user if auth fails
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        // Listen for changes on auth state
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const signUp = async (email, password, metadata = {}) => {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
            },
        });
    };

    const signIn = async (email, password) => {
        return await supabase.auth.signInWithPassword({
            email,
            password,
        });
    };

    const signOut = async () => {
        return await supabase.auth.signOut();
    };

    const value = {
        signUp,
        signIn,
        signOut,
        user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="min-h-screen flex items-center justify-center bg-black text-prakida-flame font-display text-2xl tracking-widest">
                    INITIALIZING...
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
