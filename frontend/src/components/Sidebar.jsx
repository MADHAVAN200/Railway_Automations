import React from 'react';
import {
    Train, LayoutDashboard, Calendar, MapPin, AlertTriangle,
    MessageSquare, MonitorPlay, Activity, FileText, Settings, ShieldCheck
} from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scheduling', label: 'Train Scheduling', icon: Calendar },
    { id: 'platform', label: 'Platform Assignment', icon: MapPin },
    { id: 'disruption', label: 'Disruption Recovery', icon: AlertTriangle },
    { id: 'passenger', label: 'Passenger Communication', icon: MessageSquare },
    { id: 'simulation', label: 'Simulation Lab', icon: MonitorPlay },
    { id: 'monitoring', label: 'System Monitoring', icon: Activity },
    { id: 'hitl', label: 'Human-in-the-Loop', icon: ShieldCheck },
    { id: 'audit', label: 'Audit Logs', icon: FileText },
];

export default function Sidebar({ currentView, setCurrentView }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="app-logo">
                    <Train size={24} color="#00a8ff" />
                </div>
                <div>
                    <h1 className="app-title">AI Railway</h1>
                    <p className="app-subtitle">CONTROL CENTER</p>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <a
                        key={id}
                        href="#"
                        className={`nav-item ${currentView === id ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setCurrentView(id); }}
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                    </a>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="avatar"></div>
                    <div className="user-info">
                        <span className="user-name">Rajesh Kumar</span>
                        <span className="user-role">Chief Controller · NDLS</span>
                    </div>
                </div>
                <button className="settings-btn">
                    <Settings size={18} />
                </button>
            </div>
        </aside>
    );
}
