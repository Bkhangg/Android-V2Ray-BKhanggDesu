/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
  Info 
} from 'lucide-react';
import { motion } from 'motion/react';

interface AppCharacteristic {
  label: string;
  value: boolean;
  icon: React.ElementType;
}

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
    link: "https://github.com/2dust/v2rayng"
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
    link: "https://play.google.com/store/apps/details?id=com.v2raytun.android"
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
    link: "https://play.google.com/store/apps/details?id=com.v2cross.proxy"
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
    link: "https://play.google.com/store/apps/details?id=com.happproxy"
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
    specialFeature: "Tự kết nối server ping thấp nhất"
  }
];

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
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-plus selection:bg-violet-100">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-200/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-200/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
              <ShieldCheck size={16} className="text-violet-600" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Security Essentials</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-950">
              V2ray <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Review</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Bảng so sánh chi tiết các ứng dụng VPN mượt nhất cho Android. 
              <br />  
              Thiết kế bởi <span className="text-slate-900 font-bold border-b-2 border-violet-500/30">BKhanggDesu</span>
            </p>
          </motion.div>
        </header>

        {/* Note / Alert */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16 p-6 rounded-[2rem] bg-white border border-slate-200 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-xl shadow-slate-200/50"
        >
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <Info className="text-amber-600" size={24} />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Thông báo quan trọng</h3>
            <p className="text-slate-600 leading-relaxed">
              Luôn cập nhật phiên bản mới nhất từ các nguồn chính thống để đảm bảo tính ổn định cao nhất. 
              Ghi chú: <span className="text-violet-600 font-bold">"Mod"</span> có nghĩa là phiên bản đã được <span className="text-violet-600 font-bold">xóa quảng cáo</span>.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {apps.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-200/60 hover:border-violet-300 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-violet-200/40 hover:-translate-y-2"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex-1 mr-4">
                  <h2 className="text-2xl font-bold mb-2 text-slate-900 group-hover:text-violet-600 transition-colors uppercase tracking-tight flex items-center flex-wrap gap-2">
                    {app.name}
                    <span className="inline-flex text-[10px] bg-violet-50 text-violet-400 px-2 py-0.5 rounded-full font-bold tracking-wider normal-case border border-violet-100/50 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
                      Link tải
                    </span>
                  </h2>
                  <StatusBadge label={app.status} />
                </div>
                <a 
                  href={app.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-violet-50 hover:bg-violet-600 text-violet-500 hover:text-white rounded-2xl transition-all duration-300 border border-violet-100 shadow-sm hover:shadow-violet-200 hover:scale-105 active:scale-95"
                  title="Mở link ứng dụng"
                >
                  <ExternalLink size={20} />
                </a>
              </div>

              <p className="text-slate-500 text-sm mb-8 line-clamp-3 min-h-[60px] leading-relaxed">
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
                <div className="mt-2 p-4 rounded-2xl bg-violet-50 border border-violet-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                    <Cpu size={14} />
                  </div>
                  <span className="text-xs font-bold text-violet-700 uppercase leading-none">{app.specialFeature}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Settings Guide */}
        <section className="relative p-10 md:p-16 rounded-[3.5rem] bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-slate-900 rotate-12">
            <Settings2 size={240} />
          </div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-extrabold text-slate-950 mb-3 tracking-tight">Cấu Hình VPN</h2>
                <p className="text-slate-500 font-medium">Tối ưu hóa trải nghiệm sử dụng mạng tại Việt Nam.</p>
              </div>
              <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200 text-slate-400 font-bold text-xs uppercase tracking-widest">
                Technical Guide
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group space-y-5">
                <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xl">01</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Sniffing</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                   Tắt tùy chọn <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded font-mono font-bold text-xs">Sniffing</span> trong phần cài đặt chung của ứng dụng.
                  <br /><br />
                  <span className="text-slate-500 bg-slate-50 p-3 rounded-xl block border-l-4 border-violet-400 italic">
                    Nên tắt để các ứng dụng nhắn tin như <strong className="text-slate-900">Zalo, Telegram</strong> hoạt động mượt nhất.
                  </span>
                </p>
              </div>

              <div className="group space-y-5">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xl">02</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Mạng LAN</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Bật <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded font-mono font-bold text-xs">Allow connection from LAN</span> để chia sẻ kết nối.
                  <br /><br />
                  <span className="text-slate-500 bg-slate-50 p-3 rounded-xl block border-l-4 border-emerald-400 italic">
                    Biến điện thoại của bạn thành một <strong className="text-slate-900">Proxy Server</strong> cho máy tính hoặc thiết bị khác dùng chung.
                  </span>
                </p>
              </div>

              <div className="group space-y-5">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xl">03</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Giao diện</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Kích hoạt <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded font-mono font-bold text-xs">Double column display</span> nếu thiết bị màn hình lớn.
                  <br /><br />
                  <span className="text-slate-500 bg-slate-50 p-3 rounded-xl block border-l-4 border-orange-400 italic">
                    Giúp danh sách server gọn gàng, hiển thị được <strong className="text-slate-900">nhiều thông số</strong> trong một màn hình.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
              <ShieldCheck size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">VPN PROTOCOL</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2026 V2ray App Review System • Developed with Precision</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-500 text-xs font-bold uppercase tracking-widest">
            Design by <span className="text-violet-600">BKhanggDesu</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

