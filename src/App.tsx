/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  Settings2, 
  Share2, 
  Zap, 
  Languages, 
  Save,
  Info,
  Search,
  Filter,
  LayoutGrid,
  List,
  Moon,
  Sun,
  ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AppData {
  name: string;
  status: string;
  description: string;
  characteristics: {
    sharing: boolean;
    fastSwitch: boolean;
    vietnamese: boolean;
    v2raySettings: boolean;
    backup: boolean;
  };
  link: string;
  specialFeature?: string;
  bestFor?: string;
}

const apps: AppData[] = [
  {
    name: "V2rayNG",
    status: "Bản gốc/Clone",
    description: "Không mượt trong một vài trường hợp. Bản gốc có nhiều clone xịn, ổn.",
    characteristics: {
      sharing: true,
      fastSwitch: false,
      vietnamese: true,
      v2raySettings: true,
      backup: true
    },
    link: "https://github.com/2dust/v2rayng",
    bestFor: "Biết sử dụng hợp lý"
  },
  {
    name: "V2rayTun",
    status: "Mượt (CHPlay)",
    description: "Giao diện dễ nhìn, thân thiện, ổn.",
    characteristics: {
      sharing: true,
      fastSwitch: true,
      vietnamese: true,
      v2raySettings: true,
      backup: false
    },
    link: "https://play.google.com/store/apps/details?id=com.v2raytun.android",
    bestFor: "Người mới"
  },
  {
    name: "ZedSecure",
    status: "Mượt",
    description: "Ngon, xài thử cho biết. Phải ấn chuyển xong rồi tắt nút khởi động lại để đổi server.",
    characteristics: {
      sharing: false,
      fastSwitch: true,
      vietnamese: false,
      v2raySettings: true,
      backup: true
    },
    link: "https://github.com/CluvexStudio/ZedSecure"
  },
  {
    name: "Shadowrocket for Android",
    status: "Mượt (CHPlay + Mod)",
    description: "Chức năng như v2rayNG nhưng build giao diện lại như nekobox. Nên dùng bản Mod (đã xóa quảng cáo).",
    characteristics: {
      sharing: true,
      fastSwitch: true,
      vietnamese: true,
      v2raySettings: true,
      backup: false
    },
    link: "https://play.google.com/store/apps/details?id=com.v2cross.proxy",
    bestFor: "Giao diện đẹp"
  },
  {
    name: "Exclave",
    status: "Mượt",
    description: "Giao diện list file server hơi to. Chức năng tương tự các app trên.",
    characteristics: {
      sharing: true,
      fastSwitch: true,
      vietnamese: false,
      v2raySettings: true,
      backup: true
    },
    link: "https://github.com/dyhkwong/Exclave"
  },
  {
    name: "Happ",
    status: "Mượt (CHPlay)",
    description: "Sài ổn, nhớ setting kỹ để đạt hiệu năng tốt nhất.",
    characteristics: {
      sharing: true,
      fastSwitch: true,
      vietnamese: false,
      v2raySettings: true,
      backup: false
    },
    link: "https://play.google.com/store/apps/details?id=com.happproxy",
    bestFor: "Ổn định"
  },
  {
    name: "V2Box",
    status: "Rất ổn (Mod Ads)",
    description: "Sài khá ok, nhớ setting kỹ. Bản Mod đã xóa quảng cáo giúp trải nghiệm mượt mà hơn.",
    characteristics: {
      sharing: true,
      fastSwitch: true,
      vietnamese: true,
      v2raySettings: true,
      backup: true
    },
    link: "https://play.google.com/store/apps/details?id=dev.hexasoftware.v2box",
    specialFeature: "Tự kết nối server ping thấp nhất",
    bestFor: "Gaming"
  }
];

const calculateRating = (characteristics: AppData['characteristics']) => {
  const values = Object.values(characteristics);
  const okCount = values.filter(v => v === true).length;
  return okCount; // Max 5 stars
};

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1 mt-2">
      <div className="flex text-violet-500">
        {[...Array(5)].map((_, i) => (
          <Zap 
            key={i} 
            size={12} 
            fill={i < rating ? "currentColor" : "none"} 
            className={i < rating ? "" : "text-slate-200"} 
          />
        ))}
      </div>
      <span className="text-[11px] font-bold text-slate-400">{(rating).toFixed(1)}</span>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="font-bold text-slate-800 group-hover:text-violet-600 transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-slate-400 group-hover:text-violet-600"
        >
          <ExternalLink size={18} className="rotate-45" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-slate-500 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

