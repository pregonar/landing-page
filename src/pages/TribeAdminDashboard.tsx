
import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut, 
  UserPlus, 
  Check, 
  X, 
  MoreHorizontal,
  Plus,
  MapPin,
  Clock,
  Search,
  Bell,
  BarChart2,
  Image as ImageIcon
} from 'lucide-react';
import { UserProfile } from '../lib/auth';

interface TribeAdminDashboardProps {
  user: UserProfile;
  onLogout: () => void;
  onNavigate: (view: any) => void;
}

export const TribeAdminDashboard: React.FC<TribeAdminDashboardProps> = ({ user, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'events'>('overview');

  // Mock Data for the Tribe
  const tribeInfo = {
      name: user.tribeContext?.tribeName || 'Urban Runners Club',
      members: 1240,
      pendingRequests: 5,
      nextMeetup: 'Saturday Morning Run',
      coverImage: 'https://images.unsplash.com/photo-1552674605-46d530064509?q=80&w=1000'
  };

  const pendingMembers = [
      { id: 1, name: 'Diego Torres', email: 'diego@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100', date: '2 hours ago' },
      { id: 2, name: 'Lucia Mendez', email: 'lucia@email.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100', date: '5 hours ago' },
      { id: 3, name: 'Carlos Ruiz', email: 'carlos@email.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100', date: '1 day ago' },
  ];

  const upcomingMeetups = [
      { id: 1, title: 'Saturday Long Run', date: 'Sat, Oct 28', time: '07:00 AM', attending: 45, location: 'Central Park' },
      { id: 2, title: 'Technique Workshop', date: 'Wed, Nov 01', time: '06:30 PM', attending: 12, location: 'City Stadium' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-navy flex">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
            <div className="p-6 flex flex-col gap-4 border-b border-gray-100">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                    <span className="font-display font-bold text-lg text-brand-navy">Pregonar</span>
                </div>
                <div className="bg-brand-navy/5 p-3 rounded-xl flex items-center gap-3">
                    <img src={tribeInfo.coverImage} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="overflow-hidden">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Managing</p>
                        <p className="font-bold text-sm text-brand-navy truncate">{tribeInfo.name}</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${activeTab === 'overview' ? 'bg-brand-navy text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'}`}
                >
                    <BarChart2 size={18} /> Overview
                </button>
                <button 
                    onClick={() => setActiveTab('members')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${activeTab === 'members' ? 'bg-brand-navy text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'}`}
                >
                    <Users size={18} /> Members
                    {tribeInfo.pendingRequests > 0 && <span className="ml-auto bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{tribeInfo.pendingRequests}</span>}
                </button>
                <button 
                    onClick={() => setActiveTab('events')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${activeTab === 'events' ? 'bg-brand-navy text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'}`}
                >
                    <Calendar size={18} /> Meetups
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-brand-navy rounded-lg transition-colors font-medium text-sm">
                    <MessageSquare size={18} /> Discussions
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-brand-navy rounded-lg transition-colors font-medium text-sm">
                    <Settings size={18} /> Settings
                </button>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <img src={user.photoURL || ''} className="w-8 h-8 rounded-full border border-gray-200" />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold text-brand-navy truncate">{user.displayName}</p>
                        <p className="text-xs text-brand-red font-medium">Tribe Admin</p>
                    </div>
                </div>
                <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-bold text-sm">
                    <LogOut size={16} /> Log Out
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-0 md:ml-64 p-8">
            
            {/* Top Bar Mobile */}
            <div className="md:hidden flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" className="w-8 h-8 rounded-full" />
                    <span className="font-bold text-brand-navy">Tribe Manager</span>
                </div>
                <button onClick={onLogout}><LogOut size={20} className="text-gray-500" /></button>
            </div>

            {activeTab === 'overview' && (
                <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
                    <header className="mb-8">
                        <h1 className="text-3xl font-display font-bold text-brand-navy mb-2">Community Dashboard</h1>
                        <p className="text-gray-500">Welcome back! Here's what's happening in <span className="font-bold text-brand-navy">{tribeInfo.name}</span> today.</p>
                    </header>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} /></div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12 this week</span>
                            </div>
                            <h3 className="text-3xl font-bold text-brand-navy mb-1">{tribeInfo.members}</h3>
                            <p className="text-sm text-gray-500">Total Members</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><MessageSquare size={20} /></div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">High Activity</span>
                            </div>
                            <h3 className="text-3xl font-bold text-brand-navy mb-1">85</h3>
                            <p className="text-sm text-gray-500">New Posts</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-brand-red/10 text-brand-red rounded-lg"><Calendar size={20} /></div>
                                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">In 2 days</span>
                            </div>
                            <h3 className="text-lg font-bold text-brand-navy mb-1 truncate">{tribeInfo.nextMeetup}</h3>
                            <p className="text-sm text-gray-500">Next Event</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Pending Requests */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-brand-navy text-lg">Member Requests</h3>
                                <button className="text-sm text-brand-red font-bold hover:underline">View All</button>
                            </div>
                            
                            <div className="space-y-4">
                                {pendingMembers.map(member => (
                                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <img src={member.avatar} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <p className="font-bold text-brand-navy text-sm">{member.name}</p>
                                                <p className="text-xs text-gray-500">Applied {member.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 rounded-lg transition-colors">
                                                <X size={16} />
                                            </button>
                                            <button className="p-2 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors shadow-sm">
                                                <Check size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {pendingMembers.length === 0 && (
                                    <p className="text-center text-gray-400 text-sm py-4">No pending requests.</p>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-brand-navy to-[#1a1d4d] rounded-2xl p-6 text-white shadow-lg">
                                <h3 className="font-bold text-lg mb-2">Create Meetup</h3>
                                <p className="text-sm text-gray-300 mb-6">Schedule a run, workshop, or social gathering for your tribe.</p>
                                <button 
                                    onClick={() => setActiveTab('events')}
                                    className="w-full bg-white text-brand-navy font-bold py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
                                >
                                    <Plus size={18} /> Schedule Event
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="font-bold text-brand-navy mb-4">Announcements</h3>
                                <div className="flex gap-3 mb-4">
                                    <input type="text" placeholder="Post a pinned message..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-navy" />
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-yellow-100 text-yellow-600 p-1.5 rounded-lg shrink-0"><Bell size={14} /></div>
                                        <div>
                                            <p className="text-xs font-bold text-brand-navy">Route Change</p>
                                            <p className="text-xs text-gray-500">Posted 2 days ago by You</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'events' && (
                <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-display font-bold text-brand-navy mb-2">Tribe Meetups</h1>
                            <p className="text-gray-500">Manage exclusive events for your community members.</p>
                        </div>
                        <button className="bg-brand-red hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-brand-red/20 transition-all active:scale-95">
                            <Plus size={20} /> New Meetup
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {upcomingMeetups.map(evt => (
                            <div key={evt.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Upcoming</span>
                                    <button className="text-gray-400 hover:text-brand-navy"><MoreHorizontal size={18} /></button>
                                </div>
                                <h3 className="text-xl font-bold text-brand-navy mb-2">{evt.title}</h3>
                                <div className="space-y-2 text-sm text-gray-500 mb-6">
                                    <div className="flex items-center gap-2"><Calendar size={16} className="text-brand-red" /> {evt.date}</div>
                                    <div className="flex items-center gap-2"><Clock size={16} className="text-brand-red" /> {evt.time}</div>
                                    <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-red" /> {evt.location}</div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex -space-x-2">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                                        ))}
                                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">+{evt.attending}</div>
                                    </div>
                                    <button className="text-sm font-bold text-brand-navy hover:underline">Manage</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'members' && (
                <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-display font-bold text-brand-navy mb-2">Member Directory</h1>
                            <p className="text-gray-500">Manage roles and permissions for your tribe.</p>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder="Search members..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-navy w-64" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {/* Current User */}
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img src={user.photoURL || ''} className="w-9 h-9 rounded-full" />
                                        <span className="font-bold text-brand-navy">{user.displayName} (You)</span>
                                    </td>
                                    <td className="px-6 py-4"><span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">Admin</span></td>
                                    <td className="px-6 py-4 text-sm text-gray-500">Oct 2021</td>
                                    <td className="px-6 py-4"><span className="text-green-600 text-xs font-bold flex items-center gap-1"><div className="w-2 h-2 bg-green-600 rounded-full"></div> Active</span></td>
                                    <td className="px-6 py-4 text-right"><button className="text-gray-400 hover:text-brand-navy"><MoreHorizontal size={16} /></button></td>
                                </tr>
                                {/* Mock Members */}
                                {[
                                    { name: 'Sarah Connor', role: 'Member', joined: 'Nov 2023', status: 'Active', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
                                    { name: 'John Smith', role: 'Moderator', joined: 'Jan 2023', status: 'Active', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100' },
                                    { name: 'Mike Ross', role: 'Member', joined: 'Feb 2024', status: 'Inactive', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
                                ].map((m, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <img src={m.img} className="w-9 h-9 rounded-full" />
                                            <span className="font-medium text-brand-navy">{m.name}</span>
                                        </td>
                                        <td className="px-6 py-4"><span className={`text-xs font-bold px-2 py-1 rounded ${m.role === 'Moderator' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{m.role}</span></td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{m.joined}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold flex items-center gap-1 ${m.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                                                <div className={`w-2 h-2 rounded-full ${m.status === 'Active' ? 'bg-green-600' : 'bg-gray-400'}`}></div> {m.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right"><button className="text-gray-400 hover:text-brand-navy"><MoreHorizontal size={16} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </main>
    </div>
  );
};
