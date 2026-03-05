import React, { useState } from 'react';
import { AlertTriangle, Rocket, CheckCircle, Settings, Zap } from 'lucide-react';

const trainData = [
    { id: '12423', name: 'Dibrugarh Rajdhani', from: 'New Delhi (NDLS)', to: 'Dibrugarh (DBRG)', time: '10:05:00', status: 'ON TIME', conflict: null },
    { id: '12002', name: 'Bhopal Shatabdi', from: 'New Delhi (NDLS)', to: 'Rani Kamlapati (RKMP)', time: '10:15:30', status: '+22m DELAY', statusClass: 'delayed', conflict: { label: 'OVERLAP PF-02', class: 'danger' } },
    { id: '12221', name: 'Pune Duronto', from: 'Howrah (HWH)', to: 'Pune Jn (PUNE)', time: '10:28:15', status: '+5m ALERT', statusClass: 'risk', conflict: { label: 'CLEARANCE RISK', class: 'warn' } },
    { id: '12381', name: 'Kolkata Rajdhani', from: 'Howrah (HWH)', to: 'New Delhi (NDLS)', time: '11:10:00', status: 'ON TIME', conflict: null },
    { id: '12301', name: 'Howrah Rajdhani', from: 'Howrah (HWH)', to: 'New Delhi (NDLS)', time: '11:20:00', status: 'ON TIME', conflict: null },
    { id: '22415', name: 'Vande Bharat Express', from: 'New Delhi (NDLS)', to: 'Varanasi (BSB)', time: '12:00:00', status: 'ON TIME', conflict: null },
];

const timelineTracks = [
    { label: 'PF 01', blocks: [{ label: '12423 RAJDHANI EXP', start: 5, width: 22, class: 'green' }] },
    { label: 'PF 02', blocks: [{ label: '12002 SHATABDI (C)', start: 28, width: 20, class: 'red' }, { label: '12221 DURONTO (C)', start: 49, width: 20, class: 'orange' }] },
    { label: 'PF 03', blocks: [{ label: '12381 HWH RAJ', start: 70, width: 18, class: 'blue' }] },
    { label: 'PF 04', blocks: [{ label: 'YARD SHUNTING', start: 5, width: 15, class: 'gray' }] },
];

const timeSlots = ['10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00', '11:10'];

export default function SchedulingPage() {
    const [buffer, setBuffer] = useState(2.5);

    return (
        <div className="view-wrapper">
            <main className="page-content">
                <div className="sched-layout">

                    {/* Timeline Card */}
                    <div className="card sched-timeline-card">
                        <div className="section-header space-between">
                            <div className="header-title">
                                <Zap size={14} className="text-blue" />
                                STATION YARD TIMELINE — PLATFORM ALLOCATION
                            </div>
                            <div className="zoom-controls">
                                <button className="icon-btn-small">🔍+</button>
                                <button className="icon-btn-small">🔍-</button>
                            </div>
                        </div>

                        <div className="sched-timeline-grid">
                            {/* Header */}
                            <div className="tl-header-row">
                                <div className="tl-pf-col">PF / ID</div>
                                {timeSlots.map(t => <div className="tl-time-label" key={t}>{t}</div>)}
                            </div>
                            {/* Track rows */}
                            {timelineTracks.map((track, i) => (
                                <div className="tl-track-row" key={i}>
                                    <div className="tl-pf-label">{track.label}</div>
                                    <div className="tl-track-area">
                                        {track.blocks.map((b, j) => (
                                            <div
                                                key={j}
                                                className={`tl-block ${b.class}`}
                                                style={{ left: `${b.start}%`, width: `${b.width}%` }}
                                            >
                                                {b.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="card sched-table-card">
                        <div className="section-header space-between">
                            <div className="header-title">TRAIN SCHEDULE DATA — INDIAN SECTOR</div>
                            <div className="sub-text">Monitoring 72 Premium Trains</div>
                        </div>
                        <table className="schedule-table">
                            <thead>
                                <tr>
                                    <th>TRAIN ID / NAME</th>
                                    <th>ORIGIN STATION</th>
                                    <th>DESTINATION STATION</th>
                                    <th>SCHEDULED ARRIVAL</th>
                                    <th>STATUS</th>
                                    <th>AI CONFLICT FLAG</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trainData.map((t, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className="train-id-badge bg-blue-dim">{t.id}</div>
                                            <div className="schedule-train-name">{t.name}</div>
                                        </td>
                                        <td>{t.from}</td>
                                        <td>{t.to}</td>
                                        <td>{t.time}</td>
                                        <td>
                                            <span className={`status-pill ${t.statusClass || 'on-time'}`}>
                                                {!t.statusClass && <span className="dot green" style={{ marginRight: '4px' }}></span>}
                                                {t.status}
                                            </span>
                                        </td>
                                        <td>
                                            {t.conflict ? (
                                                <span className={`conflict-badge ${t.conflict.class}`}>
                                                    <AlertTriangle size={11} /> {t.conflict.label}
                                                </span>
                                            ) : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Non-scrollable Scheduling Sidebar */}
            <aside className="universal-right-sidebar">
                <div className="scheduling-sidebar">
                    <div className="sidebar-sec-title"><Zap size={16} className="text-blue" /> INTELLIGENT CONTROL</div>

                    <div className="sched-action-buttons">
                        <button className="sched-action-btn blue-fill">
                            Run AI Optimization <Rocket size={15} />
                        </button>
                        <button className="sched-action-btn blue-outline">
                            Approve Traffic Plan <CheckCircle size={15} />
                        </button>
                        <button className="sched-action-btn gray-outline">
                            Run Yard Simulation <Settings size={15} />
                        </button>
                    </div>

                    <div className="sched-params-section">
                        <div className="sched-param-title">NEURAL PARAMETERS</div>
                        <div className="sched-param-row">
                            <div className="sched-param-label">
                                <span>CONFLICT BUFFER</span>
                                <span className="text-blue">{buffer} min</span>
                            </div>
                            <input
                                type="range"
                                className="range-slider"
                                min="0"
                                max="10"
                                step="0.5"
                                value={buffer}
                                onChange={e => setBuffer(e.target.value)}
                            />
                        </div>
                        <div className="sched-toggle-row">
                            <label className="toggle-switch">
                                <input type="checkbox" defaultChecked />
                                <span className="toggle-knob"></span>
                            </label>
                            <span>Prioritize Duronto/Rajdhani</span>
                        </div>
                        <div className="sched-toggle-row">
                            <label className="toggle-switch">
                                <input type="checkbox" />
                                <span className="toggle-knob"></span>
                            </label>
                            <span>Auto-resolve Station Holds</span>
                        </div>
                    </div>

                    <div className="spacer"></div>

                    <div className="conflict-critical-box">
                        <div className="critical-title"><AlertTriangle size={13} className="text-red" /> CRITICAL CONFLICT</div>
                        <p>NDLS Platform 02: Shatabdi and Duronto arrival overlap. Immediate re-routing suggested.</p>
                    </div>
                </div>
            </aside>
        </div>
    );
}
