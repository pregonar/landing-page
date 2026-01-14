
import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  Heart, 
  Download, 
  Plus, 
  Minus, 
  ArrowLeft,
  Activity,
  User,
  CheckCircle,
  Bell,
  ChevronRight,
  Star,
  Flag,
  Droplet,
  Music,
  Maximize,
  Menu,
  X,
  Navigation,
  CreditCard,
  AlertCircle,
  Landmark,
  Upload,
  FileText
} from 'lucide-react';
import { UserProfile } from '../lib/auth';

// Define Interface locally to match events.tsx structure
interface Event {
  id: string;
  title: string;
  location: string;
  province: string;
  date: Date;
  category: string;
  tags: string[];
  price: number;
  image: string;
  difficulty?: string;
  duration?: string;
  description?: string;
  organizer?: string;
}

// --- DYNAMIC FORM CONFIGURATION (Mocking backend data) ---
const DYNAMIC_FORM_FIELDS = [
    { id: 'full_name', label: 'Nombre Completo', type: 'text', placeholder: 'Como figura en tu DNI', required: true },
    { id: 'dni', label: 'DNI / Pasaporte', type: 'text', placeholder: 'Sin puntos', required: true },
    { id: 'phone', label: 'Teléfono de Contacto', type: 'tel', placeholder: '+54 9 ...', required: true },
    { id: 'shirt_size', label: 'Talle de Remera', type: 'select', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true },
    { id: 'emergency_contact', label: 'Contacto de Emergencia', type: 'text', placeholder: 'Nombre y Teléfono', required: true },
    { id: 'medical_conditions', label: '¿Alergias o condiciones médicas?', type: 'textarea', placeholder: 'Escribe aquí...', required: false },
    { id: 'terms', label: 'Acepto el deslinde de responsabilidades y el reglamento del evento.', type: 'checkbox', required: true }
];

interface RegistrationWizardProps {
    event: Event;
    user: UserProfile;
    onClose: () => void;
    onComplete: (status: 'CONFIRMED' | 'PENDING') => void;
}

