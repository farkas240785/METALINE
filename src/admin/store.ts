// Хранилище данных с localStorage
import type { Product, PortfolioItem, Request, Document, SiteSettings, User } from './types';

const STORAGE_KEYS = {
  products: 'metaline_products',
  portfolio: 'metaline_portfolio',
  requests: 'metaline_requests',
  documents: 'metaline_documents',
  settings: 'metaline_settings',
  users: 'metaline_users',
};

const GOLD = {
  primary: '#c9a227',
  light: '#d4af37',
  glow: '#f4e5b0',
  dark: '#a67c00',
};

const images = {
  office: 'https://image.qwenlm.ai/generated-images/643d4e52-4606-4aef-a827-43c9dd6463ba/_result.png',
  sliding: 'https://image.qwenlm.ai/generated-images/9d7bf561-9907-438f-907f-1cbe59bd98fc/_result.png',
  shower: 'https://image.qwenlm.ai/generated-images/928ed75c-3be4-4fb0-aa57-0217341c96bc/_result.png',
  commercial: 'https://image.qwenlm.ai/generated-images/b0227355-9a92-45b5-bd5a-d990a217603c/_result.png',
  interior: 'https://image.qwenlm.ai/generated-images/2948ddcd-5335-4a51-a7d2-75b6fe4f7be2/_result.png',
  portfolio1: 'https://image.qwenlm.ai/generated-images/14de910b-0c92-4083-ae98-1ae9f1466328/_result.png',
  portfolio2: 'https://image.qwenlm.ai/generated-images/014fb97d-b6ce-421c-837a-5c2defdc3c4e/_result.png',
  portfolio3: 'https://image.qwenlm.ai/generated-images/57a96c46-7ae9-4f71-8418-c149d8e9ecf0/_result.png',
};

// Начальные данные
const initialProducts: Product[] = [
  {
    id: '1', title: 'Офисные перегородки', description: 'Стационарные системы для зонирования офисного пространства',
    price: 'от 8 500 ₽/м²', image: images.office, features: ['Высота до 4 м', 'Звукоизоляция 42 дБ', 'Интеграция дверей'],
    rating: 4.9, reviews: 127, icon: 'building', active: true, createdAt: '2024-01-15',
  },
  {
    id: '2', title: 'Раздвижные перегородки', description: 'Трансформируемые системы для гибкого зонирования',
    price: 'от 12 000 ₽/м²', image: images.sliding, features: ['Бесшумный ход', 'Автоматика', 'Ширина до 6 м'],
    rating: 4.8, reviews: 89, icon: 'arrow-right-left', active: true, createdAt: '2024-01-15',
  },
  {
    id: '3', title: 'Душевые перегородки', description: 'Системы для ванных комнат из закалённого стекла',
    price: 'от 15 000 ₽/м²', image: images.shower, features: ['Закалённое стекло 8-10 мм', 'Антикапля покрытие', 'Любые размеры'],
    rating: 4.9, reviews: 203, icon: 'droplets', active: true, createdAt: '2024-01-15',
  },
  {
    id: '4', title: 'Торговые перегородки', description: 'Витражные системы для торговых центров',
    price: 'от 9 800 ₽/м²', image: images.commercial, features: ['Витринное остекление', 'Противоударное стекло', 'Быстрый монтаж'],
    rating: 4.7, reviews: 64, icon: 'store', active: true, createdAt: '2024-01-15',
  },
  {
    id: '5', title: 'Интерьерные перегородки', description: 'Декоративные системы для жилых помещений',
    price: 'от 11 500 ₽/м²', image: images.interior, features: ['Дизайнерские решения', 'Тонированное стекло', 'Лофт-стиль'],
    rating: 4.9, reviews: 156, icon: 'home', active: true, createdAt: '2024-01-15',
  },
  {
    id: '6', title: 'Противопожарные', description: 'Сертифицированные огнестойкие перегородки',
    price: 'от 18 000 ₽/м²', image: images.office, features: ['EI 30-60', 'Сертификация', 'Остекление до 40%'],
    rating: 4.8, reviews: 42, icon: 'flame', active: true, createdAt: '2024-01-15',
  },
];

