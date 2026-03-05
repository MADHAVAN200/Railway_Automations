import React, { useState } from 'react';
import { CheckCircle, XCircle, Edit, AlertTriangle, Zap, TrendingDown, Clock } from 'lucide-react';

const recommendations = [
    {
        id: 'REC-001',
        issue: 'Platform conflict detected at NDLS PF-02: 12002 Shatabdi and 12221 Duronto arrive within 3-min buffer.',
        action: 'Reroute 12221 Duronto to PF-07. Signal clearance available. No ripple delays.',
        delay_reduction: '22 min',
        confidence: 94,
        trains: ['12002', '12221'],
        priority: 'HIGH',
        reasoning: 'Historical data shows PF-02 bottleneck affects 3 subsequent trains. PF-07 has 12-min vacancy after last shunting.'
    },
    {
        id: 'REC-002',
        issue: 'Weather advisory issued for Rajasthan sector. Wind speed 62 km/h may delay 2 Rajdhani services.',
        action: 'Reduce speed of 12301 Howrah Rajdhani to 90 km/h through JP-NDLS sector. Adjust ETA.',
        delay_reduction: '15 min',
        confidence: 87,
        trains: ['12301'],
        priority: 'MEDIUM',
        reasoning: 'Speed reduction prevents emergency braking events. Controlled deceleration maintains schedule adherence within ±8 min.'
    },
    {
        id: 'REC-003',
        issue: 'Track maintenance window at BPL sector conflicts with Tamil Nadu Express departure.',
        action: 'Delay 12622 departure from NDLS by 8 minutes. Coordination with BPL Maintenance Control confirmed.',
        delay_reduction: '44 min',
        confidence: 98,
        trains: ['12622'],
        priority: 'HIGH',
        reasoning: 'Without delay, train enters maintenance zone at T+12m. Forced stop adds 52m delay. Controlled 8m delay avoids conflict entirely.'
    },
    {
        id: 'REC-004',
        issue: 'Signal failure at Junction East-2, Hazrat Nizamuddin. 3 trains on approach.',
        action: 'Engage manual override at Nizamuddin interlocking. Route 12302 via track 6B at reduced speed.',
        delay_reduction: '18 min',
        confidence: 79,
        trains: ['12302', '12423'],
        priority: 'CRITICAL',
        reasoning: 'Signal failure requires manual intervention. Track 6B is clear for 14-min window. Delaying beyond 14m causes cascading delays.'
    },
];

const statusColors = { HIGH: 'yellow', MEDIUM: 'blue', CRITICAL: 'red' };

