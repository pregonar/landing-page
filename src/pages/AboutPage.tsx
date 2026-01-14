
import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  User, 
  Target, 
  Heart, 
  Globe, 
  Users, 
  Award, 
  ArrowRight, 
  Facebook, 
  Instagram, 
  AtSign 
} from 'lucide-react';
import { UserProfile } from '../lib/auth';
import { Footer } from '../components/Footer';

interface AboutPageProps {
  onNavigate: (view: any) => void;
  user?: UserProfile | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, user, onLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: any) => {
      onNavigate(view);
      setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy flex flex-col">
      
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
              <button className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy">Nosotros</button>
              <button onClick={() => handleNavClick('events')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Eventos</button>
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
                    <button className="text-left font-bold text-brand-navy py-2 border-b border-gray-50">Nosotros</button>
                    <button onClick={() => handleNavClick('events')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Eventos</button>
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
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-grow w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-navy mb-6 leading-tight">
                  Nuestra misión es <span className="text-brand-red">conectar pasiones</span>.
              </h1>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
                  Pregonar nace de la convicción de que el talento local, el deporte y la cultura merecen un escenario donde brillar. Somos el puente entre quienes crean experiencias y quienes buscan vivirlas.
              </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] w-full shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Community event"
              />
              <div className="absolute inset-0 bg-brand-navy/20"></div>
          </div>
      </div>

      {/* Values Grid */}
      <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-14 h-14 bg-red-50 text-brand-red rounded-xl flex items-center justify-center mb-6">
                          <Target size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-brand-navy mb-4">Empoderamiento</h3>
                      <p className="text-gray-600 leading-relaxed">
                          Brindamos herramientas profesionales a organizadores e instructores independientes para que puedan vivir de lo que aman.
                      </p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                          <Users size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-brand-navy mb-4">Comunidad</h3>
                      <p className="text-gray-600 leading-relaxed">
                          Creemos que las mejores experiencias se comparten. Fomentamos espacios seguros e inclusivos para todos.
                      </p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                          <Award size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-brand-navy mb-4">Excelencia</h3>
                      <p className="text-gray-600 leading-relaxed">
                          Curamos nuestra vitrina para asegurar que encuentres calidad, profesionalismo y verdadera pasión en cada evento.
                      </p>
                  </div>
              </div>
          </div>
      </div>

      {/* Story Section */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                  <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">Nuestra Historia</span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-6">De una idea local a un movimiento global.</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                      Todo comenzó en 2021, cuando notamos lo difícil que era encontrar clases de calidad o eventos deportivos fuera de los circuitos tradicionales. Había talento de sobra, pero faltaba visibilidad.
                  </p>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                      Pregonar nació para llenar ese vacío. Lo que empezó como un pequeño directorio de instructores en Buenos Aires, hoy es una plataforma integral que gestiona miles de reservas y conecta a personas en múltiples países.
                  </p>
                  <div className="flex gap-8 border-t border-gray-100 pt-8">
                      <div>
                          <span className="block text-3xl font-bold text-brand-navy">50k+</span>
                          <span className="text-sm text-gray-500">Usuarios Activos</span>
                      </div>
                      <div>
                          <span className="block text-3xl font-bold text-brand-navy">1.2k</span>
                          <span className="text-sm text-gray-500">Instructores</span>
                      </div>
                      <div>
                          <span className="block text-3xl font-bold text-brand-navy">15</span>
                          <span className="text-sm text-gray-500">Ciudades</span>
                      </div>
                  </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600" className="rounded-2xl w-full h-64 object-cover mt-8" alt="Team meeting" />
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600" className="rounded-2xl w-full h-64 object-cover" alt="Brainstorming" />
              </div>
          </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-red py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">¿Listo para ser parte?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => onNavigate('events')} className="bg-white text-brand-red font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition-colors">
                      Explorar Eventos
                  </button>
                  <button onClick={() => onNavigate('contact-sales')} className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors">
                      Trabaja con Nosotros
                  </button>
              </div>
          </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

    </div>
  );
};
