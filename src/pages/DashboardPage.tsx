import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import VariableEditor from '../components/VariableEditor';
import { useStore } from '../store/useStore';

const DashboardPage = () => {
  const { isVariableEditorOpen } = useStore();

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-roobert flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 relative overflow-hidden" style={{ backgroundColor: '#161618' }}>
          <Dashboard />
          {isVariableEditorOpen && <VariableEditor />}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;