export default function HumanInLoopPage() {
    const [decisions, setDecisions] = useState({});
    const [selected, setSelected] = useState(null);

    const decide = (id, val) => setDecisions(d => ({ ...d, [id]: val }));

    const selectedRec = recommendations.find(r => r.id === selected);

    return (
        <div className="view-wrapper">
            <main className="page-content">
                <div className="hil-layout">

                    {/* Recommendations List */}
                    <div className="hil-list-panel">
                        <div className="hil-panel-header">
                            <Zap size={14} className="text-blue" />
                            AI RECOMMENDATIONS — AWAITING APPROVAL
                            <span className="hil-badge">{recommendations.filter(r => !decisions[r.id]).length} Pending</span>
                        </div>

                        <div className="hil-rec-list">
                            {recommendations.map(rec => (
                                <div
                                    key={rec.id}
                                    className={`card hil-rec-card ${selected === rec.id ? 'selected' : ''} ${decisions[rec.id] ? `decided-${decisions[rec.id]}` : ''}`}
                                    onClick={() => setSelected(rec.id)}
                                >
                                    <div className="hil-rec-header">
                                        <span className="hil-rec-id">{rec.id}</span>
                                        <span className={`hil-priority-badge ${statusColors[rec.priority]}`}>{rec.priority}</span>
                                        <span className="hil-confidence"><TrendingDown size={11} /> {rec.confidence}% confidence</span>
                                        {decisions[rec.id] && (
                                            <span className={`hil-decided-badge ${decisions[rec.id]}`}>
                                                {decisions[rec.id] === 'approved' ? '✓ APPROVED' : decisions[rec.id] === 'rejected' ? '✗ REJECTED' : '✎ MODIFIED'}
                                            </span>
                                        )}
                                    </div>
                                    <div className="hil-issue-text">{rec.issue}</div>
                                    <div className="hil-action-preview">
                                        <Zap size={11} className="text-blue" /> {rec.action.substring(0, 80)}…
                                    </div>
                                    <div className="hil-rec-meta">
                                        <span className="hil-meta-item"><Clock size={10} /> −{rec.delay_reduction} delay</span>
                                        <span className="hil-meta-trains">Trains: {rec.trains.join(', ')}</span>
                                    </div>

                                    {!decisions[rec.id] && (
                                        <div className="hil-quick-actions" onClick={e => e.stopPropagation()}>
                                            <button className="hil-btn approve" onClick={() => decide(rec.id, 'approved')}>
                                                <CheckCircle size={13} /> Approve
                                            </button>
                                            <button className="hil-btn reject" onClick={() => decide(rec.id, 'rejected')}>
                                                <XCircle size={13} /> Reject
                                            </button>
                                            <button className="hil-btn modify" onClick={() => decide(rec.id, 'modified')}>
                                                <Edit size={13} /> Modify
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Decision Preview Panel */}
                    {selectedRec ? (
                        <div className="hil-detail-panel">
                            <div className="card hil-detail-card">
                                <div className="hil-detail-header">
                                    <span className="hil-rec-id">{selectedRec.id}</span>
                                    <span className={`hil-priority-badge ${statusColors[selectedRec.priority]}`}>{selectedRec.priority}</span>
                                </div>

                                <div className="hil-detail-section">
                                    <div className="hil-detail-label"><AlertTriangle size={12} /> ISSUE DETECTED</div>
                                    <p className="hil-detail-body">{selectedRec.issue}</p>
                                </div>

                                <div className="hil-detail-section">
                                    <div className="hil-detail-label"><Zap size={12} className="text-blue" /> PROPOSED ACTION</div>
                                    <p className="hil-detail-body">{selectedRec.action}</p>
                                </div>

                                <div className="hil-detail-section">
                                    <div className="hil-detail-label text-blue">AI REASONING</div>
                                    <div className="hil-reasoning-box">{selectedRec.reasoning}</div>
                                </div>

                                <div className="hil-metrics-row">
                                    <div className="hil-metric-card">
                                        <span className="hil-metric-label">DELAY REDUCTION</span>
                                        <span className="hil-metric-val text-green">−{selectedRec.delay_reduction}</span>
                                    </div>
                                    <div className="hil-metric-card">
                                        <span className="hil-metric-label">AI CONFIDENCE</span>
                                        <span className="hil-metric-val text-blue">{selectedRec.confidence}%</span>
                                    </div>
                                    <div className="hil-metric-card">
                                        <span className="hil-metric-label">IMPACTED TRAINS</span>
                                        <span className="hil-metric-val">{selectedRec.trains.length}</span>
                                    </div>
                                </div>

                                {!decisions[selectedRec.id] ? (
                                    <div className="hil-detail-actions">
                                        <button className="hil-detail-btn approve" onClick={() => decide(selectedRec.id, 'approved')}>
                                            <CheckCircle size={15} /> APPROVE RECOMMENDATION
                                        </button>
                                        <button className="hil-detail-btn reject" onClick={() => decide(selectedRec.id, 'rejected')}>
                                            <XCircle size={15} /> REJECT
                                        </button>
                                        <button className="hil-detail-btn modify" onClick={() => decide(selectedRec.id, 'modified')}>
                                            <Edit size={15} /> MODIFY & APPROVE
                                        </button>
                                    </div>
                                ) : (
                                    <div className={`hil-decided-notice ${decisions[selectedRec.id]}`}>
                                        Decision recorded: {decisions[selectedRec.id].toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="hil-empty-detail">
                            <Zap size={32} className="text-blue" />
                            <p>Select a recommendation to view details and approve or reject.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Fixed Sidebar */}
            <aside className="universal-right-sidebar">
                <div className="dashboard-sidebar-content">
                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header blue-glow">
                            <CheckCircle size={16} />
                            <h2>DECISION SUMMARY</h2>
                        </div>
                        <div className="tool-content">
                            <div className="hil-summary-row">
                                <span>Pending</span>
                                <span className="text-yellow">{recommendations.filter(r => !decisions[r.id]).length}</span>
                            </div>
                            <div className="hil-summary-row">
                                <span>Approved</span>
                                <span className="text-green">{Object.values(decisions).filter(d => d === 'approved').length}</span>
                            </div>
                            <div className="hil-summary-row">
                                <span>Rejected</span>
                                <span className="text-red">{Object.values(decisions).filter(d => d === 'rejected').length}</span>
                            </div>
                            <div className="hil-summary-row">
                                <span>Modified</span>
                                <span className="text-blue">{Object.values(decisions).filter(d => d === 'modified').length}</span>
                            </div>
                            <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '12px', paddingTop: '12px' }}>
                                <div className="hil-summary-row">
                                    <span>Total Delay Savings</span>
                                    <span className="text-green">
                                        −{recommendations.filter(r => decisions[r.id] === 'approved').reduce((acc, r) => acc + parseInt(r.delay_reduction), 0)} min
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header">
                            <AlertTriangle size={14} className="text-yellow" />
                            <h2 className="text-yellow">OPERATOR GUIDE</h2>
                        </div>
                        <div className="tool-content">
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                All AI recommendations require human sign-off before execution. High-priority actions must be reviewed within 5 minutes. Rejecting an action logs the rationale for audit.
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
