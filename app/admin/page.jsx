'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    BarChart3,
    PieChart as PieChartIcon,
    Clock,
    AlertCircle,
    Download,
    RefreshCw,
    Search,
    Filter,
    Shield,
    Database,
    Zap,
    LayoutDashboard,
    ArrowUpRight,
    LogOut,
    Activity,
    Cpu
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import { supabase } from '@/lib/supabase';

const COLORS = ['#00f5a0', '#00d9ff', '#10b981', '#14b8a6', '#5eead4', '#38bdf8'];

export default function AdminDashboard() {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        avgFrustration: 0,
        missedWorkCount: 0,
        wantsApp: 0
    });
    const [activeTab, setActiveTab] = useState('overview');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem('admin_access');
        if (auth === 'true') {
            setIsAuthenticated(true);
            fetchData();
        } else {
            router.push('/admin/login');
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('survey_responses')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setResponses(data);
                calculateStats(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const total = data.length;
        const avgFrustration = (data.reduce((acc, curr) => acc + (curr.frustration_level || 0), 0) / total || 0).toFixed(1);
        const missedWorkCount = data.filter(r => r.missed_work).length;
        const wantsApp = data.filter(r => r.wants_mobile_app).length;

        setStats({ total, avgFrustration, missedWorkCount, wantsApp });
    };

    const getChartData = () => {
        const timeData = [
            { name: '0-10m', value: responses.filter(r => r.time_spent_searching === '0-10').length },
            { name: '10-30m', value: responses.filter(r => r.time_spent_searching === '10-30').length },
            { name: '30m+', value: responses.filter(r => r.time_spent_searching === '30+').length },
        ];

        const platformData = [
            { name: 'Mobile App', value: responses.filter(r => r.wants_mobile_app).length },
            { name: 'Digital Notice', value: responses.filter(r => r.prefers_digital_notice).length },
        ];

        return { timeData, platformData };
    };

    const exportToCSV = () => {
        if (!responses.length) return;
        const headers = Object.keys(responses[0]).join(',');
        const rows = responses.map(r => Object.values(r).join(',')).join('\n');
        const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "profhere_survey_data.csv");
        document.body.appendChild(link);
        link.click();
    };

    const getAnalyticsData = () => {
        const importanceCounts = [1, 2, 3, 4, 5].map(level => ({
            level: String(level),
            value: responses.filter(r => r.importance_of_status === level).length
        }));

        const cabinReliabilityData = [
            { name: 'Reliable', value: responses.filter(r => r.cabin_check_reliable === true).length },
            { name: 'Not Reliable', value: responses.filter(r => r.cabin_check_reliable === false).length }
        ];

        const scheduleDifficultyData = [
            { name: 'Hard', value: responses.filter(r => r.schedule_tracking_difficult === true).length },
            { name: 'Easy', value: responses.filter(r => r.schedule_tracking_difficult === false).length }
        ];

        const wordOfMouthData = [
            { name: 'Ask Friends', value: responses.filter(r => r.relies_on_word_of_mouth === true).length },
            { name: 'Go & Check', value: responses.filter(r => r.relies_on_word_of_mouth === false).length }
        ];

        return { importanceCounts, cabinReliabilityData, scheduleDifficultyData, wordOfMouthData };
    };

    const { timeData, platformData } = getChartData();
    const { importanceCounts, cabinReliabilityData, scheduleDifficultyData, wordOfMouthData } = getAnalyticsData();

    if (!isAuthenticated) return null;

    return (
        <main className="min-h-screen bg-transparent text-white pb-32 overflow-hidden relative">


            {/* Header */}
            <header className="glass m-8 p-8 rounded-[3rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 sticky top-8 z-50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl text-black">
                        <LayoutDashboard size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter">Prof<span className="neon-text">Here</span> Admin</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500">Dashboard for Survey Results</p>
                    </div>
                </div>

                <nav className="flex items-center glass p-1.5 rounded-2xl border-white/5">
                    {['Overview', 'Survey Data', 'Analytics'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab === 'Survey Data' ? 'data' : tab === 'Analytics' ? 'modeling' : 'overview')}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${(activeTab === 'data' ? 'Survey Data' : activeTab === 'modeling' ? 'Analytics' : 'Overview') === tab
                                ? 'bg-white text-black shadow-2xl'
                                : 'text-slate-500 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={fetchData}
                        className="p-4 glass rounded-2xl text-emerald-400 hover:bg-emerald-500/10 transition-all"
                        disabled={loading}
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={exportToCSV}
                        className="btn-vibrant !py-4 !px-8 text-[10px]"
                    >
                        Export Data
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_access');
                            router.push('/admin/login');
                        }}
                        className="p-4 glass rounded-2xl text-slate-500 hover:text-white transition-all hover:bg-white/5"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-8 mt-20">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
                    {[
                        { label: 'Total Surveys', value: stats.total, icon: <Users />, color: 'emerald' },
                        { label: 'Trouble Level', value: stats.avgFrustration, icon: <AlertCircle />, color: 'cyan' },
                        { label: 'Classes Missed', value: stats.missedWorkCount, icon: <Clock />, color: 'emerald' },
                        { label: 'App Votes', value: stats.wantsApp, icon: <Zap />, color: 'cyan' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="glass-card p-12 group relative overflow-hidden text-center md:text-left"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className={`p-5 rounded-[2rem] bg-white/5 text-${stat.color}-400 group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-2xl`}>
                                    {stat.icon}
                                </div>
                                <ArrowUpRight className="text-slate-800" />
                            </div>
                            <h3 className="text-6xl font-black text-white mb-2 tracking-tighter">{stat.value}</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">{stat.label}</p>

                            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>
                        </motion.div>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Area Chart */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:col-span-2 glass-card p-12 h-[600px]"
                        >
                            <h3 className="text-xs font-black mb-12 flex items-center gap-4 text-emerald-400 uppercase tracking-[0.4em]">
                                <Activity size={16} />
                                Student Trouble Over Time
                            </h3>
                            <div className="h-full pb-20">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={responses.slice(0, 15).reverse()}>
                                        <defs>
                                            <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00f5a0" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#00f5a0" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="10 10" stroke="#ffffff05" vertical={false} />
                                        <XAxis dataKey="created_at" hide />
                                        <YAxis stroke="#ffffff10" tick={{ fontSize: 10, fontWeight: 900 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '1.5rem', padding: '1.5rem' }}
                                            labelStyle={{ display: 'none' }}
                                            itemStyle={{ color: '#00f5a0', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}
                                        />
                                        <Area type="monotone" dataKey="frustration_level" stroke="#00f5a0" strokeWidth={6} fillOpacity={1} fill="url(#neonGradient)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-10">
                            {/* Distribution Pie */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card p-10 h-[280px] flex items-center justify-between"
                            >
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Choice Distribution</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Mobile App</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Digital Board</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-32 h-32">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={platformData}
                                                innerRadius={45}
                                                outerRadius={60}
                                                paddingAngle={10}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                <Cell fill="#00f5a0" />
                                                <Cell fill="#00d9ff" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            {/* Latency Bars */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card p-10 h-[280px]"
                            >
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Time Spent Searching</h4>
                                <div className="h-full pb-14 text-white">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={timeData}>
                                            <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                                                {timeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={index === 2 ? '#00f5a0' : '#111'} stroke={index === 2 ? 'none' : '#ffffff10'} />
                                                ))}
                                            </Bar>
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#444' }} />
                                            <Tooltip cursor={{ fill: '#ffffff05' }} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}

                {activeTab === 'data' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card overflow-hidden !rounded-[3rem]"
                    >
                        <div className="p-12 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div>
                                <h3 className="text-4xl font-black mb-2 uppercase tracking-tighter">Student Feedback</h3>
                                <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">All submitted responses</p>
                            </div>
                            <div className="flex gap-4 w-full md:w-auto">
                                <div className="relative flex-1 md:w-80">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH RESPONSES..."
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-16 pr-8 text-[10px] font-black uppercase tracking-[0.3em] outline-none focus:border-white transition-all"
                                    />
                                </div>
                                <button className="p-5 glass rounded-2xl text-slate-500 hover:text-white transition-all">
                                    <Filter size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.02] text-slate-600 uppercase tracking-[0.4em] text-[10px] font-black">
                                    <tr>
                                        <th className="px-12 py-8">User ID</th>
                                        <th className="px-12 py-8">Search Time</th>
                                        <th className="px-12 py-8">Preference</th>
                                        <th className="px-12 py-8">Trouble Level</th>
                                        <th className="px-12 py-8">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 font-medium">
                                    {responses.map((response, i) => (
                                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-12 py-10 font-black text-slate-500 text-xs">USER_{response.id.slice(0, 8).toUpperCase()}</td>
                                            <td className="px-12 py-10">
                                                <div className="flex items-center gap-3">
                                                    <Clock size={16} className="text-slate-700" />
                                                    <span className="font-black text-white uppercase text-xs tracking-widest">{response.time_spent_searching}M</span>
                                                </div>
                                            </td>
                                            <td className="px-12 py-10">
                                                <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] ${response.wants_mobile_app ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
                                                    }`}>
                                                    {response.wants_mobile_app ? 'App' : 'Board'}
                                                </span>
                                            </td>
                                            <td className="px-12 py-10">
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4].map(star => (
                                                        <div key={star} className={`w-3 h-3 rounded-full ${star <= response.frustration_level ? 'bg-emerald-500 shadow-[0_0_15px_#00f5a0]' : 'bg-white/5'}`}></div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-12 py-10">
                                                <div className="flex items-center gap-3 text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em]">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
                                                    Saved
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
                {activeTab === 'modeling' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10"
                    >
                        <div className="lg:col-span-2 glass-card p-12 h-[420px]">
                            <h3 className="text-xs font-black mb-10 flex items-center gap-4 text-emerald-400 uppercase tracking-[0.4em]">
                                <BarChart3 size={16} />
                                Importance Of Status
                            </h3>
                            <div className="h-full pb-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={importanceCounts}>
                                        <CartesianGrid strokeDasharray="10 10" stroke="#ffffff05" vertical={false} />
                                        <XAxis dataKey="level" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#444' }} />
                                        <YAxis stroke="#ffffff10" tick={{ fontSize: 10, fontWeight: 900 }} allowDecimals={false} />
                                        <Tooltip cursor={{ fill: '#ffffff05' }} />
                                        <Bar dataKey="value" radius={[10, 10, 10, 10]} fill="#00f5a0" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-10">
                            <div className="glass-card p-10 h-[200px] flex items-center justify-between">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Cabin Check Reliability</h4>
                                    <div className="space-y-3 text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-white">Reliable</span>
                                            <span className="text-emerald-400">{cabinReliabilityData[0].value}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-white">Not Reliable</span>
                                            <span className="text-cyan-400">{cabinReliabilityData[1].value}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-28 h-28">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={cabinReliabilityData}
                                                innerRadius={38}
                                                outerRadius={54}
                                                paddingAngle={6}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                <Cell fill="#00f5a0" />
                                                <Cell fill="#00d9ff" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="glass-card p-10 h-[200px] flex flex-col justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4">Search Behaviour</h4>
                                <div className="space-y-4 text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-white">Schedule Hard</span>
                                        <span className="text-emerald-400">{scheduleDifficultyData[0].value}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-white">Schedule Easy</span>
                                        <span className="text-cyan-400">{scheduleDifficultyData[1].value}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/5">
                                        <span className="text-white">Ask Friends</span>
                                        <span className="text-emerald-400">{wordOfMouthData[0].value}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-white">Go & Check</span>
                                        <span className="text-cyan-400">{wordOfMouthData[1].value}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Status Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 glass px-12 py-4 rounded-full border-white/5 flex items-center gap-10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-50">
                <div className="flex items-center gap-3">
                    <Database size={16} className="text-slate-600" />
                    <span className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-600">PROFHERE_DB_CONNECTED</span>
                </div>
                <div className="h-6 w-[1px] bg-white/5"></div>
                <div className="flex items-center gap-3">
                    <Shield size={16} className="text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.6em] text-emerald-500">ADMIN_SECURE_SESSION</span>
                </div>
            </div>
        </main>
    );
}
