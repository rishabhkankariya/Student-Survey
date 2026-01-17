'use client';

import { motion } from 'framer-motion';
import { BookOpen, Shield, Zap, Target, Smartphone, Bell, HelpCircle, ArrowLeft, Terminal, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserManual() {
    const router = useRouter();

    const SECTIONS = [
        {
            title: "What is ProfHere?",
            icon: <Target className="text-emerald-400" />,
            content: "ProfHere is a simple tool built to help students find where teachers are in real-time. No more walking to empty cabins!"
        },
        {
            title: "How it Works",
            icon: <Activity className="text-cyan-400" />,
            content: "We use smart trackers to check if a teacher is available. When you take our survey, you help us make the system even better."
        },
        {
            title: "Mobile View",
            icon: <Smartphone className="text-emerald-400" />,
            content: "You can check faculty status right from your phone. Get alerts when a teacher arrives so you don't miss them."
        },
        {
            title: "Your Privacy",
            icon: <Shield className="text-cyan-400" />,
            content: "We take your privacy seriously. Your feedback is helpful, and we never share your personal identity with anyone."
        }
    ];

    return (
        <main className="min-h-screen bg-transparent text-white p-6 md:p-32 relative overflow-hidden">


            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-4 text-slate-500 hover:text-white transition-colors mb-20 font-black uppercase tracking-[0.4em] text-xs group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                    Go Back Home
                </button>

                <div className="mb-32">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass mb-10 text-emerald-400 border-white/5 shadow-2xl">
                        <BookOpen size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">USER GUIDE: V1.0.8</span>
                    </div>
                    <h1 className="text-6xl md:text-[8rem] font-black mb-10 leading-[0.9] tracking-tighter">
                        User <span className="neon-text">Guide</span>
                    </h1>
                    <p className="text-slate-500 text-2xl leading-relaxed max-w-4xl font-medium">
                        Everything you need to know about using ProfHere. Find out how to track teachers, share feedback, and stay updated.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
                    {SECTIONS.map((section, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="glass-card p-16 border-white/5"
                        >
                            <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center mb-10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                                {section.icon}
                            </div>
                            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">{section.title}</h3>
                            <p className="text-slate-500 text-xl leading-relaxed font-medium">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="glass-card p-16 md:p-32 mt-20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000 rotate-12">
                        <Terminal size={300} />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-16 flex items-center gap-6">
                            <HelpCircle className="text-emerald-400" size={48} />
                            Common Questions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                            <div className="space-y-4">
                                <h4 className="text-white font-black text-lg uppercase tracking-widest">How do I start?</h4>
                                <p className="text-slate-500 text-lg font-medium">Just take the survey on the home page! It only takes 2 minutes and helps us improve the app.</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-white font-black text-lg uppercase tracking-widest">When is it updated?</h4>
                                <p className="text-slate-500 text-lg font-medium">The system is updated every few minutes during college hours (8 AM to 6 PM).</p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-40 pt-20 border-t border-white/5 text-center">
                    <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.8em]">ProfHere Campus Guide • 2026</p>
                </footer>
            </div>
        </main>
    );
}
