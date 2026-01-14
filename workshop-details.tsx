
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  Star, 
  Share2, 
  Heart, 
  ShieldCheck, 
  Users,
  ArrowLeft,
  ArrowRight,
  Info,
  ChevronDown,
  Menu,
  X,
  CreditCard,
  Landmark,
  Upload,
  FileText,
  AlertCircle,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { UserProfile } from './auth';

interface Workshop {
  id: string;
  title: string;
  instructor: {
    id?: string;
    name: string;
    image: string;
    title: string;
  };
  image: string;
  category: string;
  rating: number;
  reviews: number;
  date: string;
  time: string;
  duration: string;
  price: number;
  level: string;
  location: string;
  spotsLeft: number;
  description: string;
}

// --- DYNAMIC FORM CONFIGURATION FOR WORKSHOPS ---
const WORKSHOP_FORM_FIELDS = [
    { id: 'full_name', label: 'Nombre Completo', type: 'text', placeholder: 'Nombre del asistente', required: true },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'Para recibir el material', required: true },
    { id: 'phone', label: 'Teléfono / WhatsApp', type: 'tel', placeholder: '+54 9 ...', required: true },
    { id: 'experience', label: 'Nivel de Experiencia', type: 'select', options: ['Principiante', 'Intermedio', 'Avanzado', 'Profesional'], required: true },
    { id: 'needs_materials', label: '¿Necesitas kit de materiales?', type: 'select', options: ['Sí, incluir kit (+$0)', 'No, llevo los míos'], required: true },
    { id: 'notes', label: 'Notas para el instructor', type: 'textarea', placeholder: 'Alguna condición o expectativa...', required: false },
    { id: 'terms', label: 'Acepto los términos y condiciones del taller.', type: 'checkbox', required: true }
];

interface WorkshopRegistrationWizardProps {
    workshop: Workshop;
    user: UserProfile;
    onClose: () => void;
    onComplete: (status: 'CONFIRMED' | 'PENDING') => void;
}

