
import React, { useState, useMemo, useEffect } from 'react';
import {
    Calendar,
    MapPin,
    Search,
    Filter,
    ChevronRight,
    ChevronLeft,
    ChevronDown,
    LayoutGrid,
    List,
    Map,
    Moon,
    LogIn,
    Activity,
    SlidersHorizontal,
    Clock,
    Facebook,
    Instagram,
    AtSign,
    X,
    User,
    Zap,
    Timer,
    Check,
    Menu,
    Users
} from 'lucide-react';
import { Event, getEvents, seedInitialEvents } from '../services/events';
import { EventDetailsPage } from '../components/EventDetails';
import { UserProfile } from '../lib/auth';
import { Footer } from '../components/Footer';

// --- DATA SIMULADA (MOCK) - KEPT FOR SEEDING ---

const EVENTS_DATA_SEED: Omit<Event, 'id'>[] = [
    // --- RUNNING ---
    {
        title: "Maratón Internacional de la Ciudad",
        location: "Parque Central",
        province: "CDMX",
        date: new Date("2024-11-12T07:00:00"),
        category: "RUNNING",
        tags: ["42k", "Urbano"],
        price: 450,
        image: "https://images.unsplash.com/photo-1552674605-46d530064509?q=80&w=1000",
        description: "La carrera más importante de la ciudad recorriendo los monumentos históricos. Un evento de clase mundial.",
        organizer: "Gobierno de la Ciudad",
        difficulty: "Avanzado",
        durationCategory: "medium",
        duration: "4h",
        capacity: 5000,
        registered: 4200
    },
    {
        title: 'Maratón del Valle 2024',
        location: 'Córdoba',
        province: 'Argentina',
        date: new Date('2024-10-15T08:00:00'),
        category: 'RUNNING',
        tags: ['42k / 21k', 'Asfalto'],
        price: 15000,
        image: 'https://images.unsplash.com/photo-1533561052604-c3beb6d557f6?q=80&w=1000',
        description: 'Únete a la carrera más esperada del año en los hermosos paisajes del Valle. Desafía tus límites con recorridos de 42k y 21k sobre asfalto.',
        organizer: 'Club de Corredores Córdoba',
        difficulty: 'Avanzado',
        durationCategory: 'medium',
        duration: '4h+',
        capacity: 2000,
        registered: 1800
    },
    {
        title: "10K Nocturno CDMX",
        location: "Paseo de la Reforma",
        province: "CDMX",
        date: new Date("2024-11-20T20:00:00"),
        category: "RUNNING",
        tags: ["10k", "Nocturna"],
        price: 350,
        image: "https://images.unsplash.com/photo-1628860010991-66c547846513?q=80&w=1000",
        description: "Corre bajo las luces de la ciudad en esta edición especial nocturna. ¡Música en vivo en la meta!",
        organizer: "Runners Night",
        difficulty: "Intermedio",
        durationCategory: "short",
        duration: "1h 30m"
    },
    {
        title: 'Ultra Trail Cerro Arco',
        location: 'Mendoza',
        province: 'Argentina',
        date: new Date('2024-12-12T05:00:00'),
        category: 'RUNNING',
        tags: ['50k / 80k', 'Nocturna', 'Trail'],
        price: 45000,
        image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1000&auto=format&fit=crop',
        description: 'Solo para los más valientes. Un ultra trail nocturno que pondrá a prueba tu resistencia.',
        organizer: 'Trail Running Mendoza',
        difficulty: 'Experto',
        durationCategory: 'long',
        duration: '10h+',
        capacity: 150,
        registered: 120
    },

    // --- CYCLING ---
    {
        title: 'Desafío Sierra Bike',
        location: 'Mendoza',
        province: 'Argentina',
        date: new Date('2024-11-02T09:30:00'),
        category: 'CICLISMO',
        tags: ['60k', 'Montaña', 'MTB'],
        price: 22500,
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000',
        description: 'Una competencia de MTB única en la precordillera mendocina. Senderos técnicos y subidas exigentes.',
        organizer: 'Mendoza MTB',
        difficulty: 'Avanzado',
        durationCategory: 'medium',
        duration: '3-5h',
        capacity: 300,
        registered: 150
    },
    {
        title: "Gran Fondo Ruta del Vino",
        location: "Valle de Guadalupe",
        province: "Baja California",
        date: new Date("2024-10-28T07:00:00"),
        category: "CICLISMO",
        tags: ["Ruta", "120k"],
        price: 1200,
        image: "https://images.unsplash.com/photo-1558507308-30114944d6fb?q=80&w=1000",
        description: "Recorre los viñedos más hermosos en este Gran Fondo. Incluye degustación y jersey conmemorativo.",
        organizer: "Baja Bikes",
        difficulty: "Intermedio",
        durationCategory: "medium",
        duration: "5h"
    },

    // --- ART & CULTURE ---
    {
        title: "Exposición: Colores del Alma",
        location: "Galería Moderna",
        province: "Guadalajara",
        date: new Date("2024-11-18T10:00:00"),
        category: "ARTE",
        tags: ["Pintura", "Contemporáneo"],
        price: 0,
        image: "https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=1000",
        description: "Una inmersión en el arte abstracto de nuevos talentos locales.",
        organizer: "Fundación Arte Vivo",
        difficulty: "Principiante",
        durationCategory: "short",
        duration: "2h"
    },
    {
        title: "Noche de Jazz & Vino",
        location: "Teatro Principal",
        province: "Monterrey",
        date: new Date("2024-12-02T20:00:00"),
        category: "CULTURA",
        tags: ["Música", "Cata"],
        price: 300,
        image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000",
        description: "Disfruta de una velada inolvidable con los mejores exponentes del Jazz nacional acompañado de una selección de vinos.",
        organizer: "Cultura Monterrey",
        difficulty: "Principiante",
        durationCategory: "short",
        duration: "3h",
        capacity: 200,
        registered: 185
    },
    {
        title: "Taller de Fotografía Urbana",
        location: "Centro Histórico",
        province: "CDMX",
        date: new Date("2025-01-15T16:00:00"),
        category: "ARTE",
        tags: ["Workshop", "Calle"],
        price: 850,
        image: "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=1000",
        description: "Aprende a capturar la esencia de la ciudad con tu cámara. Teoría y práctica.",
        organizer: "Foto Club",
        difficulty: "Intermedio",
        durationCategory: "short",
        duration: "4h",
        capacity: 15,
        registered: 5
    },
    {
        title: 'Curso de Fotografía Natural',
        location: 'Ushuaia',
        province: 'Tierra del Fuego',
        date: new Date('2025-03-10T09:00:00'),
        category: "ARTE",
        tags: ['3 días', 'Workshop'],
        price: 18000,
        image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1000',
        description: 'Aprende a capturar la belleza del fin del mundo en este curso intensivo.',
        organizer: 'Foto Austral',
        difficulty: 'Principiante',
        durationCategory: 'long',
        duration: '3 Días',
        capacity: 10,
        registered: 2
    },
    {
        title: 'Festival de Danza Urbana',
        location: 'Rosario',
        province: 'Santa Fe',
        date: new Date('2025-01-20T18:00:00'),
        category: "ARTE",
        tags: ['Workshops', 'Todo Público', 'Danza'],
        price: 8000,
        image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1000',
        description: 'Un fin de semana lleno de ritmo, batallas de freestyle y workshops con coreógrafos internacionales.',
        organizer: 'Rosario Danza',
        difficulty: 'Principiante',
        durationCategory: 'medium',
        duration: '4h'
    },
    {
        title: "Concierto de Rock Indie",
        location: "Foro Indie Rocks",
        province: "CDMX",
        date: new Date("2025-01-20T21:00:00"),
        category: "CULTURA",
        tags: ["En vivo", "Noche", "Música"],
        price: 400,
        image: "https://images.unsplash.com/photo-1459749411177-0473ef485097?q=80&w=1000",
        description: "Las mejores bandas emergentes de la escena nacional.",
        organizer: "Indie Records",
        difficulty: "Principiante",
        durationCategory: "short",
        duration: "3h",
        capacity: 500,
        registered: 350
    },

    // --- WELLNESS ---
    {
        title: "Yoga al Amanecer",
        location: "Playa del Carmen",
        province: "Quintana Roo",
        date: new Date("2024-11-25T06:00:00"),
        category: "WELLNESS",
        tags: ["Playa", "Relajación"],
        price: 200,
        image: "https://images.unsplash.com/photo-1518577915332-c2a19f149a75?q=80&w=1000",
        description: "Conecta con la naturaleza y tu interior en esta sesión de yoga frente al mar.",
        organizer: "Holistic Life",
        difficulty: "Principiante",
        durationCategory: "short",
        duration: "1.5h",
        capacity: 50,
        registered: 48
    },
    {
        title: 'Encuentro de Yoga al Aire Libre',
        location: 'Buenos Aires',
        province: 'CABA',
        date: new Date('2024-11-10T10:00:00'),
        category: 'WELLNESS',
        tags: ['2 hrs', 'Aire Libre'],
        price: 0,
        image: 'https://images.unsplash.com/photo-1599447421405-075115d6e382?q=80&w=1000',
        duration: '2 hrs',
        description: 'Conecta cuerpo y mente en este evento masivo de yoga en los bosques de Palermo.',
        organizer: 'BA Bienestar',
        difficulty: 'Principiante',
        durationCategory: 'short'
    },

    // --- SPORTS & TRIATHLON ---
    {
        title: "Torneo de Padel Amateur",
        location: "Club Deportivo",
        province: "CDMX",
        date: new Date("2024-12-05T09:00:00"),
        category: "DEPORTES",
        tags: ["Torneo", "Parejas"],
        price: 600,
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000",
        description: "El torneo más esperado para jugadores de 4ta y 5ta categoría. ¡Grandes premios!",
        organizer: "Padel Center",
        difficulty: "Intermedio",
        durationCategory: "long",
        duration: "2 días",
        capacity: 32,
        registered: 12
    },
    {
        title: 'Triatlón Iron Pace',
        location: 'Mar del Plata',
        province: 'Buenos Aires',
        date: new Date('2025-02-15T07:00:00'),
        category: 'DEPORTES',
        tags: ['Olímpico', 'Asfalto', 'Triatlón'],
        price: 55000,
        image: 'https://images.unsplash.com/photo-1516562479634-927909383670?q=80&w=1000',
        description: 'El clásico del verano. Nada, pedalea y corre por la costa marplatense.',
        organizer: 'Iron Pace Events',
        difficulty: 'Avanzado',
        durationCategory: 'medium',
        duration: '4h+',
        capacity: 800,
        registered: 250
    },

    // --- SWIMMING ---
    {
        title: 'Travesía Lagos del Sur',
        location: 'Bariloche',
        province: 'Río Negro',
        date: new Date('2024-12-05T07:00:00'),
        category: 'NATACIÓN',
        tags: ['3.5k', 'Aguas Abiertas'],
        price: 30000,
        image: 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?q=80&w=1000',
        description: 'Nada en las aguas cristalinas de la Patagonia. Una travesía de aguas abiertas segura y desafiante.',
        organizer: 'Patagonia Aguas Abiertas',
        difficulty: 'Intermedio',
        durationCategory: 'short',
        duration: '1-2h',
        capacity: 100,
        registered: 95
    },

    // --- GASTRONOMY ---
    {
        title: "Festival Gastronómico",
        location: "Plaza Mayor",
        province: "Puebla",
        date: new Date("2024-12-10T12:00:00"),
        category: "GASTRONOMÍA",
        tags: ["Feria", "Comida"],
        price: 0,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000",
        description: "Sabores de todo el país reunidos en un solo lugar.",
        organizer: "Secretaría de Turismo",
        difficulty: "Principiante",
        durationCategory: "medium",
        duration: "5h"
    }
];

