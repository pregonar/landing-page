
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Users, 
  MessageSquare, 
  Calendar, 
  Image as ImageIcon, 
  Video, 
  BarChart2, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Plus, 
  ArrowRight, 
  UserPlus, 
  Bell, 
  Grid, 
  List, 
  User, 
  Clock, 
  Utensils, 
  ChevronDown, 
  Activity, 
  Globe, 
  Star, 
  X, 
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { UserProfile } from '../lib/auth';
import { Footer } from '../components/Footer';

// --- TYPES ---

interface Group {
  id: string;
  name: string;
  category: 'Deportes' | 'Cultura' | 'Arte' | 'Aire Libre';
  image: string;
  coverImage?: string;
  description: string;
  members: number;
  location: string;
  active: boolean;
  isPrivate?: boolean;
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  time: string;
  content: string;
  title?: string;
  likes: number;
  comments: number;
  image?: string;
  images?: string[];
  type: 'text' | 'image' | 'announcement';
}

interface CommunityEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
}

// --- MOCK DATA (Translated) ---

const GROUPS: Group[] = [
  {
    id: '1',
    name: 'Club de Corredores Urbanos',
    category: 'Deportes',
    image: 'https://images.unsplash.com/photo-1552674605-46d530064509?q=80&w=1000',
    description: 'Entrenamiento para maratones y trotes casuales de fin de semana.',
    members: 1200,
    location: 'Buenos Aires, AR',
    active: true
  },
  {
    id: '2',
    name: 'Gremio de Jazz del Domingo',
    category: 'Cultura',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000',
    description: 'Sesiones semanales de improvisación para músicos y entusiastas. ¡Trae tu instrumento!',
    members: 85,
    location: 'Córdoba, AR',
    active: true
  },
  {
    id: '3',
    name: 'Lectores de Clásicos Modernos',
    category: 'Cultura',
    image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=1000',
    description: 'Discutiendo literatura del siglo XX con café y pastelería. Reuniones mensuales.',
    members: 85,
    location: 'Online',
    active: true
  },
  {
    id: '4',
    name: 'Colectivo Arcilla y Horno',
    category: 'Arte',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000',
    description: 'Un espacio para ceramistas para compartir técnicas, recetas de esmaltes y tiempo de estudio.',
    members: 248,
    location: 'Rosario, AR',
    active: true
  },
  {
    id: '5',
    name: 'Senderistas de Fin de Semana',
    category: 'Aire Libre',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000',
    description: 'Explorando los mejores senderos de las sierras. ¡Se aceptan perros!',
    members: 3100,
    location: 'Mendoza, AR',
    active: true
  },
  {
    id: '6',
    name: 'Fotografía Urbana',
    category: 'Arte',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000',
    description: 'Caminatas de fotografía callejera y sesiones de crítica constructiva.',
    members: 120,
    location: 'La Plata, AR',
    active: true
  },
  {
    id: '7',
    name: 'Yoga en el Parque',
    category: 'Deportes',
    image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1000',
    description: 'Encuentros matutinos para practicar vinyasa flow al aire libre.',
    members: 450,
    location: 'Palermo, BA',
    active: true
  },
  {
    id: '8',
    name: 'Cinéfilos Independientes',
    category: 'Cultura',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000',
    description: 'Proyecciones y debates sobre cine de autor y festivales internacionales.',
    members: 320,
    location: 'San Telmo, BA',
    active: true
  }
];

const MARATHON_GROUP_DATA: Group = {
    id: '101',
    name: 'Grupo de Entrenamiento Maratón',
    category: 'Deportes',
    image: 'https://images.unsplash.com/photo-1552674605-46d530064509?q=80&w=1000',
    coverImage: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2000',
    description: 'Una comunidad para corredores de todos los niveles que entrenan para maratones. Comparte tu progreso, pide consejos y organiza carreras largas juntos.',
    members: 4200,
    location: 'Nacional',
    active: true
};

