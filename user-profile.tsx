
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  LogOut, 
  Ticket, 
  Calendar, 
  Clock, 
  CreditCard,
  Settings,
  Heart,
  Activity,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from './auth';

interface UserProfilePageProps {
  user: UserProfile;
  onNavigate: (view: 'landing' | 'events' | 'shopwindow' | 'profile') => void;
  onLogout: () => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ user, onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'bookings' | 'settings'>('tickets');
  const [myTickets, setMyTickets] = useState<any[]>([]);

  // Simulate fetching tickets from a "backend" (localStorage + mock data)
  useEffect(() => {
      const stored = localStorage.getItem('my_tickets');
      const newTickets = stored ? JSON.parse(stored) : [];
      
      const mockTickets = [
          {
              id: 'mock-1',
              eventTitle: 'Maratón del Valle 2024',
              eventDate: '2024-10-15T08:00:00.000Z',
              eventLocation: 'Córdoba, Argentina',
              status: 'CONFIRMED',
              tier: 'General',
              category: 'RUNNING',
              image: 'https://images.unsplash.com/photo-1552674605-46d530064509?q=80&w=800'
          },
          {
              id: 'mock-2',
              eventTitle: 'Noche de Jazz & Vino',
              eventDate: '2024-09-02T20:00:00.000Z',
              eventLocation: 'Monterrey, México',
              status: 'FINALIZED',
              tier: 'VIP',
              category: 'CULTURA',
              image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800'
          }
      ];

      // Merge new tickets from wizard with mock data
      setMyTickets([...newTickets, ...mockTickets]);
  }, []);

  const getStatusBadge = (status: string) => {
      if (status === 'CONFIRMED') {
          return (
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle size={10} /> CONFIRMADO
              </span>
          );
      } else if (status === 'PENDING') {
          return (
              <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <AlertCircle size={10} /> PENDIENTE DE VERIFICACIÓN
              </span>
          );
      } else {
          return (
              <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full">
                  FINALIZADO
              </span>
          );
      }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-navy">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
              <img src="./logo.png" alt="Pregonar Logo" className="h-8 w-8 mr-2 rounded-full object-cover" />
              <span className="font-display font-extrabold text-lg text-brand-navy">Pregonar</span>
            </div>
            <button 
                onClick={() => onNavigate('landing')}
                className="text-gray-500 hover:text-brand-navy text-sm font-medium flex items-center gap-1"
            >
                <ArrowLeft size={16} /> Volver al Inicio
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Profile Card */}
            <div className="lg:w-1/4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full p-1 border-2 border-brand-red mb-4">
                            <img 
                                src={user.photoURL || "https://via.placeholder.com/150"} 
                                alt={user.displayName || "User"} 
                                className="w-full h-full rounded-full object-cover" 
                            />
                        </div>
                        <h2 className="text-xl font-bold text-brand-navy">{user.displayName}</h2>
                        <p className="text-sm text-gray-500 mb-6">{user.email}</p>

                        <div className="w-full space-y-2 border-t border-gray-100 pt-6">
                            <button 
                                onClick={() => setActiveTab('tickets')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'tickets' ? 'bg-brand-navy text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Ticket size={18} /> Mis Entradas
                            </button>
                            <button 
                                onClick={() => setActiveTab('bookings')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'bookings' ? 'bg-brand-navy text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Calendar size={18} /> Mis Reservas
                            </button>
                            <button 
                                onClick={() => setActiveTab('settings')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-brand-navy text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Settings size={18} /> Configuración
                            </button>
                        </div>

                        <button 
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-2 mt-8 text-red-500 text-sm font-bold hover:bg-red-50 py-3 rounded-xl transition-colors"
                        >
                            <LogOut size={16} /> Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
                {activeTab === 'tickets' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-display font-bold text-brand-navy mb-6">Mis Eventos</h2>
                        
                        {myTickets.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                                <p className="text-gray-500">No tienes entradas aún.</p>
                            </div>
                        ) : (
                            myTickets.map((ticket) => (
                                <div key={ticket.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                                    <div className="md:w-1/3 h-48 md:h-auto relative">
                                        <img src={ticket.image || "https://images.unsplash.com/photo-1552674605-46d530064509?q=80&w=800"} className="w-full h-full object-cover" alt="Event" />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-xs font-bold text-brand-navy shadow-sm uppercase">
                                            {ticket.category || 'EVENTO'}
                                        </div>
                                    </div>
                                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-brand-navy">{ticket.eventTitle}</h3>
                                                {getStatusBadge(ticket.status)}
                                            </div>
                                            <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={16} className="text-brand-red" />
                                                    {new Date(ticket.eventDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={16} className="text-brand-red" />
                                                    {ticket.eventLocation}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-gray-50 pt-4 mt-2">
                                            <div className="flex items-center gap-2">
                                                <Ticket size={16} className="text-gray-400" />
                                                <span className="text-sm font-medium text-gray-600">Entrada {ticket.tier || 'General'}</span>
                                            </div>
                                            {ticket.status === 'CONFIRMED' && (
                                                <button className="text-brand-red text-sm font-bold hover:underline">Ver Ticket QR</button>
                                            )}
                                            {ticket.status === 'PENDING' && (
                                                <span className="text-xs text-yellow-600 font-bold">Verificando Pago...</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-display font-bold text-brand-navy mb-6">Clases y Talleres</h2>
                        
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                             <div className="flex items-start gap-4">
                                 <img 
                                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200" 
                                    className="w-16 h-16 rounded-xl object-cover"
                                    alt="Instructor"
                                 />
                                 <div className="flex-1">
                                     <div className="flex justify-between">
                                        <h3 className="font-bold text-brand-navy">Taller de Muralismo</h3>
                                        <span className="text-brand-red font-bold text-sm">$20.000</span>
                                     </div>
                                     <p className="text-sm text-gray-500 mb-3">con Sofía Pinto</p>
                                     
                                     <div className="flex items-center gap-4 text-xs font-medium text-gray-600 bg-gray-50 p-3 rounded-lg">
                                         <div className="flex items-center gap-1">
                                             <Calendar size={14} className="text-brand-red" /> 24 Oct
                                         </div>
                                         <div className="flex items-center gap-1">
                                             <Clock size={14} className="text-brand-red" /> 15:00 - 18:00
                                         </div>
                                         <div className="flex items-center gap-1">
                                             <MapPin size={14} className="text-brand-red" /> Valparaíso
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="mt-4 flex gap-3">
                                 <button className="flex-1 border border-gray-200 text-brand-navy text-sm font-bold py-2 rounded-lg hover:bg-gray-50">Contactar</button>
                                 <button className="flex-1 bg-brand-navy text-white text-sm font-bold py-2 rounded-lg hover:bg-black">Reprogramar</button>
                             </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                        <Settings size={48} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-brand-navy">Configuración de Cuenta</h3>
                        <p className="text-gray-500 text-sm mb-6">Gestiona tus preferencias, métodos de pago y notificaciones.</p>
                        <button className="bg-gray-100 text-gray-400 font-bold py-2 px-6 rounded-lg text-sm cursor-not-allowed">Próximamente</button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
