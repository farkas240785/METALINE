// Общие UI компоненты админ-панели
import { useEffect, useState } from 'react';
import type { PageKey, Notification } from './types';
import { GOLD } from './store';

// Иконки для админки
export const AdminIcons = {
  Dashboard: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  Box: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
    </svg>
  ),
  Image: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  ),
  Inbox: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  FileText: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Settings: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Users: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Search: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Bell: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  Plus: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="M12 5v14" />
    </svg>
  ),
  Edit: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  ),
  Trash: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  X: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  ArrowLeft: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  ),
  Eye: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Download: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  ),
  TrendingUp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Logout: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  ),
  Globe: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  ),
  Filter: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  Save: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  Star: ({ filled = false, className = "w-5 h-5" }: { filled?: boolean; className?: string }) => (
    <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  Upload: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  ),
  ImagePlus: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      <path d="M16 14v6" />
      <path d="M13 17h6" />
    </svg>
  ),
};

// ==================== SIDEBAR ====================
interface SidebarProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  onLogout: () => void;
  onPreview: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout, onPreview }: SidebarProps) {
  const menuItems: { key: PageKey; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'dashboard', label: 'Дашборд', icon: <AdminIcons.Dashboard /> },
    { key: 'products', label: 'Продукция', icon: <AdminIcons.Box /> },
    { key: 'portfolio', label: 'Портфолио', icon: <AdminIcons.Image /> },
    { key: 'requests', label: 'Заявки', icon: <AdminIcons.Inbox />, badge: 3 },
    { key: 'library', label: 'Библиотека', icon: <AdminIcons.FileText /> },
    { key: 'users', label: 'Пользователи', icon: <AdminIcons.Users /> },
    { key: 'settings', label: 'Настройки', icon: <AdminIcons.Settings /> },
  ];

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r flex flex-col h-screen sticky top-0" style={{ borderColor: `${GOLD.primary}20` }}>
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: `${GOLD.primary}20` }}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${GOLD.primary} 0%, ${GOLD.light} 100%)` }}>
            <span className="text-black font-black text-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>M</span>
          </div>
          <div>
            <div className="text-lg font-bold tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>METALINE</div>
            <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: GOLD.primary }}>Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold tracking-wider uppercase mb-3 px-3" style={{ color: GOLD.primary }}>
          Меню
        </div>
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
              currentPage === item.key
                ? 'text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            style={currentPage === item.key ? { background: `${GOLD.primary}15`, color: GOLD.light } : {}}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto px-2 py-0.5 text-xs font-bold rounded-full" style={{ backgroundColor: GOLD.primary, color: '#000' }}>
                {item.badge}
              </span>
            )}
            {currentPage === item.key && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r" style={{ backgroundColor: GOLD.light }}></div>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t space-y-1" style={{ borderColor: `${GOLD.primary}20` }}>
        <button
          onClick={onPreview}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <AdminIcons.Globe />
          <span>Открыть сайт</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <AdminIcons.Logout />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
}

// ==================== TOP BAR ====================
interface TopBarProps {
  title: string;
  subtitle?: string;
  onSearch?: (q: string) => void;
}

export function TopBar({ title, subtitle, onSearch }: TopBarProps) {
  return (
    <div className="bg-[#0a0a0a] border-b sticky top-0 z-30" style={{ borderColor: `${GOLD.primary}20` }}>
      <div className="px-8 py-5 flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5 font-light">{subtitle}</p>}
        </div>
        
        {onSearch && (
          <div className="relative flex-1 max-w-md">
            <AdminIcons.Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Поиск..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-[#1a1a1a] border text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-[#d4af37]"
              style={{ borderColor: `${GOLD.primary}30` }}
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-lg bg-[#1a1a1a] border hover:bg-[#222] transition-all" style={{ borderColor: `${GOLD.primary}30` }}>
            <AdminIcons.Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: GOLD.light }}></span>
          </button>
          <div className="flex items-center gap-3 pl-3 border-l" style={{ borderColor: `${GOLD.primary}30` }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-black font-bold text-sm" style={{ background: `linear-gradient(135deg, ${GOLD.primary}, ${GOLD.light})` }}>
              A
            </div>
            <div>
              <div className="text-sm font-medium">Администратор</div>
              <div className="text-xs text-gray-500">admin@metaline.tech</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MODAL ====================
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full ${sizeClasses[size]} bg-[#141414] rounded-2xl border shadow-2xl max-h-[90vh] flex flex-col`} style={{ borderColor: `${GOLD.primary}30` }}>
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: `${GOLD.primary}20` }}>
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-all text-gray-400 hover:text-white">
            <AdminIcons.X />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// ==================== TOAST ====================
