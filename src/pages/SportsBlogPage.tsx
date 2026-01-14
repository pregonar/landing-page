
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  AtSign, 
  User, 
  Menu, 
  X, 
  PlayCircle, 
  PlusCircle, 
  Mail, 
  Grid, 
  List, 
  Clock, 
  ArrowRightCircle
} from 'lucide-react';
import { UserProfile } from '../lib/auth';

// --- MOCK DATA ---

const LATEST_STORIES = [
  {
    id: 1,
    category: 'SOCCER',
    date: '15',
    month: 'NOV',
    readTime: '5 min read',
    title: 'The Championship Finals: A Night of Unforgettable Passion',
    excerpt: 'Experience the roar of the stadium as local legends clashed in a match that will be remembered for decades. We break down the key moments.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000'
  },
  {
    id: 2,
    category: 'SWIMMING',
    date: '18',
    month: 'NOV',
    readTime: '3 min read',
    title: 'Mastering the Butterfly Stroke: Tips from Pros',
    excerpt: 'Professional instructor Elena shares her secrets to perfecting your form and increasing endurance in open water swimming.',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1000'
  },
  {
    id: 3,
    category: 'TENNIS',
    date: '22',
    month: 'NOV',
    readTime: '6 min read',
    title: 'The Clay Court Season Begins: What to Watch',
    excerpt: 'As the tour moves to clay, endurance and strategy take center stage. Who are the favorites for this year’s regional open?',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000'
  },
  {
    id: 4,
    category: 'GALA',
    date: '05',
    month: 'DEC',
    readTime: '2 min read',
    title: 'Sports Awards 2023: Nominees Announced',
    excerpt: 'The annual gala celebrating athletic excellence is just around the corner. See who made the list for Athlete of the Year.',
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e3726?q=80&w=1000'
  }
];

const TRENDING_SPORTS = [
  { name: 'Marathon & Running', count: 24, icon: '🏃‍♂️' },
  { name: 'Cycling', count: 18, icon: '🚴' },
  { name: 'Soccer', count: 12, icon: '⚽' },
  { name: 'Crossfit & Gym', count: 9, icon: '🏋️' },
];

