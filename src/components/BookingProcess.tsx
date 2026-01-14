
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Check, 
  CreditCard, 
  Clock, 
  MapPin, 
  Star, 
  User, 
  ChevronRight, 
  ShieldCheck, 
  ChevronLeft, 
  Plus,
  Lock,
  ArrowRight,
  Heart,
  Music,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import { UserProfile } from '../lib/auth';

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

interface BookingProcessProps {
  instructor: Instructor;
  onBack: () => void;
  onNavigate: (view: any) => void;
  user?: UserProfile | null;
  onLogin?: () => void;
}

export const BookingProcess: React.FC<BookingProcessProps> = ({ instructor, onBack, onNavigate, user, onLogin }) => {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('5-pack');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400 gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} className={i >= Math.floor(rating) ? "text-gray-300" : ""} />
        ))}
      </div>
    );
  };

  const handleNavClick = (view: any) => {
      onNavigate(view);
      setIsMobileMenuOpen(false);
  };

  const Navbar = () => (
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
              <button onClick={() => handleNavClick('shopwindow')} className="text-brand-navy font-bold text-sm h-full flex items-center border-b-2 border-brand-navy">Vitrina</button>
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
  );

  // --- STEP 1: SELECT SCHEDULE ---
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-brand-navy pb-24 flex flex-col">
        {/* Header */}
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 py-8 pt-28 flex-grow w-full">
            <div className="mb-6">
                <button 
                    onClick={onBack}
                    className="text-gray-500 hover:text-brand-navy text-sm font-medium flex items-center gap-1 transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Instructor
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Panel: Profile Summary */}
                <div className="lg:w-1/4">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center sticky top-28">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <img src={instructor.image} className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg" alt={instructor.name} />
                            <div className="absolute bottom-0 right-0 bg-brand-red text-white p-1.5 rounded-full border-2 border-white">
                                <Check size={14} strokeWidth={3} />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-brand-navy mb-1">{instructor.name}</h2>
                        <p className="text-brand-red text-sm font-medium mb-3">{instructor.title}</p>
                        
                        <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mb-6">
                            <MapPin size={14} />
                            {instructor.location}
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {['YOGA', 'PILATES', 'MEDITATION'].map(tag => (
                                <span key={tag} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>

                        <div className="flex flex-col items-center border-t border-gray-100 pt-6">
                            <span className="text-4xl font-bold text-brand-navy">{instructor.rating}</span>
                            <div className="flex gap-1 text-yellow-400 my-2">
                                {[...Array(5)].map((_,i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-gray-400 text-xs">120 reviews</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-6 mt-6 border border-blue-100 hidden lg:block">
                        <div className="flex items-start gap-3">
                            <div className="bg-brand-navy text-white p-1.5 rounded-full mt-0.5">
                                <span className="font-bold text-xs">i</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-navy text-sm mb-1">Session Policy</h4>
                                <p className="text-xs text-brand-navy/70 leading-relaxed">
                                    Cancellations made 24h before the session are fully refundable. Please bring your own mat and water bottle.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Selection */}
                <div className="lg:w-3/4">
                    {/* Stepper */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-brand-navy">Step 1 of 3</h2>
                            <div className="w-12 h-1 bg-brand-red rounded-full mt-2"></div>
                        </div>
                        <button className="text-brand-red font-medium text-sm hover:underline">Select Schedule</button>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 border-b border-gray-200 pb-2 mb-8 uppercase font-medium tracking-wide">
                        <span className="text-brand-red">Class & Time</span>
                        <span className="hidden sm:inline">Details</span>
                        <span className="hidden sm:inline">Payment</span>
                    </div>

                    {/* Packages */}
                    <div className="mb-10">
                        <h3 className="flex items-center gap-2 font-bold text-brand-navy mb-6">
                            <div className="rotate-45"><CreditCard size={18} className="text-brand-navy" /></div>
                            Select a Package
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Card 1 */}
                            <div 
                                onClick={() => setSelectedPackage('single')}
                                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${selectedPackage === 'single' ? 'border-brand-red bg-red-50/10' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-2xl font-bold text-brand-navy">$25</span>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPackage === 'single' ? 'border-brand-red' : 'border-gray-300'}`}>
                                        {selectedPackage === 'single' && <div className="w-2.5 h-2.5 bg-brand-red rounded-full"></div>}
                                    </div>
                                </div>
                                <h4 className="font-bold text-brand-navy mb-2">Single Session</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">Perfect for trying out a class without commitment.</p>
                            </div>

                            {/* Card 2 */}
                            <div 
                                onClick={() => setSelectedPackage('5-pack')}
                                className={`border-2 rounded-xl p-6 cursor-pointer transition-all relative ${selectedPackage === '5-pack' ? 'border-brand-red bg-white shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                            >
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-brand-navy">$110</span>
                                        <span className="bg-red-100 text-brand-red text-[10px] font-bold px-1.5 py-0.5 rounded">SAVE 12%</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPackage === '5-pack' ? 'border-brand-red' : 'border-gray-300'}`}>
                                        {selectedPackage === '5-pack' && <div className="w-2.5 h-2.5 bg-brand-red rounded-full"></div>}
                                    </div>
                                </div>
                                <h4 className="font-bold text-brand-navy mb-2">5-Class Pack</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">Commit to your practice and save on per-class costs.</p>
                            </div>

                            {/* Card 3 */}
                            <div 
                                onClick={() => setSelectedPackage('workshop')}
                                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${selectedPackage === 'workshop' ? 'border-brand-red bg-red-50/10' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-2xl font-bold text-brand-navy">$200</span>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPackage === 'workshop' ? 'border-brand-red' : 'border-gray-300'}`}>
                                        {selectedPackage === 'workshop' && <div className="w-2.5 h-2.5 bg-brand-red rounded-full"></div>}
                                    </div>
                                </div>
                                <h4 className="font-bold text-brand-navy mb-2">Monthly Workshop</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">Full access to weekend intensive workshops.</p>
                            </div>
                        </div>
                    </div>

                    {/* Available Times */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="flex items-center gap-2 font-bold text-brand-navy">
                                <Calendar size={18} className="text-brand-navy" />
                                Available Times
                            </h3>
                            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                                <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={16} className="text-gray-400" /></button>
                                <span className="text-xs font-bold text-brand-navy px-2">Oct 16 - Oct 22, 2023</span>
                                <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={16} className="text-gray-400" /></button>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 overflow-x-auto">
                            <div className="min-w-[500px]">
                                <div className="grid grid-cols-5 gap-4 text-center mb-6">
                                    {[
                                        { day: 'MON', date: 16 },
                                        { day: 'TUE', date: 17 },
                                        { day: 'WED', date: 18, active: true },
                                        { day: 'THU', date: 19 },
                                        { day: 'FRI', date: 20 },
                                    ].map((d, i) => (
                                        <div key={i} className={`flex flex-col items-center p-2 rounded-xl transition cursor-pointer ${d.active ? 'bg-red-50 ring-2 ring-brand-red/20' : 'hover:bg-white'}`}>
                                            <span className={`text-[10px] font-bold mb-1 ${d.active ? 'text-brand-red' : 'text-gray-400'}`}>{d.day}</span>
                                            <span className={`text-lg font-bold ${d.active ? 'text-brand-red' : 'text-brand-navy'}`}>{d.date}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-5 gap-4">
                                    <div className="text-center text-xs text-gray-400 py-3">No slots</div>
                                    <div className="space-y-3">
                                        <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-brand-navy hover:border-brand-navy transition">09:00 AM</button>
                                        <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-brand-navy hover:border-brand-navy transition">06:00 PM</button>
                                    </div>
                                    <div className="space-y-3">
                                        <button className="w-full py-2 bg-brand-red text-white rounded-lg text-xs font-bold shadow-md shadow-brand-red/20">10:00 AM</button>
                                        <button onClick={() => setSelectedTime('02:00 PM')} className="w-full py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-brand-navy hover:border-brand-navy transition">02:00 PM</button>
                                        <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-brand-navy hover:border-brand-navy transition">05:30 PM</button>
                                    </div>
                                    <div className="space-y-3">
                                        <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-brand-navy hover:border-brand-navy transition">09:00 AM</button>
                                    </div>
                                    <div className="text-center text-xs text-gray-400 py-3">Full</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mt-8 justify-center">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="w-2 h-2 rounded-full bg-brand-red"></div> Selected
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="w-2 h-2 rounded-full border border-gray-400"></div> Available
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="w-2 h-2 rounded-full bg-gray-200"></div> Unavailable
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Sticky Footer */}
        <div className="fixed bottom-0 left-0 w-full bg-brand-navy text-white p-4 shadow-xl z-50">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest">YOUR SELECTION</span>
                    <div className="flex items-center gap-2 text-lg font-medium">
                        <span className="font-bold">5-Class Pack</span>
                        <span className="text-gray-500">•</span>
                        <span>Wed, Oct 18 @ {selectedTime}</span>
                    </div>
                </div>
                <button 
                    onClick={() => setStep(2)}
                    className="bg-brand-red hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-brand-red/20 flex items-center gap-2 transition-all active:scale-95 w-full sm:w-auto justify-center"
                >
                    Continue to Details <ArrowRight size={18} />
                </button>
            </div>
        </div>
      </div>
    );
  }

  // --- STEP 2: PAYMENT ---
  if (step === 2) {
      return (
          <div className="min-h-screen bg-white font-sans text-brand-navy flex flex-col">
              <Navbar />

              <div className="flex-grow bg-[#F8F9FA] py-12 px-4 pt-32">
                  <div className="max-w-5xl mx-auto">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 cursor-pointer hover:text-brand-navy" onClick={() => setStep(1)}>
                          <ChevronLeft size={16} /> Back to Schedule
                      </div>

                      <div className="flex flex-col lg:flex-row gap-8">
                          
                          {/* Left: Summary */}
                          <div className="lg:w-1/3 space-y-6">
                              <div className="relative h-48 rounded-2xl overflow-hidden">
                                  <img src="https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1000" className="w-full h-full object-cover" />
                                  <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
                                  <span className="absolute bottom-4 left-4 bg-white text-brand-navy text-[10px] font-bold px-2 py-1 rounded">WORKSHOP</span>
                              </div>
                              
                              <div>
                                  <h2 className="text-2xl font-display font-bold text-brand-navy mb-2">Booking Summary</h2>
                                  <p className="text-sm text-gray-500">Review your details before paying.</p>
                              </div>

                              <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
                                  <h3 className="font-bold text-lg">Advanced Pottery Workshop</h3>
                                  <div className="flex items-start gap-3 text-sm text-gray-600">
                                      <Calendar size={16} className="mt-0.5" />
                                      <div>
                                          <p className="font-bold text-brand-navy">Sat, Oct 24 • 10:00 AM</p>
                                          <p className="text-xs text-brand-red cursor-pointer">Add to calendar</p>
                                      </div>
                                  </div>
                                  <div className="flex items-start gap-3 text-sm text-gray-600">
                                      <MapPin size={16} className="mt-0.5" />
                                      <div>
                                          <p className="font-bold text-brand-navy">Terra Art Studio</p>
                                          <p className="text-xs">123 Artisan Way, Arts District</p>
                                      </div>
                                  </div>
                              </div>

                              <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                                   <img src={instructor.image} className="w-12 h-12 rounded-full object-cover" />
                                   <div className="flex-1">
                                       <p className="text-xs text-gray-400">Instructor</p>
                                       <p className="font-bold text-brand-navy">{instructor.name}</p>
                                   </div>
                                   <div className="flex items-center gap-1 text-xs font-bold text-brand-navy">
                                       <Star size={12} className="text-yellow-400" fill="currentColor" /> {instructor.rating}
                                   </div>
                              </div>

                              <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-3">
                                  <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">1 x Workshop Ticket</span>
                                      <span className="font-bold">$45.00</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Service Fee</span>
                                      <span className="font-bold">$2.50</span>
                                  </div>
                                  <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-bold text-brand-navy">
                                      <span>Total</span>
                                      <span>$47.50</span>
                                  </div>
                              </div>

                              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                  <Lock size={12} /> Payments are secure and encrypted
                              </div>
                          </div>

                          {/* Right: Payment Details */}
                          <div className="lg:w-2/3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
                               <h2 className="text-2xl font-bold text-brand-navy mb-6">Payment Details</h2>
                               
                               <h3 className="text-sm font-bold text-brand-navy mb-3">Select Payment Method</h3>
                               <div className="grid grid-cols-3 gap-4 mb-8">
                                   <div className="border border-brand-red bg-red-50/30 p-4 rounded-xl flex flex-col justify-between h-24 relative cursor-pointer">
                                       <div className="w-3 h-3 rounded-full border border-brand-red bg-white flex items-center justify-center absolute top-4 right-4">
                                            <div className="w-1.5 h-1.5 bg-brand-red rounded-full"></div>
                                       </div>
                                       <CreditCard size={24} className="text-brand-navy" />
                                       <span className="text-sm font-medium">Card</span>
                                   </div>
                                   <div className="border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-24 relative cursor-pointer hover:border-gray-300">
                                       <div className="w-3 h-3 rounded-full border border-gray-300 absolute top-4 right-4"></div>
                                       <span className="font-serif font-bold italic text-xl">PayPal</span>
                                       <span className="text-sm font-medium">PayPal</span>
                                   </div>
                                   <div className="border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-24 relative cursor-pointer hover:border-gray-300">
                                       <div className="w-3 h-3 rounded-full border border-gray-300 absolute top-4 right-4"></div>
                                       <div className="bg-brand-navy text-white w-6 h-6 rounded flex items-center justify-center font-bold text-xs">W</div>
                                       <span className="text-sm font-medium">Wallet</span>
                                   </div>
                               </div>

                               <div className="space-y-6">
                                   <div>
                                       <label className="block text-sm text-gray-500 mb-2">Card Number</label>
                                       <div className="relative">
                                           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                               <CreditCard size={18} />
                                           </div>
                                           <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-10 focus:outline-none focus:border-brand-navy" />
                                           <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 bg-green-100 rounded-full p-0.5">
                                               <Check size={12} />
                                           </div>
                                       </div>
                                   </div>
                                   
                                   <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-2">Expiry Date</label>
                                            <input type="text" placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-navy" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-2">CVC</label>
                                            <div className="relative">
                                                <input type="text" placeholder="123" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-navy" />
                                                <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>
                                   </div>

                                   <div>
                                       <label className="block text-sm text-gray-500 mb-2">Cardholder Name</label>
                                       <input type="text" placeholder="Full name as on card" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-navy" />
                                   </div>
                               </div>

                               <div className="mt-8 pt-8 border-t border-gray-100">
                                   <label className="flex items-center gap-2 text-sm text-brand-navy font-bold mb-3">
                                       <div className="text-brand-red rotate-45"><div className="w-4 h-4 bg-brand-red rounded-sm"></div></div>
                                       Have a promo code?
                                   </label>
                                   <div className="flex gap-2">
                                       <input type="text" placeholder="Enter code" className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none" />
                                       <button className="bg-gray-100 hover:bg-gray-200 text-brand-navy font-bold px-6 py-2 rounded-xl text-sm">Apply</button>
                                   </div>
                               </div>

                               <button 
                                onClick={() => setStep(3)}
                                className="w-full bg-brand-red hover:bg-red-600 text-white font-bold text-lg py-4 rounded-xl mt-8 shadow-lg shadow-brand-red/20 flex items-center justify-center gap-4 transition-all active:scale-95"
                               >
                                   Confirm and Pay <span className="bg-black/10 px-2 py-0.5 rounded text-sm">$47.50</span> <ArrowRight size={20} />
                               </button>
                               
                               <p className="text-center text-xs text-gray-400 mt-4">By clicking the button, you agree to Pregonar's <span className="underline cursor-pointer">Terms of Service</span>.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // --- STEP 3: CONFIRMATION ---
  return (
    <div className="min-h-screen bg-[#FFFBF9] font-sans text-brand-navy flex flex-col">
         <Navbar />

         <div className="max-w-4xl mx-auto text-center pt-32 pb-20 px-4 flex-grow w-full">
             
             <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center text-white shadow-2xl shadow-brand-red/40 mx-auto mb-8 animate-bounce">
                 <Check size={40} strokeWidth={3} />
             </div>

             <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-navy mb-4">You're all set! Booking Confirmed.</h1>
             <p className="text-gray-500 text-lg mb-12">We have sent a receipt to <span className="text-brand-navy font-medium">sarah.j@example.com</span></p>

             {/* Confirmation Card */}
             <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 mx-auto max-w-3xl flex flex-col md:flex-row gap-6 text-left relative overflow-hidden">
                 <div className="md:w-5/12 relative">
                     <img src="https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=1000" className="w-full h-full object-cover rounded-2xl min-h-[250px]" />
                     <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                         <Music size={12} /> Salsa
                     </div>
                     <div className="absolute bottom-12 left-4 text-white font-bold text-xl shadow-black drop-shadow-md">
                         Salsa Fusion Masterclass
                     </div>
                 </div>

                 <div className="md:w-7/12 flex flex-col justify-center py-2">
                     <div className="grid grid-cols-2 gap-y-6 mb-8">
                         <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">DATE & TIME</p>
                             <div className="flex items-start gap-2">
                                 <Calendar size={18} className="text-brand-red mt-0.5" />
                                 <p className="font-bold text-brand-navy text-sm">Sat, Oct 24 • 10:00 AM</p>
                             </div>
                         </div>
                         <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">INSTRUCTOR</p>
                             <div className="flex items-center gap-2">
                                 <img src={instructor.image} className="w-6 h-6 rounded-full object-cover" />
                                 <p className="font-bold text-brand-navy text-sm">{instructor.name}</p>
                             </div>
                         </div>
                         <div className="col-span-2">
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">LOCATION</p>
                             <div className="flex items-start gap-2">
                                 <MapPin size={18} className="text-brand-red mt-0.5" />
                                 <div>
                                    <p className="font-bold text-brand-navy text-sm">Studio B, Downtown Arts Center</p>
                                    <p className="text-xs text-brand-red cursor-pointer">View on Map</p>
                                 </div>
                             </div>
                         </div>
                     </div>

                     <div className="flex items-center justify-between border-t border-gray-100 pt-6 mb-6">
                         <span className="text-xs text-gray-400">Booking Reference</span>
                         <span className="bg-gray-100 px-3 py-1 rounded text-xs font-mono font-bold">#AB12345</span>
                     </div>

                     <div className="flex gap-4 flex-col sm:flex-row">
                         <button className="flex-1 bg-brand-red/90 hover:bg-brand-red text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-red/20 transition-all flex items-center justify-center gap-2">
                             <Calendar size={16} /> Add to Calendar
                         </button>
                         <button className="flex-1 border border-teal-500 text-teal-600 hover:bg-teal-50 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                             <MessageCircle size={16} /> Message Instructor
                         </button>
                     </div>
                 </div>
             </div>

             <button onClick={() => onNavigate('shopwindow')} className="mt-12 text-gray-500 font-medium hover:text-brand-navy flex items-center justify-center gap-2 mx-auto">
                 <ArrowLeft size={18} /> Go to My Bookings
             </button>
         </div>

         <div className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-100 bg-white w-full">
             <div className="flex justify-between items-end mb-8">
                 <h3 className="text-2xl font-bold text-brand-navy">Keep the momentum going</h3>
                 <a href="#" className="text-brand-red font-bold text-sm hover:underline">View all events</a>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Recommendation 1 */}
                 <div className="rounded-2xl overflow-hidden relative h-64 group cursor-pointer">
                     <img src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1000" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                     <div className="absolute top-4 right-4 bg-white p-2 rounded-full cursor-pointer hover:text-brand-red"><Heart size={16} /></div>
                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                         <span className="bg-white text-brand-navy text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block"><Star size={10} fill="currentColor" className="inline mr-1 text-yellow-400"/> 4.9</span>
                         <h4 className="font-bold text-lg mb-1">Sunrise Yoga Flow</h4>
                         <p className="text-xs text-gray-300 mb-1">with Sarah Jenkins</p>
                         <p className="text-xs font-bold">Sun, Oct 25 • 7:00 AM</p>
                     </div>
                 </div>
                  {/* Recommendation 2 */}
                  <div className="rounded-2xl overflow-hidden relative h-64 group cursor-pointer">
                     <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                     <div className="absolute top-4 right-4 bg-white p-2 rounded-full cursor-pointer hover:text-brand-red"><Heart size={16} /></div>
                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                         <span className="bg-white text-brand-navy text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block"><Star size={10} fill="currentColor" className="inline mr-1 text-yellow-400"/> 5.0</span>
                         <h4 className="font-bold text-lg mb-1">Contemporary Basics</h4>
                         <p className="text-xs text-gray-300 mb-1">with Studio 88</p>
                         <p className="text-xs font-bold">Tue, Oct 27 • 6:30 PM</p>
                     </div>
                 </div>
                  {/* Recommendation 3 */}
                  <div className="rounded-2xl overflow-hidden relative h-64 group cursor-pointer">
                     <img src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                     <div className="absolute top-4 right-4 bg-white p-2 rounded-full cursor-pointer hover:text-brand-red"><Heart size={16} /></div>
                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                         <span className="bg-white text-brand-navy text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block"><Star size={10} fill="currentColor" className="inline mr-1 text-yellow-400"/> 4.8</span>
                         <h4 className="font-bold text-lg mb-1">Weekend Tennis Open</h4>
                         <p className="text-xs text-gray-300 mb-1">with Coach Mike</p>
                         <p className="text-xs font-bold">Sat, Oct 31 • 9:00 AM</p>
                     </div>
                 </div>
             </div>
         </div>
    </div>
  );
};

// Helper for SearchIcon
const SearchIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
