'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight, Sparkles, Box } from 'lucide-react';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // The secure admin password
    const ADMIN_PASSWORD = 'Admin@2026';

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        // Simulate a small delay for "Security Sync"
        setTimeout(() => {
            if (password === ADMIN_PASSWORD) {
                localStorage.setItem('admin_access', 'true');
                router.push('/admin');
            } else {
                setError(true);
                setLoading(false);
            }
        }, 800);
    };

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                            <Box size={32} />
                        </div>
                        <span className="text-4xl font-black tracking-tighter text-white">
                            Prof<span className="text-emerald-400">Here</span>
                        </span>
                    </div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-widest">Admin Command Deck</h1>
                    <p className="text-gray-500 font-medium mt-2">Enter credentials to establish neural link.</p>
                </div>

                <div className="glass-card p-10 border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Decorative Lock Icon */}
                    <div className="absolute -top-6 -right-6 opacity-5">
                        <Lock size={150} />
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8 relative z-10">
                        <div className="space-y-4">
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Access Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className={`w-full bg-white/5 border-2 rounded-2xl py-5 pl-14 pr-6 outline-none transition-all font-mono tracking-widest ${error ? 'border-red-500/50 bg-red-500/5 focus:border-red-500' : 'border-white/5 focus:border-emerald-500 focus:bg-white/10'
                                        }`}
                                    required
                                />
                            </div>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-red-400 text-xs font-black uppercase tracking-widest ml-1"
                                >
                                    Access Denied. Invalid Authorization Level.
                                </motion.p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-vibrant w-full py-5 text-lg flex items-center justify-center gap-3 group"
                        >
                            {loading ? (
                                <>
                                    <Sparkles className="animate-spin" />
                                    Establishing Sync...
                                </>
                            ) : (
                                <>
                                    Authorize Access
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 glass px-6 py-2 rounded-full border-white/10">
                        <Shield size={14} className="text-emerald-400" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Encrypted Session Active</span>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
