import React, { useState, useEffect } from 'react';
import {
  Search,
  MessageSquare,
  Bell,
  ChevronDown,
  ArrowRight,
  Clock,
  FileText,
  Sun,
  Moon,
  Menu,
  X,
  Calendar,
  Users,
  User,
} from 'lucide-react';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Brand Identity + Landing Page',
    status: 'Active',
    extraBadge: null,
    type: 'Solo',
    client: 'Ava (Client)',
    contractId: 'contract id',
    milestoneProgress: 1,
    milestoneTotal: 4,
    dueDate: 'Mar 15, 2026',
    daysLeft: 12,
    chats: 34,
    files: 12,
    nextStep: 'Logo directions',
    nextStepDate: 'Feb 20, 2026',
  },
  {
    id: '2',
    title: 'Monthly Content Ops (Retainer)',
    status: 'Active',
    extraBadge: 'Extension',
    type: 'Solo',
    client: 'Ava (Client)',
    contractId: 'contract id',
    milestoneProgress: 1,
    milestoneTotal: 4,
    dueDate: 'Mar 15, 2026',
    daysLeft: 12,
    chats: 34,
    files: 12,
    nextStep: 'Logo directions',
    nextStepDate: 'Feb 20, 2026',
  },
  {
    id: '3',
    title: 'Mobile App Development',
    status: 'Active',
    extraBadge: null,
    type: 'Teams',
    client: 'Zephyr Labs',
    contractId: 'CTR-4412-M',
    milestoneProgress: 3,
    milestoneTotal: 5,
    dueDate: 'Apr 02, 2026',
    daysLeft: 31,
    chats: 128,
    files: 45,
    nextStep: 'API Integration',
    nextStepDate: 'Mar 25, 2026',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Logo() {
  return (
    <div className="flex items-center cursor-pointer shrink-0">
      <span className="text-[28px] sm:text-[32px] font-black italic tracking-tight">
        <span 
          className="text-[#CEFF1B]" 
          style={{ WebkitTextStroke: '1.5px #000', textShadow: '2px 2px 0 #000' }}
        >
          ULTRA{' '}
        </span>
        <span
          className="text-[#CEFF1B]"
          style={{
            WebkitTextStroke: '1.5px #000',
            color: '#CEFF1B',
          }}
        >
          HUSTLE
        </span>
      </span>
    </div>
  );
}

function ActiveBadge({ label = 'Active', variant = 'active' }) {
  if (variant === 'extension') {
    return (
      <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 bg-white dark:bg-transparent whitespace-nowrap">
        {label}
      </span>
    );
  }
  return (
    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#CEFF1B] text-black whitespace-nowrap">
      {label}
    </span>
  );
}

function ProjectRow({ project }) {
  const progressPct = (project.milestoneProgress / project.milestoneTotal) * 100;

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-0 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
      {/* Left: Title + Milestones */}
      <div className="flex-1 p-4 sm:p-5 bg-white dark:bg-[#111111]">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{project.title}</span>
          <ActiveBadge label={project.status} variant="active" />
          {project.extraBadge && <ActiveBadge label={project.extraBadge} variant="extension" />}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
          {project.type} • {project.client} • {project.contractId}
        </p>

        <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
          <span>Milestones</span>
          <span>{project.milestoneProgress}/{project.milestoneTotal}</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden mb-3">
          <div
            className="bg-[#CEFF1B] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Next: {project.nextStep} &nbsp;•&nbsp; due {project.nextStepDate}
        </p>
      </div>

      {/* Middle: Due */}
      <div className="lg:w-[160px] border-l lg:border-l border-t lg:border-t-0 border-r lg:border-r-0 border-gray-200 dark:border-gray-700 p-4 sm:p-5 bg-white dark:bg-[#111111]">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">Due</p>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{project.dueDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{project.daysLeft} days left</span>
        </div>
      </div>

      {/* Right: Collaboration */}
      <div className="lg:w-[200px] border-l lg:border-l border-t lg:border-t-0 border-gray-200 dark:border-gray-700 p-4 sm:p-5 bg-white dark:bg-[#111111]">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">Collaboration</p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <MessageSquare className="w-4 h-4" />
            <span>{project.chats}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <FileText className="w-4 h-4" />
            <span>{project.files}</span>
          </div>
        </div>
        <button className="w-full bg-[#CEFF1B] hover:bg-[#e0ff4d] text-black text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all group">
          Open Workroom
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [viewType, setViewType] = useState('Teams');
  const [activeTab, setActiveTab] = useState('Active');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('Recent activity');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Filter projects based on viewType and search term
  const filtered = MOCK_PROJECTS.filter((p) => {
    const typeMatch = viewType === 'Solo' ? p.type === 'Solo' : p.type === 'Teams';
    const searchMatch = searchTerm === '' || 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] font-sans transition-colors duration-300">
      
      {/* ── Navbar with TOP Highlighter ── */}
      <div className="bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Highlighter Bar */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#CEFF1B]" />
          </div>
          
          <div className="py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <Logo />

              {/* Nav Links - Desktop */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Home
                </a>
                <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Marketplace
                </a>
                <div className="relative">
                  <a href="#" className="text-sm font-bold text-gray-900 dark:text-white">
                    Dashboard
                  </a>
                  {/* Highlighter for active nav item - positioned at top */}
                  <div className="absolute -top-[15px] sm:-top-[17px] left-0 right-0 h-[3px] bg-[#CEFF1B]" />
                </div>
              </div>

              {/* Search bar - Desktop */}
              <div className="hidden lg:block flex-1 max-w-[400px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1A1A1A] text-sm rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-[#CEFF1B] focus:ring-1 focus:ring-[#CEFF1B] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
              </div>

              {/* Right icons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button className="hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
                  <Bell className="w-4 h-4" />
                </button>
                <button className="hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
                  <User className="w-4 h-4" />
                </button>
                {/* Mobile menu button */}
                <button
                  className="md:hidden w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Search bar - Mobile (below logo row) */}
            <div className="mt-3 lg:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1A1A1A] text-sm rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-[#CEFF1B] focus:ring-1 focus:ring-[#CEFF1B] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-4 flex flex-col gap-3 transition-colors duration-300">
          <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">Home</a>
          <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">Marketplace</a>
          <a href="#" className="text-sm font-bold text-gray-900 dark:text-white py-2">Dashboard</a>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">Active Projects</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Track delivery work: milestones, deadlines, revisions, messages, files, and resolution.
          </p>
        </div>

        {/* Contracts Card */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm transition-colors duration-300">
          <div className="p-4 sm:p-6">
            {/* Header with Contracts and Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Contracts</h2>
                
                {/* Solo/Teams Toggle */}
                <div className="flex border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden">
                  <button
                    onClick={() => setViewType('Solo')}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                      viewType === 'Solo'
                        ? 'bg-[#CEFF1B] text-black'
                        : 'bg-white dark:bg-[#111111] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Solo
                  </button>
                  <button
                    onClick={() => setViewType('Teams')}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                      viewType === 'Teams'
                        ? 'bg-[#CEFF1B] text-black'
                        : 'bg-white dark:bg-[#111111] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Teams
                  </button>
                </div>
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {['Active', 'Completed', 'Disputed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? 'bg-gray-900 dark:bg-gray-200 text-white dark:text-black'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filter Row */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search product"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-sm rounded-lg py-2 pl-9 pr-4 focus:outline-none focus:border-[#CEFF1B] focus:ring-1 focus:ring-[#CEFF1B] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                />
              </div>
              <div className="relative sm:w-48">
                <select 
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                  className="appearance-none w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-sm font-medium rounded-lg py-2 px-4 pr-9 focus:outline-none focus:border-[#CEFF1B] cursor-pointer dark:text-white transition-colors"
                >
                  <option>Recent activity</option>
                  <option>Due date</option>
                  <option>Progress</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Project List */}
            <div>
              {filtered.length > 0 && activeTab === 'Active' ? (
                filtered.map((project) => (
                  <ProjectRow key={project.id} project={project} />
                ))
              ) : (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
                  No projects found for <strong>{viewType}</strong> view.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}