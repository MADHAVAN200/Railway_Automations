import React, { useState } from 'react';
import { Cpu, AlertTriangle, Clock, Activity } from 'lucide-react';

const platforms = [
    { num: '01', status: 'occupied', train: '12301 Rajdhani Exp', route: 'ROUTE: HWH → NDLS', arrival: '14:20', delay: '+10m', departure: '14:50' },
    { num: '02', status: 'occupied', train: '12423 Dibrugarh Raj', route: 'ROUTE: NDLS → GHY', arrival: '14:05', departure: '15:15' },
    { num: '03', status: 'free', nextExp: '15:30', lastExit: '13:45' },
    { num: '04', status: 'reserved', train: '22415 Varanasi Vande Bharat', eta: '5M (IN-TRANSIT)', scheduled: '14:50', duration: '10m Turnaround' },
    { num: '05', status: 'free', note: 'CLEANING IN PROGRESS', nextExp: '15:45', lastExit: '14:00' },
    { num: '06', status: 'occupied', train: '12002 Bhopal Shatabdi', route: 'ROUTE: NDLS → RKMP', arrival: '14:05', departure: 'DEPARTING IN 2M' },
    { num: '07', status: 'free', nextExp: '16:00', lastExit: '14:10' },
    { num: '08', status: 'free', nextExp: '16:15', lastExit: '14:20' },
    { num: '09', status: 'reserved', train: '12424 NDLS-DBRG Rajdhani', eta: '12M', scheduled: '15:10', duration: '8m Turnaround' },
    { num: '10', status: 'occupied', train: '12621 Tamil Nadu Express', route: 'ROUTE: NDLS → MAS', arrival: '14:15', departure: '16:00' },
];

const statusLabel = { occupied: 'OCCUPIED', free: 'FREE', reserved: 'RESERVED' };
const statusSeq = { occupied: 1, reserved: 2, free: 3 };

