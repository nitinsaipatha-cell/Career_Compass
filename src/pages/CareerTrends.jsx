import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
    { name: 'AI Eng', growth: 95, color: '#8b5cf6' },
    { name: 'Data Sci', growth: 85, color: '#6366f1' },
    { name: 'Security', growth: 78, color: '#3b82f6' },
    { name: 'Cloud', growth: 70, color: '#06b6d4' },
    { name: 'UX/UI', growth: 60, color: '#10b981' },
    { name: 'Product', growth: 55, color: '#f59e0b' },
];

const cards = [
    { role: 'AI Engineering', salary: '$160k+', demand: 'Very High', growth: '+45%', desc: 'Designing and deploying intelligent systems.' },
    { role: 'Full Stack Dev', salary: '$120k+', demand: 'High', growth: '+22%', desc: 'Building comprehensive web solutions.' },
    { role: 'Cybersecurity', salary: '$140k+', demand: 'Critical', growth: '+35%', desc: 'Protecting enterprise digital assets.' },
];

const CareerTrends = () => {
    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold heading-gradient mb-2">Market Watch</h1>
                <p className="text-[var(--text-secondary)]">Real-time insights into the fastest growing tech careers.</p>
            </div>

            <div className="glass-panel p-6 h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Growth Velocity Index (2025)</h2>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span> High Demand
                        <span className="w-2 h-2 rounded-full bg-[var(--success)]"></span> Stable
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="growth" radius={[6, 6, 0, 0]} animationDuration={1500}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="glass-panel p-6 hover:border-[var(--accent-primary)]/50 transition-colors group cursor-default"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2.5 bg-[#8b5cf6]/10 rounded-xl text-[#8b5cf6]">
                                <TrendingUp size={20} />
                            </div>
                            <div className="flex items-center gap-1 text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full text-xs font-bold border border-[#10b981]/20">
                                <ArrowUpRight size={12} />
                                {card.growth}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">{card.role}</h3>
                        <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">{card.desc}</p>

                        <div className="grid grid-cols-2 gap-4 border-t border-[var(--glass-border)] pt-4">
                            <div>
                                <p className="text-xs text-[var(--text-secondary)] mb-1">Avg Salary</p>
                                <p className="font-semibold text-sm">{card.salary}</p>
                            </div>
                            <div>
                                <p className="text-xs text-[var(--text-secondary)] mb-1">Demand Level</p>
                                <p className="font-semibold text-sm text-[var(--warning)]">{card.demand}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CareerTrends;
