import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Zap, AlertTriangle, CheckCircle, Clock, TrendingDown, Activity } from 'lucide-react';

const scenarios = [
    { id: 'breakdown', label: 'Train Breakdown', icon: '🔧', desc: 'Locomotive failure causing service halt.' },
    { id: 'weather', label: 'Weather Delay', icon: '🌩️', desc: 'High wind advisory in Rajasthan sector.' },
    { id: 'signal', label: 'Signal Failure', icon: '🚦', desc: 'Junction East-2 signal system offline.' },
    { id: 'platform', label: 'Platform Congestion', icon: '👥', desc: 'PF-02 overcrowded — delayed clearance.' },
    { id: 'blockage', label: 'Track Blockage', icon: '⛔', desc: 'Obstruction at Sector D-14 near Palwal.' },
];

const trainsList = ['12002 Bhopal Shatabdi', '12301 Howrah Rajdhani', '12423 Dibrugarh Rajdhani', '22415 Vande Bharat', '12221 Pune Duronto'];
const stationsList = ['New Delhi (NDLS)', 'Hazrat Nizamuddin', 'Agra Cantt (AGC)', 'Mathura Jn (MTJ)', 'Palwal (PWL)'];

const aiStrategies = [
    { label: 'Reroute via Loop Line', delayReduction: '22 min', confidence: 94, passengers: 'Low Impact' },
    { label: 'Priority Overtake at Agra Cantt', delayReduction: '14 min', confidence: 81, passengers: 'Medium Impact' },
    { label: 'Hold at Mathura for Gap Creation', delayReduction: '9 min', confidence: 76, passengers: 'High Impact' },
];

const networkNodes = [
    { id: 'NDLS', label: 'NDLS', x: 300, y: 170, major: true },
    { id: 'HWH', label: 'HWH', x: 60, y: 170 },
    { id: 'LKO', label: 'LKO', x: 180, y: 80 },
    { id: 'AGC', label: 'AGC', x: 180, y: 250 },
    { id: 'JP', label: 'JP', x: 420, y: 80 },
    { id: 'BPL', label: 'BPL', x: 300, y: 310 },
    { id: 'PWL', label: 'PWL', x: 220, y: 210 },
];

const networkEdges = [
    { from: 'HWH', to: 'NDLS' }, { from: 'LKO', to: 'NDLS' },
    { from: 'AGC', to: 'NDLS' }, { from: 'JP', to: 'NDLS' },
    { from: 'BPL', to: 'NDLS' }, { from: 'AGC', to: 'BPL' },
    { from: 'PWL', to: 'NDLS' },
];

const getNodePos = (id) => networkNodes.find(n => n.id === id) || { x: 0, y: 0 };

