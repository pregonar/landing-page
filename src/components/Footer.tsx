
import React from 'react';
import { Facebook, Instagram, AtSign } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0f112e] text-white pt-16 pb-8 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
                 <div className="flex items-center mb-6">
                    <img src="/logo.png" alt="Pregonar Logo" className="h-8 w-8 mr-2 rounded-full object-cover" />
                    <span className="font-display font-bold text-xl tracking-tight">PREGONAR</span>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    La plataforma que conecta pasiones. Descubre, participa y crece con la mejor comunidad de eventos.
                 </p>
                 <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><AtSign size={20} /></a>
                 </div>
            </div>

            <div>
                <h4 className="font-bold text-lg mb-6">DESCUBRIR</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><button onClick={() => onNavigate('events')} className="hover:text-brand-red transition-colors text-left">Eventos Deportivos</button></li>
                    <li><button onClick={() => onNavigate('events')} className="hover:text-brand-red transition-colors text-left">Exposiciones de Arte</button></li>
                    <li><button onClick={() => onNavigate('events')} className="hover:text-brand-red transition-colors text-left">Festivales Culturales</button></li>
                    <li><button onClick={() => onNavigate('workshops')} className="hover:text-brand-red transition-colors text-left">Talleres y Cursos</button></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-lg mb-6">ORGANIZADORES</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><button onClick={() => onNavigate('create-event')} className="hover:text-brand-red transition-colors text-left">Publicar un Evento</button></li>
                    <li><button onClick={() => onNavigate('contact-sales')} className="hover:text-brand-red transition-colors text-left">Soluciones para Empresas</button></li>
                    <li><a href="#" className="hover:text-brand-red transition-colors">Precios</a></li>
                    <li><a href="#" className="hover:text-brand-red transition-colors">Recursos</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-lg mb-6">BOLETÍN</h4>
                <p className="text-gray-400 text-sm mb-4">Recibe los mejores eventos cada semana.</p>
                <div className="flex flex-col gap-3">
                    <input type="email" placeholder="Tu correo electrónico" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-red transition-colors text-white" />
                    <button className="bg-brand-red hover:bg-red-600 text-white font-bold py-2 rounded-lg text-sm transition-colors">
                        Suscribirse
                    </button>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 Pregonar. Todos los derechos reservados.</p>
            <div className="flex gap-6">
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacidad</button>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Términos</button>
                <button onClick={() => onNavigate('cookies')} className="hover:text-white transition-colors">Cookies</button>
            </div>
        </div>
    </footer>
  );
};
