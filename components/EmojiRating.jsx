'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Frown, Meh, Smile, Zap } from 'lucide-react';

export default function EmojiRating({ value, onChange }) {
    const options = [
        { icon: <Frown size={40} />, label: 'High Friction', color: '#f43f5e' },
        { icon: <Meh size={40} />, label: 'Moderate', color: '#f59e0b' },
        { icon: <Smile size={40} />, label: 'Optimized', color: '#10b981' },
        { icon: <Zap size={40} />, label: 'Industry Lead', color: '#00d9ff' }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-8 md:py-12">
            {options.map((opt, index) => {
                const isActive = value === index + 1;
                return (
                    <motion.button
                        key={index}
                        whileHover={{ y: -10 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => onChange(index + 1, e)}
                        className={`relative group flex flex-col items-center justify-center p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-500 ${isActive
                            ? 'bg-white/5 border-emerald-500/50 shadow-[0_0_50px_-10px_rgba(16,185,129,0.2)]'
                            : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                            }`}
                    >
                        <div className={`mb-6 transition-all duration-500 ${isActive ? 'scale-125' : 'opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0'}`} style={{ color: isActive ? opt.color : 'white' }}>
                            {opt.icon}
                        </div>

                        <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-2'}`} style={{ color: isActive ? opt.color : 'white' }}>
                            {opt.label}
                        </span>

                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    layoutId="rating-bg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none"
                                />
                            )}
                        </AnimatePresence>

                        {/* Soft Glow */}
                        {isActive && (
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-emerald-500/20 blur-xl rounded-full"></div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
