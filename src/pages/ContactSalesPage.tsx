
import React, { useState } from 'react';
import { 
  Check, 
  ArrowLeft, 
  Globe, 
  CheckCircle, 
  MessageSquare,
  HelpCircle,
  Mail,
  Phone,
  Menu,
  X,
  User,
  LogOut
} from 'lucide-react';
import { UserProfile } from '../lib/auth';
import { Footer } from '../components/Footer';

interface ContactSalesPageProps {
  onNavigate: (view: any) => void;
  user?: UserProfile | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const ContactSalesPage: React.FC<ContactSalesPageProps> = ({ onNavigate, user, onLogin, onLogout }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleNavClick = (view: any) => {
      onNavigate(view);
      setIsMobileMenuOpen(false);
  };

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
              <button onClick={() => handleNavClick('landing')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Inicio</button>
              <button onClick={() => handleNavClick('about')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Nosotros</button>
              <button onClick={() => handleNavClick('events')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Eventos</button>
              <button onClick={() => handleNavClick('workshops')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Talleres</button>
              <button onClick={() => handleNavClick('shopwindow')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Vitrina</button>
              <button onClick={() => handleNavClick('community')} className="text-gray-600 hover:text-brand-red font-medium transition-colors text-sm h-full flex items-center border-b-2 border-transparent hover:border-gray-200">Comunidad</button>
              <button className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy">Contacto</button>
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
                    <button onClick={() => handleNavClick('events')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Eventos</button>
                    <button onClick={() => handleNavClick('workshops')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Talleres</button>
                    <button onClick={() => handleNavClick('shopwindow')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Vitrina</button>
                    <button onClick={() => handleNavClick('community')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Comunidad</button>
                    <button className="text-left font-bold text-brand-navy py-2 border-b border-gray-50">Contacto</button>
                    {!user && <button onClick={onLogin} className="text-left font-medium text-brand-red py-2">Iniciar Sesión</button>}
                </div>
            </div>
        )}
      </nav>

        <main className="flex-grow pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Left Side Info */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-navy mb-6">
                        Impulsa tu organización con <span className="text-brand-red">Pregonar</span>
                    </h1>
                    <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                        ¿Organizas grandes eventos o gestionas múltiples instructores? Descubre nuestras soluciones empresariales diseñadas para escalar tu impacto.
                    </p>

                    <div className="space-y-6 mb-12">
                        <div className="flex items-start gap-4">
                            <div className="bg-brand-navy/10 p-3 rounded-xl text-brand-navy">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-brand-navy">Alcance Global</h3>
                                <p className="text-gray-500 text-sm">Conecta con audiencias en múltiples ciudades y países.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-brand-navy/10 p-3 rounded-xl text-brand-navy">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-brand-navy">Soporte Dedicado</h3>
                                <p className="text-gray-500 text-sm">Equipo de éxito del cliente a tu disposición 24/7.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-brand-navy/10 p-3 rounded-xl text-brand-navy">
                                <HelpCircle size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-brand-navy">Consultoría Estratégica</h3>
                                <p className="text-gray-500 text-sm">Optimizamos tus eventos para máxima conversión.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-8 text-sm font-medium text-gray-500">
                        <div className="flex items-center gap-2">
                            <Mail size={18} className="text-brand-red" /> ventas@pregonar.com
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={18} className="text-brand-red" /> +54 11 1234 5678
                        </div>
                    </div>
                </div>

                {/* Right Side Form */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    {submitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-navy mb-2">¡Mensaje Enviado!</h3>
                            <p className="text-gray-500 max-w-xs">Gracias por contactarnos. Nuestro equipo comercial se pondrá en contacto contigo en breve.</p>
                            <button 
                                onClick={() => setSubmitted(false)} 
                                className="mt-8 text-brand-red font-bold text-sm hover:underline"
                            >
                                Enviar otro mensaje
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-brand-navy mb-6">Contáctanos</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-brand-navy mb-1">Nombre</label>
                                        <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy" placeholder="Tu nombre" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-brand-navy mb-1">Apellido</label>
                                        <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy" placeholder="Tu apellido" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-brand-navy mb-1">Email Corporativo</label>
                                    <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy" placeholder="nombre@empresa.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-brand-navy mb-1">Empresa / Organización</label>
                                    <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy" placeholder="Nombre de tu organización" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-brand-navy mb-1">Mensaje</label>
                                    <textarea required rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy resize-none" placeholder="Cuéntanos sobre tus necesidades..."></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full bg-brand-navy text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#0f112e] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {isLoading ? (
                                        <>Enviando... <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                                    ) : (
                                        <>Enviar Consulta <ArrowLeft className="rotate-180" size={18} /></>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </main>

        <Footer onNavigate={onNavigate} />
    </div>
  );
};
