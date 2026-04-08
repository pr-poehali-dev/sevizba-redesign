import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/646a7708-a02c-4577-81a8-21ab6f54c740/files/9176298f-d06c-4a0f-b622-94c1a4787153.jpg";
const SAUNA_IMG = "https://cdn.poehali.dev/projects/646a7708-a02c-4577-81a8-21ab6f54c740/files/278e8b69-b899-4efd-8d7c-178760d86407.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/646a7708-a02c-4577-81a8-21ab6f54c740/files/9a24c346-ccc3-43c7-bdbf-53f4b1dd1cdb.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "projects", label: "Проекты" },
  { id: "services", label: "Услуги" },
  { id: "about", label: "О компании" },
  { id: "process", label: "Процесс" },
  { id: "prices", label: "Цены" },
  { id: "articles", label: "Статьи" },
  { id: "contacts", label: "Контакты" },
];

const PROJECTS = [
  { id: 1, title: "Дом «Кедр»", type: "Дом", area: "180 м²", material: "Клееный брус", img: HERO_IMG, tag: "house" },
  { id: 2, title: "Баня «Берёза»", type: "Баня", area: "48 м²", material: "Рубленое бревно", img: SAUNA_IMG, tag: "sauna" },
  { id: 3, title: "Дом «Сосна»", type: "Дом", area: "240 м²", material: "Профилированный брус", img: INTERIOR_IMG, tag: "house" },
  { id: 4, title: "Баня «Дуб»", type: "Баня", area: "64 м²", material: "Клееный брус", img: SAUNA_IMG, tag: "sauna" },
  { id: 5, title: "Дом «Лиственница»", type: "Дом", area: "320 м²", material: "Клееный брус", img: HERO_IMG, tag: "house" },
  { id: 6, title: "Комплекс «Тайга»", type: "Дом + Баня", area: "420 м²", material: "Рубленое бревно", img: INTERIOR_IMG, tag: "complex" },
];

const SERVICES = [
  { icon: "Home", title: "Строительство домов", desc: "Проектирование и возведение деревянных домов любой сложности под ключ — от фундамента до отделки." },
  { icon: "Flame", title: "Строительство бань", desc: "Русские бани, финские сауны и банные комплексы из отборных пород дерева." },
  { icon: "FileText", title: "Архитектурный проект", desc: "Создадим индивидуальный проект с учётом рельефа участка, ваших пожеланий и бюджета." },
  { icon: "Wrench", title: "Отделка и интерьер", desc: "Внутренняя отделка натуральными материалами: дерево, камень, лён." },
  { icon: "Truck", title: "Доставка и монтаж", desc: "Собственная логистика и бригады монтажников по всей России." },
  { icon: "Shield", title: "Гарантия 10 лет", desc: "Письменная гарантия на несущие конструкции и кровлю." },
];

const STEPS = [
  { num: "01", title: "Консультация", desc: "Обсуждаем ваши пожелания, выбираем материал и стиль. Выезд на участок — бесплатно." },
  { num: "02", title: "Проект", desc: "Разрабатываем архитектурный и конструктивный проект, согласовываем каждую деталь." },
  { num: "03", title: "Договор", desc: "Фиксируем сроки, стоимость и технологии. Без скрытых доплат." },
  { num: "04", title: "Строительство", desc: "Возводим объект по чёткому графику. Еженедельные фотоотчёты в мессенджер." },
  { num: "05", title: "Сдача", desc: "Принимаете дом с полной документацией. Подписываем акт выполненных работ." },
];

const PRICES = [
  {
    name: "Баня",
    price: "от 800 000 ₽",
    features: ["Площадь 36–72 м²", "Рубленое бревно или брус", "Фундамент свайный", "Кровля металлочерепица", "Базовая внутренняя отделка"],
    accent: false,
  },
  {
    name: "Дом Комфорт",
    price: "от 3 500 000 ₽",
    features: ["Площадь 100–180 м²", "Клееный брус камерной сушки", "Фундамент ленточный", "Кровля металлочерепица", "Чистовая отделка", "Инженерные коммуникации"],
    accent: true,
  },
  {
    name: "Дом Премиум",
    price: "от 7 000 000 ₽",
    features: ["Площадь 200–400+ м²", "Клееный брус или рубленое бревно", "Фундамент плитный", "Кровля натуральная черепица", "Дизайн-проект интерьера", "Ландшафтный проект", "Сопровождение 2 года"],
    accent: false,
  },
];

