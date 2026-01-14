import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  ChevronDown,
  ArrowRight,
  Instagram,
  Facebook,
  AtSign,
  CheckCircle,
  Globe,
  Utensils,
  Music,
  Palette,
  Bike,
  Activity,
  Drama,
  ArrowRightCircle,
  LogOut,
  User,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

import { EventsPage } from './pages/EventsPage';
import { WorkshopsPage } from './pages/WorkshopsPage';
import { ShopWindowPage } from './pages/ShopWindowPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { CreateEventPage } from './pages/CreateEventPage';
import { CommunityPage } from './pages/CommunityPage';
import { AuthPage } from './pages/AuthPage';
import { ContactSalesPage } from './pages/ContactSalesPage';
import { AboutPage } from './pages/AboutPage';
import { SportsBlogPage } from './pages/SportsBlogPage';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { TribeAdminDashboard } from './pages/TribeAdminDashboard';
import { InstructorDashboard } from './pages/InstructorDashboard';
import { PregoneroAdminDashboard } from './pages/PregoneroAdminDashboard';
import { loginWithGoogle, logout, UserProfile } from './lib/auth';
import { Footer } from './components/Footer';
import { PrivacyPage, TermsPage, CookiesPage } from './pages/Legal';

// --- FEATURED EVENTS DATA ---
const FEATURED_EVENTS = [
  {
    id: 1,
    title: "Maratón Internacional de la Ciudad",
    category: "DEPORTES",
    date: "12",
    month: "NOV",
    location: "Parque Central, CDMX",
    price: "$450",
    currency: "MXN",
    image: "https://images.unsplash.com/photo-1552674605-46d530064509?q=80&w=1000"
  },
  {
    id: 2,
    title: "Exposición: Colores del Alma",
    category: "ARTE",
    date: "18",
    month: "NOV",
    location: "Galería Moderna, Guadalajara",
    price: "Gratis",
    currency: "",
    image: "https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=1000"
  },
  {
    id: 3,
    title: "Noche de Jazz & Vino",
    category: "CULTURA",
    date: "02",
    month: "DIC",
    location: "Teatro Principal, Monterrey",
    price: "$300",
    currency: "MXN",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000"
  },
  {
    id: 4,
    title: "Yoga al Amanecer",
    category: "BIENESTAR",
    date: "25",
    month: "NOV",
    location: "Playa del Carmen, QR",
    price: "$200",
    currency: "MXN",
    image: "https://images.unsplash.com/photo-1518577915332-c2a19f149a75?q=80&w=1000"
  },
  {
    id: 5,
    title: "Torneo de Padel Amateur",
    category: "DEPORTES",
    date: "05",
    month: "DIC",
    location: "Club Deportivo, CDMX",
    price: "$600",
    currency: "MXN",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000"
  },
  {
    id: 6,
    title: "Festival Gastronómico",
    category: "GASTRONOMÍA",
    date: "10",
    month: "DIC",
    location: "Plaza Mayor, Puebla",
    price: "Gratis",
    currency: "",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000"
  },
  {
    id: 7,
    title: "Taller de Fotografía Urbana",
    category: "ARTE",
    date: "15",
    month: "ENE",
    location: "Centro Histórico, CDMX",
    price: "$850",
    currency: "MXN",
    image: "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=1000"
  },
  {
    id: 8,
    title: "Concierto de Rock Indie",
    category: "MÚSICA",
    date: "20",
    month: "ENE",
    location: "Foro Indie Rocks",
    price: "$400",
    currency: "MXN",
    image: "https://images.unsplash.com/photo-1459749411177-0473ef485097?q=80&w=1000"
  }
];

// --- HERO BACKGROUND IMAGES ---
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop", // Vibrant Crowd/Community
  "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2000&auto=format&fit=crop", // Outdoor/Hiking Group
  "https://images.unsplash.com/photo-1514525253440-b393452e3726?q=80&w=2000&auto=format&fit=crop", // Concert/Culture
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000&auto=format&fit=crop", // Talk/Workshop
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2000&auto=format&fit=crop"  // Sports/Action
];