const ATHLETES = [
  { name: 'Carlos Mendoza', role: 'Tennis Pro', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100' },
  { name: 'Elena Roberts', role: 'Swimming Coach', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
  { name: 'Sarah Jenkins', role: 'Marathon Elite', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100' },
];

const RECENT_MOMENTS = [
  'https://images.unsplash.com/photo-1552674605-46d530064509?q=80&w=200',
  'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=200',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200',
  'https://images.unsplash.com/photo-1514525253440-b393452e3726?q=80&w=200'
];

interface SportsBlogPageProps {
  onNavigate: (view: 'landing' | 'events' | 'workshops' | 'shopwindow' | 'community' | 'profile' | 'create-event' | 'contact-sales' | 'about' | 'sports-blog') => void;
  user?: UserProfile | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const SportsBlogPage: React.FC<SportsBlogPageProps> = ({ onNavigate, user, onLogin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavClick = (view: any) => {
      onNavigate(view);
      setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-navy">
      
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
                    className="text-brand-navy p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Middle Links (Desktop) */}
            <div className="hidden md:flex space-x-8 h-full">
              <button onClick={() => handleNavClick('landing')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Inicio</button>
              <button onClick={() => handleNavClick('about')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Nosotros</button>
              <button onClick={() => handleNavClick('events')} className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy">Eventos</button>
              <button onClick={() => handleNavClick('workshops')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Talleres</button>
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
            <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 top-20 z-40 animate-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col p-4 space-y-4">
                    <button onClick={() => handleNavClick('landing')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Inicio</button>
                    <button onClick={() => handleNavClick('about')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Nosotros</button>
                    <button onClick={() => handleNavClick('events')} className="text-left font-bold text-brand-navy py-2 border-b border-gray-50">Eventos</button>
                    <button onClick={() => handleNavClick('workshops')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Talleres</button>
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
          <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1552674605-46d530064509?q=80&w=2000&auto=format&fit=crop" 
                className="w-full h-[600px] object-cover object-top"
                alt="Marathon Runner"
              />
              <div className="absolute inset-0 bg-brand-navy/80 mix-blend-multiply h-[600px]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent h-[600px]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-48">
              <div className="max-w-2xl">
                  <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide mb-4 inline-block">
                      Featured Event
                  </span>
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                      Maratón Internacional 2023: Breaking Limits in the Heart of the City
                  </h1>
                  <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                      Join thousands of runners this November for the most anticipated urban race of the year. Discover the route, meet the elite athletes, and prepare for glory.
                  </p>
                  <div className="flex flex-wrap gap-4">
                      <button className="bg-white text-brand-navy font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                          Read Full Story <ArrowRight size={18} />
                      </button>
                      <button 
                        onClick={() => handleNavClick('events')}
                        className="bg-transparent border border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors"
                      >
                          Event Details
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24">
          <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Left Column: Latest Stories */}
              <div className="lg:w-2/3">
                  <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-display font-bold text-brand-navy uppercase tracking-wide">Latest Stories</h2>
                      <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-200 rounded"><Grid size={20} className="text-gray-500" /></button>
                          <button className="p-2 hover:bg-gray-200 rounded"><List size={20} className="text-gray-500" /></button>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {LATEST_STORIES.map(story => (
                          <div key={story.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group cursor-pointer">
                              <div className="relative h-56 overflow-hidden">
                                  <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1 text-center shadow-sm">
                                      <span className="block text-[10px] text-gray-500 uppercase font-bold">{story.month}</span>
                                      <span className="block text-xl font-bold text-brand-navy leading-none">{story.date}</span>
                                  </div>
                              </div>
                              <div className="p-6 flex flex-col flex-1">
                                  <div className="flex items-center gap-2 mb-3">
                                      <span className="text-brand-red text-xs font-bold uppercase">{story.category}</span>
                                      <span className="text-gray-300">•</span>
                                      <span className="text-gray-400 text-xs">{story.readTime}</span>
                                  </div>
                                  <h3 className="font-display font-bold text-xl text-brand-navy mb-3 leading-snug group-hover:text-brand-red transition-colors">
                                      {story.title}
                                  </h3>
                                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                      {story.excerpt}
                                  </p>
                                  <div className="mt-auto">
                                      <span className="text-sm font-bold text-brand-navy flex items-center gap-1 group-hover:gap-2 transition-all">
                                          Read More <ArrowRight size={16} />
                                      </span>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center gap-2 mt-12">
                      <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500"><ChevronRight className="rotate-180" size={18}/></button>
                      <button className="w-10 h-10 rounded-full bg-brand-navy text-white font-bold flex items-center justify-center">1</button>
                      <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 font-bold text-gray-600">2</button>
                      <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 font-bold text-gray-600">3</button>
                      <span className="flex items-end px-2 text-gray-400">...</span>
                      <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500"><ChevronRight size={18}/></button>
                  </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="lg:w-1/3 space-y-10">
                  
                  {/* Trending Sports */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3 mb-6 border-l-4 border-brand-red pl-3">
                          <h3 className="font-display font-bold text-lg text-brand-navy uppercase tracking-wide">Trending Sports</h3>
                      </div>
                      <div className="space-y-4">
                          {TRENDING_SPORTS.map((sport, idx) => (
                              <div key={idx} className="flex items-center justify-between group cursor-pointer">
                                  <div className="flex items-center gap-3">
                                      <span className="text-xl bg-gray-50 w-10 h-10 flex items-center justify-center rounded-lg">{sport.icon}</span>
                                      <span className="font-medium text-brand-navy group-hover:text-brand-red transition-colors">{sport.name}</span>
                                  </div>
                                  <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">{sport.count}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Recent Moments */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3 mb-6 border-l-4 border-brand-red pl-3">
                          <h3 className="font-display font-bold text-lg text-brand-navy uppercase tracking-wide">Recent Moments</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          {RECENT_MOMENTS.map((img, idx) => (
                              <div key={idx} className={`relative overflow-hidden rounded-xl h-24 group cursor-pointer ${idx === 3 ? 'opacity-90' : ''}`}>
                                  {idx === 3 ? (
                                      <div className="bg-gray-100 w-full h-full flex items-center justify-center text-xs font-bold text-brand-navy hover:bg-gray-200 transition-colors">
                                          View All
                                      </div>
                                  ) : (
                                      <>
                                        <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Moment" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                      </>
                                  )}
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Athletes to Watch */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3 mb-6 border-l-4 border-brand-red pl-3">
                          <h3 className="font-display font-bold text-lg text-brand-navy uppercase tracking-wide">Athletes to Watch</h3>
                      </div>
                      <div className="space-y-6">
                          {ATHLETES.map((athlete, idx) => (
                              <div key={idx} className="flex items-center justify-between group cursor-pointer">
                                  <div className="flex items-center gap-4">
                                      <img src={athlete.image} alt={athlete.name} className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-brand-red transition-all" />
                                      <div>
                                          <h4 className="font-bold text-brand-navy text-sm">{athlete.name}</h4>
                                          <p className="text-xs text-brand-red font-medium">{athlete.role}</p>
                                      </div>
                                  </div>
                                  <PlusCircle size={20} className="text-gray-300 group-hover:text-brand-navy transition-colors" />
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-[#0f112e] rounded-2xl p-8 text-white relative overflow-hidden">
                      <div className="relative z-10 text-center">
                          <div className="w-12 h-12 bg-brand-red/20 text-brand-red rounded-xl flex items-center justify-center mx-auto mb-4 border border-brand-red/30">
                              <Mail size={24} />
                          </div>
                          <h3 className="font-bold text-xl mb-2">Don't Miss Out</h3>
                          <p className="text-gray-400 text-sm mb-6">Get the latest sports events delivered to your inbox.</p>
                          <input 
                            type="email" 
                            placeholder="Your email" 
                            className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-red mb-3"
                          />
                          <button className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors text-sm">
                              Subscribe
                          </button>
                      </div>
                  </div>

              </div>
          </div>
      </div>

      {/* Footer (Simplified Reused) */}
      <footer className="bg-[#0f112e] text-white py-12 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <img src="/logo.png" className="w-8 h-8 rounded-full" alt="Logo" />
                        <span className="font-display font-bold text-xl">PREGONAR</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    La plataforma líder para descubrir y gestionar eventos deportivos y culturales. Anuncia, expone y comparte tu pasión.
                    </p>
                    <div className="flex gap-4">
                        <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                        <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                        <AtSign size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                    </div>
                </div>
                
                <div>
                    <h4 className="font-bold text-base mb-4">Eventos</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="hover:text-white cursor-pointer">Running</li>
                        <li className="hover:text-white cursor-pointer">Ciclismo</li>
                        <li className="hover:text-white cursor-pointer">Triatlón</li>
                        <li className="hover:text-white cursor-pointer">Arte & Cultura</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-base mb-4">Boletín</h4>
                    <p className="text-gray-400 text-sm mb-4">Recibe los mejores eventos de la semana en tu correo.</p>
                    <button className="bg-brand-red hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors w-full">
                        Suscribirse
                    </button>
                </div>
            </div>
            
            <div className="border-t border-white/10 mt-12 pt-8 flex justify-between items-center text-xs text-gray-500">
                <p>© 2023 Pregonar. Todos los derechos reservados.</p>
                <div className="flex gap-6">
                    <span className="hover:text-white cursor-pointer">Privacidad</span>
                    <span className="hover:text-white cursor-pointer">Términos</span>
                    <span className="hover:text-white cursor-pointer">Cookies</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};
