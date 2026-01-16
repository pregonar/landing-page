import React, { useState } from 'react';
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Upload,
    Image as ImageIcon,
    CheckCircle,
    Type,
    Clock,
    DollarSign,
    ChevronRight,
    ShieldCheck,
    Plus,
    Trash2,
    Edit2,
    Users,
    Activity,
    Award,
    Lock,
    Globe,
    Bike,
    Waves,
    Mountain,
    Dumbbell,
    FileText,
    X,
    CreditCard,
    Map as MapIcon,
    User,
    Minus,
    ArrowRight
} from 'lucide-react';
import { UserProfile } from '../lib/auth';
import { createEvent, Event } from '../services/events';

interface CreateEventPageProps {
    onNavigate: (view: 'landing' | 'events' | 'shopwindow' | 'profile' | 'create-event') => void;
    user?: UserProfile | null;
    onLogin?: () => void;
}

// --- MOCK DATA ---
const CATEGORIES = [
    { id: 'running', name: 'Road Running', icon: <Activity size={32} />, desc: 'Marathon, 10k, 5k' },
    { id: 'trail', name: 'Trail Running', icon: <Mountain size={32} />, desc: 'Mountain, Ultra, Sky' },
    { id: 'triathlon', name: 'Triathlon', icon: <Dumbbell size={32} />, desc: 'Ironman, Sprint' },
    { id: 'cycling', name: 'Cycling', icon: <Bike size={32} />, desc: 'Road, Gravel, MTB' },
    { id: 'swimming', name: 'Swimming', icon: <Waves size={32} />, desc: 'Open Water, Pool' },
    { id: 'other', name: 'Obstacle / Other', icon: <Award size={32} />, desc: 'Custom Format' },
];

const CURRENCIES = ['USD - US Dollar ($)', 'EUR - Euro (€)', 'ARS - Peso Argentino ($)', 'CLP - Peso Chileno ($)'];