const WorkshopRegistrationWizard: React.FC<WorkshopRegistrationWizardProps> = ({ workshop, user, onClose, onComplete }) => {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transferFile, setTransferFile] = useState<File | null>(null);
    
    // Form Data
    const [formData, setFormData] = useState<Record<string, any>>({
        full_name: user.displayName || '',
        email: user.email || ''
    });

    const handleInputChange = (id: string, value: any) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
             // If Free
             if (workshop.price === 0) {
                 handleFreeRegistration();
             } else {
                 // Move to Payment
             }
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleFreeRegistration = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        saveTicketToLocal('CONFIRMED');
        setIsProcessing(false);
        onComplete('CONFIRMED');
    };

    const processN1coPayment = async () => {
        setIsProcessing(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 2000));
        saveTicketToLocal('CONFIRMED');
        setIsProcessing(false);
        onComplete('CONFIRMED');
    };

    const submitTransferProof = async () => {
        if (!transferFile) return;
        setIsProcessing(true);
        // Simulate Upload
        await new Promise(resolve => setTimeout(resolve, 1500));
        saveTicketToLocal('PENDING');
        setIsProcessing(false);
        onComplete('PENDING');
    };

    const saveTicketToLocal = (status: string) => {
        const newTicket = {
            id: `workshop-${Date.now()}`,
            eventTitle: workshop.title,
            eventDate: new Date().toISOString(), // Mock date format handling needed in real app
            eventLocation: workshop.location,
            status: status,
            tier: 'General',
            category: 'WORKSHOP',
            image: workshop.image
        };
        const existing = JSON.parse(localStorage.getItem('my_tickets') || '[]');
        localStorage.setItem('my_tickets', JSON.stringify([newTicket, ...existing]));
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-xl font-display font-bold text-brand-navy">Inscripción al Taller</h2>
                        <p className="text-sm text-gray-500">{workshop.title}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F8F9FA]">
                    
                    {/* STEP 1: FORM */}
                    {step === 1 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-bold text-brand-navy mb-4">1. Tus Datos</h3>
                            <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm">
                                <Info size={20} />
                                <p>El instructor <strong>{workshop.instructor.name}</strong> recibirá estos datos para preparar la clase.</p>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {WORKSHOP_FORM_FIELDS.map((field) => {
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
                                            <div key={field.id} className="md:col-span-2 mt-2">
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
                                                        <ChevronRightIcon className="rotate-90" size={16} />
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

                    {/* STEP 2: PAYMENT */}
                    {step === 2 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-bold text-brand-navy mb-6">2. Pago del Taller</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div 
                                    onClick={() => setPaymentMethod('card')}
                                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 text-center ${paymentMethod === 'card' ? 'border-brand-red bg-red-50/20' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                >
                                    <div className="bg-brand-navy text-white p-3 rounded-full">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy">Tarjeta de Crédito</h4>
                                        <p className="text-xs text-gray-500">Pago seguro</p>
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
                                        <h4 className="font-bold text-brand-navy">Transferencia</h4>
                                        <p className="text-xs text-gray-500">Adjuntar comprobante</p>
                                    </div>
                                    {paymentMethod === 'transfer' && <div className="absolute top-4 right-4 text-brand-red"><CheckCircle size={20}/></div>}
                                </div>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-in fade-in zoom-in-95">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                                        <span className="text-gray-500">Monto a pagar:</span>
                                        <span className="text-2xl font-bold text-brand-navy">${workshop.price.toLocaleString('es-AR')}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Pago procesado de forma segura. Recibirás tu confirmación al instante.
                                    </p>
                                    <button 
                                        onClick={processN1coPayment}
                                        disabled={isProcessing}
                                        className="w-full bg-brand-navy hover:bg-[#0f112e] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                                    >
                                        {isProcessing ? (
                                            <>Procesando <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                                        ) : (
                                            <>Pagar Ahora <CreditCard size={18} /></>
                                        )}
                                    </button>
                                </div>
                            )}

                            {paymentMethod === 'transfer' && (
                                <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-in fade-in zoom-in-95 space-y-6">
                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-3 flex items-center gap-2"><Landmark size={16}/> Datos Bancarios</h4>
                                        <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm text-gray-700 border border-gray-200">
                                            <div className="flex justify-between"><span>Alias:</span> <span className="font-bold">PREGONAR.TALLERES</span></div>
                                            <div className="flex justify-between"><span>CBU:</span> <span className="font-mono">0000003100000012345678</span></div>
                                            <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-brand-navy font-bold">
                                                <span>Total:</span> <span>${workshop.price.toLocaleString('es-AR')}</span>
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

                                    <button 
                                        onClick={submitTransferProof}
                                        disabled={!transferFile || isProcessing}
                                        className="w-full bg-brand-navy hover:bg-[#0f112e] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? (
                                            <>Subiendo... <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                                        ) : (
                                            <>Informar Pago <CheckCircle size={18} /></>
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
                    
                    {step < 2 && (
                        <button 
                            onClick={handleNext}
                            className={`bg-brand-navy hover:bg-[#0f112e] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 transition-all`}
                        >
                            Siguiente <ArrowLeft className="rotate-180" size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

interface WorkshopDetailsPageProps {
  workshop: Workshop;
  onBack: () => void;
  onNavigate: (view: any) => void;
  user?: UserProfile | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onViewInstructor?: (instructorId: string) => void;
}

export const WorkshopDetailsPage: React.FC<WorkshopDetailsPageProps> = ({ 
  workshop, 
  onBack, 
  onNavigate,
  user,
  onLogin,
  onLogout,
  onViewInstructor
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<'CONFIRMED' | 'PENDING' | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleNavClick = (view: string) => {
      setIsMobileMenuOpen(false);
      if (view === 'workshops') {
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

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-navy">
      
      {/* Navbar (Full Version) */}
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
              <button onClick={() => handleNavClick('workshops')} className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy">Talleres</button>
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
                    <button onClick={() => handleNavClick('events')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Eventos</button>
                    <button onClick={() => handleNavClick('workshops')} className="text-left font-bold text-brand-navy py-2 border-b border-gray-50">Talleres</button>
                    <button onClick={() => handleNavClick('shopwindow')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Vitrina</button>
                    <button onClick={() => handleNavClick('community')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Comunidad</button>
                    <button onClick={() => handleNavClick('contact-sales')} className="text-left font-medium text-gray-700 py-2 border-b border-gray-50">Contacto</button>
                    {!user && <button onClick={onLogin} className="text-left font-medium text-brand-red py-2">Iniciar Sesión</button>}
                </div>
            </div>
        )}
      </nav>

      {/* Main Content (Added padding top for fixed nav) */}
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
        <div className="relative h-[400px] rounded-3xl overflow-hidden mb-8 shadow-xl group">
            <img src={workshop.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" alt={workshop.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent"></div>
            
            <div className="absolute top-6 left-6">
                <span className="bg-white text-brand-navy text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <CheckCircle size={12} className="text-green-500" /> CERTIFIED COURSE
                </span>
            </div>

            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                    {workshop.title}
                </h1>
                <div className="flex flex-wrap gap-6 text-white/90 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-brand-red" />
                        {workshop.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} className="text-brand-red" />
                        {workshop.time} ({workshop.duration})
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-brand-red" />
                        {workshop.location}
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Content */}
            <div className="lg:w-2/3 space-y-12">
                
                {/* About */}
                <section>
                    <h2 className="text-2xl font-display font-bold text-brand-navy mb-4">Sobre el Taller</h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                        {workshop.description || "Únete a nosotros para una experiencia inmersiva diseñada tanto para principiantes como para entusiastas. Aprenderás técnicas fundamentales, recibirás retroalimentación personalizada y conectarás con una comunidad apasionada."}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Este taller intensivo está estructurado para maximizar tu aprendizaje práctico. No solo te llevarás nuevos conocimientos, sino también obras o habilidades tangibles que podrás seguir desarrollando por tu cuenta.
                    </p>
                </section>

                {/* Learning Outcomes */}
                <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="flex items-center gap-2 text-xl font-bold text-brand-navy mb-6">
                        <div className="p-1.5 bg-red-50 rounded-lg"><Star size={20} className="text-brand-red" fill="currentColor" /></div>
                        Lo que aprenderás
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Dominio de técnicas fundamentales', 'Uso correcto de herramientas y materiales', 'Teoría y composición avanzada', 'Desarrollo de estilo personal'].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                                <span className="text-gray-600">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Materials */}
                <section>
                    <h3 className="text-xl font-bold text-brand-navy mb-4">Materiales</h3>
                    <div className="bg-brand-navy/5 rounded-2xl p-6 border border-brand-navy/10">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-brand-red uppercase tracking-widest mb-2 block">TRAER CONTIGO</span>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                                <li>Ropa cómoda</li>
                                <li>Cuaderno de notas</li>
                                <li>Botella de agua</li>
                            </ul>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2 block">NOSOTROS PROVEEMOS</span>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                                <li>Todo el equipamiento técnico necesario</li>
                                <li>Materiales de consumo (pinturas, arcilla, etc.)</li>
                                <li>Refrigerios ligeros</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Instructor */}
                <section>
                    <h3 className="text-xl font-bold text-brand-navy mb-6">Instructor</h3>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-6">
                        <img src={workshop.instructor.image} alt={workshop.instructor.name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
                        <div>
                            <h4 className="text-lg font-bold text-brand-navy">{workshop.instructor.name}</h4>
                            <p className="text-brand-red text-sm font-bold uppercase mb-3">{workshop.instructor.title}</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Con más de 10 años de experiencia enseñando y practicando profesionalmente. Apasionado por compartir conocimientos y ver crecer a sus estudiantes.
                            </p>
                            {workshop.instructor.id && (
                                <button 
                                    onClick={() => onViewInstructor?.(workshop.instructor.id!)}
                                    className="text-brand-navy text-sm font-bold underline decoration-2 decoration-brand-red/30 hover:decoration-brand-red transition-all"
                                >
                                    Ver Perfil Completo
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Attendees */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-brand-navy">Quienes Asisten</h3>
                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">+12 Amigos</span>
                    </div>
                    <div className="flex -space-x-4 overflow-hidden py-2">
                        {[1,2,3,4,5].map((i) => (
                            <img key={i} className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover" src={`https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=100`} alt="" />
                        ))}
                        <div className="h-12 w-12 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                            +18
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Conecta con otros entusiastas antes de la sesión.</p>
                </section>

            </div>

            {/* Sidebar Booking */}
            <div className="lg:w-1/3">
                <div className="sticky top-28">
                    <div className="bg-brand-navy rounded-t-2xl p-4 text-center">
                        <span className="text-white font-bold text-sm uppercase tracking-widest">OFERTA LIMITADA</span>
                        <p className="text-white/80 text-xs mt-1">El registro cierra pronto</p>
                    </div>
                    <div className="bg-white rounded-b-2xl p-6 shadow-xl border border-t-0 border-gray-100 relative overflow-hidden">
                        
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-4xl font-display font-bold text-brand-navy">${workshop.price}</span>
                            <span className="text-gray-500 text-sm">/ persona</span>
                        </div>

                        {/* Group Discount Box */}
                        <div className="bg-red-50 border border-red-100 rounded-lg p-3 my-4 flex items-center gap-3">
                            <Users size={20} className="text-brand-red" />
                            <div>
                                <p className="font-bold text-brand-navy text-sm">Descuento Grupal</p>
                                <p className="text-xs text-brand-red">Ahorra $20 p/p reservando 2+ lugares.</p>
                            </div>
                            <div className="ml-auto bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded">POPULAR</div>
                        </div>

                        <div className="space-y-4 mb-6 text-sm text-gray-600">
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span>Fecha</span>
                                <span className="font-bold text-brand-navy">{workshop.date}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span>Horario</span>
                                <span className="font-bold text-brand-navy">{workshop.time}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span>Lugares</span>
                                <span className="font-bold text-brand-red">Solo quedan {workshop.spotsLeft}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleRegisterClick}
                            disabled={isRegistered}
                            className={`w-full font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mb-4 ${
                                isRegistered 
                                ? 'bg-green-500 text-white cursor-default'
                                : 'bg-brand-red hover:bg-red-600 text-white shadow-brand-red/25'
                            }`}
                        >
                            {isRegistered ? (
                                <>
                                    <CheckCircle size={18} /> ¡Lugar Asegurado!
                                </>
                            ) : (
                                <>
                                    Asegurar mi Lugar <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                        
                        <p className="text-center text-xs text-gray-400 mb-6">
                            100% Garantía de devolución si cancelas 48h antes.
                        </p>

                        {/* Countdown */}
                        <div className="bg-[#0f112e] rounded-xl p-4 text-center">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">EL REGISTRO CIERRA EN</p>
                            <div className="flex justify-center gap-2 text-white">
                                <div className="bg-white/10 rounded px-2 py-1">
                                    <span className="font-bold text-lg text-brand-red">02</span>
                                    <span className="block text-[8px] text-gray-400">DÍAS</span>
                                </div>
                                <span className="py-1">:</span>
                                <div className="bg-white/10 rounded px-2 py-1">
                                    <span className="font-bold text-lg text-brand-red">14</span>
                                    <span className="block text-[8px] text-gray-400">HRS</span>
                                </div>
                                <span className="py-1">:</span>
                                <div className="bg-white/10 rounded px-2 py-1">
                                    <span className="font-bold text-lg text-brand-red">45</span>
                                    <span className="block text-[8px] text-gray-400">MINS</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    <div className="mt-4 text-center">
                        <button className="text-gray-400 text-xs flex items-center justify-center gap-1 hover:text-brand-navy">
                            <Info size={12} /> ¿Necesitas ayuda con la reserva?
                        </button>
                    </div>
                </div>
            </div>

        </div>
      </div>

        {/* Registration Modal Wizard */}
        {showRegistrationModal && user && (
           <WorkshopRegistrationWizard 
                workshop={workshop} 
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
                        {registrationStatus === 'CONFIRMED' ? '¡Lugar Asegurado!' : 'Pago en Proceso'}
                    </h3>
                    <p className="text-gray-500 mb-8">
                        {registrationStatus === 'CONFIRMED' 
                            ? `Te has inscrito correctamente a ${workshop.title}. Te enviamos los detalles por correo.` 
                            : `Hemos recibido tu comprobante para ${workshop.title}. El instructor confirmará tu plaza en breve.`}
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
