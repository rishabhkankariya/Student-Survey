'use client';

import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framerVariants';
import { Cpu, Terminal, Fingerprint, Activity } from 'lucide-react';

export default function QuestionCard({ children, title, description, badge }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="glass-card p-6 md:p-20 relative overflow-hidden group !bg-black"
        >
            {/* Architectural Grid Accent */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

            <div className="relative z-10">
                {/* Protocol Badge */}
                {badge && (
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 shadow-2xl">
                            <Activity size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <span className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Section Info</span>
                            <span className="text-lg font-black text-white tracking-widest uppercase">{badge}</span>
                        </div>
                    </div>
                )}

                <h2 className="text-4xl md:text-7xl font-black mb-8 text-white tracking-tighter leading-[0.9]">
                    {title}
                </h2>

                {description && (
                    <p className="text-slate-500 text-xl md:text-2xl mb-16 max-w-3xl leading-relaxed font-medium transition-colors group-hover:text-slate-400">
                        {description}
                    </p>
                )}

                <div className="relative z-10">
                    {children}
                </div>
            </div>

            {/* Subtle High-Tech Watermarks */}
            <div className="absolute top-[20%] right-[-5%] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000 rotate-12">
                <Fingerprint size={300} className="text-white" />
            </div>
            <div className="absolute bottom-[-10%] left-[-10%] opacity-[0.02] pointer-events-none">
                <Terminal size={400} className="text-white" />
            </div>
        </motion.div>
    );
}
