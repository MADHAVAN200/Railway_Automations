import React, { useState } from 'react';
import { Shield, Download, Search, Filter, CheckCircle, AlertTriangle, Cpu, User, Activity } from 'lucide-react';

const logData = [
    { id: 'EVT-4821', ts: '19:42:08', type: 'AI_DECISION', module: 'Scheduler', source: 'AI', action: 'Rerouted 12002 via Loop Line. ETA updated to 16:15.', status: 'Applied', hash: 'a3f2c1...d9e' },
    { id: 'EVT-4820', ts: '19:40:55', type: 'OPERATOR_OVERRIDE', module: 'Platform', source: 'Operator', action: 'Manually assigned PF-03 to 12381 overriding AI suggestion of PF-06.', status: 'Logged', hash: 'f8b1a0...42c' },
    { id: 'EVT-4819', ts: '19:38:12', type: 'ALERT', module: 'Disruption', source: 'Sensor', action: 'Track obstruction detected at Sector D-14 (Palwal). Auto-alert raised.', status: 'Active', hash: '2d9f3e...a1b' },
    { id: 'EVT-4818', ts: '19:35:01', type: 'AI_DECISION', module: 'Comms', source: 'AI', action: 'Generated PA announcement in Hindi for Shatabdi delay at NDLS PF-02.', status: 'Broadcast', hash: 'c7a4f9...38d' },
    { id: 'EVT-4817', ts: '19:32:44', type: 'SYSTEM', module: 'Monitoring', source: 'System', action: 'Container platform-optimizer auto-restarted after CPU threshold breach.', status: 'Resolved', hash: '3e8b2d...f0c' },
    { id: 'EVT-4816', ts: '19:28:03', type: 'AI_DECISION', module: 'Scheduler', source: 'AI', action: 'Speed reduction advisory issued for 12301 Rajdhani through JP-NDLS sector.', status: 'Applied', hash: 'b9c3e7...22a' },
    { id: 'EVT-4815', ts: '19:25:18', type: 'OPERATOR_OVERRIDE', module: 'Platform', source: 'Operator', action: 'Operator Priya Sharma rejected AI platform reassignment for 22415 Vande Bharat.', status: 'Logged', hash: '5f1a8b...99e' },
    { id: 'EVT-4814', ts: '19:20:00', type: 'SYSTEM', module: 'Monitoring', source: 'System', action: 'Kafka lag resolved on ai.recommendations.feed. Batch processed 4,520 events.', status: 'Info', hash: 'd4e9c3...14f' },
    { id: 'EVT-4813', ts: '19:15:33', type: 'ALERT', module: 'Disruption', source: 'Sensor', action: 'Signal failure at Junction East-2, Hazrat Nizamuddin. Manual override active.', status: 'Active', hash: '7c2b5f...80a' },
    { id: 'EVT-4812', ts: '19:10:11', type: 'AI_DECISION', module: 'HITL', source: 'AI', action: 'Recommended 8-min controlled departure delay for 12622 Tamil Nadu Exp (approved by operator).', status: 'Applied', hash: '1a6d3c...57b' },
];

const typeConfig = {
    AI_DECISION: { color: 'blue', icon: Cpu, label: 'AI Decision' },
    OPERATOR_OVERRIDE: { color: 'yellow', icon: User, label: 'Operator Override' },
    ALERT: { color: 'red', icon: AlertTriangle, label: 'Alert' },
    SYSTEM: { color: 'green', icon: Activity, label: 'System' },
};

const statusColors = { Applied: 'green', Logged: 'blue', Active: 'red', Broadcast: 'blue', Resolved: 'green', Info: 'muted' };

const kpis = [
    { label: 'AI Decisions Today', value: '142', icon: Cpu, color: 'blue' },
    { label: 'Operator Overrides', value: '17', icon: User, color: 'yellow' },
    { label: 'Disruptions Handled', value: '8', icon: AlertTriangle, color: 'red' },
    { label: 'System Events', value: '310', icon: Activity, color: 'green' },
];