const ARTICLES = [
  { date: "15 марта 2026", tag: "Материалы", title: "Клееный брус vs рубленое бревно: что выбрать в 2026 году", img: HERO_IMG },
  { date: "02 февраля 2026", tag: "Строительство", title: "5 ошибок при выборе фундамента для деревянного дома", img: INTERIOR_IMG },
  { date: "18 января 2026", tag: "Бани", title: "Как выбрать печь для бани: руководство от мастеров", img: SAUNA_IMG },
];

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("all");
  const [activeProject, setActiveProject] = useState<null | typeof PROJECTS[0]>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setActiveNav(id); }
    setMobileMenuOpen(false);
  };

  const filtered = projectFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.tag === projectFilter);

  return (
    <div className="min-h-screen bg-stone-50 font-golos">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-stone-50/95 backdrop-blur-md shadow-sm border-b border-stone-200" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <span className="font-montserrat text-xl font-bold text-stone-900 tracking-tight">Северная изба</span>
          </button>
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 text-sm font-golos font-medium transition-colors rounded-sm ${activeNav === item.id ? "text-wood-700" : "text-stone-600 hover:text-wood-700"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contacts")}
            className="hidden lg:block bg-wood-700 text-stone-50 px-5 py-2 text-sm font-medium hover:bg-wood-800 transition-colors rounded-sm"
          >
            Обсудить проект
          </button>
          <button className="lg:hidden text-stone-700" onClick={() => setMobileMenuOpen(v => !v)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-50 border-t border-stone-200 px-6 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-stone-700 font-medium py-1">{item.label}</button>
            ))}
            <button onClick={() => scrollTo("contacts")} className="bg-wood-700 text-stone-50 px-5 py-2 text-sm font-medium rounded-sm mt-2">Обсудить проект</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-end">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Деревянный дом" className="w-full h-full object-cover" />
          <div className="absolute inset-1 from-stone-950/80 via-stone-900/50 to-transparent bg-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-40 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-white/60 font-montserrat text-xs tracking-[0.3em] uppercase mb-5">Строительство под ключ</span>
            <h1 className="font-montserrat text-5xl md:text-6xl text-white leading-[1.1] mb-6 font-semibold">
              Деревянные дома<br />
              и бани вашей мечты
            </h1>
            <p className="text-white/70 text-base font-montserrat font-normal mb-10 max-w-lg leading-relaxed">Строим из благородной Северной древесины. Рубленое бревно, клееный брус, индивидуальные проекты. Гарантия 10 лет.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo("projects")} className="bg-wood-600 hover:bg-wood-700 text-white px-8 py-4 font-medium text-sm tracking-wide transition-colors rounded-sm">
                Смотреть проекты
              </button>
              <button onClick={() => scrollTo("contacts")} className="border border-white/50 hover:border-white text-white px-8 py-4 font-medium text-sm tracking-wide transition-colors rounded-sm">
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 hidden md:flex flex-col gap-6 z-10">
          {[{ val: "15+", label: "лет опыта" }, { val: "340+", label: "объектов" }, { val: "10", label: "лет гарантии" }].map(s => (
            <div key={s.label} className="text-right">
              <div className="font-montserrat text-3xl font-bold text-white">{s.val}</div>
              <div className="text-white/50 text-xs font-montserrat uppercase tracking-widest mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-stone-400 text-xs uppercase tracking-[0.25em] font-montserrat">Наши работы</span>
                <h2 className="font-montserrat text-4xl font-bold text-stone-900 mt-2">Галерея проектов</h2>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: "all", label: "Все" },
                  { key: "house", label: "Дома" },
                  { key: "sauna", label: "Бани" },
                  { key: "complex", label: "Комплексы" },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setProjectFilter(f.key)}
                    className={`px-5 py-2 text-sm font-medium rounded-sm transition-all ${projectFilter === f.key ? "bg-wood-700 text-stone-50" : "border border-stone-300 text-stone-600 hover:border-wood-500 hover:text-wood-700"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <AnimSection key={project.id}>
                <button
                  onClick={() => setActiveProject(project)}
                  className="group w-full text-left overflow-hidden rounded-sm bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-all duration-300" />
                    <span className="absolute top-4 left-4 bg-white/90 text-stone-700 text-xs font-medium px-3 py-1 rounded-sm">{project.type}</span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white text-stone-800 text-sm font-medium px-4 py-2 rounded-sm">Смотреть</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-montserrat text-lg font-semibold text-stone-900 mb-1">{project.title}</h3>
                    <div className="flex gap-4 text-sm text-stone-500">
                      <span className="flex items-center gap-1"><Icon name="Maximize2" size={13} /> {project.area}</span>
                      <span className="flex items-center gap-1"><Icon name="Layers" size={13} /> {project.material}</span>
                    </div>
                  </div>
                </button>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm" onClick={() => setActiveProject(null)}>
          <div className="bg-white rounded-sm max-w-3xl w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-video">
              <img src={activeProject.img} alt={activeProject.title} className="w-full h-full object-cover" />
              <button onClick={() => setActiveProject(null)} className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="p-8">
              <span className="text-stone-400 text-xs uppercase tracking-widest font-montserrat">{activeProject.type}</span>
              <h3 className="font-montserrat text-2xl font-bold text-stone-900 mt-1">{activeProject.title}</h3>
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-stone-100">
                <div><span className="text-xs text-stone-400 uppercase tracking-widest">Площадь</span><p className="font-medium text-stone-800 mt-1">{activeProject.area}</p></div>
                <div><span className="text-xs text-stone-400 uppercase tracking-widest">Материал</span><p className="font-medium text-stone-800 mt-1">{activeProject.material}</p></div>
              </div>
              <button onClick={() => { setActiveProject(null); scrollTo("contacts"); }} className="mt-6 w-full bg-wood-700 hover:bg-wood-800 text-stone-50 py-3 font-medium text-sm rounded-sm transition-colors">
                Хочу такой же проект
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SERVICES */}
      <section id="services" className="py-24 bg-wood-800">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <span className="text-white/50 text-xs uppercase tracking-[0.25em] font-montserrat">Что мы делаем</span>
            <h2 className="font-montserrat text-4xl font-bold text-white mt-2 mb-14">Наши услуги</h2>
          </AnimSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-wood-700">
            {SERVICES.map((s, i) => (
              <AnimSection key={i}>
                <div className="bg-wood-800 p-8 hover:bg-wood-700/50 transition-colors group">
                  <div className="w-10 h-10 rounded-full border border-wood-500 flex items-center justify-center mb-6 group-hover:border-wood-300 transition-colors">
                    <Icon name={s.icon} size={18} className="text-white/70" fallback="Circle" />
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-white mb-3">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="relative">
                <img src={INTERIOR_IMG} alt="О компании" className="w-full rounded-sm object-cover aspect-[4/3]" />
                <div className="absolute -bottom-6 -right-6 bg-wood-700 text-white p-6 rounded-sm hidden md:block">
                  <div className="font-montserrat text-4xl font-bold text-white">2008</div>
                  <div className="text-white/60 text-xs uppercase tracking-widest mt-1">год основания</div>
                </div>
              </div>
            </AnimSection>
            <AnimSection>
              <span className="text-stone-400 text-xs uppercase tracking-[0.25em] font-montserrat">О компании</span>
              <h2 className="font-montserrat text-4xl font-bold text-stone-900 mt-2 mb-6">Строим с душой<br />уже 15 лет</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                ДревоДом — семейная компания из Вологды. Мы не просто строим — мы создаём пространства, где хочется жить. Каждый проект начинается с вашего образа: что вы чувствуете, входя домой?
              </p>
              <p className="text-stone-600 leading-relaxed mb-10">
                Работаем только с сертифицированными материалами, используем дерево северных пород — оно плотнее, долговечнее и теплее. Все наши мастера прошли обучение в Финляндии.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
                {[{ val: "340+", label: "проектов" }, { val: "98%", label: "рекомендуют" }, { val: "47", label: "мастеров" }].map(s => (
                  <div key={s.label}>
                    <div className="font-montserrat text-4xl font-bold text-stone-900">{s.val}</div>
                    <div className="text-stone-400 text-xs uppercase tracking-widest mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <span className="text-stone-400 text-xs uppercase tracking-[0.25em] font-montserrat">Как мы работаем</span>
            <h2 className="font-montserrat text-4xl font-bold text-stone-900 mt-2 mb-14">Процесс строительства</h2>
          </AnimSection>
          <div className="relative">
            <div className="hidden lg:block absolute left-8 right-8 h-px bg-stone-200 z-0" style={{ top: "2rem" }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {STEPS.map((step, i) => (
                <AnimSection key={i}>
                  <div className="flex flex-col">
                    <div className="w-16 h-16 rounded-full bg-stone-50 border-2 border-stone-200 flex items-center justify-center mb-6">
                      <span className="font-montserrat text-lg font-bold text-stone-700">{step.num}</span>
                    </div>
                    <h3 className="font-montserrat text-base font-semibold text-stone-900 mb-2">{step.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <span className="text-stone-400 text-xs uppercase tracking-[0.25em] font-montserrat">Стоимость</span>
            <h2 className="font-montserrat text-4xl font-bold text-stone-900 mt-2 mb-4">Цены на строительство</h2>
            <p className="text-stone-500 mb-14 max-w-xl">Каждый проект рассчитывается индивидуально. Цены ориентировочные — финальная стоимость после встречи и осмотра участка.</p>
          </AnimSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICES.map((p, i) => (
              <AnimSection key={i}>
                <div className={`rounded-sm p-8 h-full flex flex-col ${p.accent ? "bg-wood-700 text-stone-50" : "bg-white"}`}>
                  <div className={`text-xs uppercase tracking-[0.25em] font-montserrat mb-2 ${p.accent ? "text-white/60" : "text-stone-400"}`}>{p.name}</div>
                  <div className={`font-montserrat text-3xl font-bold mb-8 ${p.accent ? "text-white" : "text-stone-900"}`}>{p.price}</div>
                  <ul className="space-y-3 flex-1">
                    {p.features.map((f, fi) => (
                      <li key={fi} className={`flex items-start gap-3 text-sm ${p.accent ? "text-white/80" : "text-stone-600"}`}>
                        <Icon name="Check" size={14} className={`mt-0.5 flex-shrink-0 ${p.accent ? "text-white/60" : "text-stone-400"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollTo("contacts")}
                    className={`mt-8 py-3 text-sm font-medium rounded-sm transition-colors ${p.accent ? "bg-white text-wood-800 hover:bg-stone-100" : "border border-stone-300 text-stone-700 hover:bg-stone-50"}`}
                  >
                    Получить расчёт
                  </button>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section id="articles" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-stone-400 text-xs uppercase tracking-[0.25em] font-montserrat">Полезное</span>
                <h2 className="font-montserrat text-4xl font-bold text-stone-900 mt-2">Статьи и советы</h2>
              </div>
              <button className="text-wood-700 text-sm font-medium hover:text-wood-900 transition-colors flex items-center gap-2">
                Все статьи <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </AnimSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((a, i) => (
              <AnimSection key={i}>
                <article className="group cursor-pointer">
                  <div className="overflow-hidden rounded-sm mb-4 aspect-[16/9]">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs bg-stone-100 text-stone-500 px-3 py-1 rounded-sm">{a.tag}</span>
                    <span className="text-xs text-stone-400">{a.date}</span>
                  </div>
                  <h3 className="font-montserrat text-base font-semibold text-stone-900 leading-snug group-hover:text-stone-600 transition-colors">{a.title}</h3>
                </article>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-wood-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimSection>
              <span className="text-white/50 text-xs uppercase tracking-[0.25em] font-montserrat">Свяжитесь с нами</span>
              <h2 className="font-montserrat text-4xl font-bold text-white mt-2 mb-6">Обсудим ваш<br />проект</h2>
              <p className="text-stone-400 mb-12 leading-relaxed">Расскажите о своей мечте — мы предложим решение и бесплатно выедем на участок.</p>
              <div className="space-y-6">
                {[
                  { icon: "Phone", val: "+7 (800) 123-45-67", label: "Звонок бесплатный" },
                  { icon: "Mail", val: "info@drevdom.ru", label: "Пишите в любое время" },
                  { icon: "MapPin", val: "Вологда, ул. Лесная 12", label: "Офис и шоурум" },
                ].map(c => (
                  <div key={c.val} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-wood-600 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={16} className="text-white/70" fallback="Circle" />
                    </div>
                    <div>
                      <div className="text-stone-100 font-medium">{c.val}</div>
                      <div className="text-stone-500 text-sm">{c.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
            <AnimSection>
              <form className="bg-wood-800 rounded-sm p-8 space-y-5" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="text-stone-300 text-sm mb-2 block">Ваше имя</label>
                  <input type="text" placeholder="Иван Петров" className="w-full bg-wood-700 border border-wood-600 text-stone-100 placeholder-stone-500 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-wood-400 transition-colors" />
                </div>
                <div>
                  <label className="text-stone-300 text-sm mb-2 block">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-wood-700 border border-wood-600 text-stone-100 placeholder-stone-500 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-wood-400 transition-colors" />
                </div>
                <div>
                  <label className="text-stone-300 text-sm mb-2 block">Что планируете построить?</label>
                  <select className="w-full bg-wood-700 border border-wood-600 text-stone-100 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-wood-400 transition-colors">
                    <option value="">Выберите тип объекта</option>
                    <option>Жилой дом</option>
                    <option>Баня</option>
                    <option>Дом + баня</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-300 text-sm mb-2 block">Комментарий</label>
                  <textarea rows={3} placeholder="Расскажите о проекте: площадь, материал, регион..." className="w-full bg-wood-700 border border-wood-600 text-stone-100 placeholder-stone-500 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-wood-400 transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-wood-500 hover:bg-wood-400 text-white py-4 font-medium text-sm rounded-sm transition-colors">
                  Отправить заявку
                </button>
                <p className="text-stone-500 text-xs text-center">Отвечаем в течение 2 часов в рабочее время</p>
              </form>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-semibold text-stone-300">ДревоДом</span>
          <p className="text-stone-600 text-sm">© 2026 ДревоДом. Строительство деревянных домов и бань</p>
          <div className="flex gap-6">
            {["Главная", "Проекты", "Контакты"].map(l => (
              <button key={l} className="text-stone-500 hover:text-stone-300 text-sm transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}