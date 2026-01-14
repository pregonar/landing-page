
import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut, 
  Plus, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Edit2,
  Video,
  MessageCircle,
  Star
} from 'lucide-react';
import { UserProfile } from './auth';

interface InstructorDashboardProps {
  user: UserProfile;
  onLogout: () => void;
  onNavigate: (view: any) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ user, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'students' | 'profile'>('schedule');

  const upcomingClasses = [
      { id: 1, title: 'Tennis Fundamentals', date: 'Today', time: '14:00 PM', students: 4, max: 6, location: 'Court 3', type: 'Presencial' },
      { id: 2, title: 'Advanced Serve Drill', date: 'Tomorrow', time: '09:00 AM', students: 2, max: 2, location: 'Court 1', type: 'Presencial' },
      { id: 3, title: 'Tactical Review', date: 'Oct 28', time: '18:00 PM', students: 12, max: 20, location: 'Zoom', type: 'Online' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-navy flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col z-10">
            <div className="p-6 flex flex-col gap-4 border-b border-gray-100">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
                    <img src="./logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                    <span className="font-display font-bold text-lg text-brand-navy">Pregonar <span className="block text-xs font-normal text-brand-red">Instructor</span></span>
                </div>
            </div>

            <div className="p-6 flex flex-col items-center text-center border-b border-gray-100">
                <div className="relative mb-3">
                    <img src={user.photoURL || ''} className="w-20 h-20 rounded-full border-2 border-brand-red p-1" />
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-200 shadow-sm text-yellow-400">
                        <Star size={12} fill="currentColor" />
                    </div>
                </div>
                <h3 className="font-bold text-brand-navy">{user.displayName}</h3>
                <p className="text-xs text-gray-500">Tennis Coach</p>
                <div className="flex gap-4 mt-4 text-xs font-bold">
                    <div className="text-center">
                        <span className="block text-lg">4.9</span>
                        <span className="text-gray-400 font-normal">Rating</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-lg">124</span>
                        <span className="text-gray-400 font-normal">Reviews</span>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <button 
                    onClick={() => setActiveTab('schedule')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${activeTab === 'schedule' ? 'bg-brand-navy text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'}`}
                >
                    <Calendar size={18} /> My Schedule
                </button>
                <button 
                    onClick={() => setActiveTab('students')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${activeTab === 'students' ? 'bg-brand-navy text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'}`}
                >
                    <Users size={18} /> Students
                </button>
                <button 
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${activeTab === 'profile' ? 'bg-brand-navy text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'}`}
                >
                    <Settings size={18} /> Profile & Bio
                </button>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-bold text-sm">
                    <LogOut size={16} /> Log Out
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
            
            {activeTab === 'schedule' && (
                <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-brand-navy">Class Schedule</h1>
                            <p className="text-gray-500 text-sm">Manage your upcoming sessions.</p>
                        </div>
                        <button className="bg-brand-red text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-md hover:bg-red-600 transition">
                            <Plus size={16} /> Add Class
                        </button>
                    </header>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase mb-1">Total Earnings (Oct)</span>
                            <span className="text-2xl font-bold text-brand-navy">$3,240</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase mb-1">Upcoming Classes</span>
                            <span className="text-2xl font-bold text-brand-navy">12</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase mb-1">Active Students</span>
                            <span className="text-2xl font-bold text-brand-navy">45</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide text-gray-400">Next 7 Days</h3>
                        {upcomingClasses.map(cls => (
                            <div key={cls.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-brand-navy/5 text-brand-navy p-3 rounded-xl font-bold text-center min-w-[70px]">
                                        <span className="block text-xs uppercase">{cls.date}</span>
                                        <span className="block text-lg">{cls.time.split(' ')[0]}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy text-lg">{cls.title}</h4>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                            <span className="flex items-center gap-1"><Users size={14} /> {cls.students}/{cls.max}</span>
                                            <span className="flex items-center gap-1">
                                                {cls.type === 'Online' ? <Video size={14} /> : <MapPin size={14} />} {cls.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50">Edit</button>
                                    <button className="flex-1 md:flex-none bg-brand-navy text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#0f112e]">Manage</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'students' && (
                <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold text-brand-navy">My Students</h1>
                        <p className="text-gray-500 text-sm">Track progress and payments.</p>
                    </header>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <img src={`https://images.unsplash.com/photo-${1500000000000+i}?q=80&w=100`} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <h4 className="font-bold text-brand-navy text-sm">Student Name {i}</h4>
                                        <p className="text-xs text-gray-500">5 Classes attended</p>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-brand-navy"><MessageCircle size={20} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'profile' && (
                <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
                    <header className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-brand-navy">Public Profile</h1>
                            <p className="text-gray-500 text-sm">Manage how you appear in the Shop Window.</p>
                        </div>
                        <button className="text-brand-red font-bold text-sm hover:underline">Preview</button>
                    </header>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-brand-navy mb-2">Display Name</label>
                            <input type="text" defaultValue={user.displayName || ''} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-navy mb-2">Professional Title</label>
                            <input type="text" defaultValue="Tennis Coach" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-navy mb-2">Bio</label>
                            <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm resize-none" defaultValue="Professional coach with 10 years experience..."></textarea>
                        </div>
                        <button className="w-full bg-brand-navy text-white font-bold py-3 rounded-lg hover:bg-[#0f112e]">Save Changes</button>
                    </div>
                </div>
            )}

        </main>
    </div>
  );
};