const RegistrationWizard: React.FC<RegistrationWizardProps> = ({ event, user, onClose, onComplete }) => {
    const [step, setStep] = useState(1);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transferFile, setTransferFile] = useState<File | null>(null);
    
    // Form Data
    const [formData, setFormData] = useState<Record<string, any>>({
        full_name: user.displayName || '',
        email: user.email || ''
    });

    // Calculate Final Price
    const finalPrice = selectedTier === 'vip' ? event.price * 1.5 : event.price;

    const handleInputChange = (id: string, value: any) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleNext = () => {
        if (step === 1 && selectedTier) {
            setStep(2);
        } else if (step === 2) {
            // Check if price is 0 (Free Event)
            if (finalPrice === 0) {
                handleFreeRegistration();
            } else {
                setStep(3);
            }
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleFreeRegistration = async () => {
        setIsProcessing(true);
        // Simulate API call for free registration
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        saveTicketToLocal('CONFIRMED');
        setIsProcessing(false);
        onComplete('CONFIRMED');
    };

    // --- N1CO PAYMENT INTEGRATION MOCK ---
    const processN1coPayment = async () => {
        setIsProcessing(true);
        
        // Construct Payload for N1CO API (Example structure based on docs)
        const n1coPayload = {
            amount: finalPrice,
            currency: "USD", // Or ARS/CLP depending on config
            description: `Inscripción ${event.title} - ${selectedTier}`,
            reference_id: `ORD-${Math.floor(Math.random() * 10000)}`,
            customer_email: user.email,
            customer_name: formData.full_name,
            redirect_url: window.location.href
        };

        console.log("Creating N1CO Payment Link...", n1coPayload);

        // Simulate API Network Request
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Save to LocalStorage for persistence demo in Profile
        saveTicketToLocal('CONFIRMED');
        
        setIsProcessing(false);
        onComplete('CONFIRMED');
    };

    // --- TRANSFER SUBMISSION MOCK ---
    const submitTransferProof = async () => {
        if (!transferFile) return;
        setIsProcessing(true);
        
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Save to LocalStorage for persistence demo in Profile
        saveTicketToLocal('PENDING');

        setIsProcessing(false);
        onComplete('PENDING');
    };

    const saveTicketToLocal = (status: string) => {
        const newTicket = {
            id: `ticket-${Date.now()}`,
            eventTitle: event.title,
            eventDate: event.date.toISOString(),
            eventLocation: event.location,
            status: status, // 'CONFIRMED' | 'PENDING'
            tier: selectedTier
        };
        const existing = JSON.parse(localStorage.getItem('my_tickets') || '[]');
        localStorage.setItem('my_tickets', JSON.stringify([newTicket, ...existing]));
    };

    const formattedPrice = event.price === 0 ? 'Gratis' : `$${event.price.toLocaleString('es-AR')}`;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-xl font-display font-bold text-brand-navy">Inscripción al Evento</h2>
                        <p className="text-sm text-gray-500">{event.title} • Paso {step} de {finalPrice === 0 ? 2 : 3}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F8F9FA]">
                    
                    {/* STEP 1: SELECT TIER */}
                    {step === 1 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-bold text-brand-navy mb-6">1. Selecciona tu categoría</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Tier 1 */}
                                <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 opacity-60 relative overflow-hidden">
                                    <div className="absolute top-4 right-4 bg-gray-300 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase">Agotado</div>
                                    <h3 className="font-bold text-gray-500 mb-2">Early Bird</h3>
                                    <div className="text-3xl font-display font-bold text-gray-400 mb-2">
                                        {event.price > 0 ? `$${(event.price * 0.8).toLocaleString('es-AR')}` : 'Gratis'}
                                    </div>
                                    <p className="text-xs text-gray-400 mb-6">Entrada básica + certificado digital.</p>
                                    <button disabled className="w-full py-2.5 rounded-lg bg-gray-200 text-gray-400 text-sm font-bold cursor-not-allowed">No Disponible</button>
                                </div>

                                {/* Tier 2 */}
                                <div 
                                    onClick={() => setSelectedTier('general')}
                                    className={`bg-white rounded-2xl p-6 border-2 relative shadow-lg cursor-pointer transition-all hover:scale-[1.02] ${selectedTier === 'general' ? 'border-brand-red ring-2 ring-brand-red/20' : 'border-gray-200 hover:border-brand-navy'}`}
                                >
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-md">Popular</div>
                                    <h3 className="font-bold text-brand-navy mb-2">General</h3>
                                    <div className="text-3xl font-display font-bold text-brand-red mb-2">{formattedPrice}</div>
                                    <p className="text-xs text-gray-500 mb-4 h-8">Kit de carrera, chip de tiempo y medalla finisher.</p>
                                    <ul className="text-xs text-gray-500 space-y-2 mb-6">
                                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Remera incluida</li>
                                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Hidratación</li>
                                    </ul>
                                    <div className={`w-full py-2.5 rounded-lg text-center text-sm font-bold transition-all ${selectedTier === 'general' ? 'bg-brand-red text-white' : 'bg-gray-100 text-brand-navy'}`}>
                                        {selectedTier === 'general' ? 'Seleccionado' : 'Seleccionar'}
                                    </div>
                                </div>

                                {/* Tier 3 */}
                                <div 
                                    onClick={() => setSelectedTier('vip')}
                                    className={`bg-white rounded-2xl p-6 border-2 relative shadow-sm cursor-pointer transition-all hover:scale-[1.02] ${selectedTier === 'vip' ? 'border-brand-navy ring-2 ring-brand-navy/20' : 'border-gray-200 hover:border-brand-navy'}`}
                                >
                                    <h3 className="font-bold text-brand-navy mb-2">Experiencia VIP</h3>
                                    <div className="text-3xl font-display font-bold text-brand-navy mb-2">
                                        {event.price > 0 ? `$${(event.price * 1.5).toLocaleString('es-AR')}` : 'Consultar'}
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4 h-8">Todos los beneficios + acceso exclusivo.</p>
                                    <ul className="text-xs text-gray-500 space-y-2 mb-6">
                                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Acceso VIP Lounge</li>
                                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Masaje post-carrera</li>
                                    </ul>
                                    <div className={`w-full py-2.5 rounded-lg text-center text-sm font-bold transition-all ${selectedTier === 'vip' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-brand-navy'}`}>
                                        {selectedTier === 'vip' ? 'Seleccionado' : 'Seleccionar'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: DYNAMIC FORM */}
                    {step === 2 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-bold text-brand-navy mb-4">2. Datos del Participante</h3>
                            <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm">
                                <AlertCircle size={20} />
                                <p>Los datos solicitados son requeridos por <strong>{event.organizer || "el Organizador"}</strong> para la gestión del evento.</p>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {DYNAMIC_FORM_FIELDS.map((field) => {
                                    if (field.type === 'textarea') {
                                        return (
                                            <div key={field.id} className="md:col-span-2">
                                                <label className="block text-sm font-bold text-brand-navy mb-2">
                                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                                </label>
                                                <textarea 
                                                    placeholder={field.placeholder}
                                                    rows={3}
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-navy transition-colors text-sm resize-none"
                                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                />
                                            </div>
                                        )
                                    }
                                    if (field.type === 'checkbox') {
                                        return (
                                            <div key={field.id} className="md:col-span-2 mt-4">
                                                <label className="flex items-start gap-3 cursor-pointer">
                                                    <input type="checkbox" className="mt-1 w-5 h-5 text-brand-red rounded border-gray-300 focus:ring-brand-red" required={field.required} />
                                                    <span className="text-sm text-gray-600">{field.label}</span>
                                                </label>
                                            </div>
                                        )
                                    }
                                    if (field.type === 'select') {
                                        return (
                                            <div key={field.id}>
                                                <label className="block text-sm font-bold text-brand-navy mb-2">
                                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                                </label>
                                                <div className="relative">
                                                    <select 
                                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-navy transition-colors text-sm appearance-none"
                                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                    >
                                                        <option value="">Seleccionar...</option>
                                                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                        <ChevronRight className="rotate-90" size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return (
                                        <div key={field.id} className={field.id === 'full_name' ? 'md:col-span-2' : ''}>
                                            <label className="block text-sm font-bold text-brand-navy mb-2">
                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                            </label>
                                            <input 
                                                type={field.type} 
                                                placeholder={field.placeholder}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-navy transition-colors text-sm"
                                                defaultValue={formData[field.id] || ''}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            />
                                        </div>
                                    )
                                })}
                            </form>
                        </div>
                    )}

                    {/* STEP 3: PAYMENT (Only if Price > 0) */}
                    {step === 3 && finalPrice > 0 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-bold text-brand-navy mb-6">3. Método de Pago</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div 
                                    onClick={() => setPaymentMethod('card')}
                                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 text-center ${paymentMethod === 'card' ? 'border-brand-red bg-red-50/20' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                >
                                    <div className="bg-brand-navy text-white p-3 rounded-full">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy">Tarjeta de Crédito/Débito</h4>
                                        <p className="text-xs text-gray-500">Procesado seguro por N1CO</p>
                                    </div>
                                    {paymentMethod === 'card' && <div className="absolute top-4 right-4 text-brand-red"><CheckCircle size={20}/></div>}
                                </div>

                                <div 
                                    onClick={() => setPaymentMethod('transfer')}
                                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 text-center ${paymentMethod === 'transfer' ? 'border-brand-red bg-red-50/20' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                >
                                    <div className="bg-green-600 text-white p-3 rounded-full">
                                        <Landmark size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy">Transferencia Bancaria</h4>
                                        <p className="text-xs text-gray-500">Adjuntar comprobante</p>
                                    </div>
                                    {paymentMethod === 'transfer' && <div className="absolute top-4 right-4 text-brand-red"><CheckCircle size={20}/></div>}
                                </div>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-in fade-in zoom-in-95">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                                        <span className="text-gray-500">Total a pagar:</span>
                                        <span className="text-2xl font-bold text-brand-navy">${finalPrice.toLocaleString('es-AR')}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Serás redirigido a la pasarela de pago segura de <strong>N1CO</strong> para completar tu transacción. Una vez confirmado, recibirás tu ticket inmediatamente.
                                    </p>
                                    <button 
                                        onClick={processN1coPayment}
                                        disabled={isProcessing}
                                        className="w-full bg-brand-navy hover:bg-[#0f112e] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                                    >
                                        {isProcessing ? (
                                            <>Procesando <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                                        ) : (
                                            <>Pagar con N1CO <CreditCard size={18} /></>
                                        )}
                                    </button>
                                    <div className="flex justify-center mt-4 gap-2 opacity-50">
                                        {/* Mock logos for N1CO/Cards */}
                                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'transfer' && (
                                <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-in fade-in zoom-in-95 space-y-6">
                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-3 flex items-center gap-2"><Landmark size={16}/> Datos Bancarios</h4>
                                        <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm text-gray-700 border border-gray-200">
                                            <div className="flex justify-between"><span>Banco:</span> <span className="font-bold">Banco Galicia</span></div>
                                            <div className="flex justify-between"><span>CBU:</span> <span className="font-mono">0070004520000012845622</span></div>
                                            <div className="flex justify-between"><span>Alias:</span> <span className="font-bold">EVENTOS.PREGONAR</span></div>
                                            <div className="flex justify-between"><span>Titular:</span> <span>Pregonar Events S.A.</span></div>
                                            <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-brand-navy font-bold">
                                                <span>Monto:</span> <span>${finalPrice.toLocaleString('es-AR')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-3 flex items-center gap-2"><Upload size={16}/> Adjuntar Comprobante</h4>
                                        <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*,.pdf"
                                                onChange={(e) => setTransferFile(e.target.files?.[0] || null)}
                                            />
                                            {transferFile ? (
                                                <div className="flex items-center gap-2 text-green-600 font-bold">
                                                    <FileText size={24} />
                                                    {transferFile.name}
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload size={32} className="text-gray-300 mb-2" />
                                                    <span className="text-sm text-gray-500 font-medium">Click para subir foto o PDF</span>
                                                </>
                                            )}
                                        </label>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg flex gap-2 items-start">
                                        <AlertCircle size={16} className="text-yellow-600 mt-0.5 shrink-0" />
                                        <p className="text-xs text-yellow-800">
                                            Tu inscripción quedará como <strong>PENDIENTE</strong> hasta que el organizador verifique el pago (24-48hs).
                                        </p>
                                    </div>

                                    <button 
                                        onClick={submitTransferProof}
                                        disabled={!transferFile || isProcessing}
                                        className="w-full bg-brand-navy hover:bg-[#0f112e] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? (
                                            <>Subiendo... <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                                        ) : (
                                            <>Enviar Comprobante <CheckCircle size={18} /></>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 bg-white flex justify-between items-center">
                    {step > 1 ? (
                        <button 
                            onClick={handleBack}
                            className="text-gray-500 font-bold text-sm hover:text-brand-navy px-4"
                        >
                            Atrás
                        </button>
                    ) : (
                        <div></div>
                    )}
                    
                    {step < 3 && (
                        <button 
                            onClick={handleNext}
                            disabled={(step === 1 && !selectedTier) || isProcessing}
                            className={`bg-brand-navy hover:bg-[#0f112e] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isProcessing ? (
                                <>Procesando <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                            ) : (
                                step === 2 && finalPrice === 0 ? (
                                    <>Confirmar Inscripción <CheckCircle size={16} /></>
                                ) : (
                                    <>Siguiente <ArrowLeft className="rotate-180" size={16} /></>
                                )
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

interface EventDetailsPageProps {
  event: Event;
  onBack: () => void;
  onNavigate: (view: 'landing' | 'events' | 'shopwindow' | 'community' | 'profile' | 'create-event' | 'contact-sales' | 'about' | 'workshops' | 'super-admin' | 'organizer-dashboard' | 'tribe-admin' | 'instructor-dashboard' | 'pregonero-admin') => void;
  user?: UserProfile | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const EventDetailsPage: React.FC<EventDetailsPageProps> = ({ 
  event, 
  onBack, 
  onNavigate,
  user,
  onLogin,
  onLogout
}) => {
  // Ensure view starts at top when mounting details
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('Resumen');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<'CONFIRMED' | 'PENDING' | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleNavClick = (view: any) => {
      setIsMobileMenuOpen(false);
      if (view === 'events') {
          onBack();
      } else {
          onNavigate(view);
      }
  };

  const handleRegisterClick = () => {
    if (!user) {
        if (onLogin) onLogin();
        return;
    }
    setShowRegistrationModal(true);
  };

  const handleRegistrationComplete = (status: 'CONFIRMED' | 'PENDING') => {
      setShowRegistrationModal(false);
      setIsRegistered(true);
      setRegistrationStatus(status);
      setShowSuccessModal(true);
  };

  // Helper formats
  const formattedDate = event.date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = event.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const formattedPrice = event.price === 0 ? 'Gratis' : `$${event.price.toLocaleString('es-AR')}`;

  const mapQuery = encodeURIComponent(`${event.location}, ${event.province}`);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-navy">
      
      {/* Navbar (Full Version matching Index) */}
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
              {/* Highlight Eventos and make it go back to list */}
              <button onClick={onBack} className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy">Eventos</button>
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
                    <button onClick={onBack} className="text-left font-bold text-brand-navy py-2 border-b border-gray-50">Eventos</button>
                    <button onClick={() => handleNavClick('workshops')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Talleres</button>
                    <button onClick={() => handleNavClick('shopwindow')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Vitrina de Instructores</button>
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

      {/* Main Content (Added top padding for fixed navbar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
          
          {/* Breadcrumb / Back Button */}
          <div className="mb-6">
              <button 
                  onClick={onBack}
                  className="text-gray-500 hover:text-brand-navy text-sm font-medium flex items-center gap-1 transition-colors"
              >
                  <ArrowLeft size={16} /> Volver al listado
              </button>
          </div>

          {/* Hero Section */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8 shadow-xl">
              <img src={event.image} className="w-full h-full object-cover" alt="Event Hero" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                  <span className="inline-block bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                    {event.category}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">
                      {event.title}
                  </h1>
                  <p className="text-gray-200 text-lg mb-8 max-w-xl font-light line-clamp-2">
                      {event.description || "Detalles del evento no disponibles."}
                  </p>
              </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 relative">
              
              {/* Main Content Column */}
              <div className="flex-1 min-w-0">
                  {/* Tabs */}
                  <div className="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
                      {['Resumen', 'Ubicación', 'Cronograma', 'Detalles'].map(tab => (
                          <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab ? 'text-brand-red border-brand-red' : 'text-gray-500 border-transparent hover:text-brand-navy'}`}
                          >
                              {tab}
                          </button>
                      ))}
                  </div>

                  {/* CONTENT SECTIONS CONTROLLED BY TABS */}
                  
                  {/* RESUMEN VIEW */}
                  {activeTab === 'Resumen' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      {/* About Section */}
                      <section className="mb-12">
                          <h2 className="text-2xl font-display font-bold text-brand-navy mb-4">Sobre el evento</h2>
                          <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base whitespace-pre-line">
                              <p>{event.description || "Prepárate para una experiencia inolvidable..."}</p>
                          </div>
                      </section>
                    </div>
                  )}

                  {/* UBICACIÓN VIEW */}
                  {activeTab === 'Ubicación' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <section className="mb-12" id="ubicacion">
                          <div className="flex justify-between items-center mb-4">
                              <h2 className="text-2xl font-display font-bold text-brand-navy">Ubicación del Evento</h2>
                              <a href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`} target="_blank" rel="noopener noreferrer" className="bg-brand-navy text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-[#0f112e] transition shadow-md">
                                    <Navigation size={14} /> Cómo llegar
                                </a>
                          </div>
                          <div className="relative h-80 md:h-[450px] bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
                              <iframe width="100%" height="100%" frameBorder="0" style={{ border: 0 }} src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`} allowFullScreen title="Mapa del Evento"></iframe>
                          </div>
                          <p className="mt-4 text-sm text-gray-500 flex items-center gap-2"><MapPin size={16} className="text-brand-red" /> {event.location}, {event.province}</p>
                      </section>
                    </div>
                  )}

                  {/* CRONOGRAMA VIEW */}
                  {activeTab === 'Cronograma' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <section className="mb-12">
                          <h2 className="text-2xl font-display font-bold text-brand-navy mb-6">Cronograma</h2>
                          <div className="space-y-6 relative before:absolute before:left-[9px] before:top-2 before:h-full before:w-[2px] before:bg-gray-100">
                              <div className="relative pl-8"><div className="absolute left-0 top-1 w-5 h-5 rounded-full border-4 border-white bg-brand-red ring-1 ring-gray-100"></div><div className="flex justify-between items-start mb-1"><h4 className="font-bold text-brand-navy">Largada Oficial</h4><span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{formattedTime}</span></div></div>
                          </div>
                      </section>
                    </div>
                  )}

                  {/* DETALLES VIEW */}
                  {activeTab === 'Detalles' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <section className="mb-12">
                            <h2 className="text-2xl font-display font-bold text-brand-navy mb-6">Detalles del Evento</h2>
                            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-8">
                                <div><h3 className="font-bold text-lg text-brand-navy mb-3 flex items-center gap-2"><div className="w-1 h-5 bg-brand-red rounded-full"></div>Información Vital</h3><p className="text-gray-600 leading-relaxed">Información detallada sobre requisitos y kits.</p></div>
                            </div>
                        </section>
                    </div>
                  )}

              </div>

              {/* Sidebar (Right Column) */}
              <aside className="lg:w-[350px] shrink-0">
                  <div className="sticky top-24 space-y-6">
                      
                      {/* Registration Card */}
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                          <div className="flex justify-between items-start mb-6">
                              <div>
                                  <p className="text-xs text-gray-400 mb-1">Inscripciones hasta 48hs antes</p>
                                  <div className="flex items-baseline gap-1">
                                      <span className="text-3xl font-display font-bold text-brand-navy">{formattedPrice}</span>
                                      <span className="text-sm text-gray-500">/persona</span>
                                  </div>
                              </div>
                              <button className="text-brand-red hover:bg-red-50 p-2 rounded-full transition"><Heart size={20} /></button>
                          </div>

                          <div className="space-y-4 mb-6">
                              <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
                                  <div className="bg-white p-2 rounded-lg shadow-sm text-brand-red"><Calendar size={18} /></div>
                                  <div><p className="text-xs text-gray-400 font-bold uppercase mb-0.5">FECHA</p><p className="font-bold text-brand-navy text-sm">{formattedDate}</p></div>
                              </div>
                              <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
                                  <div className="bg-white p-2 rounded-lg shadow-sm text-brand-red"><Clock size={18} /></div>
                                  <div><p className="text-xs text-gray-400 font-bold uppercase mb-0.5">HORA</p><p className="font-bold text-brand-navy text-sm">{formattedTime}</p></div>
                              </div>
                          </div>

                          <button 
                            onClick={handleRegisterClick}
                            disabled={isRegistered}
                            className={`w-full font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 mb-4 flex items-center justify-center gap-2 ${
                                isRegistered 
                                ? 'bg-green-500 text-white cursor-default'
                                : 'bg-brand-red hover:bg-red-600 text-white shadow-brand-red/20'
                            }`}
                          >
                              {isRegistered ? (
                                  <>
                                      <CheckCircle size={18} /> ¡Inscrito!
                                  </>
                              ) : (
                                  <>
                                      Inscribirse Ahora <ArrowLeft className="rotate-180" size={18} />
                                  </>
                              )}
                          </button>
                      </div>
                      
                      {/* ... (Organizer Card, Share, etc.) ... */}
                  </div>
              </aside>

          </div>

      </div>
      
       {/* Footer */}
       <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-400 mt-12"><p>© 2024 Pregonar. Todos los derechos reservados.</p></footer>

       {/* Registration Modal Wizard */}
       {showRegistrationModal && user && (
           <RegistrationWizard 
                event={event} 
                user={user} 
                onClose={() => setShowRegistrationModal(false)}
                onComplete={handleRegistrationComplete}
           />
       )}

       {/* Success Modal */}
       {showSuccessModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${registrationStatus === 'CONFIRMED' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {registrationStatus === 'CONFIRMED' ? <CheckCircle size={40} /> : <Clock size={40} />}
                    </div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-2">
                        {registrationStatus === 'CONFIRMED' ? '¡Todo Listo!' : 'Solicitud Recibida'}
                    </h3>
                    <p className="text-gray-500 mb-8">
                        {registrationStatus === 'CONFIRMED' 
                            ? `Te has inscrito correctamente a ${event.title}. Tu ticket está confirmado.` 
                            : `Hemos recibido tu comprobante para ${event.title}. El organizador verificará el pago en breve.`}
                    </p>
                    <button 
                        onClick={() => setShowSuccessModal(false)}
                        className="w-full bg-brand-navy text-white font-bold py-3 rounded-xl hover:bg-[#0f112e] transition"
                    >
                        Entendido
                    </button>
                </div>
            </div>
       )}

    </div>
  );
};
