import React from 'react';
import { TrendingUp, Bot, Target, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const DashboardCard = ({ to, icon: Icon, title, description, color, delay }) => (
    <Link to={to} className="block h-full" style={{ textDecoration: 'none' }}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="h-full glass-panel p-8 relative overflow-hidden group hover:border-[var(--accent-primary)]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1"
        >
            <div className={`absolute top-0 right-0 w-64 h-64 bg-${color}-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-${color}-500/10 transition-all duration-500`}></div>

            <div className="flex flex-col h-full relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center mb-6 text-${color}-400 group-hover:scale-110 group-hover:bg-${color}-500/20 transition-all duration-300`}>
                    <Icon size={28} />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--accent-primary)] transition-colors">{title}</h3>
                <p className="text-[var(--text-secondary)] mb-8 leading-relaxed flex-grow">
                    {description}
                </p>

                <div className={`flex items-center gap-2 text-${color}-400 font-medium group-hover:gap-3 transition-all`}>
                    Explore <ArrowRight size={18} />
                </div>
            </div>
        </motion.div>
    </Link>
);

const Dashboard = () => {
    const { user } = useAuth();
    const userName = user?.email?.split('@')[0] || 'Student';

    const features = [
        {
            to: "/trends",
            icon: TrendingUp,
            title: "Career Trends",
            description: "Deep dive into real-time market data to find the fastest-growing tech careers.",
            color: "purple",
            delay: 0.1
        },
        {
            to: "/mentor",
            icon: Bot,
            title: "AI Career Mentor",
            description: "Get personalized 24/7 career advice and roadmap planning from our AI.",
            color: "blue",
            delay: 0.2
        },
        {
            to: "/matching",
            icon: Target,
            title: "Skill Matching",
            description: "Analyze your current skill set and see how well you match with top job roles.",
            color: "emerald",
            delay: 0.3
        },
        {
            to: "/courses",
            icon: BookOpen,
            title: "Courses",
            description: "Featured courses and learning paths curated specifically for your goals.",
            color: "amber",
            delay: 0.4
        }
    ];

    return (
        <div className="space-y-8 pb-8 flex flex-col justify-center min-h-[80vh]">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold heading-gradient mb-4"
                >
                    Hello, {userName}!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[var(--text-secondary)] text-lg"
                >
                    Where would you like to focus your career journey today?
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
                {features.map((feature, index) => (
                    <DashboardCard key={index} {...feature} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
