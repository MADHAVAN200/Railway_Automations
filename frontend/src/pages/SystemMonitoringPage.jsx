import React, { useState } from 'react';
import { Activity, Cpu, Server, Database, AlertTriangle, CheckCircle, RefreshCw, Wifi } from 'lucide-react';

const containers = [
    { name: 'ai-scheduler-core', status: 'running', uptime: '14d 6h 32m', cpu: 42, mem: 68, image: 'ai-sched:v4.3' },
    { name: 'kafka-bus-ndls', status: 'running', uptime: '7d 2h 15m', cpu: 18, mem: 44, image: 'kafka:3.6' },
    { name: 'disruption-agent', status: 'running', uptime: '14d 6h 30m', cpu: 29, mem: 52, image: 'disrupt:v2.1' },
    { name: 'platform-optimizer', status: 'warning', uptime: '2d 1h 4m', cpu: 78, mem: 81, image: 'pf-opt:v1.9' },
    { name: 'comms-broadcast-agent', status: 'running', uptime: '14d 6h 32m', cpu: 8, mem: 32, image: 'comms:v3.1' },
    { name: 'telemetry-collector', status: 'running', uptime: '14d 6h 29m', cpu: 21, mem: 39, image: 'telemetry:v2.4' },
];

const kafkaTopics = [
    { topic: 'train.position.realtime', msgs: '12,430/s', lag: '0', status: 'green' },
    { topic: 'platform.occupancy.events', msgs: '840/s', lag: '2', status: 'green' },
    { topic: 'disruption.alerts.ndls', msgs: '64/s', lag: '0', status: 'green' },
    { topic: 'ai.recommendations.feed', msgs: '220/s', lag: '18', status: 'yellow' },
];

const systemLogs = [
    { time: '19:28:04', level: 'INFO', msg: 'AI Scheduler: Rerouted 12002 via Loop Line. ETA updated.' },
    { time: '19:27:41', level: 'WARN', msg: 'platform-optimizer: CPU spike detected (78%). Monitor closely.' },
    { time: '19:26:59', level: 'INFO', msg: 'Kafka lag resolved on ai.recommendations.feed. Processed 4,520 events.' },
    { time: '19:25:12', level: 'INFO', msg: 'Container telemetry-collector auto-restarted gracefully after 0-exit.' },
    { time: '19:24:03', level: 'ERROR', msg: 'disruption-agent: NullRef at SectorBridge-14. Fallback logic engaged.' },
    { time: '19:22:58', level: 'INFO', msg: 'Model v4.3 loaded successfully. Latency: 28ms avg.' },
];

