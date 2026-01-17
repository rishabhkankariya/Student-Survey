'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, BarChart3, Database, ShieldCheck, Layers, Cpu, Globe, Zap } from 'lucide-react';

const FEATURES = [
    {
        title: 'Track Teachers',
        description: 'See which teachers are in their cabins right now, across all departments.',
        icon: <Search className="text-emerald-400" />,
    },
    {
        title: 'Live Alerts',
        description: 'Get instant updates when a teacher becomes available or a class changes.',
        icon: <Zap className="text-cyan-400" />,
    },
    {
        title: 'Easy Scheduling',
        description: 'Understand campus patterns and busy hours to plan your visits better.',
        icon: <BarChart3 className="text-emerald-400" />,
    },
    {
        title: 'One-Click Sync',
        description: 'Always up-to-date information synced directly with the campus database.',
        icon: <Database className="text-cyan-400" />,
    }
];

export default function Features() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const ScrollReveal = require('scrollreveal').default || require('scrollreveal');
            const sr = ScrollReveal({
                origin: 'bottom',
                distance: '60px',
                duration: 1000,
                delay: 200,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                reset: false,
            });

            sr.reveal('.reveal-item', { interval: 200 });
        }
    }, []);

    return (
        <section id="features" className="py-40 px-6 relative overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-12">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 mb-8"
                        >
                            <Cpu size={14} className="text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Smart Features</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                            Designed for <br />
                            <span className="neon-text">Every Student</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 text-xl md:text-2xl max-w-sm font-medium leading-relaxed border-l-2 border-emerald-500/20 pl-8">
                        ProfHere makes campus life simpler by bringing real-time information to your pocket.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {FEATURES.map((feature, index) => (
                        <div
                            key={index}
                            className="reveal-item glass-card p-12 group"
                        >
                            <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center mb-10 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-500 ease-out shadow-2xl">
                                {feature.icon}
                            </div>
                            <h3 className="text-3xl font-black mb-6 text-white tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium group-hover:text-slate-400 transition-colors">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Secondary Row - Bolder visual section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-card p-16 flex flex-col md:flex-row gap-12 items-center bg-gradient-to-br from-white/[0.03] to-transparent">
                        <div className="w-24 h-24 rounded-[2.5rem] glass flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                            <Layers size={48} />
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">High Accuracy</h3>
                            <p className="text-slate-500 text-xl font-medium leading-relaxed">Our system checks teacher presence multiple times every minute, so the data you see is always reliable.</p>
                        </div>
                    </div>
                    <div className="glass-card p-16 flex flex-col justify-center border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                        <ShieldCheck size={56} className="text-cyan-400 mb-8" />
                        <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Trust & Security</h3>
                        <p className="text-slate-500 text-lg font-medium">Your data and privacy are always protected with us.</p>
                    </div>
                </div>
            </div>

            {/* Background Detail */}
            <div className="absolute top-1/2 right-[-10%] translate-y-[-50%] p-32 opacity-[0.02] pointer-events-none rotate-12">
                <Globe size={800} />
            </div>
        </section>
    );
}