export function Toast({ notification, onClose }: { notification: Notification; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: 'rgba(34, 197, 94, 0.1)', border: '#22c55e', text: '#22c55e' },
    error: { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', text: '#ef4444' },
    warning: { bg: 'rgba(251, 191, 36, 0.1)', border: '#fbbf24', text: '#fbbf24' },
    info: { bg: `${GOLD.primary}15`, border: GOLD.light, text: GOLD.light },
  };

  const c = colors[notification.type];

  return (
    <div
      className="fixed top-6 right-6 z-[100] min-w-80 max-w-md p-4 rounded-xl border shadow-2xl animate-slide-in-right"
      style={{ backgroundColor: c.bg, borderColor: c.border }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c.border}20`, color: c.text }}>
          {notification.type === 'success' && <AdminIcons.Check className="w-4 h-4" />}
          {notification.type === 'error' && <AdminIcons.X className="w-4 h-4" />}
          {notification.type === 'warning' && <AdminIcons.Bell className="w-4 h-4" />}
          {notification.type === 'info' && <AdminIcons.Bell className="w-4 h-4" />}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm" style={{ color: c.text }}>{notification.title}</div>
          <div className="text-sm text-gray-300 mt-0.5 font-light">{notification.message}</div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-all">
          <AdminIcons.X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ==================== STATS CARD ====================
export function StatsCard({ label, value, change, icon, color = GOLD.primary }: {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-[#141414] border card-hover" style={{ borderColor: `${GOLD.primary}20` }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
          {icon}
        </div>
        {change && (
          <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
            <AdminIcons.TrendingUp className="w-3 h-3" />
            {change}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{value}</div>
      <div className="text-sm text-gray-500 font-light">{label}</div>
    </div>
  );
}

// ==================== BUTTON ====================
export function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', className = '' }: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}) {
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${GOLD.primary} 0%, ${GOLD.light} 100%)`,
      color: '#000',
      hover: `0 10px 25px ${GOLD.primary}40`,
    },
    secondary: {
      background: '#1a1a1a',
      color: '#fff',
      hover: '0 5px 15px rgba(0,0,0,0.3)',
    },
    danger: {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      hover: '0 5px 15px rgba(239, 68, 68, 0.2)',
    },
    ghost: {
      background: 'transparent',
      color: '#9ca3af',
      hover: '0 0 0 rgba(0,0,0,0)',
    },
  };

  const v = variants[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all btn-premium ${sizes[size]} ${className}`}
      style={{
        background: v.background,
        color: v.color,
        border: variant === 'secondary' ? `1px solid ${GOLD.primary}30` : variant === 'danger' ? '1px solid rgba(239, 68, 68, 0.3)' : 'none',
      }}
    >
      {children}
    </button>
  );
}

// ==================== INPUT ====================
export function Input({ label, ...props }: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide">{label}</label>}
      <input
        {...props}
        className="premium-input w-full px-4 py-2.5 rounded-lg text-white placeholder-gray-500 outline-none"
      />
    </div>
  );
}

export function Textarea({ label, ...props }: { label?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide">{label}</label>}
      <textarea
        {...props}
        className="premium-input w-full px-4 py-2.5 rounded-lg text-white placeholder-gray-500 outline-none resize-none"
      />
    </div>
  );
}

export function Select({ label, children, ...props }: { label?: string; children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide">{label}</label>}
      <select
        {...props}
        className="premium-input w-full px-4 py-2.5 rounded-lg text-white outline-none"
      >
        {children}
      </select>
    </div>
  );
}

// ==================== BADGE ====================
export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' }) {
  const variants = {
    default: { bg: '#1a1a1a', color: '#9ca3af', border: `${GOLD.primary}30` },
    success: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
    warning: { bg: `${GOLD.primary}15`, color: GOLD.light, border: `${GOLD.primary}40` },
    danger: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
    info: { bg: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
  };
  const v = variants[variant];
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border" style={{ backgroundColor: v.bg, color: v.color, borderColor: v.border }}>
      {children}
    </span>
  );
}

// ==================== IMAGE UPLOADER ====================
import { store } from './store';

interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  gallery?: string[];
  aspectRatio?: 'square' | 'video' | 'wide';
}

export function ImageUploader({ label, value, onChange, gallery = [], aspectRatio = 'video' }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>(store.getUploadedImages());

  const handleFile = (file: File) => {
    setError('');
    
    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    // Проверка размера (максимум 2 МБ для localStorage)
    const maxSize = 2 * 1024 * 1024; // 2 МБ
    if (file.size > maxSize) {
      setError('Размер изображения не должен превышать 2 МБ');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Сохраняем в store
      store.saveUploadedImage(result);
      setUploadedImages(store.getUploadedImages());
      onChange(result);
    };
    reader.onerror = () => {
      setError('Ошибка при чтении файла');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/9]',
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide">{label}</label>}
      
      {/* Превью изображения */}
      {value && (
        <div className="mb-3 relative group">
          <div className={`${aspectClasses[aspectRatio]} rounded-lg overflow-hidden border-2`}>
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-all"
          >
            <AdminIcons.X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Зона загрузки */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-lg transition-all cursor-pointer ${aspectClasses[aspectRatio]} flex items-center justify-center ${
          isDragging
            ? 'border-[#d4af37] bg-[#d4af37]/5'
            : 'border-[#c9a227]/30 hover:border-[#d4af37]/50 bg-[#0a0a0a]'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center p-4">
          <AdminIcons.ImagePlus className="w-10 h-10 mx-auto mb-2 text-gray-500" />
          <p className="text-sm text-gray-400 mb-1">
            {isDragging ? 'Отпустите файл' : 'Перетащите изображение сюда'}
          </p>
          <p className="text-xs text-gray-600">или нажмите для выбора файла</p>
          <p className="text-xs text-gray-600 mt-2">PNG, JPG, WEBP до 2 МБ</p>
        </div>
      </div>

      {/* Ошибка */}
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}

      {/* Галерея */}
      {(gallery.length > 0 || uploadedImages.length > 0) && (
        <div className="mt-4">
          {uploadedImages.length > 0 && (
            <>
              <p className="text-xs text-gray-500 mb-2">Загруженные изображения:</p>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {uploadedImages.map((img, i) => (
                  <div key={i} className="relative group">
                    <button
                      type="button"
                      onClick={() => onChange(img)}
                      className={`${aspectClasses[aspectRatio]} w-full rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                        value === img ? 'border-[#d4af37] ring-2 ring-[#d4af37]/30' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`Uploaded ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        store.removeUploadedImage(img);
                        setUploadedImages(store.getUploadedImages());
                        if (value === img) onChange('');
                      }}
                      className="absolute top-1 right-1 p-1 rounded bg-black/70 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <AdminIcons.X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {gallery.length > 0 && (
            <>
              <p className="text-xs text-gray-500 mb-2">Предустановленные изображения:</p>
              <div className="grid grid-cols-5 gap-2">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onChange(img)}
                    className={`${aspectClasses[aspectRatio]} rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      value === img ? 'border-[#d4af37] ring-2 ring-[#d4af37]/30' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
