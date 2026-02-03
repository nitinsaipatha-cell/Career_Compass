import React, { useState } from 'react';
import { BookOpen, Clock, Star, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const courses = [
    { id: 1, title: 'Complete Web Dev Bootcamp', level: 'Beginner', duration: '40h', rating: 4.8, category: 'Web Dev' },
    { id: 2, title: 'Python for Data Science', level: 'Beginner', duration: '25h', rating: 4.9, category: 'Data Science' },
    { id: 3, title: 'Advanced React Patterns', level: 'Advanced', duration: '12h', rating: 4.7, category: 'Web Dev' },
    { id: 4, title: 'Machine Learning A-Z', level: 'Intermediate', duration: '35h', rating: 4.6, category: 'AI' },
    { id: 5, title: 'UI/UX Design Masterclass', level: 'Beginner', duration: '15h', rating: 4.8, category: 'Design' },
    { id: 6, title: 'Cybersecurity Fundamentals', level: 'Intermediate', duration: '20h', rating: 4.5, category: 'Security' },
];

const Courses = () => {
    const [filter, setFilter] = useState('All');

    const filteredCourses = filter === 'All' ? courses : courses.filter(c => c.level === filter);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Recommended Courses</h1>
                    <p className="text-[var(--text-secondary)]">Curated learning paths to bridge your skill gaps.</p>
                </div>
                <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-lg">
                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === cat
                                    ? 'bg-[var(--bg-primary)] text-white shadow-sm'
                                    : 'text-[var(--text-secondary)] hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredCourses.map((course) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={course.id}
                            className="glass-panel overflow-hidden group cursor-pointer"
                        >
                            <div className="h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 relative">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                    <PlayCircle size={48} className="text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${course.level === 'Beginner' ? 'border-green-500/30 text-green-300 bg-green-500/10' :
                                            course.level === 'Intermediate' ? 'border-yellow-500/30 text-yellow-300 bg-yellow-500/10' :
                                                'border-red-500/30 text-red-300 bg-red-500/10'
                                        }`}>
                                        {course.level}
                                    </span>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-xs font-bold">{course.rating}</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                    {course.title}
                                </h3>
                                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                                    <span className="flex items-center gap-1"><BookOpen size={14} /> {course.category}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Courses;
