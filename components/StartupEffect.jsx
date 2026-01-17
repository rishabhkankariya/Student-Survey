'use client';

import { motion } from 'framer-motion';

export default function StartupEffect() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="fixed inset-0 z-[100] pointer-events-none bg-black flex items-center justify-center"
        >
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            ></div>
            <div className="w-1 h-full bg-emerald-500/20 absolute left-1/2 -translate-x-1/2 animate-[scan_2s_ease-in-out_infinite]"></div>
        </motion.div>
    );
}
