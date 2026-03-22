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
      <span className="text-[24px] sm:text-[28px] font-black italic leading-none">
        <span 
          className="text-[#CEFF1B]" 
          style={{ WebkitTextStroke: '1.5px #333', textShadow: '1px 1px 0 #000' }}
        >
          ULTRA
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
    <div className="flex flex-col lg:flex-row items-stretch gap-px">
      {/* Left: Title + Milestones */}
      <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none p-4 bg-white dark:bg-[#111111]">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-sm font-bold text-gray-900 dark:text-white">{project.title}</span>
          <ActiveBadge label={project.status} variant="active" />
          {project.extraBadge && <ActiveBadge label={project.extraBadge} variant="extension" />}
        </div>
        <p className="text-xs text-gray-400 mb-3">
          {project.type} • {project.client} • {project.contractId}
        </p>

        <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
          <span>Milestones</span>
          <span>{project.milestoneProgress}/{project.milestoneTotal}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-1.5">
          <div
            className="bg-[#CEFF1B] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">
          Next: {project.nextStep} &nbsp;•&nbsp; due {project.nextStepDate}
        </p>
      </div>

      {/* Middle: Due */}
      <div className="lg:min-w-[150px] border-l lg:border-l-0 border-r border-b border-t-0 lg:border-t lg:border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-[#111111]">
        <p className="text-xs font-bold text-gray-900 dark:text-white mb-2">Due</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{project.dueDate}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{project.daysLeft} days left</span>
        </div>
      </div>

      {/* Right: Collaboration */}
      <div className="lg:min-w-[180px] border border-gray-200 dark:border-gray-700 rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none p-4 bg-white dark:bg-[#111111]">
        <p className="text-xs font-bold text-gray-900 dark:text-white mb-2">Collaboration</p>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{project.chats}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <FileText className="w-3.5 h-3.5" />
            <span>{project.files}</span>
          </div>
        </div>
        <button className="w-full bg-[#CEFF1B] hover:bg-[#d4ff3a] active:scale-95 text-black text-xs font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all group">
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
    document.documentElement.classList.toggle('dark', isDark);
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
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#0A0A0A] font-inter transition-colors duration-300">
      
      {/* ── Navbar── */}
      <div className="w-full bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Top section with logo, nav links, icons */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Nav Links (desktop) */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Home
              </a>
              <a href="#" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Marketplace
              </a>
              <div className="relative flex flex-col items-center">
                <a href="#" className="text-sm font-bold text-gray-900 dark:text-white pb-1">
                  Dashboard
                </a>
                <div className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-[#CEFF1B] rounded-t-full" />
              </div>
            </div>

            {/* Search bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-[360px] mx-4 xl:mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-sm rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#CEFF1B]/50 dark:text-white placeholder-gray-400"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
              <button className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              <button className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 transition-colors">
                <User className="w-4 h-4" />
              </button>
              {/* Mobile hamburger */}
              <button
                className="md:hidden w-8 h-8 flex items-center justify-center text-gray-500"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {/* Search bar - Mobile */}
          <div className="mt-3 lg:hidden">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-sm rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#CEFF1B]/50 dark:text-white placeholder-gray-400"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 px-4 py-4 flex flex-col gap-3">
          <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400">Home</a>
          <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400">Marketplace</a>
          <a href="#" className="text-sm font-bold text-gray-900 dark:text-white">Dashboard</a>
        </div>
      )}

      {/* ── Page Content Container ── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="max-w-[1452px] mx-auto">
          {/* Page Header */}
          <header className="mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-[#CEFF1B] tracking-tight mb-1">
              Active Projects
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Track delivery work: milestones, deadlines, revisions, messages, files, and resolution.
            </p>
          </header>

          {/* ── Contracts Card ── */}
          <div className="w-full bg-white dark:bg-[#111111] border-2 border-gray-200 dark:border-[#CEFF1B] rounded-2xl overflow-hidden flex flex-col">
            
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* Card Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                {/* Left: Title + Solo/Teams */}
                <div className="flex items-center gap-4 flex-wrap">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Contracts</h2>

                  {/* Solo/Teams Toggle */}
                  <div className="flex border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden">
                    <button
                      onClick={() => setViewType('Solo')}
                      className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-bold transition-all ${
                        viewType === 'Solo'
                          ? 'bg-[#CEFF1B] text-black'
                          : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <User className="w-3 h-3" />
                      Solo
                    </button>
                    <button
                      onClick={() => setViewType('Teams')}
                      className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-bold transition-all ${
                        viewType === 'Teams'
                          ? 'bg-[#CEFF1B] text-black'
                          : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Users className="w-3 h-3" />
                      Teams
                    </button>
                  </div>
                </div>

                {/* Right: Status Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                  {['Active', 'Completed', 'Disputed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                        tab === 'Active' && activeTab === tab
                          ? 'bg-[#CEFF1B] text-black'
                          : activeTab === tab
                          ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-black'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search + Filter Row */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search product"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-sm rounded-full py-2.5 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-[#CEFF1B]/40 dark:text-white placeholder-gray-400 transition-all"
                  />
                </div>
                <div className="relative sm:min-w-[160px]">
                  <select 
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                    className="appearance-none w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-sm font-semibold rounded-xl py-2.5 px-4 pr-9 focus:outline-none cursor-pointer dark:text-white"
                  >
                    <option>Recent activity</option>
                    <option>Due date</option>
                    <option>Progress</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Project Rows */}
              <div className="flex flex-col gap-4">
                {filtered.length > 0 && activeTab === 'Active' ? (
                  filtered.map((project) => (
                    <ProjectRow key={project.id} project={project} />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400 text-sm">
                    No projects found for <strong>{viewType}</strong> view.
                  </div>
                )}
              </div>
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