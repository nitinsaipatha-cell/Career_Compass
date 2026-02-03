import React, { useState } from 'react';
import { Plus, X, CheckCircle, AlertCircle, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const jobRoles = [
    {
        title: 'Frontend Developer',
        id: 'frontend',
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
        description: 'Build user-facing web applications.'
    },
    {
        title: 'Data Scientist',
        id: 'data-science',
        requiredSkills: ['Python', 'SQL', 'Math', 'Machine Learning', 'Pandas'],
        description: 'Analyze data to derive insights.'
    },
    {
        title: 'Backend Developer',
        id: 'backend',
        requiredSkills: ['Node.js', 'Python', 'Databases', 'API', 'Docker'],
        description: 'Server-side logic and database management.'
    },
    {
        title: 'UI/UX Designer',
        id: 'design',
        requiredSkills: ['Figma', 'Prototyping', 'User Research', 'Wireframing', 'Color Theory'],
        description: 'Design intuitive user experiences.'
    }
];

const SkillMatching = () => {
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [showResults, setShowResults] = useState(false);

    const addSkill = (e) => {
        e.preventDefault();
        if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
            setSkills([...skills, currentSkill.trim()]);
            setCurrentSkill('');
            setShowResults(true); // Update results in real-time
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const calculateMatch = (job) => {
        const normalize = (s) => s.toLowerCase();
        const userSkillsNorm = skills.map(normalize);
        const requiredNorm = job.requiredSkills.map(normalize);

        // Simple containment check
        const matches = job.requiredSkills.filter(req =>
            userSkillsNorm.some(u => normalize(u) === normalize(req) || normalize(u).includes(normalize(req)) || normalize(req).includes(normalize(u)))
        );

        const percentage = Math.round((matches.length / job.requiredSkills.length) * 100);
        const missing = job.requiredSkills.filter(req =>
            !userSkillsNorm.some(u => normalize(u) === normalize(req) || normalize(u).includes(normalize(req)) || normalize(req).includes(normalize(u)))
        );

        return { percentage, matches, missing };
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Skill-Job Matcher</h1>
                <p className="text-[var(--text-secondary)]">Enter your skills to see which careers fit you best.</p>
            </div>

            <div className="glass-panel p-6">
                <form onSubmit={addSkill} className="flex gap-4 mb-6">
                    <input
                        type="text"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        placeholder="e.g. React, Python, Figma"
                        className="input-field flex-1"
                    />
                    <button type="submit" className="btn-primary flex items-center gap-2">
                        <Plus size={20} /> Add Skill
                    </button>
                </form>

                <div className="flexflex-wrap gap-2 min-h-[50px]">
                    <AnimatePresence>
                        {skills.map(skill => (
                            <motion.span
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                key={skill}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-sm mr-2 mb-2"
                            >
                                {skill}
                                <button onClick={() => removeSkill(skill)} className="hover:text-red-400">
                                    <X size={14} />
                                </button>
                            </motion.span>
                        ))}
                    </AnimatePresence>
                    {skills.length === 0 && <p className="text-[var(--text-secondary)] text-sm italic">No skills added yet.</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {jobRoles.map((job) => {
                    const { percentage, missing } = calculateMatch(job);
                    return (
                        <motion.div
                            layout
                            key={job.id}
                            className="glass-panel p-6 flex flex-col justify-between border-t-4 border-t-transparent hover:border-t-[var(--accent-primary)] transition-all"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <Briefcase size={20} className="text-[var(--text-secondary)]" />
                                        {job.title}
                                    </h3>
                                    <div className={`text-xl font-bold ${percentage > 70 ? 'text-[var(--success)]' : percentage > 40 ? 'text-[var(--warning)]' : 'text-[var(--danger)]'}`}>
                                        {percentage}%
                                    </div>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">{job.description}</p>

                                <div className="mb-4">
                                    <div className="w-full bg-[var(--bg-primary)] rounded-full h-2.5 mb-2">
                                        <div
                                            className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${percentage > 70 ? 'bg-[var(--success)]' : percentage > 40 ? 'bg-[var(--warning)]' : 'bg-[var(--danger)]'}`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[var(--bg-primary)]/50 p-4 rounded-xl">
                                <p className="text-xs font-semibold uppercase text-[var(--text-secondary)] mb-2">Missing Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {missing.map(m => (
                                        <span key={m} className="px-2 py-1 text-xs rounded bg-red-500/10 text-red-300 border border-red-500/20">
                                            {m}
                                        </span>
                                    ))}
                                    {missing.length === 0 && (
                                        <span className="px-2 py-1 text-xs rounded bg-green-500/10 text-green-300 border border-green-500/20 flex items-center gap-1">
                                            <CheckCircle size={12} /> Perfect Match
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillMatching;
