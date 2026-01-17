'use client';

import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { animate } from 'animejs';
import { Shield, Brain, Box, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';

export default function Hero() {
    const el = useRef(null);
    const heroRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                'Find Faculty Quickly',
                'Save Your Time',
                'Better Campus Life',
                'Easy Teacher Access'
            ],
            typeSpeed: 40,
            backSpeed: 20,
            loop: true,
            backDelay: 2500,
        });

        gsap.fromTo(".reveal-text",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.3 }
        );

        return () => typed.destroy();
    }, []);

    const handleMouseEnter = () => {
        animate(btnRef.current, {
            scale: 1.02,
            duration: 400,
            easing: 'easeOutQuad'
        });
    };

    const handleMouseLeave = () => {
        animate(btnRef.current, {
            scale: 1,
            duration: 400,
            easing: 'easeOutQuad'
        });
    };

    return (
        <motion.section
            ref={heroRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-40"
        >
            {/* Premium Mesh Background - Consistent Glow ALWAYS ON */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[160px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[160px] animate-pulse [animation-delay:2s]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass mb-10 border-white/5 shadow-2xl"
                >
                    <Sparkles size={16} className="text-emerald-400" />
                    <span className="text-xs font-black tracking-[0.3em] uppercase text-white/70">ProfHere Enterprise V1.0</span>
                </motion.div>

                <h1 className="text-7xl md:text-[10rem] font-black mb-10 leading-[0.9] tracking-tighter reveal-text text-white">
                    Know Where <br />
                    <span className="neon-text drop-shadow-[0_0_30px_rgba(0,245,160,0.5)]">Teachers Are</span>
                </h1>

                <div className="text-2xl md:text-5xl font-extrabold mb-12 text-slate-400 min-h-[4rem] reveal-text tracking-tight h-16">
                    <span ref={el}></span>
                </div>

                <p className="text-slate-500 mb-16 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium reveal-text">
                    Tired of searching for teachers in empty cabins? ProfHere helps you find faculty instantly and stay updated with campus schedules.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 reveal-text">
                    <a
                        href="/survey"
                        ref={btnRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="btn-vibrant min-w-[280px] shadow-[0_20px_50px_-10px_rgba(0,245,160,0.3)]"
                    >
                        <div className="flex items-center justify-center gap-3">
                            Take the Survey
                            <ChevronRight size={20} />
                        </div>
                    </a>
                    <a href="#features" className="px-12 py-5 glass rounded-full font-black text-white hover:bg-white/10 transition-all border-white/10 uppercase tracking-widest text-sm">
                        See Features
                    </a>
                </div>

                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 opacity-40 reveal-text">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center"><Shield size={24} /></div>
                        <span className="font-bold text-xs tracking-[0.3em] uppercase text-white/70">Private & Secure</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center"><Brain size={24} /></div>
                        <span className="font-bold text-xs tracking-[0.3em] uppercase text-white/70">Smart Search</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center"><Box size={24} /></div>
                        <span className="font-bold text-xs tracking-[0.3em] uppercase text-white/70">Easy to Use</span>
                    </div>
                </div>
            </div>

            {/* Premium Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-4 text-white/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">Scroll</span>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-emerald-500/50 to-transparent"></div>
                </div>
            </motion.div>
        </motion.section>
    );
}
