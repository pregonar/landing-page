
import React, { useState, useMemo, useEffect } from 'react';
import {
    Search,
    Filter,
    MapPin,
    Clock,
    Star,
    Heart,
    ChevronDown,
    LayoutGrid,
    List,
    User,
    CheckCircle,
    PlayCircle,
    ArrowRight,
    Calendar,
    Menu,
    X,
    SlidersHorizontal,
    Zap,
    Users,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { UserProfile } from '../lib/auth';
import { WorkshopDetailsPage } from '../components/WorkshopDetails';
import { Footer } from '../components/Footer';

// --- TYPES ---
export interface Workshop {
    id: string;
    title: string;
    instructor: {
        id?: string; // Optional ID linking to ShopWindow
        name: string;
        image: string;
        title: string;
    };
    image: string;
    category: string;
    rating: number;
    reviews: number;
    date: string;
    time: string;
    duration: string;
    price: number;
    level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Todos los Niveles';
    location: string;
    spotsLeft: number;
    description: string;
    isFeatured?: boolean;
}

// --- MOCK DATA ---
const WORKSHOPS_DATA: Workshop[] = [
    {
        id: '1',
        title: 'Maestría en Paisajes de Acuarela',
        instructor: { id: '1', name: 'Elena Rossi', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600', title: 'Instructora de Arte' }, // Matched ID 1 from shopwindow
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000',
        category: 'Arte',
        rating: 4.9,
        reviews: 120,
        date: 'Sáb, 24 Oct',
        time: '10:00 AM',
        duration: '3 Horas',
        price: 120,
        level: 'Intermedio',
        location: 'Estudio de Arte Centro',
        spotsLeft: 4,
        description: 'Únete a más de 150 estudiantes este fin de semana. Profundiza en la teoría del color y técnicas de pincel para crear paisajes impresionantes.',
        isFeatured: true
    },
    {
        id: '2',
        title: 'Fundamentos de Parkour Urbano',
        instructor: { id: '2', name: 'Marcus T.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100', title: 'Coach de Movimiento' }, // Matched ID 2 (Marcus Chen similar)
        image: 'https://images.unsplash.com/photo-1520334298038-41829033e984?q=80&w=1000',
        category: 'Deportes',
        rating: 4.8,
        reviews: 45,
        date: 'Sáb, 24 Oct',
        time: '10:00 AM',
        duration: '2 Horas',
        price: 25,
        level: 'Principiante',
        location: 'Plaza Central',
        spotsLeft: 3,
        description: 'Aprende los fundamentos del movimiento seguro, saltos y aterrizajes en un entorno urbano.',
        isFeatured: true
    },
    {
        id: '3',
        title: 'Intro al Dibujo Digital',
        instructor: { id: '3', name: 'Sarah Jenkins', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600', title: 'Artista Digital' }, // Matched ID 3
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000',
        category: 'Arte',
        rating: 5.0,
        reviews: 82,
        date: 'Dom, 25 Oct',
        time: '2:00 PM',
        duration: '3 Horas',
        price: 40,
        level: 'Principiante',
        location: 'Online',
        spotsLeft: 10,
        description: 'Domina los conceptos básicos de Procreate y las herramientas de ilustración digital.',
        isFeatured: true
    },
    {
        id: '4',
        title: 'Acordes de Guitarra para Principiantes',
        instructor: { id: '4', name: 'David Chen', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100', title: 'Músico' }, // Matched ID 4 (David Miller similar)
        image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1000',
        category: 'Música',
        rating: 4.7,
        reviews: 30,
        date: 'Vie, 30 Oct',
        time: '6:00 PM',
        duration: '1.5 Horas',
        price: 30,
        level: 'Principiante',
        location: 'Hub Musical',
        spotsLeft: 5,
        description: 'Toca tu primera canción en 90 minutos. Guitarras proporcionadas.',
        isFeatured: true
    },
    {
        id: '5',
        title: 'Ceremonia del Té Japonesa',
        instructor: { name: 'Yuki Sato', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100', title: 'Maestra de Té' },
        image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1000',
        category: 'Cultura',
        rating: 4.9,
        reviews: 15,
        date: 'Dom, 01 Nov',
        time: '11:00 AM',
        duration: '2 Horas',
        price: 55,
        level: 'Todos los Niveles',
        location: 'Centro Jardín Zen',
        spotsLeft: 1,
        description: 'Experimenta la tranquilidad y la atención plena de la ceremonia tradicional del té.',
        isFeatured: true
    },
    {
        id: '6',
        title: 'Flow de Vinyasa Matutino',
        instructor: { name: 'Emma Reed', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100', title: 'Profesora de Yoga' },
        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1000',
        category: 'Deportes',
        rating: 4.8,
        reviews: 200,
        date: 'Lun, 02 Nov',
        time: '7:00 AM',
        duration: '1 Hora',
        price: 15,
        level: 'Todos los Niveles',
        location: 'Parque de la Ciudad',
        spotsLeft: 20,
        description: 'Comienza tu semana con energía y equilibrio.'
    },
    {
        id: '7',
        title: 'Torno Alfarero 101',
        instructor: { name: 'Michael Ross', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100', title: 'Ceramista' },
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000',
        category: 'Arte',
        rating: 4.9,
        reviews: 64,
        date: 'Sáb, 07 Nov',
        time: '1:00 PM',
        duration: '2.5 Horas',
        price: 45,
        level: 'Principiante',
        location: 'Estudio de Barro',
        spotsLeft: 2,
        description: 'Ensúciate las manos y crea tu primer cuenco en el torno.'
    }
];

const ITEMS_PER_PAGE = 6;

interface WorkshopsPageProps {
    onNavigate: (view: any) => void;
    user?: UserProfile | null;
    onLogin?: () => void;
    onLogout?: () => void;
    onViewInstructor?: (instructorId: string) => void;
}

export const WorkshopsPage: React.FC<WorkshopsPageProps> = ({
    onNavigate,
    user,
    onLogin,
    onLogout,
    onViewInstructor
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
    const [selectedLevel, setSelectedLevel] = useState<string>('Todos los Niveles');
    const [selectedInstructor, setSelectedInstructor] = useState<string>('Todos');
    const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);

    // Carousel State
    const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

    // Filters
    const categories = [
        { id: 'Todas', label: 'Todas las Categorías' },
        { id: 'Deportes', label: 'Deportes y Movimiento' },
        { id: 'Arte', label: 'Arte y Manualidades' },
        { id: 'Música', label: 'Música y Sonido' },
        { id: 'Cultura', label: 'Cultura e Idiomas' }
    ];

    const levels = ['Todos los Niveles', 'Principiante', 'Intermedio', 'Avanzado'];

    const uniqueInstructors = useMemo(() => {
        const instructors = new Set(WORKSHOPS_DATA.map(w => w.instructor.name));
        return ['Todos', ...Array.from(instructors)];
    }, []);

    // Data Logic
    const featuredWorkshops = useMemo(() => {
        return WORKSHOPS_DATA.filter(w => w.isFeatured).slice(0, 5);
    }, []);

    const filteredWorkshops = useMemo(() => {
        return WORKSHOPS_DATA.filter(w => {
            const matchSearch = w.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCategory = selectedCategory === 'Todas' || w.category === selectedCategory;
            const matchLevel = selectedLevel === 'Todos los Niveles' || w.level === selectedLevel;
            const matchInstructor = selectedInstructor === 'Todos' || w.instructor.name === selectedInstructor;
            return matchSearch && matchCategory && matchLevel && matchInstructor;
        });
    }, [searchTerm, selectedCategory, selectedLevel, selectedInstructor]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedLevel, selectedInstructor]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredWorkshops.length / ITEMS_PER_PAGE);
    const paginatedWorkshops = filteredWorkshops.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Carousel Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentFeaturedIndex((prev) => (prev + 1) % featuredWorkshops.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredWorkshops.length]);

    const handleNextFeatured = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentFeaturedIndex((prev) => (prev + 1) % featuredWorkshops.length);
    };

    const handlePrevFeatured = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentFeaturedIndex((prev) => (prev - 1 + featuredWorkshops.length) % featuredWorkshops.length);
    };

    const handleNavClick = (view: any) => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
    };

    const handleWorkshopSelect = (workshop: Workshop) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSelectedWorkshop(workshop);
    };

    if (selectedWorkshop) {
        return (
            <WorkshopDetailsPage
                workshop={selectedWorkshop}
                onBack={() => setSelectedWorkshop(null)}
                onNavigate={onNavigate}
                user={user}
                onLogin={onLogin}
                onLogout={onLogout}
                onViewInstructor={onViewInstructor}
            />
        );
    }

    const currentFeatured = featuredWorkshops[currentFeaturedIndex];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-navy flex flex-col">

            {/* Navbar (Consistent with Index) */}
            <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('landing')}>
                            <img src="/logo.png" alt="Pregonar Logo" className="h-10 w-10 mr-2 rounded-full object-cover" />
                            <span className="font-display font-extrabold text-2xl tracking-tight text-brand-navy">PREGONAR</span>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-brand-navy p-2 hover:bg-gray-100 rounded-lg transition-colors w-10 h-10 flex items-center justify-center"
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Middle Links (Desktop) */}
                        <div className="hidden md:flex space-x-8 h-full">
                            <button onClick={() => handleNavClick('landing')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Inicio</button>
                            <button onClick={() => handleNavClick('about')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Nosotros</button>
                            <button onClick={() => handleNavClick('events')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Eventos</button>
                            <button onClick={() => handleNavClick('workshops')} className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy">Talleres</button>
                            <button onClick={() => handleNavClick('shopwindow')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Vitrina</button>
                            <button onClick={() => handleNavClick('community')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Comunidad</button>
                            <button onClick={() => handleNavClick('contact-sales')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Contacto</button>
                        </div>

                        {/* Right Buttons (Desktop) */}
                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <button onClick={() => handleNavClick('profile')} className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors">
                                        <img src={user.photoURL || ''} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
                                        <span className="text-sm font-bold text-brand-navy hidden sm:block">{user.displayName?.split(' ')[0]}</span>
                                    </button>
                                </div>
                            ) : (
                                <button onClick={onLogin} className="text-brand-navy font-medium text-sm hover:text-brand-red transition-colors flex items-center gap-2">
                                    Iniciar Sesión <User size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-white z-[60] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex flex-col p-4 space-y-4">
                            <button onClick={() => handleNavClick('landing')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Inicio</button>
                            <button onClick={() => handleNavClick('about')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Nosotros</button>
                            <button onClick={() => handleNavClick('events')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Eventos</button>
                            <button onClick={() => handleNavClick('workshops')} className="text-left font-bold text-brand-navy py-2 border-b border-gray-50">Talleres</button>
                            <button onClick={() => handleNavClick('shopwindow')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Vitrina</button>
                            <button onClick={() => handleNavClick('community')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Comunidad</button>
                            <button onClick={() => handleNavClick('contact-sales')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Contacto</button>
                            {!user && <button onClick={onLogin} className="text-left font-medium text-brand-red py-2">Iniciar Sesión</button>}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative pt-20">
                <div className="absolute inset-0 h-[200px] bg-[#0f112e] overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-30"
                        alt="Workshop Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
                        Talleres y Cursos <span className="text-brand-red">Creativos</span>
                    </h1>

                    <div className="bg-white p-2 rounded-full shadow-lg max-w-2xl mx-auto flex items-center border border-gray-200">
                        <div className="pl-4 text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre, categoría o ubicación..."
                            className="flex-1 px-4 py-2 bg-transparent text-gray-700 outline-none placeholder-gray-400 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="bg-brand-navy text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#0f112e] transition-colors hidden sm:block">
                            Buscar
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20 relative">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters - Responsive Drawer */}
                    <aside
                        className={`
                      fixed inset-0 z-[60] bg-white lg:static lg:bg-transparent lg:z-auto w-full lg:w-72 shrink-0 lg:block transition-transform duration-300 ease-in-out
                      ${isFilterOpen ? 'translate-x-0 overflow-y-auto p-6' : '-translate-x-full lg:translate-x-0 lg:p-0'}
                  `}
                    >
                        {/* Mobile Filter Header */}
                        <div className="flex lg:hidden justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-brand-navy">Filtros</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="sticky top-24 space-y-8">
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                                    <LayoutGrid size={14} /> CATEGORÍAS
                                </h4>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedCategory === cat.id ? 'bg-brand-navy border-brand-navy' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                                {selectedCategory === cat.id && <CheckCircle size={14} className="text-white" />}
                                            </div>
                                            <input type="radio" name="cat" className="hidden" checked={selectedCategory === cat.id} onChange={() => setSelectedCategory(cat.id)} />
                                            <span className={`text-sm ${selectedCategory === cat.id ? 'text-brand-navy font-bold' : 'text-gray-600 group-hover:text-brand-navy'}`}>{cat.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                                    <User size={14} /> INSTRUCTORES
                                </h4>
                                <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                                    {uniqueInstructors.map(instructor => (
                                        <label key={instructor} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedInstructor === instructor ? 'bg-brand-navy border-brand-navy' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                                {selectedInstructor === instructor && <CheckCircle size={14} className="text-white" />}
                                            </div>
                                            <input type="radio" name="instructor" className="hidden" checked={selectedInstructor === instructor} onChange={() => setSelectedInstructor(instructor)} />
                                            <span className={`text-sm truncate ${selectedInstructor === instructor ? 'text-brand-navy font-bold' : 'text-gray-600 group-hover:text-brand-navy'}`}>{instructor}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                                    <Zap size={14} /> NIVEL
                                </h4>
                                <div className="space-y-3">
                                    {levels.map(lvl => (
                                        <label key={lvl} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedLevel === lvl ? 'border-brand-red' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                                {selectedLevel === lvl && <div className="w-2.5 h-2.5 rounded-full bg-brand-red"></div>}
                                            </div>
                                            <input type="radio" name="lvl" className="hidden" checked={selectedLevel === lvl} onChange={() => setSelectedLevel(lvl)} />
                                            <span className={`text-sm ${selectedLevel === lvl ? 'text-brand-navy font-bold' : 'text-gray-600 group-hover:text-brand-navy'}`}>{lvl}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:hidden mt-8 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="w-full bg-brand-navy text-white font-bold py-3 rounded-xl"
                                >
                                    Ver Resultados
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">

                        {/* Featured Carousel */}
                        {selectedCategory === 'Todas' && selectedLevel === 'Todos los Niveles' && selectedInstructor === 'Todos' && !searchTerm && (
                            <div className="relative rounded-3xl overflow-hidden mb-10 shadow-lg group">
                                {/* Slide Content */}
                                <div
                                    className="relative h-[400px] md:h-[450px] cursor-pointer"
                                    onClick={() => handleWorkshopSelect(currentFeatured)}
                                >
                                    <div className="absolute inset-0">
                                        <img
                                            src={currentFeatured.image}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                            alt="Featured"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#0f112e] via-[#0f112e]/80 to-transparent"></div>
                                    </div>

                                    <div className="relative z-10 p-8 md:p-12 ml-10 flex flex-col justify-center h-full md:w-3/4">
                                        <div className="flex items-center gap-3 mb-4 animate-in slide-in-from-left-4 duration-500">
                                            <span className="bg-white/10 backdrop-blur border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                                <Star size={10} className="text-yellow-400" fill="currentColor" /> Taller Destacado
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 leading-tight line-clamp-3 animate-in slide-in-from-bottom-2 duration-500 delay-100">
                                            {currentFeatured.title}
                                        </h2>
                                        <p className="text-gray-300 text-base md:text-lg mb-8 max-w-lg leading-relaxed line-clamp-2 animate-in slide-in-from-bottom-2 duration-500 delay-200">
                                            {currentFeatured.description}
                                        </p>
                                        <div className="flex flex-wrap gap-4 animate-in fade-in duration-700 delay-300">
                                            <button className="bg-brand-red hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-brand-red/25 transition-all">
                                                Unirse Ahora <ArrowRight size={18} className="inline ml-1" />
                                            </button>
                                            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-xl transition-all backdrop-blur-sm">
                                                Ver Detalles
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <button
                                    onClick={handlePrevFeatured}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/20 transition-all z-20"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNextFeatured}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/20 transition-all z-20"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Dots Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                    {featuredWorkshops.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${currentFeaturedIndex === idx ? 'w-6 bg-brand-red' : 'w-1.5 bg-white/50'}`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Grid Toolbar Mobile */}
                        <div className="flex lg:hidden justify-between items-center mb-6">
                            <span className="text-sm font-bold text-gray-500">{filteredWorkshops.length} Resultados</span>
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-brand-navy shadow-sm"
                            >
                                <SlidersHorizontal size={16} /> Filtros
                            </button>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedWorkshops.map(workshop => (
                                <div
                                    key={workshop.id}
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full"
                                    onClick={() => handleWorkshopSelect(workshop)}
                                >
                                    <div className="relative h-52 overflow-hidden shrink-0">
                                        <img src={workshop.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={workshop.title} />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur text-brand-navy text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
                                                {workshop.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 right-4">
                                            <div className={`text-[10px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1 ${workshop.spotsLeft <= 5 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                                <Users size={12} /> {workshop.spotsLeft} Lugares
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <h3 className="font-display font-bold text-lg text-brand-navy leading-tight mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                                                {workshop.title}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <img src={workshop.instructor.image} className="w-6 h-6 rounded-full object-cover border border-gray-100" />
                                                <span className="text-xs text-gray-500 truncate">por <span className="font-bold text-brand-navy">{workshop.instructor.name}</span></span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                <Calendar size={14} className="text-brand-red" /> {workshop.date}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                <Clock size={14} className="text-brand-red" /> {workshop.time} ({workshop.duration})
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                <MapPin size={14} className="text-brand-red" /> {workshop.location}
                                            </div>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                            <div>
                                                <span className="text-lg font-bold text-brand-navy">${workshop.price}</span>
                                                <span className="text-xs text-gray-400 ml-1">/ p</span>
                                            </div>
                                            <button className="text-brand-red text-xs font-bold hover:underline flex items-center gap-1">
                                                Ver Detalles <ArrowRight size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredWorkshops.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mt-4">
                                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy">No encontramos talleres</h3>
                                <p className="text-gray-500 mb-6">Intenta ajustar tus filtros de búsqueda.</p>
                                <button
                                    onClick={() => { setSelectedCategory('Todas'); setSelectedLevel('Todos los Niveles'); setSelectedInstructor('Todos'); setSearchTerm(''); }}
                                    className="text-brand-red font-bold text-sm hover:underline"
                                >
                                    Limpiar todos los filtros
                                </button>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {filteredWorkshops.length > ITEMS_PER_PAGE && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:border-brand-navy hover:text-brand-navy transition disabled:opacity-30 disabled:hover:border-gray-200"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentPage === page ? 'bg-brand-navy text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:border-brand-navy hover:text-brand-navy transition disabled:opacity-30 disabled:hover:border-gray-200"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Footer */}
            <Footer onNavigate={onNavigate} />
        </div>
    );
};
