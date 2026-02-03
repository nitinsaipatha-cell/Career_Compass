import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage('Check your email for the confirmation link!');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="glass-panel p-8 md:p-10 border-[var(--glass-border)] shadow-2xl relative z-10">
                    <div className="text-center mb-10">
                        <div className="w-12 h-12 bg-gradient-to-tr from-[var(--accent-primary)] to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Welcome to CareerPath</h1>
                        <p className="text-[var(--text-secondary)] text-sm">
                            {isSignUp ? "Create an account to start your journey" : "Sign in to access your dashboard"}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[var(--text-secondary)] ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all outline-none"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[var(--text-secondary)] ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs text-center">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-blue-600 hover:opacity-90 transition-opacity text-white font-medium shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-[var(--text-secondary)]">
                            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-[var(--accent-primary)] hover:text-white font-medium transition-colors"
                            >
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
