
import React, { useState } from 'react';
import { 
  Layout,
  MessageSquare,
  Users,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  MoreHorizontal,
  LogOut,
  Filter
} from 'lucide-react';
import { UserProfile } from './auth';

interface PregoneroAdminDashboardProps {
  user: UserProfile;
  onLogout: () => void;
  onNavigate: (view: any) => void;
}

export const PregoneroAdminDashboard: React.FC<PregoneroAdminDashboardProps> = ({ user, onLogout, onNavigate }) => {
  const [activeView, setActiveView] = useState<'tickets' | 'users'>('tickets');

  const tickets = [
      { id: 'T-1023', user: 'Maria Garcia', subject: 'Refund Request - Marathon', status: 'Open', priority: 'High', time: '2h ago' },
      { id: 'T-1022', user: 'John Doe', subject: 'Cannot access ticket QR', status: 'In Progress', priority: 'Medium', time: '4h ago' },
      { id: 'T-1021', user: 'Organizer #44', subject: 'Payout issue', status: 'Open', priority: 'Critical', time: '5h ago' },
      { id: 'T-1020', user: 'Alice Smith', subject: 'Change email address', status: 'Closed', priority: 'Low', time: '1d ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-20">
            <div className="flex items-center gap-3">
                <div className="bg-brand-navy text-white p-1.5 rounded-lg font-display font-bold">P</div>
                <span className="font-bold text-brand-navy">Pregonar <span className="text-gray-400 font-normal">Support Desk</span></span>
            </div>
            
            <div className="flex-1 max-w-xl mx-8 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search ticket ID, user email, or transaction..." 
                    className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-brand-navy/20"
                />
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-brand-navy">{user.displayName}</p>
                    <p className="text-xs text-green-600 flex items-center justify-end gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Online</p>
                </div>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-500"><LogOut size={18} /></button>
            </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
            
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <nav className="p-4 space-y-1">
                    <button 
                        onClick={() => setActiveView('tickets')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold ${activeView === 'tickets' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <MessageSquare size={18} /> Support Tickets
                        <span className="ml-auto bg-red-100 text-red-600 text-xs py-0.5 px-2 rounded-full">3</span>
                    </button>
                    <button 
                        onClick={() => setActiveView('users')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold ${activeView === 'users' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Users size={18} /> CRM / Users
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">
                
                {activeView === 'tickets' && (
                    <div className="max-w-5xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Ticket Queue</h2>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50">
                                    <Filter size={14} /> Filter
                                </button>
                                <button className="px-3 py-1.5 bg-brand-navy text-white rounded-lg text-xs font-bold hover:bg-slate-800">
                                    + New Ticket
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-xs text-gray-500 uppercase font-bold border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">Subject</th>
                                        <th className="px-6 py-3">Requester</th>
                                        <th className="px-6 py-3">Priority</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Created</th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {tickets.map(ticket => (
                                        <tr key={ticket.id} className="hover:bg-slate-50 group cursor-pointer">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500">{ticket.id}</td>
                                            <td className="px-6 py-4 font-medium text-slate-900">{ticket.subject}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{ticket.user}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                                                    ticket.priority === 'Critical' ? 'bg-red-50 text-red-700 border-red-100' :
                                                    ticket.priority === 'High' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                    ticket.priority === 'Medium' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    'bg-gray-50 text-gray-600 border-gray-200'
                                                }`}>
                                                    {ticket.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${ticket.status === 'Open' ? 'bg-green-500' : ticket.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                                                    <span className="text-xs font-medium">{ticket.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-400">{ticket.time}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-brand-navy opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeView === 'users' && (
                    <div className="flex items-center justify-center h-64 text-gray-400">
                        <div className="text-center">
                            <Users size={48} className="mx-auto mb-4 opacity-50" />
                            <p>CRM Module Loaded</p>
                            <p className="text-xs">Search for a user to view profile details.</p>
                        </div>
                    </div>
                )}

            </main>
        </div>
    </div>
  );
};
