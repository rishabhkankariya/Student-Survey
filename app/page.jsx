'use client';


import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { motion } from 'framer-motion';
import { Heart, Box, ArrowRight } from 'lucide-react';

export default function LandingPage() {
    return (
        <main className="min-h-screen relative selection:bg-emerald-500 selection:text-black bg-transparent">


            {/* Header / Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all">
                <div className="max-w-7xl mx-auto flex justify-between items-center glass px-10 py-5 rounded-full border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black shadow-lg group-hover:bg-emerald-400 group-hover:rotate-6 transition-all duration-500">
                            <Box size={24} />
                        </div>
                        <span className="text-3xl font-black tracking-tighter text-white">
                            Prof<span className="neon-text">Here</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        <a href="#features" className="text-xs font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.3em]">Features</a>
                        <a href="/admin" className="text-xs font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.3em]">Admin Panel</a>
                        <a href="/survey" className="btn-vibrant !py-3 !px-8 text-xs">Join Survey</a>
                    </div>
                </div>
            </nav>

            <Hero />

            {/* Abstract Premium Section */}
            <section className="relative py-40 overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 animate-pulse"></div>

                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-card p-20 md:p-32 border-white/5 shadow-inner relative overflow-hidden group"
                    >
                        <div className="relative z-10 text-center">
                            <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]">
                                Better Campus <br />
                                <span className="opacity-40">For Everyone.</span>
                            </h2>
                            <p className="text-slate-500 text-xl md:text-2xl max-w-2xl mx-auto mb-16 font-medium">
                                Help us make the campus smarter by sharing your feedback. Your input helps us improve faculty access for all students.
                            </p>
                            <a href="/survey" className="inline-flex items-center gap-4 text-white font-black uppercase tracking-[0.4em] text-sm group/btn p-4">
                                START SURVEY
                                <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform text-emerald-400" />
                            </a>
                        </div>

                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    </motion.div>
                </div>
            </section>

            <Features />

            {/* Premium Footer */}
            <footer className="relative py-32 px-6 mt-40 border-t border-white/5 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
                        <div className="col-span-1 md:col-span-2 space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black">
                                    <Box size={28} />
                                </div>
                                <span className="text-5xl font-black tracking-tighter text-white">
                                    Prof<span className="neon-text">Here</span>
                                </span>
                            </div>
                            <p className="text-slate-500 text-xl max-w-md leading-relaxed font-medium">
                                Real-time campus tracking and student feedback. Making it easier for you to find faculty and resources.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.5em]">Links</h4>
                            <ul className="space-y-4 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                                <li><a href="/survey" className="hover:text-emerald-400 transition-colors">Start Survey</a></li>
                                <li><a href="#features" className="hover:text-cyan-400 transition-colors">App Features</a></li>
                                <li><a href="/admin" className="hover:text-white transition-colors">Admin Login</a></li>
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.5em]">Support</h4>
                            <ul className="space-y-4 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                                <li><a href="/manual" className="hover:text-white transition-colors">User Guide</a></li>

                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/5 gap-10">
                        <p className="text-slate-600 text-[10px] font-black tracking-[0.6em] uppercase">
                            © 2026 PROFHERE TEAM. ALL RIGHTS RESERVED.
                        </p>
                        <div className="flex items-center gap-4 glass px-10 py-3 rounded-full border-white/5">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">BUILD WITH</span>
                            <div className="flex items-center gap-2 text-[10px] font-black text-white">
                                <Heart size={14} className="text-emerald-500 fill-emerald-500/20" />
                                <span>FOR STUDENTS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
