
import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  Filter,
  Star,
  Heart,
  User,
  ChevronDown,
  LayoutGrid,
  List,
  ArrowRight,
  Menu,
  X,
  SlidersHorizontal,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { UserProfile } from '../lib/auth';
import { InstructorProfilePage } from '../components/InstructorProfile';
import { BookingProcess } from '../components/BookingProcess';
import { Footer } from '../components/Footer';

interface Instructor {
  id: string;
  name: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  mode: string;
  location: string;
  price: number;
  priceType: string;
  image: string;
}

const INSTRUCTORS_DATA: Instructor[] = [
  {
    id: '1',
    name: 'Elena Rossi',
    title: 'Professional Tennis Coach',
    category: 'Deportes',
    rating: 4.9,
    reviews: 124,
    description: 'Certified tennis professional with over a decade of experience coaching players of all levels. Focus on biomechanics and mental game.',
    mode: 'Presencial',
    location: 'Barcelona, ES',
    price: 80,
    priceType: '/ hora',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    title: 'Yoga & Meditation Guide',
    category: 'Bienestar',
    rating: 5.0,
    reviews: 89,
    description: 'Guiding students through Vinyasa flows and mindfulness practices. Helping you find balance in the chaos of modern life.',
    mode: 'Híbrido',
    location: 'San Francisco, CA',
    price: 120,
    priceType: '/ sesión',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600'
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    title: 'Ceramics Artist',
    category: 'Arte',
    rating: 4.8,
    reviews: 45,
    description: 'Pottery wheel throwing and hand-building workshops. Create functional art with your own hands.',
    mode: 'Studio',
    location: 'London, UK',
    price: 65,
    priceType: '/ taller',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600'
  },
  {
    id: '4',
    name: 'David Miller',
    title: 'Guitar Instructor',
    category: 'Música',
    rating: 4.7,
    reviews: 32,
    description: 'Learn to play acoustic or electric guitar from scratch. Theory, technique, and songwriting.',
    mode: 'Online',
    location: 'Nashville, TN',
    price: 50,
    priceType: '/ hora',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600'
  },
  {
    id: '5',
    name: 'Sofia Rodriguez',
    title: 'Salsa & Bachata Teacher',
    category: 'Danza',
    rating: 4.9,
    reviews: 210,
    description: 'Passionate dancer teaching Latin rhythms. Whether you are beginner or advanced, lets move together.',
    mode: 'Presencial',
    location: 'Miami, FL',
    price: 45,
    priceType: '/ clase',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600'
  },
  {
    id: '6',
    name: 'James Wilson',
    title: 'Personal Trainer',
    category: 'Deportes',
    rating: 4.8,
    reviews: 76,
    description: 'High intensity interval training and strength conditioning. Achieve your fitness goals faster.',
    mode: 'Presencial',
    location: 'Sydney, AU',
    price: 90,
    priceType: '/ sesión',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=600'
  },
  // Adding more mock data to demonstrate pagination
  {
    id: '7',
    name: 'Emily Zhang',
    title: 'Piano Virtuoso',
    category: 'Música',
    rating: 5.0,
    reviews: 42,
    description: 'Classical piano training for dedicated students. Prepare for exams or simply enjoy the beauty of music.',
    mode: 'Presencial',
    location: 'Toronto, CA',
    price: 75,
    priceType: '/ hora',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600'
  },
  {
    id: '8',
    name: 'Lucas Silva',
    title: 'Surfing Instructor',
    category: 'Deportes',
    rating: 4.9,
    reviews: 156,
    description: 'Catch your first wave or improve your style. Safety first, fun always on the beautiful beaches of Rio.',
    mode: 'Presencial',
    location: 'Rio de Janeiro, BR',
    price: 55,
    priceType: '/ clase',
    image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=600'
  },
  {
    id: '9',
    name: 'Anna Kowalski',
    title: 'Oil Painting Master',
    category: 'Arte',
    rating: 4.7,
    reviews: 28,
    description: 'Explore the depth and texture of oil paints. Learn classical techniques in a modern studio environment.',
    mode: 'Studio',
    location: 'Warsaw, PL',
    price: 70,
    priceType: '/ sesión',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600'
  },
  {
    id: '10',
    name: 'Hiroshi Tanaka',
    title: 'Calligraphy Expert',
    category: 'Cultura',
    rating: 5.0,
    reviews: 67,
    description: 'The art of Shodo. Find peace and discipline through the brush. Courses for all levels.',
    mode: 'Online',
    location: 'Kyoto, JP',
    price: 40,
    priceType: '/ hora',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600'
  }
];

const ITEMS_PER_PAGE = 9;

interface ShopWindowPageProps {
  onNavigate: (view: any) => void;
  user?: UserProfile | null;
  onLogin?: () => void;
  onLogout?: () => void;
  initialInstructorId?: string | null;
  onClearInitialInstructor?: () => void;
}

