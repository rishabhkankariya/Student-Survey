'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function AnimatedButton({ children, onClick, disabled, variant = 'primary' }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            disabled={disabled}
            className={`relative group px-10 py-5 rounded-[2rem] font-black text-xl tracking-widest uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${variant === 'primary'
                    ? 'btn-vibrant'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
        >
            <div className="flex items-center gap-4">
                {variant === 'secondary' && <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />}
                <span className="relative z-10">{children}</span>
                {variant === 'primary' && <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
            </div>

            {variant === 'primary' && (
                <div className="absolute inset-0 rounded-[2rem] bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            )}
        </motion.button>
    );
}