const POSTS: Post[] = [
    {
        id: 'p1',
        author: { name: 'Marcos Chen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200', role: 'ENTRENADOR' },
        time: 'hace 2 horas',
        title: '¿Estrategia de hidratación para 30k?',
        content: "¡Hola a todos! Estoy planeando mi primera carrera de 30k este fin de semana. ¿Con qué frecuencia debería tomar descansos para hidratarme? Además, geles vs gomitas: ¿cuál es su preferencia para largas distancias?",
        likes: 24,
        comments: 12,
        type: 'text'
    },
    {
        id: 'p2',
        author: { name: 'Sara Jiménez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200' },
        time: 'hace 5 horas',
        content: "¡Increíble carrera al amanecer con el grupo esta mañana! 🏃‍♀️🌅 ¡Excelente ritmo todos!",
        images: [
            'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000',
            'https://images.unsplash.com/photo-1533561052604-c3eb9a1652f4?q=80&w=1000'
        ],
        likes: 86,
        comments: 5,
        type: 'image'
    },
    {
        id: 'p3',
        author: { name: 'David C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200', role: 'Corredor' },
        time: 'hace 45 min',
        content: "¡Acabo de superar mi mejor marca personal en 5k por 30 segundos! 🏃‍♂️ Gracias al @RunnersClub por los consejos de entrenamiento por intervalos la semana pasada.",
        image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1000',
        likes: 104,
        comments: 12,
        type: 'image'
    }
];

const UPCOMING_EVENTS: CommunityEvent[] = [
    { id: 'e1', day: '24', month: 'OCT', title: 'Carrera Matutina 10k', time: '7:00 AM', location: 'Parque Central' },
    { id: 'e2', day: '26', month: 'OCT', title: 'Cena de Carbohidratos', time: '6:30 PM', location: "Pasta de Luigi" }
];

const ITEMS_PER_PAGE = 6;

// --- COMPONENTES ---