const App = () => {
  const [view, setView] = useState<'landing' | 'events' | 'workshops' | 'shopwindow' | 'community' | 'profile' | 'create-event' | 'auth' | 'contact-sales' | 'about' | 'sports-blog' | 'super-admin' | 'organizer-dashboard' | 'tribe-admin' | 'instructor-dashboard' | 'pregonero-admin' | 'privacy' | 'terms' | 'cookies'>('landing');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [initialCategory, setInitialCategory] = useState<string | null>(null);
  const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);

  // Hero Carousel State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Responsive Carousel Logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsVisible(1);
      else if (window.innerWidth < 1024) setItemsVisible(2);
      else setItemsVisible(3);
    };
    handleResize(); // Set initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play Featured Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [currentSlide, itemsVisible]);

  // Auto-play Hero Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- SEO: Dynamic Title Management ---
  useEffect(() => {
    const titles: Record<string, string> = {
      'landing': 'Pregonar - Descubre Eventos, Talleres y Comunidad',
      'events': 'Eventos Deportivos y Culturales | Pregonar',
      'workshops': 'Talleres y Cursos Creativos | Pregonar',
      'shopwindow': 'Vitrina de Instructores | Pregonar',
      'community': 'Comunidad y Grupos | Pregonar',
      'profile': 'Mi Perfil | Pregonar',
      'create-event': 'Crear Evento | Pregonar',
      'auth': 'Iniciar Sesión | Pregonar',
      'contact-sales': 'Contacto | Pregonar',
      'about': 'Nosotros | Pregonar',
      'sports-blog': 'Blog Deportivo | Pregonar',
      'privacy': 'Política de Privacidad | Pregonar',
      'terms': 'Términos y Condiciones | Pregonar',
      'cookies': 'Política de Cookies | Pregonar'
    };

    const defaultTitle = 'Pregonar - Descubre Tu Próxima Pasión';
    document.title = titles[view] || defaultTitle;
  }, [view]);

  const handleNextSlide = () => {
    const maxIndex = FEATURED_EVENTS.length - itemsVisible;
    setCurrentSlide(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const handlePrevSlide = () => {
    const maxIndex = FEATURED_EVENTS.length - itemsVisible;
    setCurrentSlide(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  const handleLoginClick = () => {
    setView('auth');
    setIsMobileMenuOpen(false);
  };

  // --- ROLE BASED ROUTING ON LOGIN ---
  const handleAuthSuccess = (userProfile: UserProfile) => {
    setUser(userProfile);

    // Determine landing page based on Role
    if (userProfile.role === 'SUPER_ADMIN') {
      setView('super-admin');
    } else if (userProfile.role === 'ORGANIZER') {
      setView('organizer-dashboard');
    } else if (userProfile.role === 'TRIBE_ADMIN') {
      setView('tribe-admin');
    } else if (userProfile.role === 'INSTRUCTOR') {
      setView('instructor-dashboard');
    } else if (userProfile.role === 'PREGONERO_ADMIN') {
      setView('pregonero-admin');
    } else {
      setView('landing');
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setView('landing');
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (targetView: typeof view) => {
    // Prevent unauthorized access via nav
    if (targetView === 'create-event' && user?.role !== 'ORGANIZER' && user?.role !== 'SUPER_ADMIN' && user) {
      alert("Organizer account required");
      return;
    }

    setView(targetView);
    setIsMobileMenuOpen(false);
    // If navigating away from events, clear selection
    if (targetView !== 'events') {
      setSelectedEventId(null);
      setInitialCategory(null);
    }
    // If navigating away from shopwindow, clear selection
    if (targetView !== 'shopwindow') {
      setSelectedInstructorId(null);
    }
  };

  // Helper to open event details
  const handleViewDetails = (eventId: number) => {
    setSelectedEventId(String(eventId));
    setView('events');
  };

  // Helper to navigate to events with a specific category
  const handleCategoryClick = (category: string) => {
    setInitialCategory(category);
    setView('events');
  };

  const handleViewInstructor = (instructorId: string) => {
    setSelectedInstructorId(instructorId);
    setView('shopwindow');
  };

  if (view === 'auth') {
    return <AuthPage onLoginSuccess={handleAuthSuccess} onNavigate={setView} />;
  }

  // --- LEGAL VIEWS ---
  if (view === 'privacy') return <PrivacyPage onNavigate={setView} />;
  if (view === 'terms') return <TermsPage onNavigate={setView} />;
  if (view === 'cookies') return <CookiesPage onNavigate={setView} />;

  // --- RBAC VIEWS ---
  if (view === 'super-admin' && user?.role === 'SUPER_ADMIN') {
    return <SuperAdminDashboard user={user} onLogout={handleLogout} onNavigate={setView} />;
  }

  if (view === 'organizer-dashboard' && (user?.role === 'ORGANIZER' || user?.role === 'SUPER_ADMIN')) {
    return <OrganizerDashboard user={user} onLogout={handleLogout} onNavigate={setView} />;
  }

  if (view === 'tribe-admin' && (user?.role === 'TRIBE_ADMIN' || user?.role === 'SUPER_ADMIN')) {
    return <TribeAdminDashboard user={user} onLogout={handleLogout} onNavigate={setView} />;
  }

  if (view === 'instructor-dashboard' && (user?.role === 'INSTRUCTOR' || user?.role === 'SUPER_ADMIN')) {
    return <InstructorDashboard user={user} onLogout={handleLogout} onNavigate={setView} />;
  }

  if (view === 'pregonero-admin' && (user?.role === 'PREGONERO_ADMIN' || user?.role === 'SUPER_ADMIN')) {
    return <PregoneroAdminDashboard user={user} onLogout={handleLogout} onNavigate={setView} />;
  }

  if (view === 'contact-sales') {
    return <ContactSalesPage onNavigate={setView} user={user} onLogin={handleLoginClick} onLogout={handleLogout} />;
  }

  if (view === 'events') {
    return (
      <EventsPage
        onNavigate={setView}
        user={user}
        onLogin={handleLoginClick}
        onLogout={handleLogout}
        initialEventId={selectedEventId}
        onClearInitialEvent={() => setSelectedEventId(null)}
        initialCategory={initialCategory}
        onClearInitialCategory={() => setInitialCategory(null)}
      />
    );
  }

  if (view === 'workshops') {
    return (
      <WorkshopsPage
        onNavigate={setView}
        user={user}
        onLogin={handleLoginClick}
        onLogout={handleLogout}
        onViewInstructor={handleViewInstructor}
      />
    );
  }

  if (view === 'shopwindow') {
    return (
      <ShopWindowPage
        onNavigate={setView}
        user={user}
        onLogin={handleLoginClick}
        onLogout={handleLogout}
        initialInstructorId={selectedInstructorId}
        onClearInitialInstructor={() => setSelectedInstructorId(null)}
      />
    );
  }

  if (view === 'community') {
    return <CommunityPage onNavigate={setView} user={user} onLogin={handleLoginClick} onLogout={handleLogout} />;
  }

  if (view === 'about') {
    return <AboutPage onNavigate={setView} user={user} onLogin={handleLoginClick} onLogout={handleLogout} />;
  }

  if (view === 'sports-blog') {
    return <SportsBlogPage onNavigate={setView} user={user} onLogin={handleLoginClick} onLogout={handleLogout} />;
  }

  if (view === 'profile' && user) {
    return <UserProfilePage user={user} onNavigate={setView} onLogout={handleLogout} />;
  }

  if (view === 'create-event') {
    return <CreateEventPage onNavigate={setView} user={user} onLogin={handleLoginClick} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy flex flex-col">

      {/* Navbar */}
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
                className="text-brand-navy p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                onClick={() => handleNavClick('events')}
                className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200"
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
                        if (user.role === 'SUPER_ADMIN') setView('super-admin');
                        else if (user.role === 'ORGANIZER') setView('organizer-dashboard');
                        else if (user.role === 'TRIBE_ADMIN') setView('tribe-admin');
                        else if (user.role === 'INSTRUCTOR') setView('instructor-dashboard');
                        else if (user.role === 'PREGONERO_ADMIN') setView('pregonero-admin');
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
                  onClick={handleLoginClick}
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
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 top-20 z-40 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col p-4 space-y-4">
              <button onClick={() => handleNavClick('landing')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Inicio</button>
              <button onClick={() => handleNavClick('about')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Nosotros</button>
              <button onClick={() => handleNavClick('events')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Eventos</button>
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
                          if (user.role === 'SUPER_ADMIN') setView('super-admin');
                          else if (user.role === 'ORGANIZER') setView('organizer-dashboard');
                          else if (user.role === 'TRIBE_ADMIN') setView('tribe-admin');
                          else if (user.role === 'INSTRUCTOR') setView('instructor-dashboard');
                          else if (user.role === 'PREGONERO_ADMIN') setView('pregonero-admin');
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
                    onClick={handleLoginClick}
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

      {/* Hero Section */}
      <div className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center transition-all duration-700">
        {/* ... Hero Content ... */}
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentHeroSlide ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/75 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-3xl md:text-6xl font-display font-bold text-white mb-6 leading-tight drop-shadow-md animate-in slide-in-from-bottom-4 duration-700">
            Anuncia, expone y comparte <br />
            <span className="text-brand-red">tu próxima pasión.</span>
          </h1>
          <p className="text-gray-100 text-base md:text-xl max-w-2xl mx-auto mb-10 font-light drop-shadow-sm animate-in slide-in-from-bottom-6 duration-1000">
            La plataforma líder para descubrir eventos deportivos, artísticos y culturales cerca de ti. Conecta con instructores y profesionales.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8 opacity-90 max-w-lg mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent flex-1"></div>
            <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">Explora tus intereses</span>
            <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent flex-1"></div>
          </div>

          <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
            {['Deportes', 'Arte', 'Cultura', 'Talleres', 'Clases'].map((tag, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(tag)}
                className="group flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white hover:text-brand-navy transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                {tag === 'Deportes' && <Bike size={16} className="group-hover:text-brand-red transition-colors md:w-[18px] md:h-[18px]" />}
                {tag === 'Arte' && <Palette size={16} className="group-hover:text-brand-red transition-colors md:w-[18px] md:h-[18px]" />}
                {tag === 'Cultura' && <Globe size={16} className="group-hover:text-brand-red transition-colors md:w-[18px] md:h-[18px]" />}
                {tag === 'Talleres' && <Utensils size={16} className="group-hover:text-brand-red transition-colors md:w-[18px] md:h-[18px]" />}
                {tag === 'Clases' && <GraduationCap size={16} className="group-hover:text-brand-red transition-colors md:w-[18px] md:h-[18px]" />}
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events Section - CAROUSEL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">Eventos Destacados</h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Los mejores eventos seleccionados para ti esta semana.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <button onClick={() => setView('events')} className="text-brand-red font-bold flex items-center gap-2 hover:gap-3 transition-all ml-2 hidden sm:flex">
              Ver todos <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0 py-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * (100 / itemsVisible)}%)` }}
          >
            {FEATURED_EVENTS.map((event) => (
              <div
                key={event.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-brand-navy text-xs font-bold px-3 py-1 rounded-md shadow-sm">{event.category}</span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-brand-red text-white p-2 rounded-lg text-center shadow-lg min-w-[60px]">
                      <span className="block text-xs font-medium uppercase">{event.month}</span>
                      <span className="block text-xl font-bold leading-none">{event.date}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-xl text-brand-navy mb-2 line-clamp-2 h-14 group-hover:text-brand-red transition-colors" title={event.title}>{event.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin size={16} className="mr-1 text-brand-red shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <span className="font-bold text-brand-navy text-lg">{event.price} <span className="text-xs text-gray-400 font-normal">{event.currency}</span></span>
                      <button
                        onClick={() => handleViewDetails(event.id)}
                        className="text-brand-red text-sm font-medium hover:underline"
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center sm:hidden">
          <button onClick={() => setView('events')} className="text-brand-red font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm">
            Ver todos los eventos <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mb-12">Explora por Categoría</h2>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { name: 'Deportes', icon: <Bike size={28} /> },
              { name: 'Arte', icon: <Palette size={28} /> },
              { name: 'Música', icon: <Music size={28} /> },
              { name: 'Gastronomía', icon: <Utensils size={28} /> },
              { name: 'Bienestar', icon: <Activity size={28} /> },
              { name: 'Teatro', icon: <Drama size={28} /> },
            ].map((cat, idx) => (
              <div key={idx} className="group cursor-pointer" onClick={() => handleCategoryClick(cat.name)}>
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-md flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 mx-auto mb-4 group-hover:-translate-y-2">
                  {cat.icon}
                </div>
                <span className="font-medium text-gray-600 group-hover:text-brand-navy">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructors Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex gap-4">
            <div className="w-1/2 pt-8">
              <div className="overflow-hidden rounded-2xl shadow-lg h-64">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="Instructor 1" />
              </div>
            </div>
            <div className="w-1/2">
              <div className="overflow-hidden rounded-2xl shadow-lg mb-4 h-64">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="Instructor 2" />
              </div>
            </div>
          </div>

          <div className="pl-0 md:pl-10">
            <span className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-bold rounded-full mb-4">Profesionales</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-6">Descubre la Vitrina de Maestros</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Pregonar te acerca a los verdaderos expertos en su oficio. Una galería premium de instructores listos para guiar tu crecimiento en artes, deportes y disciplinas culturales.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="text-brand-red" size={20} />
                Galerías profesionales seleccionadas.
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="text-brand-red" size={20} />
                Coordinación de clases sin complicaciones.
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="text-brand-red" size={20} />
                Mentores de alto nivel en arte y deporte.
              </li>
            </ul>

            <button
              onClick={() => handleNavClick('shopwindow')}
              className="border-2 border-brand-navy text-brand-navy font-bold py-3 px-8 rounded-lg hover:bg-brand-navy hover:text-white transition-all"
            >
              Entrar a la Vitrina
            </button>
          </div>
        </div>
      </div>

      {/* Organizer CTA */}
      <div className="bg-brand-navy py-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-red/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">¿Organizas un evento?</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Publica tu evento en Pregonar y llega a miles de personas apasionadas. Gestiona inscripciones y pagos en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                if (user?.role === 'ORGANIZER') {
                  setView('create-event');
                } else {
                  setView('auth');
                }
              }}
              className="bg-brand-red hover:bg-red-600 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg shadow-brand-red/25 transition-all hover:scale-105"
            >
              Crear Evento Gratis
            </button>
            <button
              onClick={() => setView('contact-sales')}
              className="bg-transparent border border-gray-600 text-white hover:border-white font-bold py-3.5 px-8 rounded-lg transition-colors"
            >
              Más información
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={setView} />

    </div>
  );
};

export default App;
