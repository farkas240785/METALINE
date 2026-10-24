// Страница входа в админ-панель
import { useState } from 'react';
import { GOLD } from './store';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Имитация проверки пароля
    setTimeout(() => {
      if (password === 'admin') {
        onLogin();
      } else {
        setError('Неверный пароль');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Декоративные элементы */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: GOLD.primary }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: GOLD.light }}></div>

      <div className="relative w-full max-w-md">
        {/* Логотип */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 shadow-2xl" style={{ background: `linear-gradient(135deg, ${GOLD.primary} 0%, ${GOLD.light} 100%)`, boxShadow: `0 20px 60px ${GOLD.primary}50` }}>
            <span className="text-black font-black text-4xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>M</span>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>METALINE</h1>
          <p className="text-sm text-gray-500 tracking-wider uppercase">Admin Panel</p>
        </div>

        {/* Форма входа */}
        <div className="p-8 rounded-2xl bg-[#141414] border shadow-2xl" style={{ borderColor: `${GOLD.primary}30` }}>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Вход в систему</h2>
          <p className="text-sm text-gray-500 mb-6 font-light">Введите пароль для доступа к админ-панели</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="premium-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                autoFocus
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-premium w-full py-3 text-black font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: `linear-gradient(135deg, ${GOLD.primary} 0%, ${GOLD.light} 100%)`, boxShadow: `0 10px 30px ${GOLD.primary}50` }}
            >
              {isLoading ? 'Проверка...' : 'Войти'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: `${GOLD.primary}20` }}>
            <button
              onClick={onBack}
              className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors font-light"
            >
              ← Вернуться на сайт
            </button>
          </div>
        </div>

        {/* Подсказка */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600 font-light">
            Доступ только для авторизованных пользователей
          </p>
        </div>
      </div>
    </div>
  );
}
