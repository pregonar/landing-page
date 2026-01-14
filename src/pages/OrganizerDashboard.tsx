
import React from 'react';
import { 
  Plus, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Search, 
  Bell, 
  MoreVertical,
  Clock,
  MapPin,
  ChevronRight,
  LogOut,
  Settings,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { UserProfile } from '../lib/auth';

interface OrganizerDashboardProps {
  user: UserProfile;
  onLogout: () => void;
  onNavigate: (view: any) => void;
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ user, onLogout, onNavigate }) => {
  
  // Mock Data for Organizer
  const myEvents = [
      { id: '1', title: 'Urban Marathon 2024', status: 'Active', sold: 450, total: 600, revenue: 11250, date: 'Nov 12, 2024' },
      { id: '2', title: 'Summer Jazz Festival', status: 'Draft', sold: 0, total: 200, revenue: 0, date: 'Dec 05, 2024' },
      { id: '3', title: 'Cycling Workshop', status: 'Completed', sold: 50, total: 50, revenue: 1250, date: 'Oct 10, 2024' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-navy flex flex-col">
        
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
                <img src="./logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                <span className="font-display font-bold text-xl text-brand-navy">Pregonar <span className="text-gray-400 font-sans font-normal text-sm">Organizer</span></span>
            </div>
            <div className="flex items-center gap-6">
                <button className="text-sm font-bold text-gray-500 hover:text-brand-navy">Help Center</button>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-brand-navy">{user.displayName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <img src={user.photoURL || ''} className="w-9 h-9 rounded-full border border-gray-200" />
                    <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition ml-2">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </nav>

        <div className="flex flex-1">
            
            {/* Sidebar (Collapsed on mobile usually, keeping simple here) */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-4">
                <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-brand-navy/5 text-brand-navy font-bold rounded-lg transition-colors">
                        <Calendar size={18} /> Events
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-brand-navy font-medium rounded-lg transition-colors">
                        <Users size={18} /> Attendees
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-brand-navy font-medium rounded-lg transition-colors">
                        <BarChart3 size={18} /> Analytics
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-brand-navy font-medium rounded-lg transition-colors">
                        <DollarSign size={18} /> Payouts
                    </button>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-brand-navy font-medium rounded-lg transition-colors">
                        <Settings size={18} /> Settings
                    </button>
                </div>
            </aside>

            {/* Main Board */}
            <main className="flex-1 p-8 overflow-y-auto">
                
                {/* Header Action */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-brand-navy">My Events</h1>
                        <p className="text-gray-500">Manage your events and track real-time sales.</p>
                    </div>
                    <button 
                        onClick={() => onNavigate('create-event')}
                        className="bg-brand-red hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-brand-red/20 transition-all active:scale-95"
                    >
                        <Plus size={20} /> Create New Event
                    </button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2 text-gray-500 text-sm font-bold uppercase tracking-wide">
                            <DollarSign size={16} /> Total Revenue (30d)
                        </div>
                        <div className="text-3xl font-bold text-brand-navy mb-1">$12,500.00</div>
                        <div className="text-xs text-green-600 font-bold bg-green-50 inline-block px-2 py-0.5 rounded">+15% vs last month</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2 text-gray-500 text-sm font-bold uppercase tracking-wide">
                            <Users size={16} /> Tickets Sold
                        </div>
                        <div className="text-3xl font-bold text-brand-navy mb-1">500</div>
                        <div className="text-xs text-gray-400">Across 3 events</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2 text-gray-500 text-sm font-bold uppercase tracking-wide">
                            <TrendingUp size={16} /> Page Views
                        </div>
                        <div className="text-3xl font-bold text-brand-navy mb-1">3.2k</div>
                        <div className="text-xs text-green-600 font-bold bg-green-50 inline-block px-2 py-0.5 rounded">+8% new traffic</div>
                    </div>
                </div>

                {/* Events List */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex gap-4">
                            <button className="text-sm font-bold text-brand-navy border-b-2 border-brand-navy pb-1">All Events</button>
                            <button className="text-sm font-bold text-gray-400 hover:text-brand-navy pb-1">Drafts</button>
                            <button className="text-sm font-bold text-gray-400 hover:text-brand-navy pb-1">Past</button>
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder="Search events..." className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-brand-navy" />
                        </div>
                    </div>

                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Event Name</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Sold</th>
                                <th className="px-6 py-4">Gross Sales</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {myEvents.map(evt => (
                                <tr key={evt.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-brand-navy text-sm">{evt.title}</p>
                                        <p className="text-xs text-gray-400">ID: {evt.id}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{evt.date}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-brand-navy" style={{ width: `${(evt.sold / evt.total) * 100}%` }}></div>
                                            </div>
                                            <span className="font-bold">{evt.sold}</span>/{evt.total}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-700">${evt.revenue.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase
                                            ${evt.status === 'Active' ? 'bg-green-100 text-green-700' : ''}
                                            ${evt.status === 'Draft' ? 'bg-gray-100 text-gray-600' : ''}
                                            ${evt.status === 'Completed' ? 'bg-blue-50 text-blue-600' : ''}
                                        `}>
                                            {evt.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-500">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {myEvents.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <Calendar size={32} />
                            </div>
                            <h3 className="font-bold text-brand-navy text-lg">No events found</h3>
                            <p className="text-gray-500 mb-6">Get started by creating your first event.</p>
                            <button onClick={() => onNavigate('create-event')} className="text-brand-red font-bold hover:underline">Create Event</button>
                        </div>
                    )}
                </div>

            </main>
        </div>
    </div>
  );
};