export default function PlatformPage() {
    const [focused, setFocused] = useState(null);
    const pfStatus = platforms.map(p => p.status);

    return (
        <div className="view-wrapper">
            <main className="page-content">
                {/* Station Focus Bar */}
                <div className="pf-station-focus">
                    <div className="station-focus-label">STATION FOCUS</div>
                    <div className="station-name">NDLS — NEW DELHI CENTRAL <span className="station-arrow">▾</span></div>
                    <div className="station-meta"><span className="dot green"></span> SYSTEM READY</div>
                    <div className="station-time"><Clock size={12} /> 20 MAR 2024 | 14:45:22 IST</div>
                    <button className="simulate-btn"><Activity size={14} /> SIMULATE ARRIVAL</button>
                </div>

                {/* Live Platform Map Bar */}
                <div className="card pf-map-card">
                    <div className="section-header space-between">
                        <div className="header-title">LIVE STATION MAP</div>
                        <div className="pf-legend">
                            <span><span className="dot free"></span>FREE</span>
                            <span><span className="dot reserved"></span>RESERVED</span>
                            <span><span className="dot occupied"></span>OCCUPIED</span>
                        </div>
                    </div>
                    <div className="pf-strip-row">
                        {pfStatus.map((s, i) => (
                            <div
                                key={i}
                                className={`pf-strip ${s} ${focused === i ? 'focused' : ''}`}
                                onClick={() => setFocused(i === focused ? null : i)}
                            >
                                PF {String(i + 1).padStart(2, '0')}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Cards Grid */}
                <div className="pf-cards-grid">
                    {platforms.map((p, i) => (
                        <div
                            key={i}
                            className={`card pf-card ${p.status} ${focused === i ? 'selected' : ''}`}
                            onClick={() => setFocused(i === focused ? null : i)}
                        >
                            <div className="pf-card-header">
                                <span className="pf-num">{p.num}</span>
                                <span className={`pf-status-badge ${p.status}`}>{statusLabel[p.status]}</span>
                            </div>
                            {p.train ? (
                                <>
                                    <div className="pf-train-name">{p.train}</div>
                                    {p.route && <div className="pf-route">{p.route}</div>}
                                    {p.eta && <div className="pf-route">ETA: {p.eta}</div>}
                                    <div className="pf-time-row">
                                        <div className="pf-time-block">
                                            <span className="label">ARRIVAL</span>
                                            <span className="value">{p.arrival || p.scheduled} {p.delay && <span className="text-red">{p.delay}</span>}</span>
                                        </div>
                                        <div className="pf-time-block">
                                            <span className="label">DEPARTURE</span>
                                            <span className="value">{p.departure || p.duration}</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="pf-no-train">No Train Assigned</div>
                                    {p.note && <div className="pf-note">{p.note}</div>}
                                    <div className="pf-time-row">
                                        <div className="pf-time-block"><span className="label">NEXT EXPECTED</span><span className="value">{p.nextExp}</span></div>
                                        <div className="pf-time-block"><span className="label">LAST EXIT</span><span className="value">{p.lastExit}</span></div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            {/* Fixed Platform Sidebar */}
            <aside className="universal-right-sidebar">
                <div className="platform-sidebar">
                    {/* AI Assignment Engine */}
                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header blue-glow">
                            <Cpu size={16} />
                            <h2>AI ASSIGNMENT ENGINE</h2>
                        </div>
                        <div className="tool-content">
                            <div className="pf-incoming-label">INCOMING OPTIMIZATION</div>
                            <div className="pf-best-box">
                                <div className="pf-best-header">
                                    <span className="pill blue">BEST PLATFORM</span>
                                    <span className="pf-train-id">#TRN-5542</span>
                                </div>
                                <div className="pf-best-name">Duronto Express 12260</div>
                                <p className="text-muted-light" style={{ fontSize: '11px', marginTop: '6px' }}>AI suggests Platform 07 for optimal passenger flow and signal clearance.</p>
                                <button className="tool-action-btn primary" style={{ marginTop: '12px' }}>ACCEPT AI ASSIGNMENT</button>
                                <button className="tool-action-btn secondary" style={{ marginTop: '6px' }}>MANUAL OVERRIDE</button>
                            </div>
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header red-glow-h">
                            <AlertTriangle size={16} className="text-red" />
                            <h2 className="text-red">SYSTEM HEALTH</h2>
                        </div>
                        <div className="tool-content">
                            <div className="pf-conflict-alert">
                                <div className="conflict-title"><AlertTriangle size={12} /> CONFLICT DETECTED</div>
                                <p>PF-04 Reservation overlaps with Delayed Arrival of <span className="link-text">Shatabdi Exp</span> (PF-04).</p>
                                <button className="link-btn">VIEW MITIGATION STRATEGY ›</button>
                            </div>
                            <div className="pf-stats-row">
                                <div className="pf-stat">
                                    <span className="pf-stat-label">ASSIGNED</span>
                                    <span className="pf-stat-val">102</span>
                                </div>
                                <div className="pf-stat">
                                    <span className="pf-stat-label">EFFICIENCY</span>
                                    <span className="pf-stat-val text-green">94%</span>
                                </div>
                            </div>
                        </div>
                        <div className="pf-engine-status">
                            <span>ENGINE STATUS</span>
                            <span className="text-blue">OPERATIONAL</span>
                        </div>
                    </div>

                    {/* Event Log */}
                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header">
                            <Clock size={14} className="text-muted" />
                            <h2 className="text-muted">EVENT LOG</h2>
                        </div>
                        <div className="tool-content" style={{ padding: '12px 16px' }}>
                            {[
                                { t: '14:42', msg: 'PF-01 Status updated to Occupied' },
                                { t: '14:38', msg: 'AI-Core Optimized PF-07 Schedule' },
                                { t: '14:35', msg: 'Train 12301 entered block sector A-14' },
                            ].map((e, i) => (
                                <div className="event-log-row" key={i}>
                                    <span className="event-log-time">{e.t}</span>
                                    <span className="event-log-msg">{e.msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
