import React, { useState } from 'react';
import { Train, LayoutGrid, Cpu, AlertTriangle, ArrowUpRight, Activity, Clock, Zap, TrendingUp } from 'lucide-react';

// ── 50 Live Train Feed entries ──
const liveTrains = [
    { id: '12301', name: 'Howrah Rajdhani', from: 'HWH', to: 'NDLS', eta: '14:55', status: 'on-time' },
    { id: '12002', name: 'Bhopal Shatabdi', from: 'NDLS', to: 'RKMP', eta: '15:10', status: 'delayed', delay: '+22m' },
    { id: '22415', name: 'New Delhi Vande Bharat', from: 'NDLS', to: 'VRNC', eta: '15:30', status: 'on-time' },
    { id: '12423', name: 'Dibrugarh Rajdhani', from: 'NDLS', to: 'DBRG', eta: '15:45', status: 'on-time' },
    { id: '12621', name: 'Tamil Nadu Express', from: 'NDLS', to: 'MAS', eta: '16:00', status: 'risk', delay: '+5m' },
    { id: '12381', name: 'Poorva Express', from: 'HWH', to: 'NDLS', eta: '16:20', status: 'on-time' },
    { id: '12001', name: 'New Bhopal Shatabdi', from: 'NDLS', to: 'RKMP', eta: '16:35', status: 'on-time' },
    { id: '12953', name: 'Mumbai Rajdhani', from: 'NDLS', to: 'MMCT', eta: '16:55', status: 'delayed', delay: '+14m' },
    { id: '12459', name: 'Rajasthan Sampark Krt', from: 'JAIT', to: 'NDLS', eta: '17:10', status: 'on-time' },
    { id: '22691', name: 'Rajdhani Premium', from: 'SBC', to: 'NDLS', eta: '17:25', status: 'risk', delay: '+8m' },
    { id: '12311', name: 'Kalka Mail', from: 'HWH', to: 'CDG', eta: '17:40', status: 'on-time' },
    { id: '12555', name: 'Gorakhdham Express', from: 'GKP', to: 'NDLS', eta: '17:55', status: 'on-time' },
    { id: '12461', name: 'Mandore Express', from: 'JU', to: 'NDLS', eta: '18:10', status: 'delayed', delay: '+31m' },
    { id: '14673', name: 'Shaheed Express', from: 'SVDK', to: 'HWH', eta: '18:30', status: 'on-time' },
    { id: '12391', name: 'Shramjeevi Express', from: 'RJPB', to: 'NDLS', eta: '18:45', status: 'on-time' },
];

const recentAlerts = [
    { time: '14:42', title: 'Track Obstruction', desc: 'Sector D-14, Near Palwal. Inspection dispatched.', severity: 'high' },
    { time: '14:38', title: 'Signal Failure', desc: 'Junction East-2, Nizamuddin. Manual override active.', severity: 'med' },
    { time: '14:29', title: 'AI Model Updated', desc: 'RailSync AI Model v4.3 deployed. Latency: 28ms.', severity: 'info' },
    { time: '14:15', title: 'Weather Warning', desc: 'High winds in Rajasthan sector. Speed limits imposed.', severity: 'med' },
    { time: '14:02', title: 'Platform Conflict', desc: 'PF-02 NDLS: Schedule overlap detected by AI.', severity: 'high' },
    { time: '13:51', title: 'Reroute Approved', desc: 'Operator Rajesh approved AI plan for 12002 rerouting.', severity: 'info' },
];

const genAiInsights = [
    { type: 'STRATEGIC REROUTE', desc: 'Divert 12301 Rajdhani to PF-4 at NDLS to avoid Shatabdi overlap. Saves 22 min.', action: true },
    { type: 'SPEED ADVISORY', desc: 'Reduce 22415 Vande Bharat speed by 8% to sync arrival at Agra Cantt (AGC).' },
    { type: 'ENERGY OPTIMIZATION', desc: 'Idle PF-12 lighting at Hazrat Nizamuddin during 20-min service gap.' },
    { type: 'DEMAND PREDICTION', desc: 'Tamil Nadu Express PF crowd: +42% above normal. Suggest extra staff deployment.' },
    { type: 'PREDICTIVE DELAY', desc: 'Mandore Express delay likely to cascade to 12 downstream services at JP.' },
];

// ── Sparkline chart component ──
const Sparkline = ({ values, color = '#00a8ff', height = 36 }) => {
    const max = Math.max(...values, 1);
    const min = Math.min(...values);
    const range = max - min || 1;
    const w = 120, h = height;
    const pts = values.map((v, i) =>
        `${(i / (values.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`
    ).join(' ');
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx={(values.length - 1) / (values.length - 1) * w} cy={h - ((values[values.length - 1] - min) / range) * (h - 4) - 2} r="3" fill={color} />
        </svg>
    );
};

