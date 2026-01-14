
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  MessageCircle, 
  Share2, 
  Heart, 
  Calendar as CalendarIcon,
  Award,
  Check,
  Activity,
  Menu,
  X,
  User
} from 'lucide-react';
import { UserProfile } from '../lib/auth';

// Reusing types if necessary or defining specific props
interface Instructor {
  id: string;
  name: string;
  title: string;
  category: string;
  rating: number;
  location: string;
  image: string;
  price: number;
  priceType: string;
}

interface InstructorProfileProps {
  instructor: Instructor;
  onBack: () => void;
  onNavigate: (view: 'landing' | 'events' | 'shopwindow' | 'community' | 'profile' | 'create-event' | 'auth' | 'contact-sales' | 'workshops' | 'about') => void;
  onBook: () => void; // New prop for booking trigger
  user?: UserProfile | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const InstructorProfilePage: React.FC<InstructorProfileProps> = ({ 
  instructor, 
  onBack, 
  onNavigate, 
  onBook,
  user,
  onLogin,
  onLogout
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [instructor.id]);

  const [activeTab, setActiveTab] = useState<'about' | 'classes' | 'gallery' | 'reviews'>('about');
  const [selectedDate, setSelectedDate] = useState<number>(3); // Mocking Oct 3 selected
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Datos simulados específicos para el perfil (Traducido)
  const profileData = {
    reviewsCount: 124,
    yearsExp: 10,
    about: `Soy un profesional certificado con más de una década de experiencia entrenando a alumnos de todos los niveles, desde principiantes que toman una raqueta por primera vez hasta aspirantes a profesionales que refinan su estrategia de torneo. Mi viaje comenzó en las canchas locales y me ha llevado a academias de todo el mundo antes de establecerme aquí.

    Mi filosofía de enseñanza se centra en construir una base técnica sólida mientras mantengo el juego divertido y atractivo. Me especializo en biomecánica y prevención de lesiones, asegurando que juegues tu mejor juego en los años venideros. Ya sea que quieras arreglar tu saque o dominar el juego mental, estoy aquí para guiarte.`,
    methodology: [
      'Análisis de video y feedback',
      'Enfoque en biomecánica',
      'Simulacros de situaciones de partido',
      'Acondicionamiento mental'
    ],
    classes: [
      {
        title: 'Clase Magistral 1 a 1',
        level: 'Intermedio',
        image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop',
        desc: 'Sesión intensiva enfocada en agarre, trayectoria del swing y juego de pies para potenciar tu técnica.',
        duration: '60 min',
        price: 80
      },
      {
        title: 'Clínica Grupal Junior',
        level: 'Principiante',
        image: 'https://images.unsplash.com/photo-1599474924187-334a405be2ce?q=80&w=1000&auto=format&fit=crop',
        desc: 'Sesión grupal divertida y social para niños de 8 a 12 años. Fundamentos y juegos.',
        duration: '90 min',
        price: 45
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1554068865-2415f90d23bb?q=80&w=1000',
      'https://images.unsplash.com/photo-1626224583764-847890e05851?q=80&w=1000',
      'https://images.unsplash.com/photo-1560012703-995593264acf?q=80&w=1000',
      'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1000'
    ],
    reviews: [
      {
        user: 'Sofía Martínez',
        date: 'Octubre 2023',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
        text: '¡El mejor entrenador que he tenido! Transformó completamente mi técnica en solo tres sesiones. Muy recomendado para cualquiera que quiera tomarse su progreso en serio.'
      },
      {
        user: 'Miguel Rosas',
        date: 'Septiembre 2023',
        rating: 4.5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
        text: 'Gran energía y muy profesional. Los ejercicios son desafiantes pero divertidos. Ojalá hubiera más horarios nocturnos disponibles.'
      }
    ]
  };

  const TABS = [
      { id: 'about', label: 'Sobre Mí' },
      { id: 'classes', label: 'Clases', badge: '2' },
      { id: 'gallery', label: 'Galería' },
      { id: 'reviews', label: 'Reseñas', badge: '124' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-navy">
      {/* Navbar (Full Version) */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
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
              <button onClick={() => onNavigate('landing')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Inicio</button>
              <button onClick={() => onNavigate('about')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Nosotros</button>
              <button onClick={() => onNavigate('events')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Eventos</button>
              <button onClick={() => onNavigate('workshops')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Talleres</button>
              {/* Active Link for Vitrina */}
              <button onClick={onBack} className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy">Vitrina</button>
              <button onClick={() => onNavigate('community')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Comunidad</button>
              <button onClick={() => onNavigate('contact-sales')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Contacto</button>
            </div>

            {/* Right Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                  <div className="flex items-center gap-3">
                      <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors">
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
                    <button onClick={() => onNavigate('landing')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Inicio</button>
                    <button onClick={() => onNavigate('about')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Nosotros</button>
                    <button onClick={() => onNavigate('events')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Eventos</button>
                    <button onClick={() => onNavigate('workshops')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Talleres</button>
                    <button onClick={onBack} className="text-left font-bold text-brand-navy py-2 border-b border-gray-50">Vitrina de Instructores</button>
                    <button onClick={() => onNavigate('community')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Comunidad</button>
                    <button onClick={() => onNavigate('contact-sales')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Contacto</button>
                    
                    <div className="pt-4 flex items-center justify-between">
                        {user ? (
                            <div className="flex items-center gap-3 w-full" onClick={() => onNavigate('profile')}>
                                <img src={user.photoURL || ''} className="w-10 h-10 rounded-full border border-gray-200" />
                                <div>
                                    <p className="font-bold text-brand-navy">{user.displayName}</p>
                                    <p className="text-xs text-gray-500">Ver Perfil</p>
                                </div>
                            </div>
                        ) : (
                            <button onClick={onLogin} className="w-full bg-brand-navy text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                                <User size={18} /> Iniciar Sesión
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}
      </nav>

      {/* Hero Banner */}
      <div className="pt-20">
          <div className="relative h-[300px] md:h-[400px] w-full bg-gray-900 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531315630201-bb15abeb1653?q=80&w=2000&auto=format&fit=crop" 
                alt="Tennis Court" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-20 md:-mt-24 pb-20">
          <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Left Column: Profile Info & Content */}
              <div className="lg:w-2/3">
                  {/* Profile Header Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 relative">
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                          {/* Avatar */}
                          <div className="relative -mt-16 sm:-mt-20 mx-auto sm:mx-0">
                              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
                                  <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white">
                                  <Award size={16} fill="currentColor" />
                              </div>
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1 text-center sm:text-left pt-2 sm:pt-0">
                              <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                                  <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-navy flex items-center gap-3">
                                      {instructor.name}
                                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[10px] uppercase font-extrabold px-3 py-1 rounded-full tracking-wide border border-green-200 shadow-sm">
                                          <ShieldCheck size={14} className="text-green-700" strokeWidth={2.5} />
                                          PRO VERIFICADO
                                      </span>
                                  </h1>
                                  <div className="flex gap-2 mt-2 sm:mt-0">
                                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"><Heart size={20} /></button>
                                      <button className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-full transition"><Share2 size={20} /></button>
                                  </div>
                              </div>
                              <p className="text-gray-500 font-medium mb-3">{instructor.title}</p>
                              
                              {/* Prominent Desktop Button */}
                              <button 
                                onClick={onBook}
                                className="hidden sm:inline-flex bg-brand-red hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md shadow-brand-red/20 transition-all active:scale-95 mb-4 items-center gap-2"
                              >
                                Reservar Sesión
                              </button>

                              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-500 mb-4">
                                  <div className="flex items-center gap-1.5">
                                      <MapPin size={16} className="text-brand-red" />
                                      {instructor.location}
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                      <Award size={16} className="text-brand-red" />
                                      {profileData.yearsExp} Años Exp.
                                  </div>
                                  <div className="flex items-center gap-1.5 font-bold text-brand-navy">
                                      <Star size={16} className="text-yellow-400" fill="currentColor" />
                                      {instructor.rating} <span className="font-normal text-gray-400">({profileData.reviewsCount} Reseñas)</span>
                                  </div>
                              </div>

                              {/* Prominent CTA in Profile Header for Mobile */}
                              <button 
                                onClick={onBook}
                                className="sm:hidden w-full bg-brand-red text-white font-bold py-2.5 rounded-lg shadow-md mb-2"
                              >
                                Reservar Sesión
                              </button>
                          </div>
                      </div>

                      {/* Internal Menu Bar */}
                      <div className="bg-white rounded-xl shadow-sm border-t border-gray-100 flex items-center gap-8 overflow-x-auto no-scrollbar mt-8 pt-2">
                          {TABS.map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${activeTab === tab.id ? 'text-brand-navy border-brand-red' : 'text-gray-400 border-transparent hover:text-brand-navy'}`}
                              >
                                  {tab.label}
                                  {tab.badge && (
                                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px]">
                                          {tab.badge}
                                      </span>
                                  )}
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Content Sections */}
                  <div className="space-y-8">
                      {/* About Me */}
                      {activeTab === 'about' && (
                        <div id="about" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-xl font-display font-bold text-brand-navy mb-4">Sobre Mí</h2>
                            <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                                {profileData.about}
                            </p>
                            
                            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-1.5 bg-red-100 rounded-full text-brand-red">
                                        <Award size={18} />
                                    </div>
                                    <h3 className="font-bold text-brand-navy">Mi Metodología</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {profileData.methodology.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-red"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                      )}

                      {/* Classes */}
                      {activeTab === 'classes' && (
                        <div id="classes" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex justify-between items-end mb-4">
                                    <h2 className="text-xl font-display font-bold text-brand-navy">Clases Disponibles</h2>
                                    <button className="text-brand-red text-sm font-medium hover:underline">Ver Horarios</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {profileData.classes.map((cls, idx) => (
                                    <div key={idx} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="h-40 relative">
                                            <img src={cls.image} className="w-full h-full object-cover" alt={cls.title} />
                                            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded-md">
                                                {cls.level}
                                            </span>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-brand-navy mb-2">{cls.title}</h3>
                                            <p className="text-xs text-gray-500 mb-4 line-clamp-2">{cls.desc}</p>
                                            <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Clock size={14} /> {cls.duration}
                                                    </div>
                                                    <span className="font-bold text-brand-navy text-lg">${cls.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                      )}

                      {/* Gallery */}
                      {activeTab === 'gallery' && (
                        <div id="gallery" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-xl font-display font-bold text-brand-navy mb-4">Galería</h2>
                            <div className="grid grid-cols-2 gap-4 rounded-xl overflow-hidden">
                                <div className="col-span-1 h-64">
                                    <img src={profileData.gallery[0]} className="w-full h-full object-cover rounded-xl" alt="Gallery 1" />
                                </div>
                                <div className="col-span-1 grid grid-cols-2 gap-4 h-64">
                                        <img src={profileData.gallery[1]} className="w-full h-full object-cover rounded-xl" alt="Gallery 2" />
                                        <img src={profileData.gallery[2]} className="w-full h-full object-cover rounded-xl" alt="Gallery 3" />
                                        <img src={profileData.gallery[3]} className="w-full h-full object-cover col-span-2 rounded-xl" alt="Gallery 4" />
                                </div>
                            </div>
                        </div>
                      )}

                      {/* Reviews */}
                      {activeTab === 'reviews' && (
                        <div id="reviews" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-display font-bold text-brand-navy">Reseñas</h2>
                                <button className="text-brand-red text-sm font-medium hover:underline">Escribir Reseña</button>
                            </div>
                            <div className="space-y-6">
                                {profileData.reviews.map((review, idx) => (
                                    <div key={idx} className="border-b border-gray-100 pb-6 last:border-0">
                                        <div className="flex items-center gap-3 mb-3">
                                            <img src={review.avatar} className="w-10 h-10 rounded-full object-cover" alt={review.user} />
                                            <div>
                                                <h4 className="font-bold text-sm text-brand-navy">{review.user}</h4>
                                                <p className="text-xs text-gray-400">{review.date}</p>
                                            </div>
                                            <div className="ml-auto flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className={i < Math.floor(review.rating) ? "text-brand-red" : "text-gray-200"} fill="currentColor" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 italic">"{review.text}"</p>
                                    </div>
                                ))}
                                <button className="w-full text-center text-sm text-gray-400 hover:text-brand-navy py-2">
                                    Ver las {profileData.reviewsCount} reseñas
                                </button>
                            </div>
                        </div>
                      )}
                  </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="lg:w-1/3">
                  <div className="sticky top-24 space-y-4">
                      
                      {/* Booking Card */}
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                          <h3 className="font-display font-bold text-xl text-brand-navy mb-6">Reservar una Sesión</h3>
                          
                          {/* Calendar Strip */}
                          <div className="flex justify-between items-center mb-4">
                              <h4 className="font-bold text-sm">Octubre 2023</h4>
                              <div className="flex gap-1">
                                  <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={16} /></button>
                                  <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={16} /></button>
                              </div>
                          </div>
                          <div className="flex justify-between mb-6">
                              {[
                                  { day: 'Do', date: 29 }, 
                                  { day: 'Lu', date: 30 }, 
                                  { day: 'Ma', date: 1, active: false }, 
                                  { day: 'Mi', date: 2, active: false }, 
                                  { day: 'Ju', date: 3, active: true }, 
                                  { day: 'Vi', date: 4, active: false }, 
                                  { day: 'Sá', date: 5, active: false }
                              ].map((item, idx) => (
                                  <div key={idx} className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition ${item.active ? 'bg-brand-red text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
                                      <span className="text-[10px] uppercase font-medium mb-1">{item.day}</span>
                                      <span className="font-bold text-sm">{item.date}</span>
                                  </div>
                              ))}
                          </div>

                          {/* Time Slots */}
                          <p className="text-xs text-gray-400 font-bold uppercase mb-3">Horarios Disponibles (Oct 3)</p>
                          <div className="grid grid-cols-2 gap-2 mb-6">
                               {['09:00 AM', '11:00 AM', '02:30 PM', '04:00 PM'].map((time, idx) => (
                                   <button 
                                      key={idx} 
                                      className={`py-2 px-4 rounded-lg text-xs font-bold border transition ${idx === 0 ? 'border-brand-red text-brand-red bg-red-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                    >
                                       {time}
                                   </button>
                               ))}
                          </div>

                          <div className="flex justify-between items-center mb-6">
                              <div>
                                  <p className="text-sm text-gray-500">Precio Total</p>
                                  <p className="text-xs text-gray-400">Por 1 persona, 60 min</p>
                              </div>
                              <span className="text-3xl font-display font-bold text-brand-navy">$80</span>
                          </div>

                          <button 
                            onClick={onBook}
                            className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-red/20 transition-all active:scale-95 mb-3"
                          >
                              Solicitar Reserva
                          </button>
                          <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-brand-navy font-bold py-3.5 rounded-xl transition-all">
                              Mensaje al Instructor
                          </button>

                          <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400">
                              <ShieldCheck size={12} /> Pagos seguros por Pregonar
                          </div>
                      </div>

                      {/* Guarantee Box */}
                      <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex gap-3">
                          <div className="shrink-0 bg-white p-2 rounded-full shadow-sm text-teal-600 h-fit">
                              <Award size={20} />
                          </div>
                          <div>
                              <h4 className="font-bold text-sm text-teal-900 mb-1">Garantía de Satisfacción</h4>
                              <p className="text-xs text-teal-700 leading-relaxed">
                                  Si la primera clase no es lo que esperabas, Pregonar te ofrece una nueva reserva gratuita con otro profesional.
                              </p>
                          </div>
                      </div>

                  </div>
              </div>

          </div>
      </div>
      
    </div>
  );
};
