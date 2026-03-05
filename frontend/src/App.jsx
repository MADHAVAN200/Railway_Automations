import React, { useState } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import DashboardPage from './pages/DashboardPage';
import SchedulingPage from './pages/SchedulingPage';
import PlatformPage from './pages/PlatformPage';
import DisruptionPage from './pages/DisruptionPage';
import PassengerCommsPage from './pages/PassengerCommsPage';
import SystemMonitoringPage from './pages/SystemMonitoringPage';
import HumanInLoopPage from './pages/HumanInLoopPage';
import AuditLogsPage from './pages/AuditLogsPage';
import SimulationLabPage from './pages/SimulationLabPage';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('aggressive');
  const [theme, setTheme] = useState('dark');

  // Apply theme to html element for CSS variable switching
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  return (
    <div className="layout-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="content-wrapper">
        <Header
          currentView={currentView}
          theme={theme}
          setTheme={setTheme}
          isSimulating={isSimulating}
          onRunSimulation={handleRunSimulation}
        />
        {currentView === 'dashboard' && <DashboardPage />}
        {currentView === 'scheduling' && <SchedulingPage />}
        {currentView === 'platform' && <PlatformPage />}
        {currentView === 'disruption' && (
          <DisruptionPage
            isSimulating={isSimulating}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        )}
        {currentView === 'passenger' && <PassengerCommsPage />}
        {currentView === 'monitoring' && <SystemMonitoringPage />}
        {currentView === 'hitl' && <HumanInLoopPage />}
        {currentView === 'audit' && <AuditLogsPage />}
        {currentView === 'simulation' && <SimulationLabPage />}
      </div>
    </div>
  );
}

export default App;