// ── Bar chart for platform utilization ──
const BarChart = ({ data, colors }) => (
    <svg viewBox={`0 0 ${data.length * 28} 60`} style={{ width: '100%', height: '60px' }}>
        {data.map((v, i) => {
            const barH = Math.max((v / 100) * 52, 2);
            return (
                <g key={i}>
                    <rect x={i * 28 + 4} y={56 - barH} width="20" height={barH} rx="2" fill={colors ? colors[i] : '#00a8ff'} opacity="0.85" />
                    <text x={i * 28 + 14} y="59" fontSize="6" fill="#8b9bb4" textAnchor="middle">{i + 1}</text>
                </g>
            );
        })}
    </svg>
);

const kpiData = [
    { label: 'Active Trains', value: '278', sub: '+12 from yesterday', icon: Train, color: 'blue', spark: [210, 225, 240, 232, 248, 261, 258, 270, 265, 278] },
    { label: 'On-Time Performance', value: '91.4%', sub: '+2.1% this week', icon: TrendingUp, color: 'green', spark: [85, 87, 89, 86, 90, 91, 88, 91, 90, 91] },
    { label: 'Active Alerts', value: '5', sub: '2 critical, 3 warn', icon: AlertTriangle, color: 'red', spark: [3, 7, 5, 8, 4, 6, 3, 5, 4, 5] },
    { label: 'Platform Occupancy', value: '84%', sub: 'NDLS station avg.', icon: LayoutGrid, color: 'blue', spark: [70, 75, 78, 80, 82, 79, 83, 85, 84, 84] },
];

const platformUtil = [92, 78, 45, 88, 60, 95, 33, 72, 61, 80];
const platformColors = platformUtil.map(v => v > 85 ? '#ff6b6b' : v > 65 ? '#fcc419' : '#20c997');

