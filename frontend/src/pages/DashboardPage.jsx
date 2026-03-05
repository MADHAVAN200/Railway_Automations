import React from 'react';
import { Train, LayoutGrid, Cpu, AlertTriangle, ArrowUpRight, Activity, Clock } from 'lucide-react';

const kpiData = [
    { label: 'Active Trains', value: '278', sub: '+12 from yesterday', icon: Train, color: 'blue' },
    { label: 'On-Time Performance', value: '91.4%', sub: '+2.1% this week', icon: Activity, color: 'green' },
    { label: 'Active Alerts', value: '5', sub: '2 critical, 3 warnings', icon: AlertTriangle, color: 'red' },
    { label: 'Platform Occupancy', value: '84%', sub: 'NDLS station avg.', icon: LayoutGrid, color: 'blue' },
];

const recentAlerts = [
    { time: '14:42', title: 'Track Obstruction', desc: 'Sector D-14, Near Palwal. Inspection dispatched.', severity: 'high' },
    { time: '14:38', title: 'Signal Failure', desc: 'Junction East-2, Nizamuddin. Manual override active.', severity: 'med' },
    { time: '14:29', title: 'System Update', desc: 'AI Model v4.3 deployed. All systems nominal.', severity: 'info' },
    { time: '14:15', title: 'Weather Warning', desc: 'High winds in Rajasthan sector. Speed limits imposed.', severity: 'med' },
];

const aiInsights = [
    { type: 'STRATEGIC REROUTE', desc: 'Divert Train 12301 (Rajdhani) to PF-4 at NDLS to avoid 12002 Shatabdi overlap.', action: true },
    { type: 'SCHEDULING ADVISORY', desc: 'Reduce speed of 22415 Vande Bharat by 8% to sync arrival at Agra Cantt.' },
    { type: 'ENERGY SAVING', desc: 'Idle PF-12 lighting at Hazrat Nizamuddin during 20m service gap.' },
];

const liveTrains = [
    { id: '12301', name: 'Howrah Rajdhani', from: 'HWH', to: 'NDLS', eta: '14:55', status: 'on-time' },
    { id: '12002', name: 'Bhopal Shatabdi', from: 'NDLS', to: 'RKMP', eta: '15:10', status: 'delayed', delay: '+22m' },
    { id: '22415', name: 'New Delhi Vande Bharat', from: 'NDLS', to: 'VRNC', eta: '15:30', status: 'on-time' },
    { id: '12423', name: 'Dibrugarh Rajdhani', from: 'NDLS', to: 'DBRG', eta: '15:45', status: 'on-time' },
    { id: '12621', name: 'Tamil Nadu Express', from: 'NDLS', to: 'MAS', eta: '16:00', status: 'risk', delay: '+5m risk' },
];

