import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  TrendingUp,
  Bot,
  Target,
  BookOpen,
  LayoutDashboard,
  Menu,
  X,
  ChevronRight // Added import
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../context/AuthContext'; // Import useAuth

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth(); // Get user and signOut

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Career Trends', path: '/trends', icon: TrendingUp },
    { name: 'AI Career Mentor', path: '/mentor', icon: Bot },
    { name: 'Skill Matching', path: '/matching', icon: Target },
    { name: 'Courses', path: '/courses', icon: BookOpen },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-72 h-[calc(100vh-2rem)] sticky top-4 m-4 mr-0 rounded-3xl overflow-hidden glass-panel border-[var(--glass-border)] bg-[var(--bg-secondary)]/30 backdrop-blur-2xl shadow-2xl">
        {/* Logo Area */}
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <TrendingUp size={24} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">CareerPath</h1>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">Compass</p>
          </div>
        </div>

        {/* User Profile Snippet */}
        <div className="mx-4 mb-6 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 p-[2px]">
            <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
              <span className="font-bold text-xs">
                {user?.email ? user.email.substring(0, 2).toUpperCase() : 'US'}
              </span>
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-primary)] transition-colors">
              {user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-[var(--text-secondary)] truncate">Student Account</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 overflow-y-auto custom-scrollbar space-y-6">
          <p className="px-1 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4 mt-6 opacity-60">Main Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={{ textDecoration: 'none' }}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 group border relative overflow-hidden ${isActive
                  ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-[var(--text-primary)] shadow-xl shadow-[var(--accent-primary)]/20'
                  : 'bg-white/[0.02] border-white/[0.05] text-[var(--text-secondary)] hover:bg-white/10 hover:border-white/10 hover:text-[var(--text-primary)] hover:-translate-y-1'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-white/20' : 'bg-transparent group-hover:bg-white/10'}`}>
                      <item.icon
                        size={18}
                        className={`transition-colors duration-300 ${isActive ? 'text-[var(--text-primary)]' : 'text-slate-400 group-hover:text-[var(--text-primary)]'}`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </div>
                    <span className={`font-medium tracking-wide text-sm ${isActive ? 'text-[var(--text-primary)]' : ''}`}>
                      {item.name}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeChevron"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={16} className="text-[var(--text-primary)]/80" />
                    </motion.div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom Actions */}
        < div className="p-4 mt-auto space-y-4" >
          <div className="glass-panel p-5 rounded-2xl bg-gradient-to-br from-[#1e1b4b] to-[var(--bg-secondary)] border border-indigo-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[var(--accent-primary)]/20 rounded-full blur-xl group-hover:bg-[var(--accent-primary)]/30 transition-colors"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-indigo-300">
                <Target size={16} />
                <span className="text-xs font-bold uppercase">Pro Goal</span>
              </div>
              <p className="text-sm font-medium text-white mb-3">Complete "React Basics" to unlock new jobs!</p>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[70%] h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-400/10 transition-all text-sm font-medium group"
          >
            <div className="p-1 rounded bg-white/5 group-hover:bg-red-400/20 transition-colors">
              <X size={14} />
            </div>
            Sign Out
          </button>
        </div >
      </aside >

      {/* Mobile Header */}
      < div className="md:hidden fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none px-4 py-3 flex justify-between items-center bg-[var(--bg-primary)]/80" >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
            <TrendingUp size={20} color="white" />
          </div>
          <h1 className="text-xl font-bold heading-gradient">CareerPath</h1>
        </div>
        <button onClick={toggleMobileMenu} className="p-2 text-[var(--text-primary)]">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div >

      {/* Mobile Menu Overlay */}
      < AnimatePresence >
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-[var(--bg-primary)] pt-20 px-4"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-4 rounded-xl text-lg ${isActive
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'text-[var(--text-secondary)]'
                    }`
                  }
                >
                  <item.icon size={24} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence >

      {/* Main Content */}
      < main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 w-full max-w-7xl mx-auto overflow-x-hidden" >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main >
    </div >
  );
};

export default Layout;
