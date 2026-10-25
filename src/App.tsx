import { useState, useEffect, lazy, Suspense } from 'react';

const AdminPanel = lazy(() => import('./admin/AdminPanel'));
const LoginPage = lazy(() => import('./admin/LoginPage'));

const Icons = {
  Trophy: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Blueprint: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />
    </svg>
  ),
  Ruler: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 8.7 8.7 21.3c-.9.9-2.4.9-3.3 0L2.7 18.6c-.9-.9-.9-2.4 0-3.3L15.3 2.7c.9-.9 2.4-.9 3.3 0l2.7 2.7c.9.9.9 2.4 0 3.3Z" />
      <path d="m7.5 10.5 2 2" /><path d="m10.5 7.5 2 2" /><path d="m13.5 4.5 2 2" /><path d="m4.5 13.5 2 2" />
    </svg>
  ),
  Shield: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  MapPin: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Clock: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Document: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  ),
  Microscope: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" /><path d="M8 6h4" /><path d="M13 10V6.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2.5a.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V10c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2Z" />
    </svg>
  ),
  Certificate: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      <path d="m9 8 2 2 4-4" />
    </svg>
  ),
  Wrench: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Compass: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Star: ({ filled = false, className = "w-5 h-5" }: { filled?: boolean; className?: string }) => (
    <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  Download: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Menu: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Building: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" />
      <path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" />
      <path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
  ),
  Layers: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  ),
  Flame: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Droplets: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
    </svg>
  ),
  ArrowRightLeft: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3 4 7l4 4" /><path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" /><path d="M20 17H4" />
    </svg>
  ),
  Store: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
    </svg>
  ),
  Home: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Sparkles: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  ),
  Diamond: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
    </svg>
  ),
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#/admin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash === '#/admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.location.hash = '';
  };

  const handleBackToSite = () => {
    window.location.hash = '';
    setIsAdminRoute(false);
  };

  // Маршрутизация админ-панели
  if (isAdminRoute) {
    if (!isAuthenticated) {
      return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Загрузка...</div>}>
          <LoginPage onLogin={handleLogin} onBack={handleBackToSite} />
        </Suspense>
      );
    }

    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Загрузка...</div>}>
        <AdminPanel onExit={handleLogout} />
      </Suspense>
    );
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'products', 'production', 'portfolio', 'tech-library', 'calculator', 'contacts'];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'products', label: 'Продукция' },
    { id: 'production', label: 'Производство' },
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'tech-library', label: 'Тех. библиотека' },
    { id: 'calculator', label: 'Заявка на расчёт' },
    { id: 'contacts', label: 'Контакты' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const GOLD = {
    primary: '#c9a227',
    light: '#d4af37',
    glow: '#f4e5b0',
    dark: '#a67c00',
  };

  const images = {
    hero: 'https://image.qwenlm.ai/generated-images/9487e42d-4d34-4227-bc7c-2b0bcdea0f44/_result.png',
    office: 'https://image.qwenlm.ai/generated-images/643d4e52-4606-4aef-a827-43c9dd6463ba/_result.png',
    sliding: 'https://image.qwenlm.ai/generated-images/9d7bf561-9907-438f-907f-1cbe59bd98fc/_result.png',
    shower: 'https://image.qwenlm.ai/generated-images/928ed75c-3be4-4fb0-aa57-0217341c96bc/_result.png',
    commercial: 'https://image.qwenlm.ai/generated-images/b0227355-9a92-45b5-bd5a-d990a217603c/_result.png',
    interior: 'https://image.qwenlm.ai/generated-images/2948ddcd-5335-4a51-a7d2-75b6fe4f7be2/_result.png',
    production: 'https://image.qwenlm.ai/generated-images/c3a1ecf4-3150-4fb7-a58b-38a2ab8d5f32/_result.png',
    portfolio1: 'https://image.qwenlm.ai/generated-images/14de910b-0c92-4083-ae98-1ae9f1466328/_result.png',
    portfolio2: 'https://image.qwenlm.ai/generated-images/014fb97d-b6ce-421c-837a-5c2defdc3c4e/_result.png',
    portfolio3: 'https://image.qwenlm.ai/generated-images/57a96c46-7ae9-4f71-8418-c149d8e9ecf0/_result.png',
  };

  const products = [
    {
      title: 'Офисные перегородки',
      desc: 'Стационарные системы для зонирования офисного пространства. Алюминиевый каркас с одинарным или двойным остеклением.',
      image: images.office,
      features: ['Высота до 4 м', 'Звукоизоляция 42 дБ', 'Интеграция дверей'],
      price: 'от 8 500 ₽/м²',
      rating: 4.9,
      reviews: 127,
      icon: <Icons.Building className="w-7 h-7" />,
    },
    {
      title: 'Раздвижные перегородки',
      desc: 'Трансформируемые системы для гибкого зонирования. Механизмы скрытого монтажа с плавным ходом.',
      image: images.sliding,
      features: ['Бесшумный ход', 'Автоматика', 'Ширина до 6 м'],
      price: 'от 12 000 ₽/м²',
      rating: 4.8,
      reviews: 89,
      icon: <Icons.ArrowRightLeft className="w-7 h-7" />,
    },
    {
      title: 'Душевые перегородки',
      desc: 'Системы для ванных комнат из закалённого стекла 8-10 мм с фурнитурой из нержавеющей стали.',
      image: images.shower,
      features: ['Закалённое стекло 8-10 мм', 'Антикапля покрытие', 'Любые размеры'],
      price: 'от 15 000 ₽/м²',
      rating: 4.9,
      reviews: 203,
      icon: <Icons.Droplets className="w-7 h-7" />,
    },
    {
      title: 'Торговые перегородки',
      desc: 'Витражные системы для торговых центров и магазинов. Максимальная прозрачность при прочности.',
      image: images.commercial,
      features: ['Витринное остекление', 'Противоударное стекло', 'Быстрый монтаж'],
      price: 'от 9 800 ₽/м²',
      rating: 4.7,
      reviews: 64,
      icon: <Icons.Store className="w-7 h-7" />,
    },
    {
      title: 'Интерьерные перегородки',
      desc: 'Декоративные системы для жилых помещений. Комбинация стекла, металла и дерева.',
      image: images.interior,
      features: ['Дизайнерские решения', 'Тонированное стекло', 'Лофт-стиль'],
      price: 'от 11 500 ₽/м²',
      rating: 4.9,
      reviews: 156,
      icon: <Icons.Home className="w-7 h-7" />,
    },
    {
      title: 'Противопожарные',
      desc: 'Сертифицированные огнестойкие перегородки с пределом устойчивости до 60 минут.',
      image: images.office,
      features: ['EI 30-60', 'Сертификация', 'Остекление до 40%'],
      price: 'от 18 000 ₽/м²',
      rating: 4.8,
      reviews: 42,
      icon: <Icons.Flame className="w-7 h-7" />,
    },
  ];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1" style={{ color: GOLD.light }}>
      {[...Array(5)].map((_, i) => (
        <Icons.Star key={i} filled={i < Math.floor(rating)} className="w-4 h-4" />
      ))}
    </div>
  );

  // Декоративный разделитель
  const PremiumDivider = () => (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 gold-line"></div>
      <div style={{ color: GOLD.light }}>
        <Icons.Diamond className="w-4 h-4" />
      </div>
      <div className="flex-1 gold-line"></div>
    </div>
  );

  // Секционный заголовок
  const SectionHeader = ({ label, title, description }: { label: string; title: string; description?: string }) => (
    <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 gold-line"></div>
                <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: GOLD.light }}>
                  {label}
                </span>
                <div className="w-12 gold-line"></div>
              </div>      <h2 className="elegant-heading text-5xl sm:text-6xl md:text-7xl font-black mt-3 gradient-text mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed font-light">
          {description}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-2xl shadow-black/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => scrollTo('home')}>
              <div className="relative">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${GOLD.primary} 0%, ${GOLD.light} 100%)`, boxShadow: `0 15px 40px ${GOLD.primary}50` }}>
                  <span className="text-black font-black text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>M</span>
                </div>
                <div className="absolute inset-0 rounded-lg animate-pulse-gold" style={{ boxShadow: `0 0 0 0 ${GOLD.primary}40` }}></div>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>METALINE</span>
                <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: GOLD.primary }}>Factory · Est. 2012</div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    activeSection === item.id
                      ? 'border'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  style={activeSection === item.id ? { color: GOLD.light, backgroundColor: `${GOLD.primary}15`, borderColor: `${GOLD.primary}50` } : {}}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD.light}, transparent)` }}></div>
                  )}
                </button>
              ))}
            </nav>

            <button
              className="lg:hidden p-3 rounded-lg hover:bg-white/10 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden glass border-t" style={{ borderColor: `${GOLD.primary}30` }}>
            <div className="px-4 py-6 space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left px-5 py-4 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id ? '' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  style={activeSection === item.id ? { color: GOLD.light, backgroundColor: `${GOLD.primary}15` } : {}}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.hero} alt="METALINE" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50"></div>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-1/4 right-10 w-px h-48 gold-line-vertical hidden lg:block"></div>
        <div className="absolute bottom-1/4 left-10 w-px h-48 gold-line-vertical hidden lg:block"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 luxury-badge">
                <div style={{ color: GOLD.light }}>
                  <Icons.Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium tracking-wider uppercase" style={{ color: GOLD.light }}>
                  Премиум качество
                </span>
              </div>
              
              <h1 className="elegant-heading text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                <span className="gradient-text">
                  Перегородки
                </span>
                <br />
                <span className="text-white">из алюминиевого</span>
                <br />
                <span className="gradient-text">профиля</span>
              </h1>
              
              <div className="gold-line w-32 my-8"></div>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-xl">
                Проектируем и производим стеклянные перегородки с алюминиевым каркасом для офисов, 
                торговых центров и жилых помещений. Закалённое стекло, точные инженерные решения, 
                безупречный монтаж.
              </p>

              <div className="flex items-center gap-6 mb-10">
                <div className="flex items-center gap-2" style={{ color: GOLD.light }}>
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star key={i} filled className="w-6 h-6" />
                  ))}
                </div>
                <div>
                  <div className="text-white font-bold text-lg">4.9 из 5</div>
                  <div className="text-gray-500 text-sm">500+ отзывов клиентов</div>
                </div>
              </div>

              <div className="mb-10">
                <div className="text-sm text-gray-500 mb-2 tracking-wider uppercase">Стоимость от</div>
                <div className="text-5xl font-black gradient-text" style={{ fontFamily: 'Cormorant Garamond, serif' }}>8 500 ₽/м²</div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={() => scrollTo('calculator')}
                  className="btn-premium px-10 py-5 text-black font-bold rounded-xl shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${GOLD.primary} 0%, ${GOLD.light} 100%)`, boxShadow: `0 20px 40px ${GOLD.primary}50` }}
                >
                  Рассчитать стоимость
                </button>
                <button
                  onClick={() => scrollTo('portfolio')}
                  className="px-10 py-5 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
                  style={{ border: `1px solid ${GOLD.primary}40` }}
                >
                  Смотреть проекты
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {[
                { value: '12+', label: 'Лет на рынке', icon: <Icons.Trophy className="w-8 h-8" /> },
                { value: '500+', label: 'Проектов', icon: <Icons.Blueprint className="w-8 h-8" /> },
                { value: '50 000', label: 'м² перегородок', icon: <Icons.Ruler className="w-8 h-8" /> },
                { value: '5 лет', label: 'Гарантия', icon: <Icons.Shield className="w-8 h-8" /> },
              ].map((stat, i) => (
                <div key={i} className="p-8 rounded-2xl bg-[#1a1a1a] card-hover gold-corners" style={{ border: `1px solid ${GOLD.primary}30` }}>
                  <div className="mb-4" style={{ color: GOLD.light }}>{stat.icon}</div>
                  <div className="text-4xl font-black gradient-text mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{stat.value}</div>
                  <div className="text-sm text-gray-400 font-light tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 md:py-40 bg-[#0a0a0a] ornament-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Каталог"
            title="Наша продукция"
            description="Полный спектр перегородочных систем для любых задач — от стационарных до трансформируемых"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <div key={i} className="group rounded-3xl bg-[#141414] overflow-hidden card-hover" style={{ border: `1px solid ${GOLD.primary}20` }}>
                <div className="relative h-72 overflow-hidden premium-image">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
                  
                  <div className="absolute top-5 right-5 px-5 py-2.5 rounded-xl text-black font-bold text-sm shadow-2xl btn-premium" style={{ background: `linear-gradient(135deg, ${GOLD.primary} 0%, ${GOLD.light} 100%)` }}>
                    {product.price}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <StarRating rating={product.rating} />
                    <span className="text-white font-semibold text-sm">{product.rating}</span>
                    <span className="text-gray-500 text-sm">· {product.reviews} отзывов</span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: `${GOLD.primary}15`, color: GOLD.light }}>
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-[#d4af37] transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{product.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">{product.desc}</p>
                  
                  <div className="gold-line mb-6"></div>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                        <span style={{ color: GOLD.light }}><Icons.Check className="w-4 h-4" /></span>
                        <span className="font-light">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="btn-premium w-full py-4 text-black font-bold rounded-xl shadow-xl"
                    style={{ background: `linear-gradient(135deg, ${GOLD.primary} 0%, ${GOLD.light} 100%)`, boxShadow: `0 10px 25px ${GOLD.primary}30` }}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Section */}
      <section id="production" className="py-32 md:py-40 bg-[#141414] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 gold-line"></div>
        <div className="absolute bottom-0 left-0 right-0 gold-line"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Как мы работаем"
            title="Производство"
            description="Собственное производство площадью 3000 м² с современным оборудованием"
          />

          <div className="relative rounded-3xl overflow-hidden mb-20 h-80 md:h-[500px] gold-corners" style={{ border: `1px solid ${GOLD.primary}30` }}>
            <img src={images.production} alt="Производство METALINE" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10 md:p-14">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 gold-line"></div>
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: GOLD.light }}>Наше производство</span>
              </div>
              <h3 className="elegant-heading text-4xl md:text-6xl font-black gradient-text mb-3">Собственное производство</h3>
              <p className="text-gray-300 text-xl font-light">3000 м² производственных площадей</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { step: '01', title: 'Замер и проект', desc: 'Выезд специалиста, точные замеры, 3D-визуализация', icon: <Icons.Ruler className="w-8 h-8" /> },
              { step: '02', title: 'Производство', desc: 'Раскрой профиля, закалка стекла, сборка конструкций', icon: <Icons.Wrench className="w-8 h-8" /> },
              { step: '03', title: 'Контроль качества', desc: 'Многоступенчатая проверка на каждом этапе', icon: <Icons.Certificate className="w-8 h-8" /> },
              { step: '04', title: 'Монтаж', desc: 'Профессиональная установка с гарантией 5 лет', icon: <Icons.Shield className="w-8 h-8" /> },
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-3xl bg-[#0a0a0a] card-hover gold-corners" style={{ border: `1px solid ${GOLD.primary}30` }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${GOLD.primary}15`, color: GOLD.light }}>
                    {item.icon}
                  </div>
                  <div className="text-5xl font-black gradient-text" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.step}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mb-8 border-b" style={{ borderColor: `${GOLD.primary}30` }}>
            <button
              onClick={() => setActiveTab('description')}
              className="px-8 py-4 font-semibold transition-all"
              style={activeTab === 'description' ? { color: GOLD.light, borderBottom: `2px solid ${GOLD.light}` } : { color: '#9ca3af' }}
            >
              Описание
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className="px-8 py-4 font-semibold transition-all"
              style={activeTab === 'specs' ? { color: GOLD.light, borderBottom: `2px solid ${GOLD.light}` } : { color: '#9ca3af' }}
            >
              Характеристики
            </button>
          </div>

          {activeTab === 'description' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 rounded-3xl bg-[#0a0a0a] gold-corners" style={{ border: `1px solid ${GOLD.primary}30` }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${GOLD.primary}15`, color: GOLD.light }}>
                    <Icons.Wrench className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Оборудование</h3>
                </div>
                <div className="space-y-5">
                  {['Станок закалки стекла (до 12 мм)', 'Автоматический раскроечный станок', 'Линия нанесения покрытий', 'Установка двойного остекления', 'Цех порошковой окраски', 'Контрольно-измерительное оборудование'].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GOLD.light }}></div>
                      <span className="text-gray-300 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-10 rounded-3xl bg-[#0a0a0a] gold-corners" style={{ border: `1px solid ${GOLD.primary}30` }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${GOLD.primary}15`, color: GOLD.light }}>
                    <Icons.Layers className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Материалы</h3>
                </div>
                <div className="space-y-5">
                  {['Алюминиевый профиль (Alutech, Reynaers)', 'Закалённое стекло 4-12 мм', 'Триплекс многослойный', 'Тонированное и матовое стекло', 'Фурнитура Dorma, GEZE', 'Уплотнители и герметики'].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GOLD.light }}></div>
                      <span className="text-gray-300 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="p-10 rounded-3xl bg-[#0a0a0a] gold-corners" style={{ border: `1px solid ${GOLD.primary}30` }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${GOLD.primary}15`, color: GOLD.light }}>
                  <Icons.Compass className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Технические характеристики</h3>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Высота перегородок', value: 'до 4 м' },
                  { label: 'Толщина стекла', value: '4-12 мм' },
                  { label: 'Звукоизоляция', value: 'до 42 дБ' },
                  { label: 'Огнестойкость', value: 'EI 30-60' },
                  { label: 'Гарантия', value: '5 лет' },
                  { label: 'Срок изготовления', value: 'от 7 дней' },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b" style={{ borderColor: `${GOLD.primary}15` }}>
                    <span className="text-gray-400 font-light">{spec.label}</span>
                    <span className="text-white font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 md:py-40 bg-[#0a0a0a] ornament-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Наши работы"
            title="Портфолио"
            description="Реализованные проекты для ведущих компаний и частных клиентов"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Бизнес-центр "Меридиан"', type: 'Офисные перегородки', area: '1 200 м²', image: images.portfolio1, rating: 4.9 },
              { title: 'ТЦ "Галерея"', type: 'Торговые витражи', area: '800 м²', image: images.commercial, rating: 4.8 },
              { title: 'ЖК "Панорама"', type: 'Интерьерные перегородки', area: '450 м²', image: images.interior, rating: 4.9 },
              { title: 'Клиника "МедЛайф"', type: 'Зонирование помещений', area: '600 м²', image: images.office, rating: 4.7 },
              { title: 'Отель "Ривьера"', type: 'Душевые перегородки', area: '320 м²', image: images.portfolio2, rating: 4.9 },
              { title: 'Коворкинг "Точка"', type: 'Раздвижные системы', area: '280 м²', image: images.portfolio3, rating: 4.8 },
            ].map((project, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl cursor-pointer card-hover" style={{ border: `1px solid ${GOLD.primary}30` }}>
                <div className="aspect-[4/3] overflow-hidden premium-image">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <StarRating rating={project.rating} />
                    <span className="text-white font-semibold text-sm">{project.rating}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 font-light">{project.type}</p>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-8 gold-line"></div>
                    <span className="font-bold" style={{ color: GOLD.light }}>{project.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Library Section */}
      <section id="tech-library" className="py-32 md:py-40 bg-[#141414] relative">
        <div className="absolute top-0 left-0 right-0 gold-line"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Документация"
            title="Техническая библиотека"
            description="Каталог технической документации, сертификатов и спецификаций"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Каталог систем', type: 'PDF', size: '12.4 МБ', icon: <Icons.Document className="w-8 h-8" />, desc: 'Полный каталог перегородочных систем с техническими характеристиками' },
              { title: 'Алюминиевый профиль', type: 'PDF', size: '8.2 МБ', icon: <Icons.Blueprint className="w-8 h-8" />, desc: 'Технические данные профилей, сечения, допустимые нагрузки' },
              { title: 'Закалённое стекло', type: 'PDF', size: '5.6 МБ', icon: <Icons.Microscope className="w-8 h-8" />, desc: 'Характеристики закалённого стекла, таблицы прочности' },
              { title: 'Сертификаты', type: 'PDF', size: '3.1 МБ', icon: <Icons.Certificate className="w-8 h-8" />, desc: 'Сертификаты соответствия, пожарные сертификаты' },
              { title: 'Инструкция по монтажу', type: 'PDF', size: '15.8 МБ', icon: <Icons.Wrench className="w-8 h-8" />, desc: 'Подробная инструкция по установке перегородок' },
              { title: 'Узлы примыкания', type: 'DWG', size: '22.3 МБ', icon: <Icons.Compass className="w-8 h-8" />, desc: 'Чертежи узлов в формате AutoCAD для проектировщиков' },
            ].map((doc, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-[#0a0a0a] card-hover gold-corners" style={{ border: `1px solid ${GOLD.primary}30` }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 rounded-2xl" style={{ backgroundColor: `${GOLD.primary}15`, color: GOLD.light }}>
                    {doc.icon}
                  </div>
                  <span className="px-4 py-2 rounded-xl text-xs font-mono tracking-wider border" style={{ backgroundColor: `${GOLD.primary}15`, color: GOLD.light, borderColor: `${GOLD.primary}40` }}>{doc.type}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#d4af37] transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{doc.title}</h3>
                <p className="text-gray-400 text-sm mb-6 font-light leading-relaxed">{doc.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: `${GOLD.primary}20` }}>
                  <span className="text-xs text-gray-500 tracking-wider">{doc.size}</span>
                  <button className="flex items-center gap-2 text-sm font-semibold transition-colors group/btn" style={{ color: GOLD.light }}>
                    <Icons.Download />
                    <span className="group-hover/btn:underline">Скачать</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator / Request Section */}
      <section id="calculator" className="py-32 md:py-40 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={images.hero} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-[#0a0a0a]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Расчёт"
            title="Заявка на расчёт"
            description="Заполните форму и мы подготовим коммерческое предложение в течение 24 часов"
          />

          <div className="max-w-3xl mx-auto">
            <form className="p-10 md:p-12 rounded-3xl glass" style={{ border: `1px solid ${GOLD.primary}30` }} onSubmit={(e) => { e.preventDefault(); alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.'); }}>
              <div className="grid md:grid-cols-2 gap-7">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Ваше имя *</label>
                  <input type="text" required className="premium-input w-full px-5 py-4 rounded-xl text-white placeholder-gray-500 outline-none" placeholder="Иван Петров" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Телефон *</label>
                  <input type="tel" required className="premium-input w-full px-5 py-4 rounded-xl text-white placeholder-gray-500 outline-none" placeholder="+7 (999) 123-45-67" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Email</label>
                  <input type="email" className="premium-input w-full px-5 py-4 rounded-xl text-white placeholder-gray-500 outline-none" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Тип перегородок</label>
                  <select className="premium-input w-full px-5 py-4 rounded-xl text-white outline-none">
                    <option value="">Выберите тип</option>
                    <option value="office">Офисные перегородки</option>
                    <option value="sliding">Раздвижные перегородки</option>
                    <option value="shower">Душевые перегородки</option>
                    <option value="commercial">Торговые перегородки</option>
                    <option value="interior">Интерьерные перегородки</option>
                    <option value="fire">Противопожарные перегородки</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Примерная площадь (м²)</label>
                  <input type="number" className="premium-input w-full px-5 py-4 rounded-xl text-white placeholder-gray-500 outline-none" placeholder="100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Высота перегородок (м)</label>
                  <input type="number" step="0.1" className="premium-input w-full px-5 py-4 rounded-xl text-white placeholder-gray-500 outline-none" placeholder="2.7" />
                </div>
              </div>
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Комментарий</label>
                <textarea rows={4} className="premium-input w-full px-5 py-4 rounded-xl text-white placeholder-gray-500 outline-none resize-none" placeholder="Опишите ваш проект, пожелания по материалам, срокам..."></textarea>
              </div>
              <button type="submit" className="btn-premium w-full mt-10 py-5 text-black font-bold rounded-xl shadow-2xl" style={{ background: `linear-gradient(135deg, ${GOLD.primary} 0%, ${GOLD.light} 100%)`, boxShadow: `0 20px 40px ${GOLD.primary}50` }}>
                Отправить заявку
              </button>
              <p className="text-center text-gray-500 text-xs mt-5 font-light tracking-wide">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-32 md:py-40 bg-[#141414] relative">
        <div className="absolute top-0 left-0 right-0 gold-line"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Связаться"
            title="Контакты"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Icons.MapPin className="w-6 h-6" />,
                title: 'Адрес',
                lines: ['г. Новочебоксарск, ул. Промышленная, д. 41', 'Корпус 5']
              },
              {
                icon: <Icons.Phone className="w-6 h-6" />,
                title: 'Телефон',
                lines: ['+7 (495) 123-45-67', '+7 (800) 555-35-35 (бесплатно)']
              },
              {
                icon: <Icons.Mail className="w-6 h-6" />,
                title: 'Email',
                lines: ['info@metaline.tech', 'project@metaline.tech']
              },
              {
                icon: <Icons.Clock className="w-6 h-6" />,
                title: 'Режим работы',
                lines: ['Пн-Пт: 9:00 — 18:00', 'Сб: 10:00 — 15:00']
              },
            ].map((contact, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#0a0a0a] text-center card-hover gold-corners" style={{ border: `1px solid ${GOLD.primary}30` }}>
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${GOLD.primary}15`, color: GOLD.light }}>
                  {contact.icon}
                </div>
                <h3 className="font-bold mb-3 text-white text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{contact.title}</h3>
                {contact.lines.map((line, j) => (
                  <p key={j} className="text-gray-400 text-sm font-light">{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl overflow-hidden h-80 md:h-[500px] gold-corners" style={{ border: `1px solid ${GOLD.primary}30` }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?text=г.%20Новочебоксарск%2C%20ул.%20Промышленная%2C%2041%20корпус%205&z=18&l=map"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              style={{ display: 'block' }}
              title="METALINE на карте — г. Новочебоксарск, ул. Промышленная, д. 41, корп. 5"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#0a0a0a] relative">
        <div className="absolute top-0 left-0 right-0 gold-line"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD.primary} 0%, ${GOLD.light} 100%)` }}>
                  <span className="text-black font-black text-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>M</span>
                </div>
                <div>
                  <span className="text-2xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>METALINE</span>
                  <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: GOLD.primary }}>Factory · Est. 2012</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Фабрика перегородок из алюминиевого профиля с закалённым стеклом. 
                Проектирование, производство и монтаж.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg" style={{ color: GOLD.light, fontFamily: 'Cormorant Garamond, serif' }}>Навигация</h4>
              <div className="space-y-3">
                {navItems.slice(0, 4).map(item => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} className="block text-gray-400 text-sm hover:text-[#d4af37] transition-colors font-light">
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg" style={{ color: GOLD.light, fontFamily: 'Cormorant Garamond, serif' }}>Контакты</h4>
              <div className="space-y-3 text-sm text-gray-400 font-light">
                <p>+7 (495) 123-45-67</p>
                <p>info@metaline.tech</p>
                <p>г. Новочебоксарск, ул. Промышленная, д. 41</p>
              </div>
            </div>
          </div>

          <PremiumDivider />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm font-light tracking-wide">© 2024 METALINE. Все права защищены.</p>
            <div className="flex gap-4">
              {[
                <svg key="tw" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>,
                <svg key="ig" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                <svg key="wa" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.05 4.91A9.816 9.816 0 0012.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 004.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 012.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27z"/></svg>,
              ].map((icon, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: '#1a1a1a', border: `1px solid ${GOLD.primary}30`, color: '#9ca3af' }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