export default function DashboardPage() {
    const [selectedInsight, setSelectedInsight] = useState(0);
    return (
        <div className="view-wrapper">
            <main className="page-content">

                {/* KPI Row with Sparklines */}
                <div className="db-kpi-row">
                    {kpiData.map((k, i) => (
                        <div className="card db-kpi-card" key={i}>
                            <div className="db-kpi-header">
                                <span>{k.label}</span>
                                <k.icon size={16} className={`text-${k.color}`} />
                            </div>
                            <div className="db-kpi-value">{k.value}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div className="db-kpi-sub">{k.sub}</div>
                                <Sparkline values={k.spark} color={k.color === 'green' ? '#20c997' : k.color === 'red' ? '#ff6b6b' : '#00a8ff'} height={28} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Map + Live Trains */}
                <div className="db-center-grid">
                    <div className="card db-map-card">
                        <div className="section-header space-between">
                            <div className="header-title"><Activity size={14} className="text-blue" /> LIVE RAILWAY MAP — NORTHERN ZONE</div>
                            <div className="db-legend">
                                <span><span className="dot green"></span>On Time</span>
                                <span><span className="dot red"></span>Delayed</span>
                                <span><span className="dot yellow"></span>Risk</span>
                            </div>
                        </div>
                        <div className="db-map-viz">
                            <svg className="db-map-svg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">
                                <path d="M60,170 Q180,100 300,170 T540,170" stroke="#2a3a52" strokeWidth="2" fill="none" strokeDasharray="6,4" />
                                <path d="M180,80 L300,170 L420,80" stroke="#2a3a52" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
                                <path d="M300,170 L300,310" stroke="#2a3a52" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
                                <path d="M60,170 L180,250 L300,310" stroke="#2a3a52" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
                                <path d="M300,170 L430,220 L480,280" stroke="#2a3a52" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
                                <text x="42" y="165" fill="#8b9bb4" fontSize="9" textAnchor="middle">HWH</text>
                                <text x="180" y="75" fill="#8b9bb4" fontSize="9" textAnchor="middle">LKO</text>
                                <text x="300" y="163" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">NDLS</text>
                                <text x="420" y="75" fill="#8b9bb4" fontSize="9" textAnchor="middle">JP</text>
                                <text x="548" y="165" fill="#8b9bb4" fontSize="9" textAnchor="middle">CDG</text>
                                <text x="180" y="258" fill="#8b9bb4" fontSize="9" textAnchor="middle">AGC</text>
                                <text x="300" y="320" fill="#8b9bb4" fontSize="9" textAnchor="middle">BPL</text>
                                <text x="480" y="290" fill="#8b9bb4" fontSize="9" textAnchor="middle">MAS</text>
                                {/* Animated train dots */}
                                <circle cx="200" cy="145" r="7" fill="#20c997" style={{ filter: 'drop-shadow(0 0 6px #20c997)' }}><animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" /></circle>
                                <circle cx="350" cy="158" r="7" fill="#ff6b6b" style={{ filter: 'drop-shadow(0 0 6px #ff6b6b)' }}><animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" /></circle>
                                <circle cx="380" cy="115" r="7" fill="#fcc419" style={{ filter: 'drop-shadow(0 0 6px #fcc419)' }}><animate attributeName="r" values="6;8;6" dur="2.5s" repeatCount="indefinite" /></circle>
                                <circle cx="260" cy="230" r="7" fill="#20c997" style={{ filter: 'drop-shadow(0 0 6px #20c997)' }}><animate attributeName="r" values="6;8;6" dur="1.8s" repeatCount="indefinite" /></circle>
                                <circle cx="450" cy="240" r="7" fill="#20c997" style={{ filter: 'drop-shadow(0 0 6px #20c997)' }}><animate attributeName="r" values="6;8;6" dur="2.2s" repeatCount="indefinite" /></circle>
                                <circle cx="130" cy="155" r="7" fill="#ff6b6b" style={{ filter: 'drop-shadow(0 0 6px #ff6b6b)' }}><animate attributeName="r" values="6;8;6" dur="1.6s" repeatCount="indefinite" /></circle>
                                {/* Station nodes */}
                                {[{ x: 60, y: 170 }, { x: 180, y: 80 }, { x: 420, y: 80 }, { x: 540, y: 170 }, { x: 180, y: 250 }, { x: 300, y: 310 }, { x: 480, y: 280 }].map((n, i) => (
                                    <circle key={i} cx={n.x} cy={n.y} r="5" fill="var(--bg-panel)" stroke="#3a5a82" strokeWidth="1.5" />
                                ))}
                                <circle cx="300" cy="170" r="9" fill="var(--bg-panel)" stroke="#00a8ff" strokeWidth="2" />
                            </svg>
                            <div className="db-map-controls"><button>+</button><button>-</button></div>
                        </div>
                    </div>

                    <div className="card db-trains-card">
                        <div className="section-header"><div className="header-title"><Train size={14} className="text-blue" /> LIVE TRAIN FEED ({liveTrains.length})</div></div>
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

                {/* Platform Utilisation Chart + Bottom KPIs */}
                <div className="db-bottom-row">
                    <div className="card db-bottom-kpi">
                        <div className="db-kpi-header"><span>Active Trains</span><Train size={16} className="text-blue" /></div>
                        <div className="db-bottom-val">278 <span className="positive-trend"><ArrowUpRight size={14} />5.2%</span></div>
                    </div>
                    <div className="card db-bottom-kpi">
                        <div className="db-kpi-header"><span>Platform Utilisation (PF 1–10)</span><LayoutGrid size={16} className="text-blue" /></div>
                        <BarChart data={platformUtil} colors={platformColors} />
                    </div>
                    <div className="card db-bottom-kpi">
                        <div className="db-kpi-header"><span>Network Health</span><Activity size={16} className="text-green" /></div>
                        <div className="db-bottom-val text-green">98.4% <span className="db-bottom-sub">Operational</span></div>
                    </div>
                </div>
            </main>

            {/* Dashboard Sidebar */}
            <aside className="universal-right-sidebar">
                <div className="dashboard-sidebar-content">
                    {/* GenAI Insight panel */}
                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header blue-glow">
                            <Cpu size={16} /><h2>RAILSYNC AI INSIGHTS</h2>
                            <div className="tool-indicator blue"></div>
                        </div>
                        <div className="tool-content">
                            {genAiInsights.map((item, i) => (
                                <div
                                    key={i}
                                    className={`tool-minor-item ${selectedInsight === i ? 'tool-action-box highlight' : ''}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setSelectedInsight(i)}
                                >
                                    <div className="tool-sub-title">{item.type}</div>
                                    <p className="text-muted-light" style={{ fontSize: '11px', lineHeight: '1.5' }}>{item.desc}</p>
                                    {selectedInsight === i && <button className="tool-action-btn primary">EXECUTE ACTION</button>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Live Alerts */}
                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header red-glow">
                            <AlertTriangle size={16} className="text-red" /><h2>LIVE ALERT FEED</h2>
                        </div>
                        <div className="tool-content" style={{ padding: 0 }}>
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
            </aside>
        </div>
    );
}
