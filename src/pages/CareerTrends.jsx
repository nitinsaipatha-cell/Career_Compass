import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { TrendingUp, ArrowUpRight, ChevronDown, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Groq from 'groq-sdk';

// Fallback Data
const staticSectorData = {
    'Computer Science': [
        { role: 'AI Engineering', salary: '₹20-45 LPA', demand: 'Very High', growth: '+45%', desc: 'Designing and deploying intelligent systems.' },
        { role: 'Full Stack Dev', salary: '₹10-25 LPA', demand: 'High', growth: '+22%', desc: 'Building comprehensive web solutions.' },
        { role: 'Cybersecurity', salary: '₹15-30 LPA', demand: 'Critical', growth: '+35%', desc: 'Protecting enterprise digital assets.' },
        { role: 'Cloud Architect', salary: '₹25-40 LPA', demand: 'Very High', growth: '+28%', desc: 'Designing scalable cloud infrastructure.' }
    ],
    'Business': [
        { role: 'Product Manager', salary: '₹18-35 LPA', demand: 'High', growth: '+18%', desc: 'Leading product strategy and development.' },
        { role: 'Data Analyst', salary: '₹8-18 LPA', demand: 'Very High', growth: '+25%', desc: 'Interpreting complex data for business insights.' },
        { role: 'Digital Marketer', salary: '₹6-15 LPA', demand: 'Steady', growth: '+12%', desc: 'Driving growth through digital channels.' },
        { role: 'FinTech Analyst', salary: '₹12-28 LPA', demand: 'High', growth: '+30%', desc: 'Analyzing financial technology trends.' }
    ],
    'Design': [
        { role: 'UX Researcher', salary: '₹10-22 LPA', demand: 'High', growth: '+20%', desc: 'Understanding user behaviors and needs.' },
        { role: 'UI Designer', salary: '₹8-20 LPA', demand: 'High', growth: '+15%', desc: 'Creating intuitive and visual interfaces.' },
        { role: '3D Artist', salary: '₹6-18 LPA', demand: 'Niche', growth: '+25%', desc: 'Creating 3D models for games and VR.' },
        { role: 'Brand Identity', salary: '₹8-16 LPA', demand: 'Steady', growth: '+10%', desc: 'Shaping visual brand strategies.' }
    ],
    'Architecture': [
        { role: 'Sustainable Architect', salary: '₹12-25 LPA', demand: 'Very High', growth: '+40%', desc: 'Designing eco-friendly buildings.' },
        { role: 'Urban Planner', salary: '₹10-20 LPA', demand: 'Steady', growth: '+12%', desc: 'Designing functional city layouts.' },
        { role: 'BIM Specialist', salary: '₹8-18 LPA', demand: 'High', growth: '+35%', desc: 'Managing digital building information models.' },
        { role: 'Landscape Architect', salary: '₹6-14 LPA', demand: 'Moderate', growth: '+8%', desc: 'Designing outdoor public spaces.' }
    ]
};

const chartData = [
    { name: 'AI/ML', growth: 95, color: '#8b5cf6' },
    { name: 'Sustain.', growth: 88, color: '#10b981' },
    { name: 'Data', growth: 82, color: '#3b82f6' },
    { name: 'Security', growth: 78, color: '#ef4444' },
    { name: 'Cloud', growth: 70, color: '#06b6d4' },
    { name: 'UX/UI', growth: 65, color: '#f59e0b' },
];

const CareerTrends = () => {
    const [selectedSector, setSelectedSector] = useState('Computer Science');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [insights, setInsights] = useState(staticSectorData['Computer Science']);
    const [loading, setLoading] = useState(false);
    const [aiPowered, setAiPowered] = useState(false);
    const [debugError, setDebugError] = useState(null);

    // Initialize Groq (Safely handle missing key)
    const apiKey = import.meta.env.VITE_GROQ_API_KEY || "";
    const groq = apiKey ? new Groq({ apiKey, dangerouslyAllowBrowser: true }) : null;

    const fetchCareerInsights = async (sector) => {
        setLoading(true);
        setDebugError(null);

        // Fallback usage if no key is present
        if (!groq) {
            console.warn("No Groq API Key found. Using static data.");
            setDebugError("Missing Groq API Key");
            setInsights(staticSectorData[sector] || []);
            setAiPowered(false);
            setLoading(false);
            return;
        }

        try {
            const prompt = `Generate 4 emerging career roles for the sector '${sector}' for the year 2025. 
            Return strictly a JSON array with objects containing these keys: 'role', 'salary' (e.g. ₹15-25 LPA), 'demand' (e.g. High, Very High), 'growth' (e.g. +20%), 'desc' (short description). 
            Do not include markdown formatting like \`\`\`json. Just return the raw JSON string.`;

            const completion = await groq.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "llama-3.3-70b-versatile",
            });

            const text = completion.choices[0].message.content;
            console.log("Groq Response:", text); // Debugging

            // Clean markdown if present
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

            try {
                const data = JSON.parse(cleanText);
                if (Array.isArray(data)) {
                    setInsights(data);
                    setAiPowered(true);
                } else {
                    throw new Error("Response was not an array");
                }
            } catch (err) {
                console.error("JSON Parse Error:", err);
                throw new Error("Failed to parse AI response. Check console.");
            }
        } catch (error) {
            console.error("AI Fetch Error:", error);
            setDebugError(error.message || "Unknown Error");
            setInsights(staticSectorData[sector] || []);
            setAiPowered(false);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on sector change
    useEffect(() => {
        fetchCareerInsights(selectedSector);
    }, [selectedSector]);


    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-bold heading-gradient mb-2">Market Watch</h1>
                    <p className="text-[var(--text-secondary)] flex items-center gap-2">
                        Real-time insights into emerging careers.
                        {aiPowered && (
                            <span className="flex items-center gap-1 text-xs font-medium text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-0.5 rounded-full border border-[var(--accent-primary)]/20">
                                <Sparkles size={10} /> Live AI Data
                            </span>
                        )}
                        {debugError && (
                            <span className="text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">
                                Error: {debugError}
                            </span>
                        )}
                    </p>
                </div>

                {/* Sector Selector */}
                <div className="relative z-20">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-medium transition-all duration-300 min-w-[180px] justify-between backdrop-blur-md text-[var(--text-primary)]"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span>
                            {selectedSector}
                        </span>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-[180px] bg-[#1e1e1e] rounded-xl shadow-2xl p-1 border border-white/10 overflow-hidden z-50"
                            >
                                <div className="flex flex-col gap-1">
                                    {Object.keys(staticSectorData).map((sector) => (
                                        <button
                                            key={sector}
                                            onClick={() => {
                                                setSelectedSector(sector);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 
                                                ${selectedSector === sector
                                                    ? 'bg-white text-black shadow-md'
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            {sector}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
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
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                            contentStyle={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--glass-border)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', color: 'var(--text-primary)' }}
                            itemStyle={{ color: 'var(--text-primary)' }}
                        />
                        <Bar dataKey="growth" radius={[6, 6, 0, 0]} animationDuration={1500}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    Emerging Careers in <span className="text-[var(--accent-primary)]">{selectedSector}</span>
                    {loading && <Loader2 className="animate-spin text-[var(--accent-primary)]" size={20} />}
                </h2>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="glass-panel p-6 h-48 animate-pulse bg-black/5 border-black/5"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode='wait'>
                            {insights.map((card, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={`${selectedSector}-${i}`}
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

                                    <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--accent-primary)] transition-colors line-clamp-1">{card.role}</h3>
                                    <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed h-10 line-clamp-2">{card.desc}</p>

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
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerTrends;