interface CommunityPageProps {
  onNavigate: (view: any) => void;
  user?: UserProfile | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate, user, onLogin }) => {
  const [currentView, setCurrentView] = useState<'discover' | 'group'>('discover');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Group Details Tab State
  const [activeTab, setActiveTab] = useState('Discusión');

  // Filters & Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleGroupClick = (group: Group) => {
      // For demo, if they click "Urban Runners Club" or any Sports, we show the Marathon Mock
      if (group.name === 'Club de Corredores Urbanos') {
          setSelectedGroup(MARATHON_GROUP_DATA);
      } else {
          setSelectedGroup(group);
      }
      setCurrentView('group');
      setActiveTab('Discusión'); // Reset tab on new group
  };

  const handleBack = () => {
      setCurrentView('discover');
      setSelectedGroup(null);
  };

  const handleOpenPostModal = () => {
      setIsPostModalOpen(true);
  };

  const handleNavClick = (view: any) => {
      onNavigate(view);
      setIsMobileMenuOpen(false);
  };

  // Filter Logic
  const filteredGroups = useMemo(() => {
      return GROUPS.filter(group => {
          const matchSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              group.location.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchCategory = selectedCategory === 'Todas' || group.category === selectedCategory;

          return matchSearch && matchCategory;
      });
  }, [searchTerm, selectedCategory]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredGroups.length / ITEMS_PER_PAGE);
  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reusable Navbar Logic
  const Navbar = () => (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('landing')}>
              <img src="./logo.png" alt="Pregonar Logo" className="h-10 w-10 mr-2 rounded-full object-cover" />
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
              <button onClick={() => handleNavClick('landing')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Inicio</button>
              <button onClick={() => handleNavClick('about')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Nosotros</button>
              <button onClick={() => handleNavClick('events')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Eventos</button>
              <button onClick={() => handleNavClick('workshops')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Talleres</button>
              <button onClick={() => handleNavClick('shopwindow')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Vitrina</button>
              <button className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy">Comunidad</button>
              <button onClick={() => handleNavClick('contact-sales')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Contacto</button>
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
                              {user.role === 'SUPER_ADMIN' ? 'Panel Admin' : 
                               user.role === 'ORGANIZER' ? 'Organizador' : 
                               user.role === 'INSTRUCTOR' ? 'Mis Clases' :
                               user.role === 'PREGONERO_ADMIN' ? 'Staff CRM' :
                               'Admin Tribu'}
                          </button>
                      )}

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
            <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 top-20 z-40 animate-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col p-4 space-y-4">
                    <button onClick={() => handleNavClick('landing')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Inicio</button>
                    <button onClick={() => handleNavClick('about')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Nosotros</button>
                    <button onClick={() => handleNavClick('events')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Eventos</button>
                    <button onClick={() => handleNavClick('workshops')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Talleres</button>
                    <button onClick={() => handleNavClick('shopwindow')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Vitrina de Instructores</button>
                    <button className="text-left font-bold text-brand-navy py-2 border-b border-gray-50">Comunidad</button>
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
                                        Ir al Panel
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
  );

  // --- VISTA 1: DISCOVER (Find Your Tribe) ---
  if (currentView === 'discover') {
      return (
          <div className="min-h-screen bg-[#FFFBF9] font-sans text-brand-navy flex flex-col">
              <Navbar />
              
              {/* Header */}
              <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 w-full">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                      <div>
                          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-navy mb-4">
                              Encuentra tu <span className="text-brand-red border-b-4 border-brand-red/30">Tribu</span>
                          </h1>
                          <p className="text-gray-500 max-w-2xl text-lg">
                              Conecta con clubes, gremios y grupos de interés que comparten tu pasión por el deporte, el arte y la cultura.
                          </p>
                      </div>
                      <div className="flex gap-8 md:gap-12 text-center">
                          <div>
                              <span className="block text-3xl font-bold text-brand-navy">2.4k+</span>
                              <span className="text-sm text-gray-500">Grupos Activos</span>
                          </div>
                          <div>
                              <span className="block text-3xl font-bold text-brand-navy">142</span>
                              <span className="text-sm text-gray-500">Ciudades</span>
                          </div>
                      </div>
                  </div>

                  {/* Filter Bar */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                      <div className="relative w-full md:max-w-md">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input 
                            type="text" 
                            placeholder="Buscar amigos, clases de yoga o clubes..." 
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-brand-navy shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                      </div>
                      
                      {/* Filter Pills */}
                      <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
                          {['Todas', 'Deportes', 'Cultura', 'Arte', 'Aire Libre'].map(cat => (
                              <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-brand-navy text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                              >
                                  {cat}
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                      {paginatedGroups.map((group) => (
                          <div 
                            key={group.id} 
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                            onClick={() => handleGroupClick(group)}
                          >
                              <div className="relative h-64 overflow-hidden">
                                  <img src={group.image} alt={group.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-brand-navy">
                                      {group.category}
                                  </div>
                                  <div className="absolute bottom-4 left-4 text-white flex items-center gap-1 text-sm font-medium drop-shadow-md">
                                      <MapPin size={14} /> {group.location}
                                  </div>
                                  {/* Custom Button Position based on design */}
                                  <div className="absolute bottom-4 right-4">
                                       <button className="bg-brand-red text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg">
                                           <ArrowRight size={20} />
                                       </button>
                                  </div>
                              </div>
                              <div className="p-6">
                                  <h3 className="text-xl font-bold text-brand-navy mb-2 truncate">{group.name}</h3>
                                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">{group.description}</p>
                                  
                                  <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                                          <Users size={16} />
                                          {group.members >= 1000 ? (group.members / 1000).toFixed(1) + 'k' : group.members} Miembros
                                      </div>
                                      
                                      {group.name === 'Club de Corredores Urbanos' ? (
                                          <button className="bg-brand-red text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-red-600 transition">
                                              Unirse
                                          </button>
                                      ) : (
                                          <span className="text-brand-red font-bold text-sm cursor-pointer hover:underline">Ver Grupo</span>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>

                  {/* Pagination Controls */}
                  {filteredGroups.length > ITEMS_PER_PAGE && (
                      <div className="flex justify-center items-center gap-2 mb-12">
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
                                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentPage === page ? 'bg-brand-navy text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
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

                  {filteredGroups.length === 0 && (
                      <div className="text-center py-20">
                          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                              <Search size={32} />
                          </div>
                          <h3 className="text-lg font-bold text-brand-navy">No se encontraron grupos</h3>
                          <p className="text-gray-500">Intenta ajustar tu búsqueda o filtros.</p>
                      </div>
                  )}
                  
                  <p className="text-center text-xs text-gray-400">Mostrando {paginatedGroups.length} de {filteredGroups.length} comunidades</p>
              </div>

              {/* Footer */}
              <Footer onNavigate={onNavigate} />
          </div>
      );
  }

  // --- VISTA 2: GROUP DETAIL (Marathon Example) ---
  const group = selectedGroup || MARATHON_GROUP_DATA; // Fallback

  return (
      <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-navy flex flex-col">
          <Navbar />
          
          <div className="pt-24 pb-8 flex-grow">
            {/* Breadcrumb / Back */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500 flex items-center gap-2">
                <span className="cursor-pointer hover:text-brand-navy" onClick={handleBack}>Inicio</span> <span className="text-xs">›</span> 
                <span className="cursor-pointer hover:text-brand-navy" onClick={handleBack}>Grupos</span> <span className="text-xs">›</span> 
                <span className="font-bold text-brand-navy">{group.name}</span>
            </div>

            {/* ... Rest of Group Detail Content (unchanged except footer at bottom) ... */}
            {/* Hero Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-sm">
                    <img src={group.coverImage || group.image} alt={group.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-white rounded-2xl p-2 shadow-lg -mb-12 md:mb-0 relative z-10 shrink-0 flex items-center justify-center">
                                {/* Simple Logo Placeholder based on Group Name */}
                                {group.category === 'Deportes' ? <img src="https://cdn-icons-png.flaticon.com/512/2554/2554282.png" className="w-16 opacity-80" /> : 
                                <span className="text-3xl font-bold text-brand-navy">{group.name.charAt(0)}</span>}
                            </div>
                            <div className="text-white mb-2 md:mb-0">
                                <h1 className="text-3xl md:text-4xl font-display font-bold">{group.name}</h1>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 mb-2 md:mb-0">
                            <button className="bg-white text-brand-navy px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-100 transition flex items-center gap-2">
                                <Share2 size={16} /> Invitar
                            </button>
                            <button className="bg-brand-red text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-red-600 transition flex items-center gap-2 shadow-lg shadow-brand-red/20">
                                <Plus size={16} /> Unirse al Grupo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs (MENU INTERNO IMPLEMENTADO) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="bg-white rounded-xl shadow-sm px-6 border-b border-gray-100 flex items-center gap-8 overflow-x-auto no-scrollbar">
                    {[
                        { id: 'Discusión', label: 'Discusión' },
                        { id: 'Multimedia', label: 'Multimedia', badge: '128', badgeColor: 'bg-gray-100 text-gray-600' },
                        { id: 'Eventos', label: 'Eventos', badge: '3 Nuevos', badgeColor: 'bg-red-50 text-brand-red' },
                        { id: 'Miembros', label: 'Miembros' },
                        { id: 'Info', label: 'Info' }
                    ].map((tab) => (
                        <button 
                            key={tab.id} 
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                                activeTab === tab.id 
                                ? 'border-brand-navy text-brand-navy' 
                                : 'border-transparent text-gray-500 hover:text-brand-navy'
                            }`}
                        >
                            {tab.label}
                            {tab.badge && (
                                <span className={`px-2 py-0.5 rounded text-[10px] ${tab.badgeColor}`}>
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {activeTab === 'Discusión' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        
                        {/* Left Sidebar (About) */}
                        <div className="hidden lg:block space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-brand-navy mb-4">Información</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                    {group.description}
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Globe size={18} className="text-gray-400" />
                                        <div>
                                            <span className="font-bold text-brand-navy block">Grupo Público</span>
                                            <span className="text-xs">Cualquiera puede ver quién está en el grupo y lo que publican.</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Clock size={18} className="text-gray-400" />
                                        <div>
                                            <span className="font-bold text-brand-navy block">Creado Oct 2021</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <User size={18} className="text-gray-400" />
                                        <div>
                                            <span className="font-bold text-brand-navy block">3 Admins</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">ETIQUETAS</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['#running', '#maraton', '#entrenamiento', '#salud'].map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 cursor-pointer">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Center Feed */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Post Input */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex gap-4">
                                    <img src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"} alt="User" className="w-10 h-10 rounded-full" />
                                    <div className="flex-1">
                                        <input 
                                            type="text" 
                                            placeholder={`¿Qué estás pensando, ${user?.displayName?.split(' ')[0] || 'Alex'}?`} 
                                            className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-gray-100 transition-colors mb-3 cursor-pointer hover:bg-gray-100"
                                            onClick={handleOpenPostModal}
                                            readOnly
                                        />
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-brand-navy transition"><ImageIcon size={18} /></button>
                                                <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-brand-navy transition"><Video size={18} /></button>
                                                <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-brand-navy transition"><BarChart2 size={18} /></button>
                                            </div>
                                            <button 
                                                onClick={handleOpenPostModal}
                                                className="bg-brand-navy text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#0f112e] transition"
                                            >
                                                Publicar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pinned/Notice */}
                            <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 flex gap-4 items-center">
                                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                    <MegaphoneIcon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-brand-navy text-sm">¡Nueva Ruta para el Domingo!</h4>
                                    <p className="text-xs text-gray-600">Debido a obras en la calle Principal, nos reuniremos en la entrada Norte del Parque este domingo. Misma hora (7:00 AM).</p>
                                </div>
                            </div>

                            {/* Posts Feed */}
                            {POSTS.map(post => (
                                <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-brand-navy text-sm">{post.author.name}</h4>
                                                    {post.author.role && (
                                                        <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">{post.author.role}</span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                                    {post.time} • Discusión
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-brand-navy"><MoreHorizontal size={18} /></button>
                                    </div>

                                    {post.title && <h3 className="font-bold text-lg text-brand-navy mb-2">{post.title}</h3>}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {post.content}
                                    </p>

                                    {post.image && (
                                        <div className="rounded-xl overflow-hidden mb-4">
                                            <img src={post.image} alt="Post content" className="w-full h-auto" />
                                        </div>
                                    )}

                                    {post.images && (
                                        <div className="grid grid-cols-2 gap-2 mb-4 rounded-xl overflow-hidden">
                                            {post.images.map((img, i) => (
                                                <img key={i} src={img} alt="Post content" className="w-full h-48 object-cover" />
                                            ))}
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold text-xl">+2</div>
                                                <img src="https://images.unsplash.com/photo-1599474924187-334a405be2ce?q=80&w=600" className="w-full h-48 object-cover opacity-90" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex gap-6">
                                            <button className="flex items-center gap-2 text-gray-500 hover:text-brand-red transition text-sm font-medium">
                                                <Heart size={18} /> {post.likes} Me gusta
                                            </button>
                                            <button className="flex items-center gap-2 text-gray-500 hover:text-brand-navy transition text-sm font-medium">
                                                <MessageSquare size={18} /> {post.comments} Comentarios
                                            </button>
                                        </div>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-brand-navy transition text-sm font-medium">
                                            <Share2 size={18} /> Compartir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Sidebar (Widgets) */}
                        <div className="space-y-6">
                            
                            {/* Upcoming Events */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-brand-navy">Próximos Eventos</h3>
                                    <button className="text-xs text-brand-red hover:underline">Ver Todo</button>
                                </div>
                                <div className="space-y-4">
                                    {UPCOMING_EVENTS.map(evt => (
                                        <div key={evt.id} className="flex gap-4">
                                            <div className="bg-gray-100 rounded-xl p-2 text-center min-w-[50px] flex flex-col justify-center">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">{evt.month}</span>
                                                <span className="text-lg font-bold text-brand-navy leading-none">{evt.day}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-brand-navy text-sm">{evt.title}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                                    <Clock size={12} /> {evt.time}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                                    <MapPin size={12} /> {evt.location}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 border border-dashed border-gray-300 rounded-xl py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition flex items-center justify-center gap-2">
                                    <Plus size={16} /> Sugerir Evento
                                </button>
                            </div>

                            {/* ... Other Widgets ... */}
                            {/* Top Contributors */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-brand-navy">Colaboradores Top</h3>
                                    <button className="text-xs text-brand-red hover:underline">Ver Todo</button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100" className="w-10 h-10 rounded-full" />
                                                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white rounded-full p-0.5 border border-white"><Star size={8} fill="currentColor" /></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-brand-navy text-sm">James K.</h4>
                                                <p className="text-xs text-gray-400">245 aportes</p>
                                            </div>
                                        </div>
                                        <div className="text-gray-300"><Trophy size={16} /></div>
                                    </div>
                                </div>
                            </div>

                            {/* ... */}
                        </div>
                    </div>
                ) : (
                    <div className="py-20 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                        <p>Contenido de {activeTab} próximamente.</p>
                    </div>
                )}
            </div>
          </div>

          {/* Create Post Modal */}
          {isPostModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                {/* ... (Post Modal content unchanged) ... */}
                <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                    <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                        <h3 className="font-display font-bold text-lg text-brand-navy">Crear Publicación</h3>
                        <button onClick={() => setIsPostModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    {/* ... */}
                </div>
            </div>
          )}

          {/* Footer */}
          <Footer onNavigate={onNavigate} />
      </div>
  );
};

// ... (Icons) ...
const Trophy = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);
const Dumbbell = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>
);
const Zap = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const MegaphoneIcon = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
);