const StatusBadge = ({ label }: { label: string }) => {
  const isSmooth = label.toLowerCase().includes('mượt') || label.toLowerCase().includes('ổn');
  return (
    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
      isSmooth 
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' 
        : 'bg-orange-50 text-orange-700 border border-orange-200/50'
    }`}>
      {label}
    </span>
  );
};

const CharacteristicItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: boolean }) => (
  <div className="flex items-center justify-between text-sm py-2.5 border-b border-slate-100 last:border-0">
    <div className="flex items-center gap-3 text-slate-600">
      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-violet-500 transition-colors">
        <Icon size={16} />
      </div>
      <span className="font-medium">{label}</span>
    </div>
    {value ? (
      <div className="text-emerald-600 bg-emerald-50 p-1 rounded-full border border-emerald-100">
        <CheckCircle2 size={14} />
      </div>
    ) : (
      <div className="text-rose-500 bg-rose-50 p-1 rounded-full border border-rose-100">
        <XCircle size={14} />
      </div>
    )}
  </div>
);

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');

  // Quick Stats
  const stats = useMemo(() => {
    return {
      total: apps.length,
      smooth: apps.filter(a => a.status.toLowerCase().includes('mượt') || a.status.toLowerCase().includes('ổn')).length,
      vi: apps.filter(a => a.characteristics.vietnamese).length
    };
  }, []);

  const filters = [
    { id: 'all', label: 'Tất cả', icon: LayoutGrid },
    { id: 'smooth', label: 'Mượt / Ổn định', icon: Zap },
    { id: 'sharing', label: 'Chia sẻ LAN', icon: Share2 },
    { id: 'backup', label: 'Hỗ trợ Backup', icon: Save },
    { id: 'vietnamese', label: 'Có Tiếng Việt', icon: Languages },
  ];

  const handleCopyLink = (link: string, name: string) => {
    navigator.clipboard.writeText(link);
    setCopyStatus(name);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const filteredAndSortedApps = useMemo(() => {
    const filtered = apps.filter(app => {
      const matchesSearch = 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = 
        activeFilter === 'all' ||
        (activeFilter === 'smooth' && (app.status.toLowerCase().includes('mượt') || app.status.toLowerCase().includes('ổn'))) ||
        (activeFilter === 'sharing' && app.characteristics.sharing) ||
        (activeFilter === 'backup' && app.characteristics.backup) ||
        (activeFilter === 'vietnamese' && app.characteristics.vietnamese);

      return matchesSearch && matchesFilter;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'rating') {
        return calculateRating(b.characteristics) - calculateRating(a.characteristics);
      }
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, activeFilter, sortBy]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-plus selection:bg-violet-500/20`}>
      {/* Toast Notification */}
      <AnimatePresence>
        {copyStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <CheckCircle2 size={20} className="text-emerald-400" />
            <span className="text-sm font-bold">Đã sao chép link {copyStatus}!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] ${isDarkMode ? 'bg-violet-900/20' : 'bg-violet-200/20'} blur-[120px] rounded-full`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] ${isDarkMode ? 'bg-emerald-900/10' : 'bg-emerald-200/10'} blur-[120px] rounded-full`} />
      </div>

      {/* Floating Dark Mode Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-6 right-6 z-[110] p-4 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all ${
          isDarkMode 
            ? 'bg-slate-900/80 border-slate-800 text-amber-400' 
            : 'bg-white/80 border-slate-200 text-violet-600'
        }`}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm mb-8 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <ShieldCheck size={16} className="text-violet-600" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Security Essentials</span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              Web Review App <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500">Kết Nối VPN</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Bảng so sánh chi tiết các ứng dụng VPN mượt nhất cho Android. 
              <br />  
              Thiết kế bởi <span className={`font-bold border-b-2 border-violet-500/30 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>BKhanggDesu</span>
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {[
                { label: 'Tổng số app', value: stats.total, icon: LayoutGrid, color: 'text-violet-500' },
                { label: 'Cực mượt', value: stats.smooth, icon: Zap, color: 'text-amber-500' },
                { label: 'Tiếng Việt', value: stats.vi, icon: Languages, color: 'text-emerald-500' }
              ].map((s, i) => (
                <div key={i} className={`px-6 py-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'} shadow-sm flex items-center gap-3`}>
                  <s.icon size={18} className={s.color} />
                  <div className="text-left">
                    <div className={`text-lg font-black leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{s.value}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </header>

        {/* Note / Alert */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`mb-12 p-6 rounded-[2rem] border flex flex-col md:flex-row items-center md:items-start gap-6 shadow-xl ${
            isDarkMode 
              ? 'bg-slate-900/50 border-slate-800 shadow-slate-950/50' 
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}
        >
          <div className={`${isDarkMode ? 'bg-amber-900/20 border-amber-900/30' : 'bg-amber-50 border-amber-100'} p-4 rounded-2xl border`}>
            <Info className="text-amber-600" size={24} />
          </div>
          <div className="text-center md:text-left">
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Thông báo quan trọng</h3>
            <div className="space-y-3">
              <p className="text-slate-500 leading-relaxed font-medium">
                Luôn cập nhật phiên bản mới nhất từ các nguồn chính thống để đảm bảo tính ổn định cao nhất. 
                Ghi chú: <span className="text-violet-500 font-bold">"Mod"</span> có nghĩa là phiên bản đã được <span className="text-violet-500 font-bold">xóa quảng cáo</span>.
              </p>
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-violet-500/5 border-violet-500/20 text-violet-300' : 'bg-violet-50 border-violet-100 text-violet-700'} text-sm font-medium leading-relaxed`}>
                <span className="font-black uppercase tracking-wider text-[10px] block mb-1 opacity-70">Lưu ý về đánh giá</span>
                Các đánh giá này dựa theo 5 tiêu chí của tôi: <span className="font-bold">Chia sẻ mạng, Kết nối nhanh, Tiếng Việt, Setting chuẩn, Backup & Storage</span>. Vì vậy nó không khẳng định app nào ngon hay mạnh nhất một cách tuyệt đối. Bạn hãy tải về và sử dụng thử để tìm ra bản phù hợp với mình nhất.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search Bar */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm ứng dụng..." 
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-violet-500/10 focus:border-violet-500 transition-all font-medium shadow-sm ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600' 
                    : 'bg-white border-slate-200 text-slate-700 placeholder:text-slate-400'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort Toggle */}
            <div className={`flex p-1.5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <button 
                onClick={() => setSortBy(sortBy === 'rating' ? 'name' : 'rating')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                  isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500'
                }`}
                title={sortBy === 'rating' ? 'Sắp xếp theo tên' : 'Sắp xếp theo số sao'}
              >
                <ArrowUpDown size={16} className="text-violet-500" />
                {sortBy === 'rating' ? 'Số sao' : 'Tên A-Z'}
              </button>
            </div>

            {/* View Toggle */}
            <div className={`flex p-1.5 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'table' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex overflow-x-auto pb-2 lg:pb-0 gap-2 no-scrollbar scroll-smooth">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap font-bold text-sm transition-all border ${
                      isActive 
                        ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200/20 translate-y-[-2px]' 
                        : isDarkMode
                          ? 'bg-slate-900 text-slate-400 border-slate-800 hover:border-violet-500 hover:text-violet-500'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-violet-300 hover:text-violet-600'
                    }`}
                  >
                    <Icon size={16} />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic View */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div 
              key="grid-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
            >
              {filteredAndSortedApps.length > 0 ? (
                filteredAndSortedApps.map((app, index) => (
                  <motion.div
                    key={app.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 ${
                      isDarkMode 
                        ? 'bg-slate-900/80 border-slate-800 hover:border-violet-500 hover:shadow-violet-900/20' 
                        : 'bg-white border-slate-200/60 hover:border-violet-300 hover:shadow-violet-200/40'
                    }`}
                  >
                    {app.bestFor && (
                      <div className="absolute top-8 left-0 -translate-x-2 px-3 py-1 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest rounded-r-lg shadow-lg flex items-center gap-1.5 z-10">
                        <Zap size={10} fill="currentColor" />
                        {app.bestFor}
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-8">
                      <div className={`${app.bestFor ? 'mt-8' : ''} flex-1 mr-4`}>
                        <h2 className={`text-2xl font-bold mb-1 transition-colors uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'} group-hover:text-violet-500`}>
                          {app.name}
                        </h2>
                        <RatingStars rating={calculateRating(app.characteristics)} />
                        <div className="mt-3">
                          <StatusBadge label={app.status} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <a 
                          href={app.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 flex items-center justify-center bg-violet-500/10 hover:bg-violet-600 text-violet-500 hover:text-white rounded-2xl transition-all duration-300 border border-violet-500/20 shadow-sm hover:scale-105 active:scale-95"
                          title="Mở link ứng dụng"
                        >
                          <ExternalLink size={20} />
                        </a>
                        <button 
                          onClick={() => handleCopyLink(app.link, app.name)}
                          className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 border shadow-sm hover:scale-105 active:scale-95 ${
                            isDarkMode 
                              ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white' 
                              : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white'
                          }`}
                          title="Copy link"
                        >
                          <Save size={18} />
                        </button>
                      </div>
                    </div>

                    <p className={`text-sm mb-8 line-clamp-3 min-h-[60px] leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {app.description}
                    </p>

                    <div className="space-y-1 mb-8">
                      <CharacteristicItem icon={Share2} label="Chia sẻ mạng" value={app.characteristics.sharing} />
                      <CharacteristicItem icon={Zap} label="Kết nối nhanh" value={app.characteristics.fastSwitch} />
                      <CharacteristicItem icon={Languages} label="Tiếng Việt" value={app.characteristics.vietnamese} />
                      <CharacteristicItem icon={Settings2} label="Settings chuẩn" value={app.characteristics.v2raySettings} />
                      <CharacteristicItem icon={Save} label="Backup & Restore" value={app.characteristics.backup} />
                    </div>

                    {app.specialFeature && (
                      <div className={`mt-2 p-4 rounded-2xl border flex items-center gap-3 ${
                        isDarkMode 
                          ? 'bg-violet-900/20 border-violet-500/20' 
                          : 'bg-violet-50 border-violet-100'
                      }`}>
                        <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-500">
                          <Cpu size={14} />
                        </div>
                        <span className={`text-xs font-bold uppercase leading-none ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>{app.specialFeature}</span>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-slate-400 mx-auto mb-4 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
                    <Search size={40} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Không tìm thấy ứng dụng</h3>
                  <p className="text-slate-500 font-medium">Bạn hãy thử từ khóa khác hoặc thay đổi bộ lọc nhé.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="table-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-24 overflow-x-auto rounded-[2.5rem] border shadow-xl ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 shadow-slate-950/50' 
                  : 'bg-white border-slate-200 shadow-slate-200/30'
              }`}
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Ứng dụng</th>
                    <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Đánh giá</th>
                    <th className="px-4 py-5 text-center text-xs font-black uppercase tracking-widest text-slate-500"><Share2 size={14} className="mx-auto" /></th>
                    <th className="px-4 py-5 text-center text-xs font-black uppercase tracking-widest text-slate-500"><Zap size={14} className="mx-auto" /></th>
                    <th className="px-4 py-5 text-center text-xs font-black uppercase tracking-widest text-slate-500"><Languages size={14} className="mx-auto" /></th>
                    <th className="px-4 py-5 text-center text-xs font-black uppercase tracking-widest text-slate-500"><Save size={14} className="mx-auto" /></th>
                    <th className="px-8 py-5 text-right text-xs font-black uppercase tracking-widest text-slate-500">Tải về</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedApps.map((app) => (
                    <tr key={app.name} className={`border-b transition-colors group ${
                      isDarkMode ? 'border-slate-800 hover:bg-slate-800/30' : 'border-slate-100 hover:bg-slate-50/50'
                    }`}>
                      <td className="px-8 py-6">
                        <div className={`font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'} group-hover:text-violet-500`}>{app.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusBadge label={app.status} />
                          {app.bestFor && <span className="text-[10px] text-violet-500 font-bold uppercase">{app.bestFor}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <RatingStars rating={calculateRating(app.characteristics)} />
                      </td>
                      <td className="px-4 py-6 text-center">
                        {app.characteristics.sharing ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : <XCircle size={18} className="text-slate-300/40 mx-auto" />}
                      </td>
                      <td className="px-4 py-6 text-center">
                        {app.characteristics.fastSwitch ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : <XCircle size={18} className="text-slate-300/40 mx-auto" />}
                      </td>
                      <td className="px-4 py-6 text-center">
                        {app.characteristics.vietnamese ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : <XCircle size={18} className="text-slate-300/40 mx-auto" />}
                      </td>
                      <td className="px-4 py-6 text-center">
                        {app.characteristics.backup ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : <XCircle size={18} className="text-slate-300/40 mx-auto" />}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                           <button 
                            onClick={() => handleCopyLink(app.link, app.name)}
                            className={`p-2.5 rounded-xl transition-all border ${
                              isDarkMode 
                                ? 'bg-slate-800 border-slate-700 text-slate-500 hover:text-white' 
                                : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white'
                            }`}
                          >
                            <Save size={14} />
                          </button>
                          <a 
                            href={app.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 text-violet-500 rounded-xl font-bold text-sm hover:bg-violet-600 hover:text-white transition-all border border-violet-500/20"
                          >
                            Tải <ExternalLink size={14} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <section className={`relative p-10 rounded-[3.5rem] border shadow-2xl overflow-hidden ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 shadow-slate-950/50' 
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}>
            <div className={`absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <Settings2 size={140} />
            </div>
            
            <div className="relative">
              <h2 className={`text-3xl font-extrabold mb-8 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Cấu Hình Chuẩn</h2>
              <div className="space-y-6">
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-violet-900/10 border-violet-500/20' : 'bg-violet-50 border-violet-100'}`}>
                  <h3 className={`font-bold mb-1 ${isDarkMode ? 'text-violet-400' : 'text-violet-900'}`}>Sniffing</h3>
                  <p className={`text-sm leading-relaxed italic ${isDarkMode ? 'text-violet-300/60' : 'text-violet-700/80'}`}>Nên tắt để Zalo, Telegram hoạt động ổn định nhất tại Việt Nam.</p>
                </div>
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-emerald-900/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}>
                  <h3 className={`font-bold mb-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-900'}`}>LAN Connection</h3>
                  <p className={`text-sm leading-relaxed italic ${isDarkMode ? 'text-emerald-300/60' : 'text-emerald-700/80'}`}>Bật để biến điện thoại thành Hotspot cho các thiết bị khác.</p>
                </div>
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-orange-900/10 border-orange-500/20' : 'bg-orange-50 border-orange-100'}`}>
                  <h3 className={`font-bold mb-1 ${isDarkMode ? 'text-orange-400' : 'text-orange-900'}`}>Giao diện</h3>
                  <p className={`text-sm leading-relaxed italic ${isDarkMode ? 'text-orange-300/60' : 'text-orange-700/80'}`}>Bật Double Column trên màn hình lớn để nhìn được nhiều server.</p>
                </div>
              </div>
            </div>
          </section>

          <section className={`relative p-10 rounded-[3.5rem] border shadow-2xl ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 shadow-slate-950/50' 
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}>
            <h2 className={`text-3xl font-extrabold mb-8 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Giải Đáp Nhanh</h2>
            <div className={`space-y-1 ${isDarkMode ? 'divide-y divide-slate-800' : ''}`}>
              <FAQItem 
                question="Tại sao kết nối rồi mà vẫn không có mạng?" 
                answer="Hãy kiểm tra lại server VPN xem còn hoạt động không, hoặc thử tắt 'Sniffing' trong cài đặt. Ngoài ra, hãy đảm bảo bạn đã cấp quyền 'VPN Profile' cho ứng dụng."
              />
              <FAQItem 
                question="Ứng dụng nào tiết kiệm pin nhất?" 
                answer="Các ứng dụng như Shadowrocket và V2rayTun thường được tối ưu hóa tốt hơn về tài nguyên hệ thống, giúp pin trâu hơn so với các bản clone."
              />
              <FAQItem 
                question="Phiên bản Mod có an toàn không?" 
                answer="Các bản Mod xóa quảng cáo trong danh sách này thường được BKhanggDesu mod. Tuy nhiên để an toàn nhất, bạn nên dùng bản gốc từ CHPlay nếu không ngại xem quảng cáo."
              />
              <FAQItem 
                question="Làm sao để chia sẻ mạng cho máy tính?" 
                answer="Bật 'Allow connection from LAN', sau đó dùng app Every Proxy trên Android hoặc cài đặt Proxy trên máy tính theo địa chỉ IP của điện thoại."
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="pb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white border border-slate-700">
              <ShieldCheck size={20} />
            </div>
            <span className={`text-xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Web Review VPN</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">© 2026 Web Review App Kết Nối VPN • Developed with Precision</p>
          <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'
          }`}>
            Design by <span className="text-violet-500">BKhanggDesu</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

