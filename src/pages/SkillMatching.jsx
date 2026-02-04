import React, { useState } from 'react';
import { Plus, X, CheckCircle, AlertCircle, Briefcase, Upload, Loader2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Groq from 'groq-sdk';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const SkillMatching = () => {
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [jobs, setJobs] = useState([]); // Dynamic jobs
    const [loadingJobs, setLoadingJobs] = useState(false); // Loading state
    const [isUploading, setIsUploading] = useState(false);

    // Initialize Groq
    const apiKey = import.meta.env.VITE_GROQ_API_KEY || "";
    const groq = apiKey ? new Groq({ apiKey, dangerouslyAllowBrowser: true }) : null;

    // Fetch Jobs based on Skills
    const fetchMatchingJobs = async () => {
        if (!groq) {
            alert("API Key missing.");
            return;
        }
        if (skills.length === 0) {
            alert("Please add at least one skill first.");
            return;
        }

        setLoadingJobs(true);
        try {
            const prompt = `
                Based on these skills: ${skills.join(', ')}, suggest 4 matching job roles and 2 aspirational (reach) roles.
                Return purely a JSON array with objects containing:
                - title (e.g. 'Frontend Developer')
                - id (unique string)
                - requiredSkills (array of 5-8 key technical skills for this role)
                - description (short 10-word summary)
                Do not include markdown. Just key-value JSON.
            `;

            const completion = await groq.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "llama-3.3-70b-versatile",
            });

            const text = completion.choices[0]?.message?.content || "[]";
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

            try {
                const fetchedJobs = JSON.parse(cleanText);
                if (Array.isArray(fetchedJobs)) {
                    setJobs(fetchedJobs);
                }
            } catch (e) {
                console.error("JSON parse error", e);
            }

        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoadingJobs(false);
        }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // 1. Extract Text from PDF
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + ' ';
            }

            // 2. Extract Skills using Groq
            if (!groq) throw new Error("Groq API Key missing");

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are an expert resume parser. Extract a list of technical skills from the provided resume text. Return ONLY a comma-separated list of skills (e.g., 'React, Python, SQL'). Do not include any introductory text or labels."
                    },
                    { role: "user", content: fullText }
                ],
                model: "llama-3.3-70b-versatile",
            });

            const extractedSkillsString = completion.choices[0]?.message?.content || "";
            const newSkills = extractedSkillsString.split(',').map(s => s.trim()).filter(s => s.length > 0);

            // 3. Update State
            // Filter duplicates
            const uniqueNewSkills = newSkills.filter(s => !skills.includes(s));
            setSkills(prev => [...prev, ...uniqueNewSkills]);
            // Optional: Auto-fetch jobs after upload?
            // fetchMatchingJobs(); 

        } catch (error) {
            console.error("Resume parsing error:", error);
            alert("Failed to extract skills from resume. Please try again or enter manually.");
        } finally {
            setIsUploading(false);
            e.target.value = null; // Reset input
        }
    };

    const addSkill = (e) => {
        e.preventDefault();
        if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
            setSkills([...skills, currentSkill.trim()]);
            setCurrentSkill('');
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
                <p className="text-[var(--text-secondary)]">Enter your skills to find AI-curated job roles that fit your profile.</p>
            </div>

            <div className="glass-panel p-6">
                <form onSubmit={addSkill} className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={currentSkill}
                            onChange={(e) => setCurrentSkill(e.target.value)}
                            placeholder="e.g. React, Python, Figma"
                            className="input-field w-full"
                        />
                    </div>
                    <button type="submit" className="btn-primary justify-center flex items-center gap-2 px-6">
                        <Plus size={20} /> Add
                    </button>

                    <div className="relative w-full md:w-auto">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleResumeUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                            disabled={isUploading}
                        />
                        <button type="button" className={`w-full md:w-auto py-3 px-6 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all flex items-center justify-center gap-2 font-medium ${isUploading ? 'opacity-70 cursor-wait' : ''}`}>
                            {isUploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                            {isUploading ? 'Parsing...' : 'Upload Resume'}
                        </button>
                    </div>
                </form>

                <div className="flex flex-wrap gap-2 min-h-[50px] mb-6">
                    <AnimatePresence>
                        {skills.map(skill => (
                            <motion.span
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                key={skill}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-sm"
                            >
                                {skill}
                                <button onClick={() => removeSkill(skill)} className="hover:text-red-400">
                                    <X size={14} />
                                </button>
                            </motion.span>
                        ))}
                    </AnimatePresence>
                    {skills.length === 0 && <p className="text-[var(--text-secondary)] text-sm italic py-2">No skills added yet. Add manually or upload a resume.</p>}
                </div>

                {skills.length > 0 && (
                    <div className="flex justify-center border-t border-[var(--glass-border)] pt-6">
                        <button
                            onClick={fetchMatchingJobs}
                            disabled={loadingJobs}
                            className="btn-primary w-full md:w-auto text-lg px-8 py-3 shadow-xl shadow-indigo-500/20"
                        >
                            {loadingJobs ? (
                                <><Loader2 className="animate-spin" /> Searching Jobs...</>
                            ) : (
                                <><Briefcase /> Find Matching Jobs</>
                            )}
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {jobs.map((job) => {
                    const { percentage, missing } = calculateMatch(job);
                    return (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
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

            {jobs.length === 0 && !loadingJobs && skills.length > 0 && (
                <div className="text-center text-[var(--text-secondary)] mt-8">
                    <p>Click "Find Matching Jobs" to see opportunities tailored to your skills.</p>
                </div>
            )}
        </div>
    );
};

export default SkillMatching;
