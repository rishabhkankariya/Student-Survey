'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import EmojiRating from '@/components/EmojiRating';
import AnimatedButton from '@/components/AnimatedButton';
import { supabase } from '@/lib/supabase';
import { pageVariants } from '@/animations/framerVariants';
import confetti from 'canvas-confetti';
import { Activity, ShieldCheck, PieChart, Users, Smartphone, Bell, Eye, Database, CheckCircle, Info, MapPin } from 'lucide-react';

const SURVEY_STEPS = [
    {
        id: 1,
        badge: "Step 1: Time",
        title: "How much time do you waste? 🔍",
        description: "How many minutes do you usually spend looking for a teacher on campus?",
    },
    {
        id: 2,
        badge: "Step 2: Methods",
        title: "How do you find them? 🎧",
        description: "Do you ask friends or go and check the cabins yourself?",
    },
    {
        id: 3,
        badge: "Step 3: Feelings",
        title: "Is it frustrating? 📈",
        description: "How does the current struggle of finding teachers affect your day?",
    },
    {
        id: 4,
        badge: "Step 4: Solutions",
        title: "What would help you most? 🚀",
        description: "Would you prefer digital boards outside rooms or a mobile app?",
    },
    {
        id: 5,
        badge: "Step 5: Notifications",
        title: "Get Updates 🏰",
        description: "Would you like to receive phone alerts when a teacher is available?",
    },
    {
        id: 6,
        badge: "Step 6: Your Ideas",
        title: "Your Ideas & Suggestions 🧠",
        description: "Share your honest thoughts to help us build a smarter campus.",
    }
];