const CATEGORY_FILTERS = [
    'Running & Maratones',
    'Ciclismo',
    'Natación',
    'Arte & Cultura',
    'Bienestar & Yoga'
];

const DIFFICULTY_LEVELS = ['Principiante', 'Intermedio', 'Avanzado', 'Experto'];

const DURATION_FILTERS = [
    { label: 'Corta (< 3h)', value: 'short' },
    { label: 'Media (3 - 6h)', value: 'medium' },
    { label: 'Larga (+6h / Días)', value: 'long' }
];

const TAG_FILTERS = [
    'Asfalto', 'Trail', 'Montaña', 'Familiar', 'Aire Libre', 'Nocturna'
];

// --- COMPONENTS ---

const ITEMS_PER_PAGE = 6;

interface EventsPageProps {
    onNavigate: (view: any) => void;
    user?: UserProfile | null;
    onLogin?: () => void;
    onLogout?: () => void;
    initialEventId?: string | null;
    onClearInitialEvent?: () => void;
    initialCategory?: string | null;
    onClearInitialCategory?: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
    onNavigate,
    user,
    onLogin,
    onLogout,
    initialEventId,
    onClearInitialEvent,
    initialCategory,
    onClearInitialCategory
}) => {
    // Ensure view starts at top when mounting EventsPage
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');

    // Mobile UI States
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filtros
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
    const [selectedDuration, setSelectedDuration] = useState<string>('');
    const [distance, setDistance] = useState(50); // Mock distance state

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Events from Firestore
    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const fetchedEvents = await getEvents();
                if (fetchedEvents.length === 0) {
                    // Determine if we need to seed
                    await seedInitialEvents(EVENTS_DATA_SEED);
                    const reFetched = await getEvents();
                    setEvents(reFetched);
                } else {
                    setEvents(fetchedEvents);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Date Filter State
    const [dateRange, setDateRange] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null });
    const [calendarViewDate, setCalendarViewDate] = useState(new Date());
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    // Handle Initial Event Selection from Props (Deep Linking)
    useEffect(() => {
        if (initialEventId && events.length > 0) {
            const eventFound = events.find(e => e.id === initialEventId);
            if (eventFound) {
                setSelectedEvent(eventFound);
            }
            // Only clear if found or if we want to stop trying
            if (eventFound && onClearInitialEvent) {
                onClearInitialEvent();
            }
        }
    }, [initialEventId, events, onClearInitialEvent]);

    // Handle Initial Category from Props
    useEffect(() => {
        if (initialCategory) {
            setSelectedCategory(initialCategory);
            if (onClearInitialCategory) {
                onClearInitialCategory();
            }
        }
    }, [initialCategory, onClearInitialCategory]);

    // Filtrado
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase());

            // Generic case-insensitive category matching + Specific filter mapping
            let matchCategory = true;
            if (selectedCategory) {
                const catLower = selectedCategory.toLowerCase();
                const eventCatLower = event.category.toLowerCase();

                matchCategory = eventCatLower.includes(catLower) ||
                    (catLower.includes('running') && eventCatLower === 'running') ||
                    (catLower.includes('ciclismo') && eventCatLower === 'ciclismo') ||
                    (catLower.includes('natación') && eventCatLower === 'natación') ||
                    (catLower.includes('arte') && (eventCatLower === 'arte' || eventCatLower === 'danza' || eventCatLower === 'teatro')) ||
                    (catLower.includes('cultura') && (eventCatLower === 'cultura' || eventCatLower === 'teatro')) ||
                    (catLower.includes('música') && eventCatLower === 'música') ||
                    (catLower.includes('teatro') && (eventCatLower === 'teatro' || eventCatLower === 'cultura')) ||
                    (catLower.includes('gastronomía') && eventCatLower === 'gastronomía') ||
                    (catLower.includes('bienestar') && eventCatLower === 'wellness');
            }

            const matchDifficulty = selectedDifficulty
                ? event.difficulty === selectedDifficulty
                : true;

            const matchDuration = selectedDuration
                ? event.durationCategory === selectedDuration
                : true;

            let matchDate = true;
            if (dateRange.start) {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                const startDate = new Date(dateRange.start);
                startDate.setHours(0, 0, 0, 0);

                matchDate = eventDate >= startDate;

                if (matchDate && dateRange.end) {
                    const endDate = new Date(dateRange.end);
                    endDate.setHours(23, 59, 59, 999);
                    matchDate = event.date <= endDate;
                }
            }

            return matchSearch && matchCategory && matchDifficulty && matchDuration && matchDate;
        });
    }, [searchTerm, selectedCategory, selectedDifficulty, selectedDuration, dateRange, events]);

    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
    const paginatedEvents = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Helper para formato de fecha
    const getMonthName = (date: Date) => date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
    const getDayNumber = (date: Date) => date.getDate().toString().padStart(2, '0');

    // Helper para formato de precio
    const formatPrice = (price: number) => {
        if (price === 0) return 'Gratis';
        return `$${price.toLocaleString('es-AR')}`;
    };

    // --- Calendar Helpers ---
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), day);
        clickedDate.setHours(0, 0, 0, 0);
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (clickedDate < now) return; // Disable past dates click

        if (!dateRange.start || (dateRange.start && dateRange.end)) {
            // Start new selection
            setDateRange({ start: clickedDate, end: null });
            setHoverDate(null);
        } else {
            // Complete selection
            if (clickedDate < dateRange.start) {
                setDateRange({ start: clickedDate, end: dateRange.start });
            } else {
                setDateRange({ ...dateRange, end: clickedDate });
            }
            setHoverDate(null);
        }
    };

    const handleDateHover = (day: number) => {
        if (dateRange.start && !dateRange.end) {
            const current = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), day);
            current.setHours(0, 0, 0, 0);
            setHoverDate(current);
        }
    };

    const handleQuickDateSelect = (type: 'this-week' | 'weekend' | 'month') => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let start = new Date(today);
        let end = new Date(today);

        if (type === 'this-week') {
            end.setDate(today.getDate() + 7);
        } else if (type === 'weekend') {
            const day = today.getDay();
            const distToFri = (5 - day + 7) % 7;
            start.setDate(today.getDate() + distToFri);
            end = new Date(start);
            end.setDate(start.getDate() + 2);
        } else if (type === 'month') {
            end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        }

        setDateRange({ start, end });
        // Update view if selection is far out
        if (start.getMonth() !== calendarViewDate.getMonth()) {
            setCalendarViewDate(new Date(start.getFullYear(), start.getMonth(), 1));
        }
    };

    const isDateSelected = (day: number) => {
        const current = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), day);
        current.setHours(0, 0, 0, 0);
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        // Past Dates
        if (current < now) return 'disabled';

        if (!dateRange.start) return '';

        const start = new Date(dateRange.start);
        start.setHours(0, 0, 0, 0);

        if (current.getTime() === start.getTime()) {
            // If we have a range or a hover range starting here
            if (dateRange.end || (hoverDate && hoverDate > start)) {
                return 'start-range';
            }
            return 'start-single';
        }

        if (dateRange.end) {
            const end = new Date(dateRange.end);
            end.setHours(0, 0, 0, 0);
            if (current.getTime() === end.getTime()) return 'end';
            if (current > start && current < end) return 'range';
        } else if (hoverDate) {
            const hover = new Date(hoverDate);
            hover.setHours(0, 0, 0, 0);
            if (current > start && current < hover) return 'range-preview';
            if (current.getTime() === hover.getTime()) return 'end-preview';
        }

        return '';
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedDifficulty('');
        setSelectedDuration('');
        setDateRange({ start: null, end: null });
    };

    const handleNavClick = (route: any) => {
        onNavigate(route);
        setIsMobileMenuOpen(false);
    }

    // Render Event Details Page if an event is selected
    if (selectedEvent) {
        return (
            <EventDetailsPage
                event={selectedEvent}
                onBack={() => setSelectedEvent(null)}
                onNavigate={onNavigate}
                user={user}
                onLogin={onLogin}
                onLogout={onLogout}
            />
        );
    }

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
                            <button
                                onClick={() => handleNavClick('landing')}
                                className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200"
                            >
                                Inicio
                            </button>

                            <button
                                onClick={() => handleNavClick('about')}
                                className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200"
                            >
                                Nosotros
                            </button>

                            <button
                                className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy"
                            >
                                Eventos
                            </button>

                            <button
                                onClick={() => handleNavClick('workshops')}
                                className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200"
                            >
                                Talleres
                            </button>

                            <button
                                onClick={() => handleNavClick('shopwindow')}
                                className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200"
                            >
                                Vitrina
                            </button>
                            <button
                                onClick={() => handleNavClick('community')}
                                className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200"
                            >
                                Comunidad
                            </button>

                            <button
                                onClick={() => handleNavClick('contact-sales')}
                                className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200"
                            >
                                Contacto
                            </button>
                        </div>

                        {/* Right Buttons (Desktop) */}
                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center gap-3">

                                    {/* Special Dashboard Link for Specific Roles */}
                                    {(user.role === 'SUPER_ADMIN' || user.role === 'ORGANIZER' || user.role === 'TRIBE_ADMIN' || user.role === 'INSTRUCTOR' || user.role === 'PREGONERO_ADMIN') && (
                                        <button
                                            onClick={() => {
                                                if (user.role === 'SUPER_ADMIN') onNavigate('super-admin');
                                                else if (user.role === 'ORGANIZER') onNavigate('organizer-dashboard');
                                                else if (user.role === 'TRIBE_ADMIN') onNavigate('tribe-admin');
                                                else if (user.role === 'INSTRUCTOR') onNavigate('instructor-dashboard');
                                                else if (user.role === 'PREGONERO_ADMIN') onNavigate('pregonero-admin');
                                            }}
                                            className="bg-brand-navy/10 text-brand-navy text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-brand-navy hover:text-white transition mr-2"
                                        >
                                            {user.role === 'SUPER_ADMIN' ? 'Admin Panel' :
                                                user.role === 'ORGANIZER' ? 'Organizer' :
                                                    user.role === 'INSTRUCTOR' ? 'My Classes' :
                                                        user.role === 'PREGONERO_ADMIN' ? 'Staff CRM' :
                                                            'Tribe Admin'}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleNavClick('profile')}
                                        className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        <img
                                            src={user.photoURL || ''}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full border border-gray-200"
                                        />
                                        <span className="text-sm font-bold text-brand-navy hidden sm:block">{user.displayName?.split(' ')[0]}</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={onLogin}
                                    className="text-brand-navy font-medium text-sm hover:text-brand-red transition-colors flex items-center gap-2"
                                >
                                    Iniciar Sesión
                                    <User size={16} />
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
                            <button className="text-left font-bold text-brand-navy py-2 border-b border-gray-50">Eventos</button>
                            <button onClick={() => handleNavClick('workshops')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Talleres</button>
                            <button onClick={() => handleNavClick('shopwindow')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Vitrina de Instructores</button>
                            <button onClick={() => handleNavClick('community')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Comunidad</button>
                            <button onClick={() => handleNavClick('contact-sales')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Contacto</button>

                            <div className="pt-4 flex items-center justify-between">
                                {user ? (
                                    <div className="flex flex-col w-full gap-2">
                                        {(user.role === 'SUPER_ADMIN' || user.role === 'ORGANIZER' || user.role === 'TRIBE_ADMIN' || user.role === 'INSTRUCTOR' || user.role === 'PREGONERO_ADMIN') && (
                                            <button
                                                onClick={() => {
                                                    if (user.role === 'SUPER_ADMIN') onNavigate('super-admin');
                                                    else if (user.role === 'ORGANIZER') onNavigate('organizer-dashboard');
                                                    else if (user.role === 'TRIBE_ADMIN') onNavigate('tribe-admin');
                                                    else if (user.role === 'INSTRUCTOR') onNavigate('instructor-dashboard');
                                                    else if (user.role === 'PREGONERO_ADMIN') onNavigate('pregonero-admin');
                                                }}
                                                className="w-full bg-gray-100 text-brand-navy font-bold py-2 rounded-lg text-sm"
                                            >
                                                Go to Dashboard
                                            </button>
                                        )}
                                        <div className="flex items-center gap-3 w-full" onClick={() => handleNavClick('profile')}>
                                            <img src={user.photoURL || ''} className="w-10 h-10 rounded-full border border-gray-200" />
                                            <div>
                                                <p className="font-bold text-brand-navy">{user.displayName}</p>
                                                <p className="text-xs text-gray-500">Ver Perfil</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={onLogin}
                                        className="w-full bg-brand-navy text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                                    >
                                        <User size={18} /> Iniciar Sesión
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content Wrapper (Added top padding to clear fixed nav) */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">

                {/* Header Section */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mb-2">Próximos Desafíos</h1>
                        <p className="text-gray-500">Encuentra tu próxima carrera o evento cultural</p>
                    </div>

                    <div className="w-full md:max-w-md relative flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Buscar maratón, torneo, clase..."
                                className="w-full pl-10 pr-12 md:pr-32 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy/10 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <button className="hidden md:flex absolute right-1 top-1 bottom-1 bg-brand-navy text-white px-4 rounded-lg text-sm font-medium items-center gap-2 hover:bg-[#0f112e] transition">
                                <SlidersHorizontal size={14} />
                                Buscar
                            </button>
                        </div>

                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="md:hidden bg-white border border-gray-200 rounded-xl p-3 text-brand-navy shadow-sm"
                        >
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 relative">

                    {/* Sidebar Filters - Responsive Drawer */}
                    <aside
                        className={`
                    fixed inset-0 z-[60] bg-white lg:static lg:bg-transparent lg:z-auto w-full lg:w-72 shrink-0 space-y-6 lg:block transition-transform duration-300 ease-in-out
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

                        {/* Date Filter (Enhanced Calendar) */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-brand-navy flex items-center gap-2">
                                    <div className="w-1 h-4 bg-brand-red rounded-full"></div>
                                    Fecha
                                </h3>
                                {dateRange.start && (
                                    <button
                                        onClick={() => {
                                            setDateRange({ start: null, end: null });
                                            setHoverDate(null);
                                        }}
                                        className="text-xs text-gray-400 hover:text-brand-red flex items-center gap-1"
                                    >
                                        <X size={12} /> Limpiar
                                    </button>
                                )}
                            </div>

                            {/* Quick Filters */}
                            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
                                <button
                                    onClick={() => handleQuickDateSelect('this-week')}
                                    className="text-[10px] font-bold px-2 py-1 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 whitespace-nowrap"
                                >
                                    Esta Semana
                                </button>
                                <button
                                    onClick={() => handleQuickDateSelect('weekend')}
                                    className="text-[10px] font-bold px-2 py-1 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 whitespace-nowrap"
                                >
                                    Finde
                                </button>
                                <button
                                    onClick={() => handleQuickDateSelect('month')}
                                    className="text-[10px] font-bold px-2 py-1 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 whitespace-nowrap"
                                >
                                    Este Mes
                                </button>
                            </div>

                            <div className="mb-2 flex justify-between items-center text-sm font-bold text-brand-navy">
                                <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full text-gray-500"><ChevronLeft size={16} /></button>
                                <span>{calendarViewDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}</span>
                                <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full text-gray-500"><ChevronRight size={16} /></button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-400 font-medium">
                                {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map(d => <div key={d}>{d}</div>)}
                            </div>

                            <div
                                className="grid grid-cols-7 gap-y-1 text-center text-xs"
                                onMouseLeave={() => setHoverDate(null)}
                            >
                                {/* Empty cells for previous month */}
                                {Array.from({ length: getFirstDayOfMonth(calendarViewDate.getFullYear(), calendarViewDate.getMonth()) }).map((_, i) => (
                                    <div key={`empty-${i}`} className="p-2"></div>
                                ))}

                                {/* Days */}
                                {Array.from({ length: getDaysInMonth(calendarViewDate.getFullYear(), calendarViewDate.getMonth()) }).map((_, i) => {
                                    const day = i + 1;
                                    const selectionState = isDateSelected(day);

                                    let bgClass = 'text-gray-700 hover:bg-gray-100 rounded-sm'; // Default
                                    let textClass = '';

                                    if (selectionState === 'disabled') {
                                        bgClass = 'text-gray-300 cursor-not-allowed';
                                    }
                                    else if (selectionState === 'start-single') {
                                        bgClass = 'bg-brand-red text-white rounded-md shadow-sm z-10 relative';
                                    }
                                    else if (selectionState === 'start-range') {
                                        bgClass = 'bg-brand-red text-white rounded-l-md shadow-sm z-10 relative';
                                    }
                                    else if (selectionState === 'end') {
                                        bgClass = 'bg-brand-red text-white rounded-r-md shadow-sm z-10 relative';
                                    }
                                    else if (selectionState === 'range') {
                                        bgClass = 'bg-red-50 text-brand-red rounded-none';
                                    }
                                    else if (selectionState === 'range-preview') {
                                        bgClass = 'bg-red-50/50 text-brand-red rounded-none border-t border-b border-brand-red/20';
                                    }
                                    else if (selectionState === 'end-preview') {
                                        bgClass = 'bg-brand-red/60 text-white rounded-r-md z-10';
                                    }

                                    // Check if date is today
                                    const isToday = new Date().toDateString() === new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), day).toDateString();
                                    if (isToday && !selectionState.includes('start') && !selectionState.includes('end')) {
                                        textClass = 'font-bold text-brand-red ring-1 ring-brand-red/30 rounded-sm';
                                    }

                                    return (
                                        <button
                                            key={day}
                                            onClick={() => handleDateClick(day)}
                                            onMouseEnter={() => handleDateHover(day)}
                                            disabled={selectionState === 'disabled'}
                                            className={`h-11 flex items-center justify-center transition-all relative ${bgClass} ${textClass}`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                            {dateRange.start && (
                                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-center text-gray-500 flex justify-center items-center gap-2">
                                    <div className="bg-gray-100 px-2 py-1 rounded">
                                        {dateRange.start.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                                    </div>
                                    <span className="text-gray-300">-</span>
                                    <div className={`px-2 py-1 rounded ${dateRange.end ? 'bg-gray-100' : 'bg-gray-50 text-gray-300 border border-dashed border-gray-200'}`}>
                                        {dateRange.end ? dateRange.end.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) : '...'}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Categoría */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-brand-navy flex items-center gap-2">
                                    <div className="w-1 h-4 bg-brand-red rounded-full"></div>
                                    Categoría
                                </h3>
                                {selectedCategory && (
                                    <button
                                        onClick={() => setSelectedCategory('')}
                                        className="text-xs text-gray-400 hover:text-brand-red flex items-center gap-1"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                            <div className="space-y-3">
                                {CATEGORY_FILTERS.map((cat, idx) => (
                                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'border-brand-red' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                            {selectedCategory === cat && <div className="w-2.5 h-2.5 bg-brand-red rounded-full"></div>}
                                        </div>
                                        <input
                                            type="radio"
                                            name="category"
                                            className="hidden"
                                            checked={selectedCategory === cat}
                                            onChange={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                                        />
                                        <span className={`text-sm ${selectedCategory === cat ? 'text-brand-navy font-medium' : 'text-gray-600'}`}>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Dificultad (Nuevo Filtro) */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-brand-navy flex items-center gap-2">
                                    <div className="w-1 h-4 bg-brand-red rounded-full"></div>
                                    Dificultad
                                </h3>
                                {selectedDifficulty && (
                                    <button
                                        onClick={() => setSelectedDifficulty('')}
                                        className="text-xs text-gray-400 hover:text-brand-red flex items-center gap-1"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {DIFFICULTY_LEVELS.map((level, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedDifficulty(selectedDifficulty === level ? '' : level)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedDifficulty === level ? 'bg-brand-navy text-white border-brand-navy' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-white hover:border-brand-navy/30'}`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Duración (Nuevo Filtro) */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-brand-navy flex items-center gap-2">
                                    <div className="w-1 h-4 bg-brand-red rounded-full"></div>
                                    Duración
                                </h3>
                                {selectedDuration && (
                                    <button
                                        onClick={() => setSelectedDuration('')}
                                        className="text-xs text-gray-400 hover:text-brand-red flex items-center gap-1"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                            <div className="space-y-3">
                                {DURATION_FILTERS.map((dur, idx) => (
                                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedDuration === dur.value ? 'border-brand-red' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                            {selectedDuration === dur.value && <div className="w-2.5 h-2.5 bg-brand-red rounded-full"></div>}
                                        </div>
                                        <input
                                            type="radio"
                                            name="duration"
                                            className="hidden"
                                            checked={selectedDuration === dur.value}
                                            onChange={() => setSelectedDuration(selectedDuration === dur.value ? '' : dur.value)}
                                        />
                                        <span className={`text-sm ${selectedDuration === dur.value ? 'text-brand-navy font-medium' : 'text-gray-600'}`}>{dur.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Filter Footer */}
                        <div className="lg:hidden mt-8 sticky bottom-0 bg-white pt-4 pb-8 border-t border-gray-100">
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full bg-brand-navy text-white font-bold py-3 rounded-xl"
                            >
                                Ver {filteredEvents.length} Resultados
                            </button>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <div className="flex-1">
                        {/* ... Main Grid Content ... */}
                        {/* Top Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <p className="text-gray-500 text-sm">
                                Mostrando <span className="font-bold text-brand-navy">{filteredEvents.length}</span> eventos cerca de ti
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                                        Recomendados <ChevronDown size={14} />
                                    </button>
                                </div>
                                <div className="flex bg-white border border-gray-200 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewLayout('grid')}
                                        className={`p-1.5 rounded ${viewLayout === 'grid' ? 'bg-gray-100 text-brand-navy shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <LayoutGrid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewLayout('list')}
                                        className={`p-1.5 rounded ${viewLayout === 'list' ? 'bg-gray-100 text-brand-navy shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Grid Container */}
                        {paginatedEvents.length > 0 ? (
                            <div className={`grid ${viewLayout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                                {paginatedEvents.map(event => (
                                    <div
                                        key={event.id}
                                        onClick={() => setSelectedEvent(event)}
                                        className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer ${viewLayout === 'list' ? 'flex flex-row h-48' : 'flex flex-col hover:-translate-y-1 hover:scale-[1.02]'}`}
                                    >

                                        {/* Image Container */}
                                        <div className={`relative overflow-hidden ${viewLayout === 'list' ? 'w-40 sm:w-64 h-full shrink-0' : 'h-48 w-full'}`}>
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            {/* Date Badge */}
                                            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center w-12 text-center">
                                                <span className="text-[10px] font-bold text-brand-red bg-white w-full py-0.5 border-b border-gray-100 uppercase">
                                                    {getMonthName(event.date)}
                                                </span>
                                                <span className="text-xl font-display font-extrabold text-brand-navy py-1">
                                                    {getDayNumber(event.date)}
                                                </span>
                                            </div>
                                            {/* Category Badge */}
                                            <div className="absolute top-4 right-4 bg-brand-navy/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                                                {event.category}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="font-display font-bold text-lg text-brand-navy mb-1 line-clamp-2 md:line-clamp-1 group-hover:text-brand-red transition-colors">
                                                {event.title}
                                            </h3>

                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-4">
                                                <MapPin size={12} className="text-brand-red" />
                                                {event.location}, {event.province}
                                            </div>

                                            {/* Info Pills (Difficulty/Duration/Capacity) */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {event.difficulty && (
                                                    <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                                                        <Zap size={10} /> {event.difficulty}
                                                    </span>
                                                )}
                                                {event.duration && (
                                                    <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                                                        <Timer size={10} /> {event.duration}
                                                    </span>
                                                )}
                                                {/* New Capacity Indicator */}
                                                {event.capacity && event.registered !== undefined && (
                                                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1 ${(event.capacity - event.registered) < 10
                                                        ? 'bg-red-50 text-red-600'
                                                        : 'bg-blue-50 text-blue-600'
                                                        }`}>
                                                        <Users size={10} /> {event.capacity - event.registered} lugares
                                                    </span>
                                                )}
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-4">
                                                <div>
                                                    <span className="block text-[10px] text-gray-400 font-medium mb-0.5">Inscripción desde</span>
                                                    <span className={`text-lg font-bold ${event.price === 0 ? 'text-brand-red' : 'text-brand-navy'}`}>
                                                        {formatPrice(event.price)}
                                                    </span>
                                                </div>
                                                <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-brand-navy hover:text-white transition-all">
                                                    <Map size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                                <div className="bg-gray-50 p-4 rounded-full mb-4">
                                    <Search size={32} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy">No encontramos eventos</h3>
                                <p className="text-gray-500 text-sm mt-1">Intenta ajustar tus filtros de búsqueda.</p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-brand-red font-medium text-sm hover:underline"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredEvents.length > ITEMS_PER_PAGE && (
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
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer onNavigate={onNavigate} />
        </div>
    );
}
