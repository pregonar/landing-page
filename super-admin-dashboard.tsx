
import React from 'react';
import { 
  Users, 
  Activity, 
  DollarSign, 
  ShieldAlert, 
  Search, 
  Bell, 
  Settings, 
  LogOut,
  BarChart2,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  Database
} from 'lucide-react';
import { UserProfile } from './auth';

interface SuperAdminDashboardProps {
  user: UserProfile;
  onLogout: () => void;
  onNavigate: (view: any) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f112e] text-white flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3">
           <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center font-display font-bold text-white">P</div>
           <span className="font-bold text-lg tracking-tight">Pregonar <span className="text-xs font-normal text-gray-400 block">Admin Console</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
            <div className="text-xs font-bold text-gray-500 uppercase px-4 mb-2">Platform</div>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-xl transition-colors font-medium">
                <Activity size={18} /> Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
                <Users size={18} /> User Management
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
                <Calendar size={18} /> Event Audit
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
                <DollarSign size={18} /> Financials
            </button>

            <div className="text-xs font-bold text-gray-500 uppercase px-4 mb-2 mt-8">System</div>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
                <Database size={18} /> Database
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
                <ShieldAlert size={18} /> Security Logs
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
                <Settings size={18} /> Settings
            </button>
        </nav>

        <div className="p-4 border-t border-white/10">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium">
                <LogOut size={18} /> Sign Out
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
          
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
              <div>
                  <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
                  <p className="text-slate-500 text-sm">Welcome back, Super Admin. System is running smoothly.</p>
              </div>
              <div className="flex items-center gap-4">
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input type="text" placeholder="Search users, events, transaction ID..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 w-64" />
                  </div>
                  <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-brand-navy relative">
                      <Bell size={20} />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <img src={user.photoURL || ''} alt="Admin" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <Users size={20} />
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-1">24.5k</h3>
                  <p className="text-sm text-slate-500">Total Users</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                          <Activity size={20} />
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+5%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-1">1,240</h3>
                  <p className="text-sm text-slate-500">Active Events</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                          <DollarSign size={20} />
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+8%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-1">$482k</h3>
                  <p className="text-sm text-slate-500">Total Revenue (YTD)</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                          <ShieldAlert size={20} />
                      </div>
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">2 New</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-1">5</h3>
                  <p className="text-sm text-slate-500">Flagged Reports</p>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Recent Activity Table */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-slate-900">Recent Platform Activity</h3>
                      <button className="text-sm text-blue-600 font-bold hover:underline">View All</button>
                  </div>
                  <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-500 font-medium">
                          <tr>
                              <th className="px-6 py-3">User / Entity</th>
                              <th className="px-6 py-3">Action</th>
                              <th className="px-6 py-3">Date</th>
                              <th className="px-6 py-3">Status</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                          {[
                              { user: 'Eventos Latam', action: 'Created Event: "Tech Summit 2024"', date: '2 mins ago', status: 'Success' },
                              { user: 'Sarah Jenkins', action: 'User Registration', date: '15 mins ago', status: 'Success' },
                              { user: 'System', action: 'Daily Backup', date: '1 hour ago', status: 'Success' },
                              { user: 'User #9921', action: 'Failed Login Attempt (5x)', date: '2 hours ago', status: 'Warning' },
                              { user: 'Payment Gateway', action: 'Payout to Org #442', date: '3 hours ago', status: 'Processing' },
                          ].map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                  <td className="px-6 py-4 font-medium text-slate-900">{row.user}</td>
                                  <td className="px-6 py-4 text-slate-600">{row.action}</td>
                                  <td className="px-6 py-4 text-slate-500">{row.date}</td>
                                  <td className="px-6 py-4">
                                      <span className={`px-2 py-1 rounded text-xs font-bold 
                                        ${row.status === 'Success' ? 'bg-green-100 text-green-700' : ''}
                                        ${row.status === 'Warning' ? 'bg-red-100 text-red-700' : ''}
                                        ${row.status === 'Processing' ? 'bg-blue-100 text-blue-700' : ''}
                                      `}>
                                          {row.status}
                                      </span>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>

              {/* Pending Approvals */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Pending Organizer Approvals</h3>
                  <div className="space-y-4">
                      {[
                          { name: 'Deportes Pro SA', type: 'Organizer', date: 'Oct 24' },
                          { name: 'Cultura Viva Fund', type: 'Non-Profit', date: 'Oct 23' },
                          { name: 'Mike Training', type: 'Instructor', date: 'Oct 22' },
                      ].map((req, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:shadow-sm transition">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                      {req.name.charAt(0)}
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-sm text-slate-900">{req.name}</h4>
                                      <p className="text-xs text-slate-500">{req.type} • {req.date}</p>
                                  </div>
                              </div>
                              <div className="flex gap-2">
                                  <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"><CheckCircle size={18} /></button>
                                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"><XCircle size={18} /></button>
                              </div>
                          </div>
                      ))}
                  </div>
                  <button className="w-full mt-6 py-2 text-sm font-bold text-brand-navy border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      View All Requests
                  </button>
              </div>

          </div>
      </main>
    </div>
  );
};