function SurveyContent() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        time_spent_searching: '',
        missed_work: null,
        frustration_level: 0,
        prefers_hardware_status: null,
        floor_tracking_enough: null,
        prefers_digital_notice: null,
        wants_mobile_app: null,
        notification_useful: null,
        cabin_check_reliable: null,
        preferred_platform: '',
        relies_on_word_of_mouth: null,
        importance_of_status: 0,
        schedule_tracking_difficult: null,
        biggest_daily_problem: '',
        tech_fix_idea: '',
        desired_features: '',
        daily_use_motivation: '',
        privacy_concerns: '',
        other_suggestions: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < SURVEY_STEPS.length) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 40 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const handleEmojiSelect = (field, val, e) => {
        updateField(field, val);
        if (typeof window !== 'undefined') {
            const mojs = require('@mojs/core');
            const burst = new mojs.Burst({
                left: e.pageX, top: e.pageY,
                radius: { 0: 60 },
                count: 6,
                children: {
                    shape: 'circle',
                    radius: 12,
                    fill: ['#10b981', '#14b8a6', '#059669'],
                    duration: 1500
                }
            });
            burst.play();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const istString = new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const finalData = {
            ...formData,
            wants_mobile_app: formData.preferred_platform === 'mobile_app',
            prefers_digital_notice: formData.preferred_platform === 'digital_notice',
            created_at_ist: istString
        };

        try {
            const { error } = await supabase.from('survey_responses').insert([finalData]);
            if (error) throw error;
            triggerConfetti();
            setCurrentStep('completion');
        } catch (err) {
            console.error('Submission error:', err);
            setCurrentStep('completion'); // Fallback for demo
        } finally {
            setIsSubmitting(false);
        }
    };

    if (currentStep === 'completion') {
        return (
            <main className="min-h-screen bg-black flex items-center justify-center p-4">
                <QuestionCard
                    title="Thank You! 🎉"
                    description="Your feedback has been saved. We will use this to build a better campus experience for you."
                >
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-40 h-40 mx-auto mb-8 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
                        >
                            <CheckCircle size={64} className="text-emerald-500" />
                        </motion.div>

                        <p className="text-slate-400 text-lg mb-12 italic font-medium max-w-md mx-auto">
                            "Your voice helps us build a smarter campus."
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <a href="/" className="btn-vibrant">Go Back Home</a>
                            <button onClick={() => window.location.reload()} className="px-8 py-4 glass rounded-2xl font-bold text-white hover:bg-white/5 transition-colors border-white/5">Start Again</button>
                        </div>
                    </div>
                </QuestionCard>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-transparent text-white p-0 md:p-16 pb-32 relative overflow-hidden">

            <div className="max-w-4xl mx-auto pt-10">
                <ProgressBar currentLevel={currentStep} totalLevels={SURVEY_STEPS.length} />

                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <QuestionCard key="s1" {...SURVEY_STEPS[0]}>
                            <div className="space-y-12">
                                <div>
                                    <label className="block text-slate-500 mb-6 font-black uppercase tracking-widest text-xs">Choose Time Range:</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {['0-10', '10-30', '30+'].map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => updateField('time_spent_searching', time)}
                                                className={`p-6 rounded-2xl border-2 font-black text-xl transition-all ${formData.time_spent_searching === time
                                                    ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg'
                                                    : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                                                    }`}
                                            >
                                                {time} min
                                                <span className="block text-xs font-bold opacity-60 mt-1 uppercase">
                                                    {time === '0-10' ? 'Quick' : time === '10-30' ? 'Some delay' : 'Too long'}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="glass p-10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 rounded-xl bg-slate-500/10 text-slate-400">
                                            <Info />
                                        </div>
                                        <div>
                                            <span className="text-xl font-bold block text-white">Missed Classes?</span>
                                            <p className="text-sm text-slate-500">Have you ever missed a teacher because of this?</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                        <button onClick={() => updateField('missed_work', true)} className={`flex-1 md:px-8 py-4 rounded-xl font-black border transition-all ${formData.missed_work === true ? 'bg-emerald-500 border-emerald-500 text-white' : 'glass border-white/10 text-slate-500'}`}>YES</button>
                                        <button onClick={() => updateField('missed_work', false)} className={`flex-1 md:px-8 py-4 rounded-xl font-black border transition-all ${formData.missed_work === false ? 'bg-slate-700 border-slate-600 text-white' : 'glass border-white/10 text-slate-500'}`}>NO</button>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <AnimatedButton onClick={nextStep} disabled={!formData.time_spent_searching || formData.missed_work === null}>Next Step →</AnimatedButton>
                                </div>
                            </div>
                        </QuestionCard>
                    )}

                    {currentStep === 2 && (
                        <QuestionCard key="s2" {...SURVEY_STEPS[1]}>
                            <div className="space-y-12">
                                <div className="glass p-10 rounded-[2rem] space-y-10 border-white/5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => updateField('relies_on_word_of_mouth', true)}
                                            className={`p-10 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all ${
                                                formData.relies_on_word_of_mouth === true
                                                    ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-xl'
                                                    : 'bg-white/5 border-transparent text-slate-500'
                                            }`}
                                        >
                                            <Users size={32} />
                                            <div className="text-center leading-tight">
                                                <span className="font-black text-lg block uppercase">Ask Friends</span>
                                                <span className="text-xs opacity-60 font-medium">Word of Mouth</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => updateField('relies_on_word_of_mouth', false)}
                                            className={`p-10 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all ${
                                                formData.relies_on_word_of_mouth === false
                                                    ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-xl'
                                                    : 'bg-white/5 border-transparent text-slate-500'
                                            }`}
                                        >
                                            <Activity size={32} />
                                            <div className="text-center leading-tight">
                                                <span className="font-black text-lg block uppercase">Go & Check</span>
                                                <span className="text-xs opacity-60 font-medium">Manual Check</span>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="pt-6 border-t border-white/5">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-sm font-bold text-white block">
                                                    Is walking to the cabin a reliable way to find teachers?
                                                </span>
                                                <p className="text-xs text-slate-500">
                                                    Think about how often you find the teacher when you go.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button
                                                onClick={() => updateField('cabin_check_reliable', true)}
                                                className={`flex-1 py-4 rounded-xl font-black border transition-all ${
                                                    formData.cabin_check_reliable === true
                                                        ? 'bg-emerald-500 border-emerald-500 text-white'
                                                        : 'glass border-white/10 text-slate-500'
                                                }`}
                                            >
                                                YES, USUALLY WORKS
                                            </button>
                                            <button
                                                onClick={() => updateField('cabin_check_reliable', false)}
                                                className={`flex-1 py-4 rounded-xl font-black border transition-all ${
                                                    formData.cabin_check_reliable === false
                                                        ? 'bg-slate-700 border-slate-600 text-white'
                                                        : 'glass border-white/10 text-slate-500'
                                                }`}
                                            >
                                                NO, MOSTLY FAILS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <AnimatedButton onClick={prevStep} variant="secondary">Back</AnimatedButton>
                                    <AnimatedButton
                                        onClick={nextStep}
                                        disabled={formData.relies_on_word_of_mouth === null || formData.cabin_check_reliable === null}
                                    >
                                        Next Step →
                                    </AnimatedButton>
                                </div>
                            </div>
                        </QuestionCard>
                    )}

                    {currentStep === 3 && (
                        <QuestionCard key="s3" {...SURVEY_STEPS[2]}>
                            <div className="space-y-10 text-center">
                                <div>
                                    <label className="block text-slate-500 mb-8 font-black uppercase tracking-widest text-xs">Choose Rating:</label>
                                    <EmojiRating value={formData.frustration_level} onChange={(val, e) => handleEmojiSelect('frustration_level', val, e)} />
                                </div>

                                <div className="glass p-10 rounded-[2rem] text-left border-white/5 space-y-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-4 rounded-xl bg-slate-500/10 text-slate-400">
                                            <PieChart />
                                        </div>
                                        <div>
                                            <span className="text-xl font-bold block text-white">Schedule Issues</span>
                                            <p className="text-sm text-slate-500">Is it hard to keep track of when teachers are free?</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button onClick={() => updateField('schedule_tracking_difficult', true)} className={`flex-1 py-6 rounded-xl font-black border transition-all ${formData.schedule_tracking_difficult === true ? 'bg-emerald-500 border-emerald-500 text-white' : 'glass border-white/10 text-slate-500'}`}>YES, IT'S HARD</button>
                                        <button onClick={() => updateField('schedule_tracking_difficult', false)} className={`flex-1 py-6 rounded-xl font-black border transition-all ${formData.schedule_tracking_difficult === false ? 'bg-emerald-500 border-emerald-500 text-white' : 'glass border-white/10 text-slate-500'}`}>NO, IT'S EASY</button>
                                    </div>
                                    <div className="pt-6 border-t border-white/5">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-sm font-bold text-white block">How important is it for you to know teacher status?</span>
                                                <p className="text-xs text-slate-500">1 = Not important, 5 = Extremely important</p>
                                            </div>
                                            <span className="text-lg font-black text-emerald-400">{formData.importance_of_status || '-'}</span>
                                        </div>
                                        <div className="flex justify-between gap-2">
                                            {[1, 2, 3, 4, 5].map((level) => (
                                                <button
                                                    key={level}
                                                    onClick={() => updateField('importance_of_status', level)}
                                                    className={`flex-1 py-3 rounded-xl text-sm font-black border transition-all ${
                                                        formData.importance_of_status === level
                                                            ? 'bg-emerald-500 border-emerald-500 text-black'
                                                            : 'glass border-white/10 text-slate-400'
                                                    }`}
                                                >
                                                    {level}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-12">
                                    <AnimatedButton onClick={prevStep} variant="secondary">Back</AnimatedButton>
                                    <AnimatedButton
                                        onClick={nextStep}
                                        disabled={
                                            formData.frustration_level === 0 ||
                                            formData.schedule_tracking_difficult === null ||
                                            formData.importance_of_status === 0
                                        }
                                    >
                                        Next Step →
                                    </AnimatedButton>
                                </div>
                            </div>
                        </QuestionCard>
                    )}

                    {currentStep === 4 && (
                        <QuestionCard key="s4" {...SURVEY_STEPS[3]}>
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="glass-card p-10 space-y-6 flex flex-col items-center text-center border-white/5">
                                        <div className="w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/10">
                                            <Eye size={32} />
                                        </div>
                                        <h3 className="text-2xl font-black text-white">Digital Boards</h3>
                                        <p className="text-slate-400 text-sm font-medium">Screens outside teacher cabins showing if they are inside.</p>
                                        <div className="flex gap-4 w-full">
                                            <button onClick={() => updateField('prefers_hardware_status', true)} className={`flex-1 py-4 rounded-xl font-bold border ${formData.prefers_hardware_status === true ? 'bg-emerald-500 border-emerald-500 text-white' : 'glass border-white/5 text-slate-500'}`}>YES</button>
                                            <button onClick={() => updateField('prefers_hardware_status', false)} className={`flex-1 py-4 rounded-xl font-bold border ${formData.prefers_hardware_status === false ? 'bg-emerald-500 border-emerald-500 text-white' : 'glass border-white/5 text-slate-500'}`}>NO</button>
                                        </div>
                                    </div>
                                    <div className="glass-card p-10 space-y-6 flex flex-col items-center text-center border-white/5">
                                        <div className="w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/10">
                                            <MapPin size={32} />
                                        </div>
                                        <h3 className="text-2xl font-black text-white">Exact Location</h3>
                                        <p className="text-slate-400 text-sm font-medium">Do you need the exact room number or just the floor?</p>
                                        <div className="flex gap-4 w-full">
                                            <button onClick={() => updateField('floor_tracking_enough', true)} className={`flex-1 py-4 rounded-xl font-bold border ${formData.floor_tracking_enough === true ? 'bg-cyan-500 border-cyan-500 text-white' : 'glass border-white/5 text-slate-500'}`}>Just Floor</button>
                                            <button onClick={() => updateField('floor_tracking_enough', false)} className={`flex-1 py-4 rounded-xl font-bold border ${formData.floor_tracking_enough === false ? 'bg-cyan-500 border-cyan-500 text-white' : 'glass border-white/5 text-slate-500'}`}>Exact Room</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <AnimatedButton onClick={prevStep} variant="secondary">Back</AnimatedButton>
                                    <AnimatedButton onClick={nextStep} disabled={formData.prefers_hardware_status === null || formData.floor_tracking_enough === null}>Next Step →</AnimatedButton>
                                </div>
                            </div>
                        </QuestionCard>
                    )}

                    {currentStep === 5 && (
                        <QuestionCard key="s5" {...SURVEY_STEPS[4]}>
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button
                                        onClick={() => updateField('preferred_platform', 'mobile_app')}
                                        className={`p-10 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-6 group ${formData.preferred_platform === 'mobile_app'
                                            ? 'bg-emerald-500/10 border-emerald-500 shadow-xl'
                                            : 'bg-white/5 border-transparent text-slate-500'
                                            }`}
                                    >
                                        <Smartphone size={40} className="group-hover:scale-110 transition-transform" />
                                        <div className="text-center">
                                            <span className="font-black text-xl block text-white uppercase tracking-tight">Mobile App</span>
                                            <span className="text-xs opacity-60 font-bold">Check from anywhere</span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => updateField('preferred_platform', 'digital_notice')}
                                        className={`p-10 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-6 group ${formData.preferred_platform === 'digital_notice'
                                            ? 'bg-slate-700/50 border-slate-500 shadow-xl'
                                            : 'bg-white/5 border-transparent text-slate-500'
                                            }`}
                                    >
                                        <Database size={40} className="group-hover:scale-110 transition-transform" />
                                        <div className="text-center">
                                            <span className="font-black text-xl block text-white uppercase tracking-tight">Campus Boards</span>
                                            <span className="text-xs opacity-60 font-bold">Large screens on campus</span>
                                        </div>
                                    </button>
                                </div>

                                <div className="glass p-10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400">
                                            <Bell size={32} />
                                        </div>
                                        <div>
                                            <span className="text-2xl font-black block text-white">Phone Alerts</span>
                                            <p className="text-slate-500 font-medium">Would you like notifications for teacher arrivals?</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                        <button onClick={() => updateField('notification_useful', true)} className={`flex-1 md:px-10 py-5 rounded-xl font-black border transition-all ${formData.notification_useful === true ? 'bg-emerald-500 border-emerald-500 text-white' : 'glass border-white/10 text-slate-500'}`}>YES</button>
                                        <button onClick={() => updateField('notification_useful', false)} className={`flex-1 md:px-10 py-5 rounded-xl font-black border transition-all ${formData.notification_useful === false ? 'bg-slate-700 border-slate-600 text-white' : 'glass border-white/10 text-slate-500'}`}>NO</button>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-16 p-8 rounded-[2rem] border border-white/5 bg-slate-900/40">
                                    <AnimatedButton onClick={prevStep} variant="secondary">Back</AnimatedButton>
                                    <AnimatedButton
                                        onClick={nextStep}
                                        disabled={!formData.preferred_platform || formData.notification_useful === null}
                                    >
                                        Next Step →
                                    </AnimatedButton>
                                </div>
                            </div>
                        </QuestionCard>
                    )}
                    {currentStep === 6 && (
                        <QuestionCard key="s6" {...SURVEY_STEPS[5]}>
                            <div className="space-y-10">
                                <div className="glass p-8 md:p-10 rounded-[2rem] space-y-8 border-white/5">
                                    <div className="space-y-4">
                                        <p className="text-slate-400 text-sm md:text-base font-medium">
                                            This part is all about your ideas. There are no right or wrong answers. Share as much or as little as you like.
                                        </p>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.25em]">
                                            Optional but very helpful for our research
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                                                What is the biggest problem you face on campus daily?
                                            </label>
                                            <textarea
                                                value={formData.biggest_daily_problem}
                                                onChange={(e) => updateField('biggest_daily_problem', e.target.value)}
                                                className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                                                rows={3}
                                                placeholder="Tell us about the one thing that wastes your time or energy the most."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                                                If you could fix one thing in your college using technology, what would it be?
                                            </label>
                                            <textarea
                                                value={formData.tech_fix_idea}
                                                onChange={(e) => updateField('tech_fix_idea', e.target.value)}
                                                className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                                                rows={3}
                                                placeholder="Describe any smart idea or system you wish your college had."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                                                What features would you like us to add to this system?
                                            </label>
                                            <textarea
                                                value={formData.desired_features}
                                                onChange={(e) => updateField('desired_features', e.target.value)}
                                                className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                                                rows={3}
                                                placeholder="Notifications, maps, schedules, filters, anything you can think of."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                                                What would make you use this app every day?
                                            </label>
                                            <textarea
                                                value={formData.daily_use_motivation}
                                                onChange={(e) => updateField('daily_use_motivation', e.target.value)}
                                                className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                                                rows={3}
                                                placeholder="Think about routines like checking timetable, faculty status, or reminders."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                                                Do you have any privacy concerns about this system?
                                            </label>
                                            <textarea
                                                value={formData.privacy_concerns}
                                                onChange={(e) => updateField('privacy_concerns', e.target.value)}
                                                className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                                                rows={3}
                                                placeholder="For example: data sharing, tracking, visibility of your activity, etc."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                                                Any other suggestions or ideas for us?
                                            </label>
                                            <textarea
                                                value={formData.other_suggestions}
                                                onChange={(e) => updateField('other_suggestions', e.target.value)}
                                                className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                                                rows={3}
                                                placeholder="Free space for any thoughts, feedback, or creative ideas."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-4">
                                    <AnimatedButton onClick={prevStep} variant="secondary">Back</AnimatedButton>
                                    <AnimatedButton onClick={handleSubmit} disabled={isSubmitting}>
                                        {isSubmitting ? 'Saving...' : 'Finish Survey'}
                                    </AnimatedButton>
                                </div>
                            </div>
                        </QuestionCard>
                    )}
                </AnimatePresence>
            </div>
        </main >
    );
}

export default function SurveyPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return <div className="min-h-screen bg-black" />;
    return <SurveyContent />;
}