export default function DashboardPage() {
    return (
        <div className="view-wrapper">
            <main className="page-content">

                {/* KPI Row */}
                <div className="db-kpi-row">
                    {kpiData.map((k, i) => (
                        <div className="card db-kpi-card" key={i}>
                            <div className="db-kpi-header">
                                <span>{k.label}</span>
                                <k.icon size={16} className={`text-${k.color}`} />
                            </div>
                            <div className="db-kpi-value">{k.value}</div>
                            <div className="db-kpi-sub">{k.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Map + Live Trains Grid */}
                <div className="db-center-grid">
                    {/* Live Station Map */}
                    <div className="card db-map-card">
                        <div className="section-header">
                            <div className="header-title"><Activity size={14} className="text-blue" /> LIVE RAILWAY MAP — NORTHERN ZONE</div>
                            <div className="db-legend">
                                <span><span className="dot green"></span>On Time</span>
                                <span><span className="dot red"></span>Delayed</span>
                                <span><span className="dot yellow"></span>Risk</span>
                            </div>
                        </div>
                        <div className="db-map-viz">
                            {/* Railway Network Simulation */}
                            <svg className="db-map-svg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">
                                {/* Track lines */}
                                <path d="M60,170 Q180,100 300,170 T540,170" stroke="#2a3a52" strokeWidth="2" fill="none" strokeDasharray="6,4" />
                                <path d="M180,80 L300,170 L420,80" stroke="#2a3a52" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
                                <path d="M300,170 L300,310" stroke="#2a3a52" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
                                <path d="M60,170 L180,250 L300,310" stroke="#2a3a52" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
                                {/* Station labels */}
                                <text x="42" y="165" fill="#8b9bb4" fontSize="9" textAnchor="middle">HWH</text>
                                <text x="180" y="75" fill="#8b9bb4" fontSize="9" textAnchor="middle">LKO</text>
                                <text x="300" y="163" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">NDLS</text>
                                <text x="420" y="75" fill="#8b9bb4" fontSize="9" textAnchor="middle">JP</text>
                                <text x="548" y="165" fill="#8b9bb4" fontSize="9" textAnchor="middle">CDG</text>
                                <text x="180" y="258" fill="#8b9bb4" fontSize="9" textAnchor="middle">AGC</text>
                                <text x="300" y="320" fill="#8b9bb4" fontSize="9" textAnchor="middle">BPL</text>
                                {/* Train points */}
                                <circle cx="200" cy="145" r="7" fill="#20c997" style={{ filter: 'drop-shadow(0 0 6px #20c997)' }}>
                                    <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="350" cy="158" r="7" fill="#ff6b6b" style={{ filter: 'drop-shadow(0 0 6px #ff6b6b)' }}>
                                    <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="380" cy="115" r="7" fill="#fcc419" style={{ filter: 'drop-shadow(0 0 6px #fcc419)' }}>
                                    <animate attributeName="r" values="6;8;6" dur="2.5s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="260" cy="230" r="7" fill="#20c997" style={{ filter: 'drop-shadow(0 0 6px #20c997)' }}>
                                    <animate attributeName="r" values="6;8;6" dur="1.8s" repeatCount="indefinite" />
                                </circle>
                                {/* Station dots */}
                                <circle cx="60" cy="170" r="5" fill="#2a3a52" stroke="#3a5a82" strokeWidth="1.5" />
                                <circle cx="180" cy="80" r="5" fill="#2a3a52" stroke="#3a5a82" strokeWidth="1.5" />
                                <circle cx="300" cy="170" r="8" fill="#1a2a40" stroke="#00a8ff" strokeWidth="2" />
                                <circle cx="420" cy="80" r="5" fill="#2a3a52" stroke="#3a5a82" strokeWidth="1.5" />
                                <circle cx="540" cy="170" r="5" fill="#2a3a52" stroke="#3a5a82" strokeWidth="1.5" />
                                <circle cx="180" cy="250" r="5" fill="#2a3a52" stroke="#3a5a82" strokeWidth="1.5" />
                                <circle cx="300" cy="310" r="5" fill="#2a3a52" stroke="#3a5a82" strokeWidth="1.5" />
                            </svg>
                            <div className="db-map-controls">
                                <button>+</button>
                                <button>-</button>
                            </div>
                        </div>
                    </div>

                    {/* Live Train Feed */}
                    <div className="card db-trains-card">
                        <div className="section-header">
                            <div className="header-title"><Train size={14} className="text-blue" /> LIVE TRAIN FEED</div>
                        </div>
                        <div className="db-train-list">
                            {liveTrains.map(t => (
                                <div className="db-train-row" key={t.id}>
                                    <div className="db-train-id">{t.id}</div>
                                    <div className="db-train-info">
                                        <div className="db-train-name">{t.name}</div>
                                        <div className="db-train-route">{t.from} → {t.to}</div>
                                    </div>
                                    <div className="db-train-right">
                                        <div className="db-train-eta"><Clock size={11} /> {t.eta}</div>
                                        <span className={`status-pill-sm ${t.status}`}>{t.delay || 'ON TIME'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom KPI */}
                <div className="db-bottom-row">
                    <div className="card db-bottom-kpi">
                        <div className="db-kpi-header"><span>Active Trains Counter</span><Train size={16} className="text-blue" /></div>
                        <div className="db-bottom-val">278 <span className="positive-trend"><ArrowUpRight size={14} /> 5.2%</span></div>
                    </div>
                    <div className="card db-bottom-kpi">
                        <div className="db-kpi-header"><span>Platform Occupancy</span><LayoutGrid size={16} className="text-blue" /></div>
                        <div className="db-bottom-val">84% <span className="db-bottom-sub">Global Network Avg.</span></div>
                    </div>
                    <div className="card db-bottom-kpi">
                        <div className="db-kpi-header"><span>Network Health</span><Activity size={16} className="text-green" /></div>
                        <div className="db-bottom-val text-green">98.4% <span className="db-bottom-sub">Operational</span></div>
                    </div>
                </div>
            </main>

            {/* Fixed Dashboard Sidebar */}
            <aside className="universal-right-sidebar">
                <div className="dashboard-sidebar-content">
                    {/* AI Optimizations */}
                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header blue-glow">
                            <Cpu size={16} />
                            <h2>AI OPTIMIZATIONS</h2>
                            <div className="tool-indicator blue"></div>
                        </div>
                        <div className="tool-content">
                            {aiInsights.map((item, i) => (
                                <div className={`tool-minor-item ${i === 0 ? 'tool-action-box highlight' : ''}`} key={i}>
                                    <div className="tool-sub-title">{item.type}</div>
                                    <p style={{ fontSize: '12px', lineHeight: '1.5' }} className="text-muted-light">{item.desc}</p>
                                    {item.action && <button className="tool-action-btn primary">EXECUTE ACTION</button>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Live Alert Feed */}
                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header red-glow">
                            <AlertTriangle size={16} className="text-red" />
                            <h2>LIVE ALERT FEED</h2>
                        </div>
                        <div className="tool-content" style={{ padding: '0' }}>
                            <div className="alert-feed-list">
                                {recentAlerts.map((a, i) => (
                                    <div className={`feed-entry ${a.severity}`} key={i}>
                                        <span className="entry-time">{a.time}</span>
                                        <div className={`entry-title ${a.severity === 'high' ? 'text-red' : a.severity === 'med' ? 'text-yellow' : 'text-blue'}`}>{a.title}</div>
                                        <p className="entry-body">{a.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
