import React, { useState } from 'react';
import {
    Settings, Wind, ShieldAlert, Zap, Activity, AlertTriangle, BarChart3, RefreshCw, ArrowRight, CheckCircle
} from 'lucide-react';

const ScenarioCard = ({ type, title, desc, icon: Icon, active, onClick }) => (
    <div className={`scenario-card card ${active ? 'active' : ''}`} onClick={onClick}>
        <div className={`scenario-icon ${type}`}>
            <Icon size={20} />
        </div>
        <div className="scenario-info">
            <h4>{title}</h4>
            <p>{desc}</p>
        </div>
        <div className={`active-indicator ${active ? 'visible' : ''}`}>
            <div className="dot"></div>
            <span>ACTIVE</span>
        </div>
    </div>
);

const RecoveryPlan = ({ title, reduction, time, selected, onSelect }) => (
    <div className={`recovery-plan-box card ${selected ? 'selected' : ''}`} onClick={onSelect}>
        <div className="plan-header">
            <span className="plan-title">{title}</span>
            {selected && <CheckCircle size={16} className="text-blue" />}
        </div>
        <div className="plan-metrics">
            <div className="plan-metric">
                <span className="label">DELAY REDUCTION</span>
                <span className="value text-green">-{reduction}%</span>
            </div>
            <div className="plan-metric">
                <span className="label">REC. TIME</span>
                <span className="value">{time}m</span>
            </div>
        </div>
    </div>
);

export default function DisruptionPage({ isSimulating, selectedPlan, setSelectedPlan }) {
    const [activeScenario, setActiveScenario] = useState('breakdown');

    const scenarios = [
        { id: 'breakdown', title: 'Train Breakdown', desc: 'Engine failure on Sector B-4', icon: Settings, type: 'red' },
        { id: 'weather', title: 'Weather Delay', desc: 'Heavy snow affecting visibility', icon: Wind, type: 'blue' },
        { id: 'blockage', title: 'Track Blockage', desc: 'Obstruction detected in Tunnel 4', icon: ShieldAlert, type: 'orange' },
        { id: 'signal', title: 'Signal Failure', desc: 'Main switching unit malfunction', icon: Zap, type: 'purple' },
    ];

    return (
        <div className="view-wrapper">
            {/* Main scrollable content area */}
            <main className="page-content">
                <div className="disruption-grid">
                    {/* Scenarios Selection */}
                    <div className="disruption-left-panel">
                        <div className="section-title">ACTIVE SCENARIO SELECTION</div>
                        <div className="scenarios-list">
                            {scenarios.map(s => (
                                <ScenarioCard
                                    key={s.id}
                                    {...s}
                                    active={activeScenario === s.id}
                                    onClick={() => setActiveScenario(s.id)}
                                />
                            ))}
                        </div>

                        <div className="disruption-stats card">
                            <div className="stat-row">
                                <span className="label">IMPACTED TRAINS</span>
                                <span className="value text-red">12</span>
                            </div>
                            <div className="stat-row">
                                <span className="label">EST. TOTAL DELAY</span>
                                <span className="value text-orange">+145m</span>
                            </div>
                        </div>
                    </div>

                    {/* Network Simulation */}
                    <div className="disruption-main-view">
                        <div className="card network-card">
                            <div className="section-header">
                                <div className="header-title">
                                    <Activity size={16} className="text-blue" />
                                    RAILWAY NETWORK SIMULATION VIEW
                                </div>
                            </div>

                            <div className="simulation-canvas">
                                <div className="network-map-mockup">
                                    <div className="disruption-origin-glow">
                                        <div className="ring ring1"></div>
                                        <AlertTriangle size={24} className="origin-icon" />
                                    </div>
                                    <div className="reroute-path-line">
                                        <div className="train-dot animated"></div>
                                    </div>
                                    <div className="map-node node-1" data-label="ST-1"></div>
                                    <div className="map-node node-2" data-label="ST-2"></div>
                                </div>
                            </div>

                            <div className="simulation-ticker">
                                <div className="ticker-item">AUTO-REROUTE ICE-522 via Sector D-1</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Non-scrollable Disruption Sidebar */}
            <aside className="universal-right-sidebar">
                <div className="disruption-right-panel card">
                    <div className="sidebar-header-title">
                        <BarChart3 size={18} className="text-blue" />
                        AI RECOVERY STRATEGIES
                    </div>
                    <div className="plans-list">
                        <RecoveryPlan
                            title="Aggressive Reroute"
                            reduction="65"
                            time="15"
                            selected={selectedPlan === 'aggressive'}
                            onSelect={() => setSelectedPlan('aggressive')}
                        />
                        <RecoveryPlan
                            title="Balanced Allocation"
                            reduction="42"
                            time="25"
                            selected={selectedPlan === 'balanced'}
                            onSelect={() => setSelectedPlan('balanced')}
                        />
                    </div>
                    <div className="spacer"></div>
                    <div className="action-footer">
                        <button className="action-btn-large blue-fill">
                            APPROVE RECOVERY PLAN <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
