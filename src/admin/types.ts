// Типы данных для административной панели

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  rating: number;
  reviews: number;
  icon: string;
  active: boolean;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  area: string;
  image: string;
  rating: number;
  description: string;
  client: string;
  year: number;
  status: 'published' | 'draft';
  createdAt: string;
}

export interface Request {
  id: string;
  name: string;
  phone: string;
  email: string;
  productType: string;
  area: number;
  height: number;
  comment: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'PDF' | 'DWG' | 'DOCX' | 'XLSX';
  size: string;
  category: string;
  description: string;
  downloads: number;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  address: string;
  addressLine2: string;
  workHours1: string;
  workHours2: string;
  mapQuery: string;
  socialTwitter: string;
  socialInstagram: string;
  socialWhatsapp: string;
  seoTitle: string;
  seoDescription: string;
  maintenanceMode: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'editor';
  lastLogin: string;
  active: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
}

export type PageKey =
  | 'dashboard'
  | 'products'
  | 'portfolio'
  | 'requests'
  | 'library'
  | 'settings'
  | 'users';