export const CreateEventPage: React.FC<CreateEventPageProps> = ({ onNavigate, user, onLogin }) => {
    const [step, setStep] = useState(1);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    // --- FORM STATE ---
    const [formData, setFormData] = useState({
        // Step 1: Category
        category: '',
        currency: 'USD - US Dollar ($)',
        timezone: 'EST (UTC-05:00) New York, America',
        // Step 2: Location
        locationType: 'Venue',
        country: '',
        state: '',
        city: '',
        address: '',
        // Step 3: Tickets
        tickets: [
            { id: '1', name: 'Early Bird', available: 100, price: 25, status: 'Active' },
            { id: '2', name: 'General Admission', available: 500, price: 45, status: 'Active' },
            { id: '3', name: 'VIP Experience', available: 50, price: 120, status: 'Draft' },
        ],
        // Step 4: Documents & Sponsors
        documents: [
            { id: 'd1', name: 'regulations_v2.pdf', size: '2.4 MB', status: 'uploaded' },
            { id: 'd2', name: 'Medical Waiver', status: 'pending' }
        ],
        sponsors: [
            { id: '1', name: 'Spotify', url: 'https://spotify.com', tier: 'Diamond' },
            { id: '2', name: 'Airbnb', url: 'https://airbnb.com', tier: 'Diamond' }
        ],
        // General
        title: 'Urban Marathon 2024: City Lights',
        date: '2024-10-15',
        time: '08:00',
    });

    const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
    const updateField = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

    const totalRevenue = formData.tickets.reduce((acc, t) => acc + (t.price * t.available), 0);
    const platformFees = totalRevenue * 0.02; // 2% mock fee

    // --- PUBLISH HANDLER ---
    const handlePublish = async () => {
        setIsPublishing(true);
        try {
            // Construct Date Object
            const eventDate = new Date(`${formData.date}T${formData.time}`);

            // Determine Price (min price from tickets, or 0)
            const minPrice = formData.tickets.length > 0
                ? Math.min(...formData.tickets.map(t => t.price))
                : 0;

            const newEvent: Omit<Event, 'id'> = {
                title: formData.title,
                location: formData.city || formData.address || 'Ubicación por definir',
                province: formData.state || formData.country || 'N/A',
                date: eventDate,
                category: formData.category || 'VARIOS',
                tags: [formData.category], // Simple tag from category
                price: minPrice,
                // Default image for now - in a real app we would upload the image to Storage first
                image: "https://images.unsplash.com/photo-1552674605-46d530064509?q=80&w=1000",
                difficulty: 'Principiante', // Default
                durationCategory: 'medium', // Default
                duration: '4h', // Default/Placeholder
                description: `Event organized by ${user?.displayName || 'Unknown'}`,
                organizer: user?.displayName || 'Organizador',
                capacity: formData.tickets.reduce((acc, t) => acc + t.available, 0),
                registered: 0
            };

            const id = await createEvent(newEvent);
            console.log('Event published with ID:', id);

            // Show success feedback
            alert('¡Evento Publicado con Éxito!');
            onNavigate('events');
        } catch (error) {
            console.error("Error publishing event:", error);
            alert("Hubo un error al publicar el evento en Firestore. Por favor intenta de nuevo.");
        } finally {
            setIsPublishing(false);
        }
    };

    // --- AUTH GUARD ---
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-100">
                    <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock size={32} className="text-brand-red" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-brand-navy mb-3">Organizer Access</h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Please sign in to your organizer account to create and manage events.
                    </p>

                    <button
                        onClick={async () => {
                            setIsLoginLoading(true);
                            if (onLogin) await onLogin();
                            setIsLoginLoading(false);
                        }}
                        disabled={isLoginLoading}
                        className="w-full bg-brand-navy text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#0f112e] transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        {isLoginLoading ? (
                            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Connecting...</span>
                        ) : (
                            <>
                                <User size={20} />
                                Log In / Sign Up
                            </>
                        )}
                    </button>
                    <button onClick={() => onNavigate('landing')} className="mt-6 text-sm text-gray-400 hover:text-brand-navy font-medium">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    // --- WIZARD LAYOUT ---
    return (
        <div className="min-h-screen bg-[#F4F6F8] font-sans text-brand-navy flex flex-col">
            {/* Top Bar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 px-6 h-16 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => onNavigate('landing')} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="font-bold text-lg text-brand-navy hidden md:block">
                            {step === 1 && "Select Event Category"}
                            {step === 2 && "Location Details"}
                            {step === 3 && "Ticketing & Pricing"}
                            {step === 4 && "Resources"}
                            {step === 5 && "Final Review"}
                        </h1>
                        <span className="text-xs text-gray-400 md:hidden">Step {step} of 5</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <div className="flex gap-1.5 mr-4">
                        {[1, 2, 3, 4, 5].map(s => (
                            <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'w-8 bg-brand-red' : 'w-2 bg-gray-200'}`}></div>
                        ))}
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {step} of 5</span>
                </div>

                <div className="flex items-center gap-3">
                    <button className="text-sm font-bold text-gray-500 hover:text-brand-navy px-4">Save Draft</button>
                    {step < 5 ? (
                        <button
                            onClick={handleNext}
                            className="bg-brand-navy text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#0f112e] shadow-md transition-all"
                        >
                            Next Step <ChevronRight size={16} className="inline ml-1" />
                        </button>
                    ) : (
                        <button
                            onClick={handlePublish}
                            disabled={isPublishing}
                            className="bg-brand-red text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-600 shadow-lg shadow-brand-red/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPublishing ? 'Publicando...' : 'Publish Event'}
                        </button>
                    )}
                </div>
            </nav>

            {/* Steps Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-6xl mx-auto">

                    {/* STEP 1: CATEGORY */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-brand-navy rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-display font-bold mb-2">Select Event Category</h2>
                                    <p className="text-gray-300">Choose the primary sport discipline and define localization details.</p>
                                </div>
                                <div className="absolute right-0 top-0 h-full w-1/3 bg-brand-red/10 skew-x-12"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {CATEGORIES.map(cat => (
                                    <div
                                        key={cat.id}
                                        onClick={() => updateField('category', cat.id)}
                                        className={`relative p-6 rounded-2xl cursor-pointer border-2 transition-all duration-200 group h-40 flex flex-col justify-between ${formData.category === cat.id ? 'border-brand-red bg-white shadow-xl scale-[1.02]' : 'border-transparent bg-white hover:border-gray-200 shadow-sm'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${formData.category === cat.id ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-brand-navy group-hover:text-white'}`}>
                                                {cat.icon}
                                            </div>
                                            {formData.category === cat.id && <CheckCircle className="text-brand-red" size={24} fill="currentColor" color="white" />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-brand-navy">{cat.name}</h3>
                                            <p className="text-xs text-gray-500">{cat.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                                <h3 className="font-bold text-lg text-brand-navy mb-6 flex items-center gap-2">
                                    <Globe size={20} className="text-brand-red" /> Localization Settings
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Primary Currency</label>
                                        <select
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy"
                                            value={formData.currency}
                                            onChange={e => updateField('currency', e.target.value)}
                                        >
                                            {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Event Language</label>
                                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy">
                                            <option>English (United States)</option>
                                            <option>Spanish (Español)</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Time Zone</label>
                                        <div className="w-full bg-brand-navy text-white rounded-xl px-4 py-3 text-sm flex items-center gap-2">
                                            <Clock size={16} />
                                            {formData.timezone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: LOCATION */}
                    {step === 2 && (
                        <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 lg:h-[calc(100vh-140px)]">
                            <div className="lg:w-1/2 space-y-6 overflow-y-auto pr-2">
                                <div>
                                    <h2 className="text-3xl font-display font-bold text-brand-navy mb-2">Where is the starting line?</h2>
                                    <p className="text-gray-500">Enter the location details for your upcoming event.</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Country / Region</label>
                                        <select
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy"
                                            value={formData.country}
                                            onChange={e => updateField('country', e.target.value)}
                                        >
                                            <option value="">Select a country</option>
                                            <option value="US">United States</option>
                                            <option value="ES">Spain</option>
                                            <option value="AR">Argentina</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">State / Province</label>
                                            <input type="text" placeholder="e.g. California" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">City / Town</label>
                                            <input type="text" placeholder="e.g. San Francisco" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Street Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="text" placeholder="Start line address or landmark" className="w-full pl-10 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-navy" />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Activity size={12} /> This will be displayed on the public event page.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/2 bg-gray-200 rounded-3xl overflow-hidden relative shadow-inner h-64 md:h-auto md:min-h-[400px] shrink-0">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" />
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"><Crosshair size={20} /></button>
                                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"><Plus size={20} /></button>
                                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"><Minus size={20} /></button>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                    <div className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg mb-2">Start Line</div>
                                    <MapPin size={40} className="text-brand-red drop-shadow-xl" fill="currentColor" />
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                                    <div className="flex gap-4">
                                        <div className="bg-brand-red/10 p-3 rounded-full text-brand-red">
                                            <MapIcon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-navy text-sm">PREVIEW</h4>
                                            <p className="text-xs text-gray-500">Drag the pin to set the exact starting coordinates for the race.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: TICKETING */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-3xl font-display font-bold text-brand-navy mb-2">Ticketing & Pricing</h2>
                                <p className="text-gray-500">Define your ticket tiers, inventory limits, and pricing strategy.</p>
                            </div>

                            {/* Revenue Estimator */}
                            <div className="bg-brand-navy rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-xl">
                                <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                                        <Activity size={14} /> Revenue Estimator
                                    </div>
                                    <h2 className="text-5xl font-display font-bold mb-1">${totalRevenue.toLocaleString()}</h2>
                                    <p className="text-sm text-white/50">Projected Gross Revenue</p>
                                </div>

                                <div className="relative z-10 w-full md:w-auto mt-6 md:mt-0 space-y-2">
                                    <div className="flex justify-between md:justify-end gap-8 text-sm">
                                        <span className="text-white/60">Total Tickets</span>
                                        <span className="font-bold">{formData.tickets.reduce((acc, t) => acc + t.available, 0)}</span>
                                    </div>
                                    <div className="flex justify-between md:justify-end gap-8 text-sm">
                                        <span className="text-white/60">Est. Platform Fees</span>
                                        <span className="font-bold text-green-400">-${platformFees.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-2 flex justify-between md:justify-end gap-8 text-lg font-bold">
                                        <span>Net Earnings</span>
                                        <span>${(totalRevenue - platformFees).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Ticket List */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <h3 className="font-bold text-lg text-brand-navy">Ticket Types</h3>
                                    <button
                                        onClick={() => setIsTicketModalOpen(true)}
                                        className="bg-brand-red text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-red-600 shadow-md shadow-brand-red/20 transition-all"
                                    >
                                        <Plus size={16} /> Add New Ticket Type
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-white text-xs text-gray-500 uppercase font-bold border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 whitespace-nowrap">Ticket Name</th>
                                                <th className="px-6 py-4 whitespace-nowrap">Available</th>
                                                <th className="px-6 py-4 whitespace-nowrap">Price</th>
                                                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                                                <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {formData.tickets.map((ticket) => (
                                                <tr key={ticket.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-6 py-4 font-bold text-brand-navy whitespace-nowrap">
                                                        {ticket.name}
                                                        {ticket.name.includes('Early') && <span className="block text-[10px] font-normal text-gray-400">Ends Oct 15</span>}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                                        <span className="font-bold text-brand-navy">{ticket.available}</span> <span className="text-xs">/ 500</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-brand-navy whitespace-nowrap">${ticket.price.toFixed(2)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${ticket.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                                            {ticket.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                                        <div className="flex justify-end gap-2">
                                                            <button className="p-2 text-gray-400 hover:text-brand-navy hover:bg-white rounded-lg"><Edit2 size={16} /></button>
                                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg"><Trash2 size={16} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pro Tip Box */}
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4 items-start">
                                <div className="bg-white p-2 rounded-full shadow-sm text-brand-navy shrink-0">
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-navy text-sm mb-1">Pro Tip</h4>
                                    <p className="text-xs text-brand-navy/70 leading-relaxed">
                                        Adding a "Group Bundle" ticket type (5+ tickets) typically increases average order value by 15%.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: RESOURCES (Documents & Sponsors) */}
                    {step === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-3xl font-display font-bold text-brand-navy mb-2">Technical Documentation</h2>
                                <p className="text-gray-500">Please provide the essential safety and technical files.</p>
                            </div>

                            {/* Documents Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Uploaded Card */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-brand-navy">Event Regulations</h3>
                                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Uploaded</span>
                                        </div>
                                        <p className="text-xs text-gray-400">Please upload the official regulations.</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                        <FileText size={20} className="text-red-500" />
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-brand-navy">regulations_v2.pdf</p>
                                            <p className="text-[10px] text-gray-400">2.4 MB • Just now</p>
                                        </div>
                                        <button className="p-1 hover:bg-gray-200 rounded text-gray-400"><Trash2 size={14} /></button>
                                    </div>
                                </div>

                                {/* Upload Pending Card */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <h3 className="font-bold text-brand-navy">Medical Waiver Template</h3>
                                        <span className="bg-red-100 text-brand-red text-[10px] font-bold px-2 py-0.5 rounded uppercase">Required</span>
                                    </div>
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 h-32 flex flex-col items-center justify-center text-center hover:bg-gray-100 transition cursor-pointer group">
                                        <div className="bg-brand-red/10 text-brand-red p-2 rounded-full mb-2 group-hover:scale-110 transition">
                                            <Upload size={20} />
                                        </div>
                                        <p className="text-xs font-bold text-brand-navy"><span className="text-brand-red">Click to upload</span> or drag and drop</p>
                                        <p className="text-[10px] text-gray-400 mt-1">PDF, DOCX up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-200 my-8"></div>

                            {/* Sponsors Section */}
                            <div>
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <h2 className="text-3xl font-display font-bold text-brand-navy mb-2">Sponsors & Partners</h2>
                                        <p className="text-gray-500">Manage the visibility of your supporters.</p>
                                    </div>
                                    <button className="text-sm font-bold text-brand-navy bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
                                        Preview Section
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {['Diamond Sponsors', 'Gold Sponsors'].map((tier, idx) => (
                                        <div key={tier}>
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="flex items-center gap-2 font-bold text-brand-navy text-lg">
                                                    {idx === 0 ? <Activity size={20} className="text-brand-navy" /> : <Award size={20} className="text-yellow-500" />}
                                                    {tier}
                                                </h3>
                                                {idx === 0 && <span className="text-[10px] font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded">Top Visibility</span>}
                                            </div>

                                            <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                                                {idx === 0 && (
                                                    <>
                                                        <div className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:shadow-sm transition bg-white">
                                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">S</div>
                                                            <div className="flex-1 grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Company Name</label>
                                                                    <p className="font-bold text-brand-navy text-sm">Spotify</p>
                                                                </div>
                                                                <div>
                                                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Website URL</label>
                                                                    <p className="text-brand-navy text-sm truncate">https://spotify.com</p>
                                                                </div>
                                                            </div>
                                                            <button className="text-gray-400 hover:text-brand-red"><Trash2 size={16} /></button>
                                                        </div>
                                                        <div className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:shadow-sm transition bg-white">
                                                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-brand-red font-bold">A</div>
                                                            <div className="flex-1 grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Company Name</label>
                                                                    <p className="font-bold text-brand-navy text-sm">Airbnb</p>
                                                                </div>
                                                                <div>
                                                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Website URL</label>
                                                                    <p className="text-brand-navy text-sm truncate">https://airbnb.com</p>
                                                                </div>
                                                            </div>
                                                            <button className="text-gray-400 hover:text-brand-red"><Trash2 size={16} /></button>
                                                        </div>
                                                    </>
                                                )}
                                                <button className="w-full border-2 border-dashed border-red-100 bg-red-50/50 text-brand-red rounded-xl py-3 text-sm font-bold hover:bg-red-50 flex items-center justify-center gap-2 transition">
                                                    <Plus size={16} /> Add {tier.slice(0, -1)}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: FINAL REVIEW */}
                    {step === 5 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-3xl font-display font-bold text-brand-navy mb-2">Final Review</h2>
                                        <p className="text-gray-500">Review your event details before publishing.</p>
                                    </div>
                                    <button className="bg-white border border-gray-200 text-brand-navy px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-50">
                                        <Activity size={16} /> Live Preview
                                    </button>
                                </div>

                                <div className="bg-blue-50/50 rounded-xl p-6 mb-8">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-brand-navy">Completion Status</span>
                                        <span className="font-bold text-brand-navy">100%</span>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-navy w-full rounded-full"></div>
                                    </div>
                                </div>

                                {/* Accordion Items (Simulated) */}
                                <div className="space-y-4">
                                    {/* Item 1 */}
                                    <div className="border border-gray-200 rounded-2xl p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Activity size={20} /></div>
                                                <h3 className="font-bold text-brand-navy">Basic Info & Location</h3>
                                            </div>
                                            <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="rotate-90" size={20} /></button>
                                        </div>

                                        <div className="flex flex-col-reverse md:flex-row gap-6 pl-0 md:pl-14">
                                            <div className="flex-1">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">EVENT TITLE</p>
                                                <h4 className="font-bold text-brand-navy text-lg mb-4">{formData.title}</h4>

                                                <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                                                    <span className="bg-gray-100 px-3 py-1 rounded text-xs font-bold text-gray-600 flex gap-2 items-center"><Calendar size={12} /> {formData.date}</span>
                                                    <span className="bg-gray-100 px-3 py-1 rounded text-xs font-bold text-gray-600 flex gap-2 items-center"><Clock size={12} /> {formData.time} AM</span>
                                                    <span className="bg-gray-100 px-3 py-1 rounded text-xs font-bold text-gray-600 flex gap-2 items-center"><Bike size={12} /> Sports</span>
                                                </div>

                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">LOCATION</p>
                                                <p className="text-sm font-medium text-brand-navy">Parc del Fòrum, Plaza Leonardo da Vinci, s/n, 08019 Barcelona</p>

                                                <button onClick={() => setStep(2)} className="text-brand-red text-xs font-bold mt-4 flex items-center gap-1 hover:underline"><Edit2 size={12} /> Edit Details</button>
                                            </div>
                                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=300" className="w-full md:w-48 h-48 md:h-32 object-cover rounded-xl" />
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="border border-gray-200 rounded-2xl p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer" onClick={() => setStep(3)}>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-green-100 text-green-600 p-2 rounded-lg"><CreditCard size={20} /></div>
                                            <h3 className="font-bold text-brand-navy">Tickets & Pricing</h3>
                                        </div>
                                        <ChevronRight size={20} className="text-gray-400" />
                                    </div>

                                    {/* Item 3 */}
                                    <div className="border border-gray-200 rounded-2xl p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer" onClick={() => setStep(4)}>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-purple-100 text-purple-600 p-2 rounded-lg"><FileText size={20} /></div>
                                            <h3 className="font-bold text-brand-navy">Documents</h3>
                                        </div>
                                        <ChevronRight size={20} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                                <h3 className="font-bold text-xl text-brand-navy mb-6">Ready to Launch?</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Globe size={20} className="text-gray-400" />
                                            <span className="font-bold text-brand-navy text-sm">Visibility</span>
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase">Public</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Users size={20} className="text-gray-400" />
                                            <span className="font-bold text-brand-navy text-sm">Total Capacity</span>
                                        </div>
                                        <span className="font-bold text-brand-navy">650</span>
                                    </div>
                                </div>

                                <label className="flex gap-3 mb-8 cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-red focus:ring-brand-red" />
                                    <span className="text-sm text-gray-500">I confirm that all information is accurate and I agree to Pregonar's <span className="text-brand-red underline">Terms of Service</span>.</span>
                                </label>

                                <button
                                    onClick={handlePublish}
                                    disabled={isPublishing}
                                    className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-red/25 transition-all active:scale-95 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPublishing ? 'Publicando...' : 'Publish Event'} <ArrowRight size={20} className="inline ml-2" />
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4">You can edit details after publishing.</p>
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {/* --- MODAL: Add Ticket --- */}
            {
                isTicketModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-2xl font-display font-bold text-brand-navy">Add Ticket Type</h2>
                                <button onClick={() => setIsTicketModalOpen(false)} className="text-gray-400 hover:text-brand-navy"><X size={24} /></button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-brand-navy mb-2">Ticket Name</label>
                                    <input type="text" placeholder="e.g. Early Bird VIP" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-navy" autoFocus />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="block text-sm font-bold text-brand-navy">Description</label>
                                        <span className="text-xs text-gray-400">0/140</span>
                                    </div>
                                    <textarea rows={3} placeholder="What perks come with this ticket? (e.g. Front row seating, Free drink)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-navy resize-none" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-brand-navy mb-2">Price</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                            <input type="number" placeholder="0.00" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:border-brand-navy" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">USD</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-brand-navy mb-2">Total Quantity</label>
                                        <div className="relative">
                                            <input type="number" placeholder="Unlimited" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-navy" />
                                            <Users size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-brand-red uppercase mb-4 tracking-widest">ADVANCED SETTINGS</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-100 p-2 rounded-lg text-gray-500"><Lock size={18} /></div>
                                            <div>
                                                <p className="font-bold text-brand-navy text-sm">Hidden Ticket</p>
                                                <p className="text-xs text-gray-400">Only visible to admins and promoters.</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div></div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                                <button onClick={() => setIsTicketModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-brand-navy transition">Cancel</button>
                                <button onClick={() => setIsTicketModalOpen(false)} className="px-8 py-3 bg-brand-red hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-brand-red/20 flex items-center gap-2 transition-all">
                                    <CreditCard size={18} /> Save Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Common Icon Helpers */}
            <div className="hidden">
                <div id="Crosshair"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" /></svg></div>
            </div>
        </div >
    );
};

// Simple Icon component for map controls (not in lucide export list sometimes)
const Crosshair = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" /></svg>
);