const MiniChart = ({ values, color }) => {
    const max = Math.max(...values);
    const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${100 - (v / max) * 100}`).join(' ');
    return (
        <svg viewBox="0 0 100 40" className="mini-chart-svg" preserveAspectRatio="none">
            <polyline points={pts} fill="none" stroke={color} strokeWidth="2" />
        </svg>
    );
};

export default function SystemMonitoringPage() {
    const cpuHistory = [30, 42, 38, 55, 47, 60, 42, 50, 44, 42];
    const memHistory = [58, 60, 62, 65, 63, 68, 66, 70, 68, 71];
    const netHistory = [20, 35, 28, 50, 42, 38, 60, 55, 48, 52];

    return (
        <div className="view-wrapper">
            <main className="page-content">

                {/* Top Perf Cards */}
                <div className="mon-perf-row">
                    <div className="card mon-perf-card">
                        <div className="mon-perf-header"><Cpu size={16} className="text-blue" /><span>CPU Usage</span><span className="mon-perf-val text-yellow">42%</span></div>
                        <MiniChart values={cpuHistory} color="#fcc419" />
                        <div className="mon-perf-sub">4 Agents Active — Avg: 38%</div>
                    </div>
                    <div className="card mon-perf-card">
                        <div className="mon-perf-header"><Server size={16} className="text-blue" /><span>Memory</span><span className="mon-perf-val text-blue">68%</span></div>
                        <MiniChart values={memHistory} color="#00a8ff" />
                        <div className="mon-perf-sub">12.4 GB / 18 GB used</div>
                    </div>
                    <div className="card mon-perf-card">
                        <div className="mon-perf-header"><Wifi size={16} className="text-green" /><span>Network Throughput</span><span className="mon-perf-val text-green">52 MB/s</span></div>
                        <MiniChart values={netHistory} color="#20c997" />
                        <div className="mon-perf-sub">In: 34 MB/s · Out: 18 MB/s</div>
                    </div>
                    <div className="card mon-perf-card">
                        <div className="mon-perf-header"><Database size={16} className="text-blue" /><span>Kafka Throughput</span><span className="mon-perf-val text-blue">13,554/s</span></div>
                        <MiniChart values={[120, 135, 128, 142, 135, 140, 136, 138, 135, 136]} color="#00a8ff" />
                        <div className="mon-perf-sub">4 topics — 1 lagging</div>
                    </div>
                </div>

                {/* Container Grid */}
                <div className="card mon-containers-card">
                    <div className="section-header space-between">
                        <div className="header-title"><Server size={14} className="text-blue" /> CONTAINER HEALTH — RAILWAY AI CLUSTER</div>
                        <button className="mon-refresh-btn"><RefreshCw size={13} /> REFRESH</button>
                    </div>
                    <table className="mon-table">
                        <thead>
                            <tr>
                                <th>CONTAINER</th>
                                <th>STATUS</th>
                                <th>UPTIME</th>
                                <th>CPU %</th>
                                <th>MEM %</th>
                                <th>IMAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {containers.map((c, i) => (
                                <tr key={i}>
                                    <td><span className="mon-container-name">{c.name}</span></td>
                                    <td>
                                        <span className={`mon-status-badge ${c.status}`}>
                                            {c.status === 'running' ? <CheckCircle size={11} /> : <AlertTriangle size={11} />}
                                            {c.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="mon-td-muted">{c.uptime}</td>
                                    <td>
                                        <div className="mon-bar-wrapper">
                                            <div className="mon-bar" style={{ width: `${c.cpu}%`, background: c.cpu > 70 ? '#ff6b6b' : '#00a8ff' }}></div>
                                        </div>
                                        <span className="mon-bar-label">{c.cpu}%</span>
                                    </td>
                                    <td>
                                        <div className="mon-bar-wrapper">
                                            <div className="mon-bar" style={{ width: `${c.mem}%`, background: c.mem > 75 ? '#ff6b6b' : '#fcc419' }}></div>
                                        </div>
                                        <span className="mon-bar-label">{c.mem}%</span>
                                    </td>
                                    <td className="mon-td-muted">{c.image}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Kafka + Logs Row */}
                <div className="mon-bottom-row">
                    <div className="card mon-kafka-card">
                        <div className="section-header"><div className="header-title"><Database size={14} className="text-blue" /> KAFKA DATA BUS STATUS</div></div>
                        <div className="mon-kafka-list">
                            {kafkaTopics.map((t, i) => (
                                <div className="mon-kafka-row" key={i}>
                                    <div className={`mon-dot ${t.status}`}></div>
                                    <div className="mon-kafka-topic">{t.topic}</div>
                                    <div className="mon-kafka-msgs">{t.msgs}</div>
                                    <div className={`mon-kafka-lag ${t.lag > 0 ? 'text-yellow' : 'text-green'}`}>LAG: {t.lag}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card mon-logs-card">
                        <div className="section-header space-between">
                            <div className="header-title"><Activity size={14} className="text-blue" /> REAL-TIME SYSTEM LOGS</div>
                            <span className="sub-text">Live stream</span>
                        </div>
                        <div className="mon-log-list">
                            {systemLogs.map((log, i) => (
                                <div className="mon-log-row" key={i}>
                                    <span className="mon-log-time">{log.time}</span>
                                    <span className={`mon-log-level ${log.level.toLowerCase()}`}>{log.level}</span>
                                    <span className="mon-log-msg">{log.msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Fixed Monitoring Sidebar */}
            <aside className="universal-right-sidebar">
                <div className="dashboard-sidebar-content">
                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header blue-glow">
                            <Activity size={16} />
                            <h2>SYSTEM HEALTH OVERVIEW</h2>
                        </div>
                        <div className="tool-content">
                            {[
                                { label: 'AI Scheduler', status: 'OPERATIONAL', color: 'green' },
                                { label: 'Kafka Cluster', status: 'DEGRADED', color: 'yellow' },
                                { label: 'Platform Engine', status: 'WARNING', color: 'yellow' },
                                { label: 'Comms Agent', status: 'OPERATIONAL', color: 'green' },
                                { label: 'Telemetry', status: 'OPERATIONAL', color: 'green' },
                            ].map((s, i) => (
                                <div className="mon-health-row" key={i}>
                                    <div className={`mon-dot ${s.color}`}></div>
                                    <span className="mon-health-label">{s.label}</span>
                                    <span className={`text-${s.color}`} style={{ fontSize: '10px', fontWeight: '700' }}>{s.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card sidebar-tool-card">
                        <div className="sidebar-tool-header red-glow">
                            <AlertTriangle size={16} className="text-red" />
                            <h2>ALERTS</h2>
                        </div>
                        <div className="tool-content" style={{ padding: 0 }}>
                            <div className="feed-entry high">
                                <span className="entry-time">19:27:41</span>
                                <div className="entry-title text-yellow">High CPU — platform-optimizer</div>
                                <p className="entry-body">CPU at 78%. Auto-scaling not available. Manual review required.</p>
                            </div>
                            <div className="feed-entry med">
                                <span className="entry-time">19:24:03</span>
                                <div className="entry-title text-red">Error — disruption-agent</div>
                                <p className="entry-body">NullRef at SectorBridge. Fallback active.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