export const ShopWindowPage: React.FC<ShopWindowPageProps> = ({
  onNavigate,
  user,
  onLogin,
  onLogout,
  initialInstructorId,
  onClearInitialInstructor
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewState, setViewState] = useState<'list' | 'profile' | 'booking'>('list');
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Handle Initial Instructor (Deep Linking)
  useEffect(() => {
    if (initialInstructorId) {
      const found = INSTRUCTORS_DATA.find(i => i.id === initialInstructorId);
      if (found) {
        setSelectedInstructor(found);
        setViewState('profile');
      }
      if (onClearInitialInstructor) {
        onClearInitialInstructor();
      }
    }
  }, [initialInstructorId, onClearInitialInstructor]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const filteredInstructors = useMemo(() => {
    return INSTRUCTORS_DATA.filter(inst => {
      const matchSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'All' || inst.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE);
  const paginatedInstructors = filteredInstructors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleInstructorClick = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setViewState('profile');
    window.scrollTo(0, 0);
  };

  const handleBookClick = () => {
    setViewState('booking');
    window.scrollTo(0, 0);
  };

  const handleBackToProfile = () => {
    setViewState('profile');
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setViewState('list');
    setSelectedInstructor(null);
    window.scrollTo(0, 0);
  };

  const handleNavClick = (view: any) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  // Render Sub-Views
  if (viewState === 'profile' && selectedInstructor) {
    return (
      <InstructorProfilePage
        instructor={selectedInstructor}
        onBack={handleBackToList}
        onNavigate={onNavigate}
        onBook={handleBookClick}
        user={user}
        onLogin={onLogin}
        onLogout={onLogout}
      />
    );
  }

  if (viewState === 'booking' && selectedInstructor) {
    return (
      <BookingProcess
        instructor={selectedInstructor}
        onBack={handleBackToProfile}
        onNavigate={onNavigate}
        user={user}
        onLogin={onLogin}
      />
    );
  }

  // Render Main List
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
                className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy"
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
              <button onClick={() => handleNavClick('events')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Eventos</button>
              <button onClick={() => handleNavClick('workshops')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Talleres</button>
              <button className="text-left font-bold text-brand-navy py-2 border-b border-gray-50">Vitrina de Instructores</button>
              <button onClick={() => handleNavClick('community')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Comunidad</button>
              <button onClick={() => handleNavClick('contact-sales')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Contacto</button>

              <div className="pt-4 flex items-center justify-between">
                {user ? (
                  <div className="flex items-center gap-3 w-full" onClick={() => handleNavClick('profile')}>
                    <img src={user.photoURL || ''} className="w-10 h-10 rounded-full border border-gray-200" />
                    <div>
                      <p className="font-bold text-brand-navy">{user.displayName}</p>
                      <p className="text-xs text-gray-500">Ver Perfil</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 flex-grow w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-navy mb-2">Vitrina de Instructores</h1>
            <p className="text-gray-500">Encuentra al mentor perfecto para tu próxima pasión.</p>
          </div>
          <div className="w-full md:w-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre, especialidad..."
              className="w-full md:w-80 pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto pb-4 gap-3 mb-8 no-scrollbar">
          {['All', 'Deportes', 'Bienestar', 'Arte', 'Música', 'Danza', 'Cultura'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-brand-navy text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {cat === 'All' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedInstructors.map(instructor => (
            <div
              key={instructor.id}
              onClick={() => handleInstructorClick(instructor)}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-brand-navy text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {instructor.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button className="bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-brand-red transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg font-display font-bold text-brand-navy group-hover:text-brand-red transition-colors mb-1.5 truncate">
                    {instructor.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.floor(instructor.rating) ? "currentColor" : "none"}
                          className={i >= Math.floor(instructor.rating) ? "text-gray-200" : ""}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-brand-navy text-sm">{instructor.rating.toFixed(1)}</span>
                    <span className="text-xs text-gray-500 font-medium">({instructor.reviews} reseñas)</span>
                  </div>
                </div>

                <p className="text-brand-red text-xs font-bold mb-3 uppercase tracking-wide">
                  {instructor.title}
                </p>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {instructor.description}
                </p>

                <div className="mt-auto">
                  {/* Metadata Icons */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1">
                      <User size={14} className="text-gray-400" />
                      {instructor.mode}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-gray-400" />
                      {instructor.location}
                    </div>
                  </div>

                  {/* Footer Card */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                      <span className="text-lg font-bold text-brand-navy">
                        ${instructor.price.toLocaleString('es-CL')}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">
                        {instructor.priceType}
                      </span>
                    </div>
                    <button className="text-brand-red font-bold text-xs hover:underline">
                      Ver Clases
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredInstructors.length > ITEMS_PER_PAGE && (
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

        {filteredInstructors.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">No se encontraron instructores</h3>
            <p className="text-gray-500">Intenta ajustar tu búsqueda o filtros.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