export default function AuditLogsPage() {
    const [selected, setSelected] = useState(logData[0]);
    const [filterType, setFilterType] = useState('ALL');
    const [search, setSearch] = useState('');

    const filtered = logData.filter(l =>
        (filterType === 'ALL' || l.type === filterType) &&
        (l.action.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="view-wrapper">
            <main className="page-content">

                {/* KPI Row */}
                <div className="audit-kpi-row">
                    {kpis.map((k, i) => (
                        <div className="card audit-kpi-card" key={i}>
                            <div className="db-kpi-header">
                                <span>{k.label}</span>
                                <k.icon size={15} className={`text-${k.color}`} />
                            </div>
                            <div className="db-kpi-value">{k.value}</div>
                        </div>
                    ))}
                </div>

                {/* Filters + Table */}
                <div className="card audit-main-card">
                    <div className="section-header space-between">
                        <div className="header-title"><Shield size={14} className="text-blue" /> IMMUTABLE AUDIT LOG — NDLS CONTROL CENTER</div>
                        <div className="audit-toolbar">
                            <div className="audit-search">
                                <Search size={13} />
                                <input
                                    className="audit-search-input"
                                    placeholder="Search by event / ID…"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="audit-filter-tabs">
                                {['ALL', 'AI_DECISION', 'OPERATOR_OVERRIDE', 'ALERT', 'SYSTEM'].map(f => (
                                    <button
                                        key={f}
                                        className={`audit-filter-tab ${filterType === f ? 'active' : ''}`}
                                        onClick={() => setFilterType(f)}
                                    >
                                        {f === 'ALL' ? 'All' : typeConfig[f].label}
                                    </button>
                                ))}
                            </div>
                            <button className="audit-export-btn"><Download size={13} /> Export</button>
                        </div>
                    </div>

                    <table className="audit-table">
                        <thead>
                            <tr>
                                <th>TIMESTAMP</th>
                                <th>EVENT ID</th>
                                <th>TYPE</th>
                                <th>MODULE</th>
                                <th>SOURCE</th>
                                <th>ACTION SUMMARY</th>
                                <th>STATUS</th>
                                <th>HASH</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(log => {
                                const Cfg = typeConfig[log.type];
                                return (
                                    <tr
                                        key={log.id}
                                        className={`audit-row ${selected?.id === log.id ? 'selected' : ''}`}
                                        onClick={() => setSelected(log)}
                                    >
                                        <td className="mon-td-muted">{log.ts}</td>
                                        <td><span className="train-id-badge bg-blue-dim">{log.id}</span></td>
                                        <td>
                                            <span className={`audit-type-badge ${Cfg.color}`}>
                                                <Cfg.icon size={10} /> {Cfg.label}
                                            </span>
                                        </td>
                                        <td className="mon-td-muted">{log.module}</td>
                                        <td>
                                            <span className={`audit-source-badge ${log.source.toLowerCase()}`}>{log.source}</span>
                                        </td>
                                        <td className="audit-action-cell">{log.action}</td>
                                        <td>
                                            <span className={`text-${statusColors[log.status]}`} style={{ fontSize: '11px', fontWeight: '700' }}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="audit-hash">{log.hash}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Detail Panel */}
                {selected && (
                    <div className="card audit-detail-card">
                        <div className="section-header space-between">
                            <div className="header-title"><CheckCircle size={14} className="text-green" /> EVENT DETAIL — {selected.id}</div>
                            <div className="audit-immutable-tag"><Shield size={11} /> IMMUTABLE RECORD</div>
                        </div>
                        <div className="audit-detail-body">
                            <div className="audit-detail-grid">
                                <div className="audit-detail-block">
                                    <span className="audit-detail-label">EVENT TYPE</span>
                                    <span className={`audit-type-badge ${typeConfig[selected.type].color}`} style={{ display: 'inline-flex' }}>
                                        {typeConfig[selected.type].label}
                                    </span>
                                </div>
                                <div className="audit-detail-block">
                                    <span className="audit-detail-label">TIMESTAMP</span>
                                    <span className="audit-detail-val">{selected.ts}</span>
                                </div>
                                <div className="audit-detail-block">
                                    <span className="audit-detail-label">MODULE</span>
                                    <span className="audit-detail-val">{selected.module}</span>
                                </div>
                                <div className="audit-detail-block">
                                    <span className="audit-detail-label">TRIGGER SOURCE</span>
                                    <span className={`audit-source-badge ${selected.source.toLowerCase()}`}>{selected.source}</span>
                                </div>
                                <div className="audit-detail-block" style={{ gridColumn: '1/-1' }}>
                                    <span className="audit-detail-label">FULL ACTION DESCRIPTION</span>
                                    <p className="audit-detail-val">{selected.action}</p>
                                </div>
                                <div className="audit-detail-block" style={{ gridColumn: '1/-1' }}>
                                    <span className="audit-detail-label">BLOCKCHAIN HASH VERIFICATION</span>
                                    <div className="audit-hash-box">
                                        <Shield size={12} className="text-green" />
                                        <span className="font-mono">{selected.hash} — Verified ✓</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Right Sidebar */}
            <aside className="universal-right-sidebar">
                <div className="dashboard-sidebar-content">
                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header blue-glow">
                            <Filter size={16} />
                            <h2>LOG FILTERS</h2>
                        </div>
                        <div className="tool-content">
                            <div className="audit-filter-group">
                                <label className="audit-filter-label">MODULE</label>
                                <select className="comms-lang-select">
                                    <option>All Modules</option>
                                    <option>Scheduler</option>
                                    <option>Platform</option>
                                    <option>Disruption</option>
                                    <option>Comms</option>
                                    <option>Monitoring</option>
                                </select>
                            </div>
                            <div className="audit-filter-group">
                                <label className="audit-filter-label">OPERATOR</label>
                                <select className="comms-lang-select">
                                    <option>All Operators</option>
                                    <option>Rajesh Kumar</option>
                                    <option>Priya Sharma</option>
                                    <option>Arjun Mehta</option>
                                </select>
                            </div>
                            <div className="audit-filter-group">
                                <label className="audit-filter-label">TIME RANGE</label>
                                <select className="comms-lang-select">
                                    <option>Last 1 Hour</option>
                                    <option>Last 6 Hours</option>
                                    <option>Today</option>
                                    <option>Last 7 Days</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header">
                            <Shield size={14} className="text-green" />
                            <h2 style={{ color: 'var(--color-green)' }}>SECURITY STATUS</h2>
                        </div>
                        <div className="tool-content">
                            <div className="mon-health-row"><div className="mon-dot green"></div><span className="mon-health-label">Log Integrity Check</span><span className="text-green" style={{ fontSize: '10px', fontWeight: '700' }}>VERIFIED</span></div>
                            <div className="mon-health-row"><div className="mon-dot green"></div><span className="mon-health-label">Blockchain Anchor</span><span className="text-green" style={{ fontSize: '10px', fontWeight: '700' }}>SYNCED</span></div>
                            <div className="mon-health-row"><div className="mon-dot yellow"></div><span className="mon-health-label">Audit Export</span><span className="text-yellow" style={{ fontSize: '10px', fontWeight: '700' }}>QUEUED</span></div>
                            <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(18,169,122,0.08)', border: '1px solid rgba(18,169,122,0.25)', borderRadius: '6px', fontSize: '11px', color: 'var(--color-green)' }}>
                                4,821 events logged today. Last hash anchored at 19:40 IST.
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
