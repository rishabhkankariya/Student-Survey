'use client';

import { motion } from 'framer-motion';

export default function ProgressBar({ currentLevel, totalLevels }) {
    const progress = (currentLevel / totalLevels) * 100;

    return (
        <div className="mb-12">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <span className="text-emerald-500 font-bold text-xs uppercase tracking-[0.3em]">Assessment Progress</span>
                    <h3 className="text-2xl font-black text-white">Section {currentLevel} of {totalLevels}</h3>
                </div>
                <div className="text-right">
                    <span className="text-4xl font-black text-white">{Math.round(progress)}%</span>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Capture Rate</span>
                </div>
            </div>

            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    className="h-full rounded-full bg-emerald-500 relative shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                    <motion.div
                        animate={{ left: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                </motion.div>
            </div>

            <div className="flex justify-between mt-4 px-1">
                {Array.from({ length: totalLevels }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i + 1 <= currentLevel ? 'bg-emerald-500' : 'bg-white/10'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