const initialPortfolio: PortfolioItem[] = [
  { id: '1', title: 'Бизнес-центр "Меридиан"', type: 'Офисные перегородки', area: '1 200 м²', image: images.portfolio1, rating: 4.9, description: 'Зонирование 12 этажей офисного центра', client: 'ООО "Меридиан"', year: 2024, status: 'published', createdAt: '2024-03-15' },
  { id: '2', title: 'ТЦ "Галерея"', type: 'Торговые витражи', area: '800 м²', image: images.commercial, rating: 4.8, description: 'Витражное остекление торгового центра', client: 'ТЦ "Галерея"', year: 2024, status: 'published', createdAt: '2024-02-20' },
  { id: '3', title: 'ЖК "Панорама"', type: 'Интерьерные перегородки', area: '450 м²', image: images.interior, rating: 4.9, description: 'Интерьерные решения для жилых апартаментов', client: 'ЖК "Панорама"', year: 2024, status: 'published', createdAt: '2024-01-10' },
  { id: '4', title: 'Клиника "МедЛайф"', type: 'Зонирование помещений', area: '600 м²', image: images.office, rating: 4.7, description: 'Медицинское зонирование с соблюдением норм', client: 'Клиника "МедЛайф"', year: 2023, status: 'published', createdAt: '2023-11-05' },
  { id: '5', title: 'Отель "Ривьера"', type: 'Душевые перегородки', area: '320 м²', image: images.portfolio2, rating: 4.9, description: 'Премиальные душевые для номеров люкс', client: 'Отель "Ривьера"', year: 2023, status: 'published', createdAt: '2023-09-15' },
  { id: '6', title: 'Коворкинг "Точка"', type: 'Раздвижные системы', area: '280 м²', image: images.portfolio3, rating: 4.8, description: 'Трансформируемые переговорные комнаты', client: 'Коворкинг "Точка"', year: 2023, status: 'draft', createdAt: '2023-08-20' },
];

const initialRequests: Request[] = [
  { id: '1', name: 'Иван Петров', phone: '+7 (999) 123-45-67', email: 'ivan@example.com', productType: 'Офисные перегородки', area: 150, height: 3, comment: 'Нужно зонировать офис на 3 кабинета', status: 'new', priority: 'high', createdAt: '2024-11-20 14:30', updatedAt: '2024-11-20 14:30' },
  { id: '2', name: 'Мария Сидорова', phone: '+7 (999) 234-56-78', email: 'maria@example.com', productType: 'Душевые перегородки', area: 8, height: 2.2, comment: 'Душевая в частный дом', status: 'in_progress', priority: 'medium', createdAt: '2024-11-19 10:15', updatedAt: '2024-11-19 16:45' },
  { id: '3', name: 'Алексей Иванов', phone: '+7 (999) 345-67-89', email: 'alex@example.com', productType: 'Раздвижные перегородки', area: 45, height: 2.8, comment: 'Перегородка между кухней и гостиной', status: 'in_progress', priority: 'low', createdAt: '2024-11-18 09:00', updatedAt: '2024-11-20 11:20' },
  { id: '4', name: 'Елена Козлова', phone: '+7 (999) 456-78-90', email: 'elena@example.com', productType: 'Интерьерные перегородки', area: 25, height: 2.7, comment: 'Лофт-перегородка в студию', status: 'completed', priority: 'medium', createdAt: '2024-11-15 13:45', updatedAt: '2024-11-18 17:30' },
  { id: '5', name: 'Дмитрий Волков', phone: '+7 (999) 567-89-01', email: 'dmitry@example.com', productType: 'Торговые перегородки', area: 200, height: 3.5, comment: 'Витрины для нового магазина', status: 'new', priority: 'high', createdAt: '2024-11-20 16:00', updatedAt: '2024-11-20 16:00' },
  { id: '6', name: 'Ольга Новикова', phone: '+7 (999) 678-90-12', email: 'olga@example.com', productType: 'Противопожарные', area: 80, height: 3, comment: 'Противопожарные перегородки для склада', status: 'cancelled', priority: 'low', createdAt: '2024-11-10 11:30', updatedAt: '2024-11-12 09:15' },
];

