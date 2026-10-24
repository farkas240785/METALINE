// Страницы админ-панели
import { useState, useMemo } from 'react';
import type { Product, PortfolioItem, Request, Document, SiteSettings, User, Notification } from './types';
import { store, GOLD, images } from './store';
import { AdminIcons, StatsCard, Button, Modal, Input, Textarea, Select, Badge, ImageUploader } from './components';

// ==================== DASHBOARD ====================
export function Dashboard({ onNavigate, showToast }: { onNavigate: (p: any) => void; showToast: (n: Omit<Notification, 'id' | 'timestamp'>) => void }) {
  const products = store.getProducts();
  const portfolio = store.getPortfolio();
  const requests = store.getRequests();
  const documents = store.getDocuments();

  const newRequests = requests.filter(r => r.status === 'new').length;
  const inProgress = requests.filter(r => r.status === 'in_progress').length;
  const completed = requests.filter(r => r.status === 'completed').length;
  const totalDownloads = documents.reduce((sum, d) => sum + d.downloads, 0);

  // Данные для графика
  const monthlyData = [
    { month: 'Июн', requests: 28, revenue: 420 },
    { month: 'Июл', requests: 35, revenue: 510 },
    { month: 'Авг', requests: 42, revenue: 630 },
    { month: 'Сен', requests: 38, revenue: 580 },
    { month: 'Окт', requests: 51, revenue: 720 },
    { month: 'Ноя', requests: 47, revenue: 680 },
  ];
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  const recentRequests = [...requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  return (
    <div className="p-8 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard label="Всего заявок" value={requests.length} change="+12%" icon={<AdminIcons.Inbox />} color={GOLD.primary} />
        <StatsCard label="Новых заявок" value={newRequests} change="+3" icon={<AdminIcons.Bell />} color="#fbbf24" />
        <StatsCard label="Активных проектов" value={portfolio.filter(p => p.status === 'published').length} change="+2" icon={<AdminIcons.Image />} color="#60a5fa" />
        <StatsCard label="Скачиваний документов" value={totalDownloads} change="+18%" icon={<AdminIcons.Download />} color="#22c55e" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141414] border" style={{ borderColor: `${GOLD.primary}20` }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Выручка по месяцам</h3>
              <p className="text-sm text-gray-500 mt-1 font-light">Динамика за последние 6 месяцев (тыс. ₽)</p>
            </div>
            <Badge variant="success">+18% к прошлому году</Badge>
          </div>
          <div className="flex items-end gap-3 h-56">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs font-semibold" style={{ color: GOLD.light }}>{d.revenue}K</div>
                <div className="w-full relative" style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}>
                  <div
                    className="absolute inset-0 rounded-t-lg transition-all hover:opacity-80"
                    style={{ background: `linear-gradient(180deg, ${GOLD.light} 0%, ${GOLD.primary} 100%)` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{d.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Status */}
        <div className="p-6 rounded-2xl bg-[#141414] border" style={{ borderColor: `${GOLD.primary}20` }}>
          <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Статус заявок</h3>
          <div className="space-y-4">
            {[
              { label: 'Новые', value: newRequests, total: requests.length, color: '#fbbf24' },
              { label: 'В работе', value: inProgress, total: requests.length, color: '#60a5fa' },
              { label: 'Завершены', value: completed, total: requests.length, color: '#22c55e' },
              { label: 'Отменены', value: requests.filter(r => r.status === 'cancelled').length, total: requests.length, color: '#ef4444' },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{s.label}</span>
                  <span className="font-semibold">{s.value}</span>
                </div>
                <div className="h-2 rounded-full bg-[#0a0a0a] overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(s.value / s.total) * 100}%`, backgroundColor: s.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Requests + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141414] border" style={{ borderColor: `${GOLD.primary}20` }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Последние заявки</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('requests')}>
              Все заявки →
            </Button>
          </div>
          <div className="space-y-2">
            {recentRequests.map(req => (
              <div key={req.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#1a1a1a] transition-all">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: `${GOLD.primary}15`, color: GOLD.light }}>
                  {req.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{req.name}</div>
                  <div className="text-xs text-gray-500 truncate">{req.productType} · {req.area} м²</div>
                </div>
                <Badge variant={
                  req.status === 'new' ? 'warning' :
                  req.status === 'in_progress' ? 'info' :
                  req.status === 'completed' ? 'success' : 'danger'
                }>
                  {req.status === 'new' ? 'Новая' : req.status === 'in_progress' ? 'В работе' : req.status === 'completed' ? 'Завершена' : 'Отменена'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#141414] border" style={{ borderColor: `${GOLD.primary}20` }}>
          <h3 className="text-xl font-bold mb-5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Быстрые действия</h3>
          <div className="space-y-2">
            {[
              { label: 'Добавить продукт', icon: <AdminIcons.Box />, page: 'products' },
              { label: 'Новый проект', icon: <AdminIcons.Image />, page: 'portfolio' },
              { label: 'Загрузить документ', icon: <AdminIcons.FileText />, page: 'library' },
              { label: 'Настройки сайта', icon: <AdminIcons.Settings />, page: 'settings' },
            ].map((a, i) => (
              <button
                key={i}
                onClick={() => onNavigate(a.page)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#1a1a1a] transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${GOLD.primary}15`, color: GOLD.light }}>
                  {a.icon}
                </div>
                <span className="text-sm font-medium group-hover:text-[#d4af37] transition-colors">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PRODUCTS MANAGER ====================
export function ProductsManager({ showToast }: { showToast: (n: Omit<Notification, 'id' | 'timestamp'>) => void }) {
  const [products, setProducts] = useState<Product[]>(store.getProducts());
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const handleSave = (product: Product) => {
    let updated: Product[];
    if (editing) {
      updated = products.map(p => p.id === product.id ? product : p);
      showToast({ type: 'success', title: 'Продукт обновлён', message: `${product.title} успешно обновлён` });
    } else {
      updated = [...products, { ...product, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] }];
      showToast({ type: 'success', title: 'Продукт добавлен', message: `${product.title} успешно добавлен` });
    }
    setProducts(updated);
    store.saveProducts(updated);
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Удалить продукт?')) return;
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    store.saveProducts(updated);
    showToast({ type: 'success', title: 'Продукт удалён', message: 'Продукт успешно удалён' });
  };

  const toggleActive = (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, active: !p.active } : p);
    setProducts(updated);
    store.saveProducts(updated);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <AdminIcons.Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Поиск продуктов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-[#1a1a1a] border text-sm text-white placeholder-gray-500 outline-none focus:border-[#d4af37]"
            style={{ borderColor: `${GOLD.primary}30` }}
          />
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <AdminIcons.Plus className="w-4 h-4" />
          Добавить продукт
        </Button>
      </div>

      <div className="rounded-2xl bg-[#141414] border overflow-hidden" style={{ borderColor: `${GOLD.primary}20` }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: `${GOLD.primary}20` }}>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Продукт</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Цена</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Рейтинг</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Статус</th>
              <th className="text-right p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id} className="border-b hover:bg-[#1a1a1a] transition-all" style={{ borderColor: `${GOLD.primary}10` }}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold text-sm">{product.title}</div>
                      <div className="text-xs text-gray-500">{product.reviews} отзывов</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm font-semibold" style={{ color: GOLD.light }}>{product.price}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1" style={{ color: GOLD.light }}>
                    <AdminIcons.Star filled className="w-4 h-4" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                </td>
                <td className="p-4">
                  <button onClick={() => toggleActive(product.id)}>
                    <Badge variant={product.active ? 'success' : 'default'}>
                      {product.active ? 'Активен' : 'Скрыт'}
                    </Badge>
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => { setEditing(product); setModalOpen(true); }} className="p-2 rounded-lg hover:bg-white/5 transition-all text-gray-400 hover:text-[#d4af37]">
                      <AdminIcons.Edit />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 rounded-lg hover:bg-red-500/10 transition-all text-gray-400 hover:text-red-400">
                      <AdminIcons.Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? 'Редактировать продукт' : 'Новый продукт'} size="lg">
        <ProductForm initial={editing} onSave={handleSave} onCancel={() => { setModalOpen(false); setEditing(null); }} />
      </Modal>
    </div>
  );
}

function ProductForm({ initial, onSave, onCancel }: { initial: Product | null; onSave: (p: Product) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Product>(initial || {
    id: '', title: '', description: '', price: '', image: images.office,
    features: ['', '', ''], rating: 4.5, reviews: 0, icon: 'building', active: true, createdAt: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, features: form.features.filter(f => f) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input label="Название" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <Textarea label="Описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} required />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Цена" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Рейтинг</label>
          <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })} className="premium-input w-full px-4 py-2.5 rounded-lg text-white outline-none" />
        </div>
      </div>
      <ImageUploader
        label="Изображение продукта"
        value={form.image}
        onChange={(image) => setForm({ ...form, image })}
        gallery={Object.values(images)}
        aspectRatio="square"
      />
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Особенности</label>
        <div className="space-y-2">
          {form.features.map((f, i) => (
            <input key={i} type="text" value={f} onChange={(e) => {
              const features = [...form.features];
              features[i] = e.target.value;
              setForm({ ...form, features });
            }} placeholder={`Особенность ${i + 1}`} className="premium-input w-full px-4 py-2.5 rounded-lg text-white placeholder-gray-500 outline-none" />
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: `${GOLD.primary}20` }}>
        <Button variant="secondary" onClick={onCancel}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}

// ==================== PORTFOLIO MANAGER ====================
export function PortfolioManager({ showToast }: { showToast: (n: Omit<Notification, 'id' | 'timestamp'>) => void }) {
  const [items, setItems] = useState<PortfolioItem[]>(store.getPortfolio());
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  const filtered = items.filter(i => filter === 'all' || i.status === filter);

  const handleSave = (item: PortfolioItem) => {
    let updated: PortfolioItem[];
    if (editing) {
      updated = items.map(i => i.id === item.id ? item : i);
      showToast({ type: 'success', title: 'Проект обновлён', message: item.title });
    } else {
      updated = [...items, { ...item, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] }];
      showToast({ type: 'success', title: 'Проект добавлен', message: item.title });
    }
    setItems(updated);
    store.savePortfolio(updated);
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Удалить проект?')) return;
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    store.savePortfolio(updated);
    showToast({ type: 'success', title: 'Проект удалён', message: 'Успешно удалён' });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={filter === f ? { background: `${GOLD.primary}15`, color: GOLD.light, border: `1px solid ${GOLD.primary}50` } : { color: '#9ca3af', border: `1px solid transparent` }}
            >
              {f === 'all' ? 'Все' : f === 'published' ? 'Опубликовано' : 'Черновики'}
            </button>
          ))}
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <AdminIcons.Plus className="w-4 h-4" />
          Добавить проект
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(item => (
          <div key={item.id} className="rounded-2xl bg-[#141414] border overflow-hidden card-hover group" style={{ borderColor: `${GOLD.primary}20` }}>
            <div className="relative aspect-video overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3">
                <Badge variant={item.status === 'published' ? 'success' : 'warning'}>
                  {item.status === 'published' ? 'Опубликовано' : 'Черновик'}
                </Badge>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.title}</h3>
                <div className="flex items-center gap-1 text-sm" style={{ color: GOLD.light }}>
                  <AdminIcons.Star filled className="w-4 h-4" />
                  {item.rating}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3 font-light">{item.type} · {item.area}</p>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2 font-light">{item.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => { setEditing(item); setModalOpen(true); }}>
                  <AdminIcons.Edit /> Редактировать
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>
                  <AdminIcons.Trash />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? 'Редактировать проект' : 'Новый проект'} size="lg">
        <PortfolioForm initial={editing} onSave={handleSave} onCancel={() => { setModalOpen(false); setEditing(null); }} />
      </Modal>
    </div>
  );
}

function PortfolioForm({ initial, onSave, onCancel }: { initial: PortfolioItem | null; onSave: (p: PortfolioItem) => void; onCancel: () => void }) {
  const [form, setForm] = useState<PortfolioItem>(initial || {
    id: '', title: '', type: 'Офисные перегородки', area: '', image: images.portfolio1,
    rating: 4.5, description: '', client: '', year: new Date().getFullYear(), status: 'published', createdAt: '',
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-5">
      <Input label="Название проекта" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Тип работ" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required />
        <Input label="Площадь" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Клиент" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Год</label>
          <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })} className="premium-input w-full px-4 py-2.5 rounded-lg text-white outline-none" />
        </div>
      </div>
      <Textarea label="Описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
      <ImageUploader
        label="Изображение проекта"
        value={form.image}
        onChange={(image) => setForm({ ...form, image })}
        gallery={Object.values(images)}
        aspectRatio="video"
      />
      <Select label="Статус" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
        <option value="published">Опубликовано</option>
        <option value="draft">Черновик</option>
      </Select>
      <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: `${GOLD.primary}20` }}>
        <Button variant="secondary" onClick={onCancel}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}

// ==================== REQUESTS MANAGER ====================
export function RequestsManager({ showToast }: { showToast: (n: Omit<Notification, 'id' | 'timestamp'>) => void }) {
  const [requests, setRequests] = useState<Request[]>(store.getRequests());
  const [filter, setFilter] = useState<'all' | Request['status']>('all');
  const [selected, setSelected] = useState<Request | null>(null);

  const filtered = requests.filter(r => filter === 'all' || r.status === filter);

  const updateStatus = (id: string, status: Request['status']) => {
    const updated = requests.map(r => r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r);
    setRequests(updated);
    store.saveRequests(updated);
    if (selected?.id === id) setSelected({ ...selected, status });
    showToast({ type: 'success', title: 'Статус обновлён', message: `Заявка переведена в статус "${status}"` });
  };

  const statusLabels = {
    new: { label: 'Новая', variant: 'warning' as const },
    in_progress: { label: 'В работе', variant: 'info' as const },
    completed: { label: 'Завершена', variant: 'success' as const },
    cancelled: { label: 'Отменена', variant: 'danger' as const },
  };

  return (
    <div className="p-8">
      <div className="flex gap-2 mb-6">
        {(['all', 'new', 'in_progress', 'completed', 'cancelled'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={filter === f ? { background: `${GOLD.primary}15`, color: GOLD.light, border: `1px solid ${GOLD.primary}50` } : { color: '#9ca3af', border: `1px solid transparent` }}
          >
            {f === 'all' ? 'Все' : statusLabels[f].label}
            {f !== 'all' && ` (${requests.filter(r => r.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-[#141414] border overflow-hidden" style={{ borderColor: `${GOLD.primary}20` }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: `${GOLD.primary}20` }}>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Клиент</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Тип</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Площадь</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Приоритет</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Статус</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Дата</th>
              <th className="text-right p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(req => (
              <tr key={req.id} className="border-b hover:bg-[#1a1a1a] transition-all" style={{ borderColor: `${GOLD.primary}10` }}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: `${GOLD.primary}15`, color: GOLD.light }}>
                      {req.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{req.name}</div>
                      <div className="text-xs text-gray-500">{req.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm">{req.productType}</td>
                <td className="p-4 text-sm">{req.area} м²</td>
                <td className="p-4">
                  <Badge variant={req.priority === 'high' ? 'danger' : req.priority === 'medium' ? 'warning' : 'default'}>
                    {req.priority === 'high' ? 'Высокий' : req.priority === 'medium' ? 'Средний' : 'Низкий'}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge variant={statusLabels[req.status].variant}>
                    {statusLabels[req.status].label}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-gray-400">{req.createdAt}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setSelected(req)} className="p-2 rounded-lg hover:bg-white/5 transition-all text-gray-400 hover:text-[#d4af37]">
                      <AdminIcons.Eye />
                    </button>
                    <select
                      value={req.status}
                      onChange={(e) => updateStatus(req.id, e.target.value as Request['status'])}
                      className="bg-transparent border rounded-lg px-2 py-1 text-xs outline-none"
                      style={{ borderColor: `${GOLD.primary}30`, color: GOLD.light }}
                    >
                      <option value="new" style={{ background: '#141414' }}>Новая</option>
                      <option value="in_progress" style={{ background: '#141414' }}>В работе</option>
                      <option value="completed" style={{ background: '#141414' }}>Завершена</option>
                      <option value="cancelled" style={{ background: '#141414' }}>Отменена</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Детали заявки" size="md">
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Клиент</div>
                <div className="font-semibold">{selected.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Телефон</div>
                <div className="font-semibold">{selected.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <div className="font-semibold">{selected.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Тип продукта</div>
                <div className="font-semibold">{selected.productType}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Площадь</div>
                <div className="font-semibold">{selected.area} м²</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Высота</div>
                <div className="font-semibold">{selected.height} м</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Комментарий</div>
              <div className="p-3 rounded-lg bg-[#0a0a0a] text-sm font-light">{selected.comment || '—'}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: `${GOLD.primary}20` }}>
              <div>
                <div className="text-xs text-gray-500 mb-1">Создана</div>
                <div className="text-sm">{selected.createdAt}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Обновлена</div>
                <div className="text-sm">{selected.updatedAt}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ==================== LIBRARY MANAGER ====================
export function LibraryManager({ showToast }: { showToast: (n: Omit<Notification, 'id' | 'timestamp'>) => void }) {
  const [docs, setDocs] = useState<Document[]>(store.getDocuments());
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Document | null>(null);

  const handleSave = (doc: Document) => {
    let updated: Document[];
    if (editing) {
      updated = docs.map(d => d.id === doc.id ? doc : d);
      showToast({ type: 'success', title: 'Документ обновлён', message: doc.title });
    } else {
      updated = [...docs, { ...doc, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0], downloads: 0 }];
      showToast({ type: 'success', title: 'Документ добавлен', message: doc.title });
    }
    setDocs(updated);
    store.saveDocuments(updated);
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Удалить документ?')) return;
    const updated = docs.filter(d => d.id !== id);
    setDocs(updated);
    store.saveDocuments(updated);
    showToast({ type: 'success', title: 'Документ удалён', message: 'Успешно удалён' });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <AdminIcons.Plus className="w-4 h-4" />
          Добавить документ
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {docs.map(doc => (
          <div key={doc.id} className="p-6 rounded-2xl bg-[#141414] border card-hover" style={{ borderColor: `${GOLD.primary}20` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${GOLD.primary}15`, color: GOLD.light }}>
                <AdminIcons.FileText className="w-6 h-6" />
              </div>
              <Badge>{doc.type}</Badge>
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{doc.title}</h3>
            <p className="text-sm text-gray-400 mb-4 font-light line-clamp-2">{doc.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>{doc.size}</span>
              <span className="flex items-center gap-1">
                <AdminIcons.Download className="w-3 h-3" />
                {doc.downloads}
              </span>
            </div>
            <div className="flex gap-2 pt-4 border-t" style={{ borderColor: `${GOLD.primary}20` }}>
              <Button size="sm" variant="secondary" onClick={() => { setEditing(doc); setModalOpen(true); }}>
                <AdminIcons.Edit /> Изменить
              </Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(doc.id)}>
                <AdminIcons.Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? 'Редактировать документ' : 'Новый документ'}>
        <DocumentForm initial={editing} onSave={handleSave} onCancel={() => { setModalOpen(false); setEditing(null); }} />
      </Modal>
    </div>
  );
}

function DocumentForm({ initial, onSave, onCancel }: { initial: Document | null; onSave: (d: Document) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Document>(initial || {
    id: '', title: '', type: 'PDF', size: '', category: '', description: '', downloads: 0, createdAt: '',
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-5">
      <Input label="Название" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Тип" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })}>
          <option value="PDF">PDF</option>
          <option value="DWG">DWG</option>
          <option value="DOCX">DOCX</option>
          <option value="XLSX">XLSX</option>
        </Select>
        <Input label="Размер" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} required />
      </div>
      <Input label="Категория" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <Textarea label="Описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
      <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: `${GOLD.primary}20` }}>
        <Button variant="secondary" onClick={onCancel}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}

// ==================== USERS MANAGER ====================
export function UsersManager({ showToast }: { showToast: (n: Omit<Notification, 'id' | 'timestamp'>) => void }) {
  const [users, setUsers] = useState<User[]>(store.getUsers());

  const toggleActive = (id: string) => {
    const updated = users.map(u => u.id === id ? { ...u, active: !u.active } : u);
    setUsers(updated);
    store.saveUsers(updated);
    showToast({ type: 'success', title: 'Статус обновлён', message: 'Пользователь обновлён' });
  };

  const roleLabels = { admin: 'Администратор', manager: 'Менеджер', editor: 'Редактор' };
  const roleColors = { admin: 'danger' as const, manager: 'warning' as const, editor: 'info' as const };

  return (
    <div className="p-8">
      <div className="rounded-2xl bg-[#141414] border overflow-hidden" style={{ borderColor: `${GOLD.primary}20` }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: `${GOLD.primary}20` }}>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Пользователь</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Роль</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Последний вход</th>
              <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Статус</th>
              <th className="text-right p-4 text-xs font-semibold tracking-wider uppercase text-gray-500">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-[#1a1a1a] transition-all" style={{ borderColor: `${GOLD.primary}10` }}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `linear-gradient(135deg, ${GOLD.primary}, ${GOLD.light})`, color: '#000' }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={roleColors[user.role]}>{roleLabels[user.role]}</Badge>
                </td>
                <td className="p-4 text-sm text-gray-400">{user.lastLogin}</td>
                <td className="p-4">
                  <Badge variant={user.active ? 'success' : 'default'}>
                    {user.active ? 'Активен' : 'Заблокирован'}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <Button size="sm" variant="secondary" onClick={() => toggleActive(user.id)}>
                    {user.active ? 'Заблокировать' : 'Активировать'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== SETTINGS ====================
export function SettingsPage({ showToast }: { showToast: (n: Omit<Notification, 'id' | 'timestamp'>) => void }) {
  const [settings, setSettings] = useState<SiteSettings>(store.getSettings());
  const [tab, setTab] = useState<'general' | 'contacts' | 'social' | 'seo'>('general');

  const handleSave = () => {
    store.saveSettings(settings);
    showToast({ type: 'success', title: 'Настройки сохранены', message: 'Изменения успешно применены' });
  };

  const tabs = [
    { key: 'general', label: 'Общие' },
    { key: 'contacts', label: 'Контакты' },
    { key: 'social', label: 'Соцсети' },
    { key: 'seo', label: 'SEO' },
  ] as const;

  return (
    <div className="p-8">
      <div className="flex gap-2 mb-6 border-b" style={{ borderColor: `${GOLD.primary}20` }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-6 py-3 font-semibold transition-all"
            style={tab === t.key ? { color: GOLD.light, borderBottom: `2px solid ${GOLD.light}` } : { color: '#9ca3af' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl">
        {tab === 'general' && (
          <div className="space-y-5">
            <Input label="Название компании" value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} />
            <Input label="Подпись" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#141414] border" style={{ borderColor: `${GOLD.primary}20` }}>
              <div>
                <div className="font-semibold">Режим обслуживания</div>
                <div className="text-sm text-gray-500 font-light">Сайт будет недоступен для посетителей</div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                className="relative w-12 h-6 rounded-full transition-all"
                style={{ backgroundColor: settings.maintenanceMode ? GOLD.light : '#374151' }}
              >
                <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: settings.maintenanceMode ? '26px' : '2px' }}></div>
              </button>
            </div>
          </div>
        )}

        {tab === 'contacts' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Телефон 1" value={settings.phone1} onChange={(e) => setSettings({ ...settings, phone1: e.target.value })} />
              <Input label="Телефон 2" value={settings.phone2} onChange={(e) => setSettings({ ...settings, phone2: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Email 1" value={settings.email1} onChange={(e) => setSettings({ ...settings, email1: e.target.value })} />
              <Input label="Email 2" value={settings.email2} onChange={(e) => setSettings({ ...settings, email2: e.target.value })} />
            </div>
            <Input label="Адрес" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
            <Input label="Адрес (строка 2)" value={settings.addressLine2} onChange={(e) => setSettings({ ...settings, addressLine2: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Часы работы 1" value={settings.workHours1} onChange={(e) => setSettings({ ...settings, workHours1: e.target.value })} />
              <Input label="Часы работы 2" value={settings.workHours2} onChange={(e) => setSettings({ ...settings, workHours2: e.target.value })} />
            </div>
            <Input label="Запрос для Яндекс.Карт" value={settings.mapQuery} onChange={(e) => setSettings({ ...settings, mapQuery: e.target.value })} />
          </div>
        )}

        {tab === 'social' && (
          <div className="space-y-5">
            <Input label="Twitter" value={settings.socialTwitter} onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })} />
            <Input label="Instagram" value={settings.socialInstagram} onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })} />
            <Input label="WhatsApp" value={settings.socialWhatsapp} onChange={(e) => setSettings({ ...settings, socialWhatsapp: e.target.value })} />
          </div>
        )}

        {tab === 'seo' && (
          <div className="space-y-5">
            <Input label="SEO Title" value={settings.seoTitle} onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })} />
            <Textarea label="SEO Description" value={settings.seoDescription} onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })} rows={3} />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-8 pt-6 border-t" style={{ borderColor: `${GOLD.primary}20` }}>
          <Button onClick={handleSave}>
            <AdminIcons.Save /> Сохранить изменения
          </Button>
        </div>
      </div>
    </div>
  );
}
