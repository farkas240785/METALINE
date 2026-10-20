import { useState, useEffect } from 'react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Images
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

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-black text-lg">M</span>
              </div>
              <span className="text-xl font-bold tracking-wider">METALINE</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'text-amber-400 bg-amber-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-900/98 backdrop-blur-md border-t border-gray-800">
            <div className="px-4 py-4 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'text-amber-400 bg-amber-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt="METALINE — перегородки из алюминиевого профиля"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-900/70 to-gray-900/85"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-amber-400 text-sm font-medium">Фабрика перегородок</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Перегородки из
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              алюминиевого профиля
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Проектируем и производим стеклянные перегородки с алюминиевым каркасом для офисов, 
            торговых центров и жилых помещений. Закалённое стекло, точные инженерные решения, 
            безупречный монтаж.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('calculator')}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
            >
              Рассчитать стоимость
            </button>
            <button
              onClick={() => scrollTo('portfolio')}
              className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all"
            >
              Смотреть проекты
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-white/10">
            {[
              { value: '12+', label: 'Лет на рынке' },
              { value: '500+', label: 'Проектов' },
              { value: '50 000', label: 'м² перегородок' },
              { value: '100%', label: 'Гарантия качества' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 md:py-32 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">Каталог</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3">Наша продукция</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Полный спектр перегородочных систем для любых задач — от стационарных до трансформируемых
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Офисные перегородки',
                desc: 'Стационарные системы для зонирования офисного пространства. Алюминиевый каркас с одинарным или двойным остеклением.',
                image: images.office,
                features: ['Высота до 4 м', 'Звукоизоляция 42 дБ', 'Интеграция дверей']
              },
              {
                title: 'Раздвижные перегородки',
                desc: 'Трансформируемые системы для гибкого зонирования. Механизмы скрытого монтажа с плавным ходом.',
                image: images.sliding,
                features: ['Бесшумный ход', 'Автоматика', 'Ширина до 6 м']
              },
              {
                title: 'Душевые перегородки',
                desc: 'Системы для ванных комнат из закалённого стекла 8-10 мм с фурнитурой из нержавеющей стали.',
                image: images.shower,
                features: ['Закалённое стекло 8-10 мм', 'Антикапля покрытие', 'Любые размеры']
              },
              {
                title: 'Торговые перегородки',
                desc: 'Витражные системы для торговых центров и магазинов. Максимальная прозрачность при прочности.',
                image: images.commercial,
                features: ['Витринное остекление', 'Противоударное стекло', 'Быстрый монтаж']
              },
              {
                title: 'Интерьерные перегородки',
                desc: 'Декоративные системы для жилых помещений. Комбинация стекла, металла и дерева.',
                image: images.interior,
                features: ['Дизайнерские решения', 'Тонированное стекло', 'Лофт-стиль']
              },
              {
                title: 'Противопожарные',
                desc: 'Сертифицированные огнестойкие перегородки с пределом устойчивости до 60 минут.',
                image: images.office,
                features: ['EI 30-60', 'Сертификация', 'Остекление до 40%']
              },
            ].map((product, i) => (
              <div key={i} className="group rounded-2xl bg-gray-900 border border-gray-800 hover:border-amber-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/5 overflow-hidden">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{product.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{product.desc}</p>
                  <ul className="space-y-2">
                    {product.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Section */}
      <section id="production" className="py-20 md:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">Как мы работаем</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3">Производство</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Собственное производство площадью 3000 м² с современным оборудованием
            </p>
          </div>

          {/* Production Image */}
          <div className="relative rounded-2xl overflow-hidden mb-16 h-64 md:h-96">
            <img
              src={images.production}
              alt="Производство METALINE"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl md:text-3xl font-black">Собственное производство</h3>
              <p className="text-gray-300 mt-2">3000 м² производственных площадей</p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { step: '01', title: 'Замер и проект', desc: 'Выезд специалиста, точные замеры, 3D-визуализация' },
              { step: '02', title: 'Производство', desc: 'Раскрой профиля, закалка стекла, сборка конструкций' },
              { step: '03', title: 'Контроль качества', desc: 'Многоступенчатая проверка на каждом этапе' },
              { step: '04', title: 'Монтаж', desc: 'Профессиональная установка с гарантией 5 лет' },
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-amber-400/20 transition-all">
                <div className="text-5xl font-black text-amber-400/20 mb-2">{item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Equipment */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Оборудование</h3>
              <div className="space-y-4">
                {[
                  'Станок закалки стекла (до 12 мм)',
                  'Автоматический раскроечный станок',
                  'Линия нанесения покрытий',
                  'Установка двойного остекления',
                  'Цех порошковой окраски',
                  'Контрольно-измерительное оборудование',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Материалы</h3>
              <div className="space-y-4">
                {[
                  'Алюминиевый профиль (системы Alutech, Reynaers)',
                  'Закалённое стекло 4-12 мм',
                  'Триплекс многослойный',
                  'Тонированное и матовое стекло',
                  'Фурнитура Dorma, GEZE',
                  'Уплотнители и герметики',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-32 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">Наши работы</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3">Портфолио</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Реализованные проекты для ведущих компаний и частных клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Бизнес-центр "Меридиан"', type: 'Офисные перегородки', area: '1 200 м²', image: images.portfolio1 },
              { title: 'ТЦ "Галерея"', type: 'Торговые витражи', area: '800 м²', image: images.commercial },
              { title: 'ЖК "Панорама"', type: 'Интерьерные перегородки', area: '450 м²', image: images.interior },
              { title: 'Клиника "МедЛайф"', type: 'Зонирование помещений', area: '600 м²', image: images.office },
              { title: 'Отель "Ривьера"', type: 'Душевые перегородки', area: '320 м²', image: images.portfolio2 },
              { title: 'Коворкинг "Точка"', type: 'Раздвижные системы', area: '280 м²', image: images.portfolio3 },
            ].map((project, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{project.type}</p>
                  <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-amber-400 font-bold">{project.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Library Section */}
      <section id="tech-library" className="py-20 md:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">Документация</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3">Техническая библиотека</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Каталог технической документации, сертификатов и спецификаций
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Каталог систем', type: 'PDF', size: '12.4 МБ', icon: '📋', desc: 'Полный каталог перегородочных систем с техническими характеристиками' },
              { title: 'Алюминиевый профиль', type: 'PDF', size: '8.2 МБ', icon: '📐', desc: 'Технические данные профилей, сечения, допустимые нагрузки' },
              { title: 'Закалённое стекло', type: 'PDF', size: '5.6 МБ', icon: '🔬', desc: 'Характеристики закалённого стекла, таблицы прочности' },
              { title: 'Сертификаты', type: 'PDF', size: '3.1 МБ', icon: '📜', desc: 'Сертификаты соответствия, пожарные сертификаты' },
              { title: 'Инструкция по монтажу', type: 'PDF', size: '15.8 МБ', icon: '🔧', desc: 'Подробная инструкция по установке перегородок' },
              { title: 'Узлы примыкания', type: 'DWG', size: '22.3 МБ', icon: '📏', desc: 'Чертежи узлов в формате AutoCAD для проектировщиков' },
            ].map((doc, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-amber-400/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{doc.icon}</span>
                  <span className="px-2 py-1 rounded text-xs font-mono bg-amber-400/10 text-amber-400">{doc.type}</span>
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-amber-400 transition-colors">{doc.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{doc.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{doc.size}</span>
                  <button className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Скачать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator / Request Section */}
      <section id="calculator" className="py-20 md:py-32 bg-gray-950 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src={images.hero}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/95 to-gray-950"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">Расчёт</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3">Заявка на расчёт</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Заполните форму и мы подготовим коммерческое предложение в течение 24 часов
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <form className="p-8 rounded-2xl bg-gray-900/80 backdrop-blur-md border border-gray-800" onSubmit={(e) => { e.preventDefault(); alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.'); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                    placeholder="Иван Петров"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Телефон *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Тип перегородок</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all">
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Примерная площадь (м²)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Высота перегородок (м)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                    placeholder="2.7"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Комментарий</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all resize-none"
                  placeholder="Опишите ваш проект, пожелания по материалам, срокам..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
              >
                Отправить заявку
              </button>
              <p className="text-center text-gray-500 text-xs mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 md:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">Связаться</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3">Контакты</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Адрес',
                lines: ['г. Москва, ул. Промышленная, д. 12', 'Строение 5, территория завода']
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: 'Телефон',
                lines: ['+7 (495) 123-45-67', '+7 (800) 555-35-35 (бесплатно)']
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Email',
                lines: ['info@metaline.ru', 'project@metaline.ru']
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Режим работы',
                lines: ['Пн-Пт: 9:00 — 18:00', 'Сб: 10:00 — 15:00']
              },
            ].map((contact, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                  {contact.icon}
                </div>
                <h3 className="font-bold mb-2">{contact.title}</h3>
                {contact.lines.map((line, j) => (
                  <p key={j} className="text-gray-400 text-sm">{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-gray-700/50 h-64 md:h-96 bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <p className="text-gray-400">Интерактивная карта</p>
              <p className="text-gray-500 text-sm mt-1">г. Москва, ул. Промышленная, д. 12, стр. 5</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 font-black text-sm">M</span>
                </div>
                <span className="text-lg font-bold">METALINE</span>
              </div>
              <p className="text-gray-400 text-sm">
                Фабрика перегородок из алюминиевого профиля с закалённым стеклом. 
                Проектирование, производство и монтаж.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <div className="space-y-2">
                {navItems.slice(0, 4).map(item => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} className="block text-gray-400 text-sm hover:text-amber-400 transition-colors">
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>+7 (495) 123-45-67</p>
                <p>info@metaline.ru</p>
                <p>г. Москва, ул. Промышленная, 12</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2024 METALINE. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-gray-700 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-gray-700 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-gray-700 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.05 4.91A9.816 9.816 0 0012.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 004.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 012.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