const initialDocuments: Document[] = [
  { id: '1', title: 'Каталог систем', type: 'PDF', size: '12.4 МБ', category: 'Каталоги', description: 'Полный каталог перегородочных систем', downloads: 234, createdAt: '2024-01-10' },
  { id: '2', title: 'Алюминиевый профиль', type: 'PDF', size: '8.2 МБ', category: 'Технические', description: 'Технические данные профилей', downloads: 156, createdAt: '2024-01-15' },
  { id: '3', title: 'Закалённое стекло', type: 'PDF', size: '5.6 МБ', category: 'Технические', description: 'Характеристики закалённого стекла', downloads: 98, createdAt: '2024-02-01' },
  { id: '4', title: 'Сертификаты', type: 'PDF', size: '3.1 МБ', category: 'Сертификаты', description: 'Сертификаты соответствия', downloads: 312, createdAt: '2024-02-10' },
  { id: '5', title: 'Инструкция по монтажу', type: 'PDF', size: '15.8 МБ', category: 'Инструкции', description: 'Подробная инструкция по установке', downloads: 187, createdAt: '2024-02-15' },
  { id: '6', title: 'Узлы примыкания', type: 'DWG', size: '22.3 МБ', category: 'Чертежи', description: 'Чертежи узлов в формате AutoCAD', downloads: 76, createdAt: '2024-03-01' },
];

const initialSettings: SiteSettings = {
  companyName: 'METALINE',
  tagline: 'Factory · Est. 2012',
  phone1: '+7 (495) 123-45-67',
  phone2: '+7 (800) 555-35-35',
  email1: 'info@metaline.tech',
  email2: 'project@metaline.tech',
  address: 'г. Новочебоксарск, ул. Промышленная, д. 41',
  addressLine2: 'Корпус 5',
  workHours1: 'Пн-Пт: 9:00 — 18:00',
  workHours2: 'Сб: 10:00 — 15:00',
  mapQuery: 'г. Новочебоксарск, ул. Промышленная, 41 корпус 5',
  socialTwitter: 'https://twitter.com/metaline',
  socialInstagram: 'https://instagram.com/metaline',
  socialWhatsapp: 'https://wa.me/74951234567',
  seoTitle: 'METALINE — Фабрика перегородок из алюминиевого профиля',
  seoDescription: 'Проектирование и производство стеклянных перегородок с алюминиевым каркасом',
  maintenanceMode: false,
};

const initialUsers: User[] = [
  { id: '1', name: 'Администратор', email: 'admin@metaline.tech', role: 'admin', lastLogin: '2024-11-20 14:30', active: true },
  { id: '2', name: 'Менеджер продаж', email: 'sales@metaline.tech', role: 'manager', lastLogin: '2024-11-20 10:15', active: true },
  { id: '3', name: 'Контент-менеджер', email: 'content@metaline.tech', role: 'editor', lastLogin: '2024-11-19 16:45', active: true },
  { id: '4', name: 'Маркетолог', email: 'marketing@metaline.tech', role: 'editor', lastLogin: '2024-11-15 09:00', active: false },
];

// Универсальные функции работы с localStorage
function loadFromStorage<T>(key: string, initial: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error(`Error loading ${key}:`, e);
  }
  return initial;
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key}:`, e);
  }
}

// Хранилище
export const store = {
  // Products
  getProducts: (): Product[] => loadFromStorage(STORAGE_KEYS.products, initialProducts),
  saveProducts: (data: Product[]) => saveToStorage(STORAGE_KEYS.products, data),
  
  // Portfolio
  getPortfolio: (): PortfolioItem[] => loadFromStorage(STORAGE_KEYS.portfolio, initialPortfolio),
  savePortfolio: (data: PortfolioItem[]) => saveToStorage(STORAGE_KEYS.portfolio, data),
  
  // Requests
  getRequests: (): Request[] => loadFromStorage(STORAGE_KEYS.requests, initialRequests),
  saveRequests: (data: Request[]) => saveToStorage(STORAGE_KEYS.requests, data),
  
  // Documents
  getDocuments: (): Document[] => loadFromStorage(STORAGE_KEYS.documents, initialDocuments),
  saveDocuments: (data: Document[]) => saveToStorage(STORAGE_KEYS.documents, data),
  
  // Settings
  getSettings: (): SiteSettings => loadFromStorage(STORAGE_KEYS.settings, initialSettings),
  saveSettings: (data: SiteSettings) => saveToStorage(STORAGE_KEYS.settings, data),
  
  // Users
  getUsers: (): User[] => loadFromStorage(STORAGE_KEYS.users, initialUsers),
  saveUsers: (data: User[]) => saveToStorage(STORAGE_KEYS.users, data),
  
  // Reset
  resetAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};

export { GOLD, images };
