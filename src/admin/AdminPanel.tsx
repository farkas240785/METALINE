// Главный компонент админ-панели
import { useState } from 'react';
import type { PageKey, Notification } from './types';
import { Sidebar, TopBar, Toast } from './components';
import { Dashboard, ProductsManager, PortfolioManager, RequestsManager, LibraryManager, UsersManager, SettingsPage } from './pages';

interface AdminPanelProps {
  onExit: () => void;
}

export default function AdminPanel({ onExit }: AdminPanelProps) {
  const [currentPage, setCurrentPage] = useState<PageKey>('dashboard');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showToast = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const pageConfig = {
    dashboard: { title: 'Дашборд', subtitle: 'Обзор ключевых показателей' },
    products: { title: 'Продукция', subtitle: 'Управление каталогом продукции' },
    portfolio: { title: 'Портфолио', subtitle: 'Управление проектами' },
    requests: { title: 'Заявки', subtitle: 'Обработка входящих заявок' },
    library: { title: 'Техническая библиотека', subtitle: 'Управление документами' },
    users: { title: 'Пользователи', subtitle: 'Управление доступом' },
    settings: { title: 'Настройки', subtitle: 'Конфигурация сайта' },
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} showToast={showToast} />;
      case 'products':
        return <ProductsManager showToast={showToast} />;
      case 'portfolio':
        return <PortfolioManager showToast={showToast} />;
      case 'requests':
        return <RequestsManager showToast={showToast} />;
      case 'library':
        return <LibraryManager showToast={showToast} />;
      case 'users':
        return <UsersManager showToast={showToast} />;
      case 'settings':
        return <SettingsPage showToast={showToast} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} showToast={showToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={onExit}
        onPreview={onExit}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title={pageConfig[currentPage].title}
          subtitle={pageConfig[currentPage].subtitle}
        />
        
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      {/* Notifications */}
      <div className="fixed top-6 right-6 z-[100] space-y-3">
        {notifications.map(notification => (
          <Toast
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
}
