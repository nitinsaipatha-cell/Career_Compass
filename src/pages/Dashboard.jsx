import React from 'react';
import { ArrowRight, TrendingUp, Star, Zap, Bot, Bell, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, title, value, trend, colorClass, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="glass-panel p-6 relative overflow-hidden group hover:border-[var(--accent-primary)]/30 transition-all duration-300"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${colorClass}-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-${colorClass}-500/20 transition-all duration-500`}></div>

        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-${colorClass}-400 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} />
            </div>
            {trend && (
                <span className="text-xs font-semibold px-2 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                    {trend}
                </span>
            )}
        </div>

        <div className="relative z-10">
            <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-1">{title}</h3>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
    </motion.div>
);

const Dashboard = () => {
    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-bold heading-gradient mb-2">Welcome Back, Student!</h1>
                    <p className="text-[var(--text-secondary)] text-lg">Your career journey is looking bright today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="p-2.5 rounded-xl glass-panel hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white transition-colors">
                        <Bell size={20} />
                    </button>
                    <button className="p-2.5 rounded-xl glass-panel hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white transition-colors">
                        <Award size={20} />
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={TrendingUp}
                    title="Top Trending Job"
                    value="AI Ethics Specialist"
                    trend="+12% growth"
                    colorClass="purple"
                    delay={0.1}
                />
                <StatCard
                    icon={Star}
                    title="Best Match for You"
                    value="Frontend Developer"
                    colorClass="cyan" // Note: Tailwind classes like text-cyan-400 need to be safe-listed or used directly if not using full TW
                    delay={0.2}
                />
                <StatCard
                    icon={Zap}
                    title="Learning Streak"
                    value="5 Days"
                    trend="Keep it up!"
                    colorClass="yellow"
                    delay={0.3}
                />
            </div>

            {/* Action Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 glass-panel p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Recommended Actions</h2>
                        <Link to="/courses" className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] flex items-center gap-1 font-medium transition-colors">
                            View Roadmap <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {[
                            { title: "Complete 'React Basics' module", time: "2h remaining", type: "Course" },
                            { title: "Update your skills profile", time: "Quick task", type: "Profile" },
                            { title: "Review new  'Data Science' trends", time: "New Insight", type: "Market" }
                        ].map((action, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)]/40 hover:bg-[var(--bg-secondary)]/80 border border-transparent hover:border-[var(--glass-border)] transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
                                        {i === 0 ? <Bot size={20} /> : i === 1 ? <Star size={20} /> : <TrendingUp size={20} />}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold group-hover:text-white transition-colors">{action.title}</h3>
                                        <p className="text-xs text-[var(--text-secondary)]">{action.time}</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--glass-border)]">
                                    {action.type}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="glass-panel p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 to-transparent"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-2xl rotate-3 flex items-center justify-center mb-6 shadow-xl shadow-purple-500/20 animate-float">
                            <Bot size={40} color="white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Career Confused?</h2>
                        <p className="text-[var(--text-secondary)] mb-8 text-sm leading-relaxed">
                            Our AI Mentor analyzes your profile to give personalized advice 24/7.
                        </p>
                        <Link to="/mentor" className="btn-primary w-full flex items-center justify-center gap-2 group">
                            Chat Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