export default function SimulationLabPage() {
    const [selectedScenario, setSelectedScenario] = useState('breakdown');
    const [affectedTrain, setAffectedTrain] = useState(trainsList[0]);
    const [affectedStation, setAffectedStation] = useState(stationsList[3]);
    const [delay, setDelay] = useState(25);
    const [priority, setPriority] = useState('HIGH');
    const [running, setRunning] = useState(false);
    const [done, setDone] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState(0);
    const [trainPos, setTrainPos] = useState({ x: 60, y: 170 });
    const animRef = useRef(null);

    const runSimulation = () => {
        setRunning(true);
        setDone(false);
        let progress = 0;
        const startX = 60, startY = 170, endX = 300, endY = 170;
        const step = () => {
            progress += 0.8;
            if (progress >= 100) {
                setTrainPos({ x: endX, y: endY });
                setRunning(false);
                setDone(true);
                return;
            }
            const t = progress / 100;
            setTrainPos({ x: startX + (endX - startX) * t, y: startY + (endY - startY) * t });
            animRef.current = requestAnimationFrame(step);
        };
        animRef.current = requestAnimationFrame(step);
    };

    const reset = () => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        setRunning(false);
        setDone(false);
        setTrainPos({ x: 60, y: 170 });
    };

    const disruptionNode = networkNodes.find(n => n.label === affectedStation.split(' ')[0] || n.id === 'PWL');

    return (
        <div className="view-wrapper">
            <main className="page-content">
                <div className="sim-layout">

                    {/* Scenario Builder */}
                    <div className="sim-builder-col">
                        <div className="card sim-section">
                            <div className="section-header"><div className="header-title"><Zap size={14} className="text-blue" /> SCENARIO BUILDER</div></div>
                            <div className="sim-body">
                                <div className="sim-scenarios-grid">
                                    {scenarios.map(s => (
                                        <div
                                            key={s.id}
                                            className={`sim-scenario-card ${selectedScenario === s.id ? 'active' : ''}`}
                                            onClick={() => setSelectedScenario(s.id)}
                                        >
                                            <span className="sim-scenario-icon">{s.icon}</span>
                                            <div className="sim-scenario-label">{s.label}</div>
                                            <div className="sim-scenario-desc">{s.desc}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="sim-inputs">
                                    <div className="sim-input-group">
                                        <label className="sim-input-label">AFFECTED TRAIN</label>
                                        <select className="comms-lang-select" value={affectedTrain} onChange={e => setAffectedTrain(e.target.value)}>
                                            {trainsList.map(t => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="sim-input-group">
                                        <label className="sim-input-label">AFFECTED STATION</label>
                                        <select className="comms-lang-select" value={affectedStation} onChange={e => setAffectedStation(e.target.value)}>
                                            {stationsList.map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="sim-input-group">
                                        <label className="sim-input-label">DELAY DURATION — <span className="text-yellow">{delay} min</span></label>
                                        <input type="range" className="range-slider" min="5" max="120" step="5" value={delay} onChange={e => setDelay(+e.target.value)} />
                                    </div>
                                    <div className="sim-input-group">
                                        <label className="sim-input-label">PRIORITY LEVEL</label>
                                        <div className="sim-priority-row">
                                            {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map(p => (
                                                <button key={p} className={`sim-priority-btn ${priority === p ? 'active' : ''} ${p.toLowerCase()}`} onClick={() => setPriority(p)}>{p}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="sim-control-btns">
                                    <button className="sim-run-btn" onClick={runSimulation} disabled={running}>
                                        <Play size={14} /> {running ? 'SIMULATING…' : 'RUN SIMULATION'}
                                    </button>
                                    <button className="sim-reset-btn" onClick={reset}>
                                        <RotateCcw size={14} /> RESET
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Network Visualization */}
                    <div className="sim-center-col">
                        <div className="card sim-network-card">
                            <div className="section-header space-between">
                                <div className="header-title"><Activity size={14} className="text-blue" /> RAILWAY NETWORK SIMULATION — NORTHERN ZONE</div>
                                <div className="sim-status-pill">
                                    <div className={`mon-dot ${running ? 'yellow' : done ? 'green' : 'green'}`}></div>
                                    {running ? 'SIMULATING' : done ? 'COMPLETE' : 'STANDBY'}
                                </div>
                            </div>
                            <div className="sim-map-wrapper">
                                <svg className="sim-map-svg" viewBox="0 30 560 300" xmlns="http://www.w3.org/2000/svg">
                                    {/* Edges */}
                                    {networkEdges.map((e, i) => {
                                        const f = getNodePos(e.from), t2 = getNodePos(e.to);
                                        return <line key={i} x1={f.x} y1={f.y} x2={t2.x} y2={t2.y} stroke="#2a3a52" strokeWidth="1.5" strokeDasharray="5,4" />;
                                    })}

                                    {/* Disruption highlight */}
                                    {done && (
                                        <circle cx={disruptionNode?.x || 220} cy={disruptionNode?.y || 210} r="20" fill="rgba(255,107,107,0.15)" stroke="#ff6b6b" strokeWidth="1.5">
                                            <animate attributeName="r" values="18;24;18" dur="1.5s" repeatCount="indefinite" />
                                        </circle>
                                    )}

                                    {/* Nodes */}
                                    {networkNodes.map(n => (
                                        <g key={n.id}>
                                            <circle cx={n.x} cy={n.y} r={n.major ? 10 : 6}
                                                fill={n.major ? '#1a2a40' : 'var(--bg-panel)'}
                                                stroke={n.major ? '#00a8ff' : '#2a3a52'}
                                                strokeWidth={n.major ? 2 : 1.5}
                                            />
                                            <text x={n.x} y={n.y - 14} textAnchor="middle" fontSize="9" fill="var(--text-muted)">{n.label}</text>
                                        </g>
                                    ))}

                                    {/* Animated Train */}
                                    <g transform={`translate(${trainPos.x}, ${trainPos.y})`}>
                                        <circle r="7" fill={running ? '#fcc419' : done ? '#ff6b6b' : '#20c997'} style={{ filter: `drop-shadow(0 0 6px ${running ? '#fcc419' : '#20c997'})` }}>
                                            {running && <animate attributeName="r" values="6;8;6" dur="0.5s" repeatCount="indefinite" />}
                                        </circle>
                                        <text y="-12" textAnchor="middle" fontSize="8" fill="var(--text-muted)" style={{ fontSize: '8px' }}>
                                            {affectedTrain.split(' ')[0]}
                                        </text>
                                    </g>
                                </svg>

                                <div className="sim-map-legend">
                                    <span><span className="dot green"></span>Normal</span>
                                    <span><span className="dot yellow"></span>Risk</span>
                                    <span><span className="dot red"></span>Disruption</span>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        {done && (
                            <div className="card sim-results-card">
                                <div className="section-header"><div className="header-title"><CheckCircle size={14} className="text-green" /> SIMULATION RESULTS</div></div>
                                <div className="sim-results-grid">
                                    <div className="sim-result-item">
                                        <span className="sim-result-label">Delay Propagation</span>
                                        <div className="sim-result-bar-wrap">
                                            <div className="sim-result-bar red" style={{ width: '65%' }}></div>
                                        </div>
                                        <span className="sim-result-val text-red">+{delay} min cascade</span>
                                    </div>
                                    <div className="sim-result-item">
                                        <span className="sim-result-label">AI Recovery Effectiveness</span>
                                        <div className="sim-result-bar-wrap">
                                            <div className="sim-result-bar green" style={{ width: `${aiStrategies[selectedStrategy].confidence}%` }}></div>
                                        </div>
                                        <span className="sim-result-val text-green">{aiStrategies[selectedStrategy].confidence}%</span>
                                    </div>
                                    <div className="sim-result-item">
                                        <span className="sim-result-label">Trains Affected</span>
                                        <div className="sim-result-bar-wrap">
                                            <div className="sim-result-bar yellow" style={{ width: '40%' }}></div>
                                        </div>
                                        <span className="sim-result-val text-yellow">4 trains impacted</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Recovery Panel */}
                    <div className="sim-ai-col">
                        <div className="card sim-ai-card">
                            <div className="section-header"><div className="header-title"><Zap size={14} className="text-blue" /> AI RECOVERY STRATEGIES</div></div>
                            <div className="sim-body">
                                {aiStrategies.map((s, i) => (
                                    <div
                                        key={i}
                                        className={`sim-strategy-card ${selectedStrategy === i ? 'active' : ''}`}
                                        onClick={() => setSelectedStrategy(i)}
                                    >
                                        <div className="sim-strategy-header">
                                            <span className="sim-strategy-label">{s.label}</span>
                                            <span className="sim-conf">{s.confidence}%</span>
                                        </div>
                                        <div className="sim-strategy-metrics">
                                            <div className="sim-metric-item">
                                                <TrendingDown size={11} className="text-green" />
                                                <span className="text-green">−{s.delayReduction}</span>
                                            </div>
                                            <div className="sim-metric-item">
                                                <span className={`sim-impact-badge ${s.passengers.includes('Low') ? 'green' : s.passengers.includes('Medium') ? 'yellow' : 'red'}`}>
                                                    {s.passengers}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="sim-ai-footer">
                                    <button className="comms-broadcast-btn" style={{ marginTop: '0' }}>
                                        <CheckCircle size={14} /> APPLY AI PLAN
                                    </button>
                                    <button className="sched-action-btn gray-outline" style={{ marginTop: '8px' }}>
                                        Compare All Strategies
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card sim-ai-card" style={{ marginTop: '16px' }}>
                            <div className="section-header"><div className="header-title"><Clock size={14} className="text-blue" /> PREDICTED RECOVERY</div></div>
                            <div className="sim-body">
                                <div className="sim-recovery-stats">
                                    <div className="sim-recovery-item">
                                        <span className="sim-result-label">Recovery Time</span>
                                        <span className="sim-recovery-val">~{Math.max(5, delay - parseInt(aiStrategies[selectedStrategy].delayReduction))} min</span>
                                    </div>
                                    <div className="sim-recovery-item">
                                        <span className="sim-result-label">Delay Reduction</span>
                                        <span className="sim-recovery-val text-green">−{aiStrategies[selectedStrategy].delayReduction}</span>
                                    </div>
                                    <div className="sim-recovery-item">
                                        <span className="sim-result-label">Passenger Impact</span>
                                        <span className="sim-recovery-val">{aiStrategies[selectedStrategy].passengers}</span>
                                    </div>
                                    <div className="sim-recovery-item">
                                        <span className="sim-result-label">Confidence</span>
                                        <span className="sim-recovery-val text-blue">{aiStrategies[selectedStrategy].confidence}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
