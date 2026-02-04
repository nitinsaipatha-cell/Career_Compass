import React, { useState } from 'react';
import { BookOpen, Clock, Star, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const courses = [
    { id: 1, title: 'Meta Front-End Developer', level: 'Beginner', duration: '40h', rating: 4.8, category: 'Web Dev', link: 'https://www.coursera.org/professional-certificates/meta-front-end-developer' },
    { id: 2, title: 'Python for Data Science & AI', level: 'Beginner', duration: '25h', rating: 4.9, category: 'Data Science', link: 'https://www.coursera.org/learn/python-for-applied-data-science-ai' },
    { id: 3, title: 'Advanced React', level: 'Advanced', duration: '12h', rating: 4.7, category: 'Web Dev', link: 'https://www.coursera.org/learn/advanced-react' },
    { id: 4, title: 'Machine Learning Specialization', level: 'Intermediate', duration: '35h', rating: 4.9, category: 'AI', link: 'https://www.coursera.org/specializations/machine-learning-introduction' },
    { id: 5, title: 'Google UX Design Certificate', level: 'Beginner', duration: '15h', rating: 4.8, category: 'Design', link: 'https://www.coursera.org/professional-certificates/google-ux-design' },
    { id: 6, title: 'Google Cybersecurity Certificate', level: 'Intermediate', duration: '20h', rating: 4.8, category: 'Security', link: 'https://www.coursera.org/professional-certificates/google-cybersecurity' },
];

const Courses = () => {
    const [filter, setFilter] = useState('All');

    const filteredCourses = filter === 'All' ? courses : courses.filter(c => c.level === filter);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-bold heading-gradient mb-2">Learning Paths</h1>
                    <p className="text-[var(--text-secondary)]">Master in-demand skills with our curated curriculum.</p>
                </div>

                <div className="flex p-1 bg-[var(--bg-secondary)]/50 backdrop-blur-sm border border-[var(--glass-border)] rounded-xl relative overflow-x-auto max-w-full">
                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors z-10 ${filter === cat ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            {filter === cat && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-[var(--accent-primary)] rounded-lg -z-10 shadow-lg shadow-purple-500/20"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {filteredCourses.map((course) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            key={course.id}
                            className="glass-panel overflow-hidden group hover:border-[var(--accent-primary)]/50 transition-colors"
                        >
                            <div className="h-40 bg-gradient-to-br from-[#1e1b4b] to-[#2e1065] relative overflow-hidden">
                                {/* Decorative Pattern */}
                                <div className="absolute inset-0 opacity-20" style={{
                                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                                    backgroundSize: '16px 16px'
                                }}></div>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-3xl">
                                            {course.category === 'Web Dev' ? '💻' :
                                                course.category === 'Data Science' ? '📊' :
                                                    course.category === 'AI' ? '🤖' :
                                                        course.category === 'Design' ? '🎨' :
                                                            course.category === 'Security' ? '🛡️' : '📚'}
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute top-3 right-3 px-2 py-1 glass-panel text-[10px] font-bold uppercase tracking-wider bg-black/20 border-0 text-white/80">
                                    {course.category}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${course.level === 'Beginner' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10' :
                                        course.level === 'Intermediate' ? 'border-amber-500/20 text-amber-400 bg-amber-500/10' :
                                            'border-rose-500/20 text-rose-400 bg-rose-500/10'
                                        }`}>
                                        {course.level}
                                    </span>
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--glass-border)]">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs font-bold text-[var(--text-primary)]">{course.rating}</span>
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                                    {course.title}
                                </h3>

                                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] mb-6">
                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {course.duration}</span>
                                    <span className="flex items-center gap-1.5"><BookOpen size={14} /> 12 Modules</span>
                                </div>

                                <a
                                    href={course.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-2.5 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-white border border-[var(--glass-border)] hover:border-[var(--accent-primary)] transition-all font-medium text-sm flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/20"
                                >
                                    Start Learning <PlayCircle size={16} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Courses;
