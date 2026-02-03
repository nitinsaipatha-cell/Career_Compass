import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  Bot, 
  Target, 
  BookOpen, 
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
      <aside className="hidden md:flex flex-col w-64 glass-panel m-4 mr-0 p-4 h-[calc(100vh-2rem)] sticky top-4">
        <div className="flex items-center gap-2 px-4 py-6 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
            <TrendingUp size={20} color="white" />
          </div>
          <h1 className="text-xl font-bold heading-gradient">CareerPath</h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[var(--accent-primary)] text-white shadow-lg shadow-purple-500/20' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="glass-panel p-4 rounded-xl bg-gradient-to-br from-[var(--bg-secondary)] to-transparent border-0">
            <p className="text-xs text-[var(--text-secondary)] mb-2">Pro Tip</p>
            <p className="text-sm font-medium">Update your skills regularly for better matches.</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none px-4 py-3 flex justify-between items-center bg-[var(--bg-primary)]/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
            <TrendingUp size={20} color="white" />
          </div>
          <h1 className="text-xl font-bold heading-gradient">CareerPath</h1>
        </div>
        <button onClick={toggleMobileMenu} className="p-2 text-[var(--text-primary)]">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
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
                    `flex items-center gap-3 px-4 py-4 rounded-xl text-lg ${
                      isActive 
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
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 w-full max-w-7xl mx-auto overflow-x-hidden">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
