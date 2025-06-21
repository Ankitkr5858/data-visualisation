import React, { useState } from 'react';
import { Zap, Sparkles, RotateCcw, Share, Plus, HelpCircle, MoreHorizontal, ChevronUp, ChevronDown } from 'lucide-react';
import Chart from './Chart';
import KPICard from './KPICard';
import { useStore } from '../store/useStore';

const Dashboard = () => {
  const { toggleVariableEditor } = useStore();
  const [isBestScenarioExpanded, setIsBestScenarioExpanded] = useState(true);

  const kpiData = [
    {
      title: 'Infrastructure Units',
      value: '€421.07',
      description: 'This describes variable two and what the shown data means.',
      icon: HelpCircle,
    },
    {
      title: 'Charging Growth',
      value: '33.07',
      description: 'This describes variable two and what the shown data means.',
      icon: HelpCircle,
    },
    {
      title: 'Localization change',
      value: '21.9%',
      description: 'This describes variable two and what the shown data means.',
      icon: HelpCircle,
    },
    {
      title: 'Fleet growth',
      value: '7.03%',
      description: 'This describes variable two and what the shown data means.',
      icon: HelpCircle,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-transparent rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary">Charging Station</h1>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
          <button className="p-2 bg-card-bg hover:bg-border-gray rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-text-primary" />
          </button>
          <button 
            onClick={toggleVariableEditor}
            className="px-3 py-2 sm:px-4 bg-card-bg hover:bg-border-gray rounded-lg font-medium transition-colors text-text-primary text-sm sm:text-base flex-1 sm:flex-none"
          >
            Edit Variables
          </button>
          <button className="p-2 bg-card-bg hover:bg-border-gray rounded-lg transition-colors">
            <Share className="w-4 h-4 sm:w-5 sm:h-5 text-text-primary" />
          </button>
        </div>
      </div>

      {/* Best Scenario Results - Responsive */}
      <div className="space-y-3">
        <button
          onClick={() => setIsBestScenarioExpanded(!isBestScenarioExpanded)}
          className="flex items-center justify-between w-full group"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#DCFF7F' }} />
            <h2 className="text-base sm:text-lg font-semibold" style={{ color: '#DCFF7F' }}>Best Scenario Results</h2>
          </div>
          <div 
            className="p-1.5 sm:p-2 rounded-full border group-hover:border-opacity-80 transition-all duration-300"
            style={{ borderColor: '#C8E972' }}
          >
            {isBestScenarioExpanded ? (
              <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300" style={{ color: '#C8E972' }} />
            ) : (
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300" style={{ color: '#C8E972' }} />
            )}
          </div>
        </button>
        
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isBestScenarioExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-3 pb-2">
            <div 
              className="bg-card-bg rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between group hover:border-opacity-80 transition-colors border gap-2 sm:gap-0"
              style={{ 
                borderColor: '#C8E972',
                color: '#CCFF00'
              }}
            >
              <p className="text-sm sm:text-base" style={{ color: '#CCFF00' }}>
                The best found configuration based on profit is characterized by{' '}
                <span className="font-semibold">11 zones (max)</span> with charging stations and{' '}
                <span className="font-semibold">48 total number of poles</span>.
              </p>
              <button className="p-1 hover:bg-border-gray rounded transition-all self-end sm:self-center">
                <MoreHorizontal className="w-4 h-4" style={{ color: '#CCFF00' }} />
              </button>
            </div>
            
            <div 
              className="bg-card-bg rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between group hover:border-opacity-80 transition-colors border gap-2 sm:gap-0"
              style={{ 
                borderColor: '#C8E972',
                color: '#CCFF00'
              }}
            >
              <p className="text-sm sm:text-base" style={{ color: '#CCFF00' }}>
                The best found configuration based on satisfied demand is characterized by{' '}
                <span className="font-semibold">11 zones (max)</span> with charging stations and{' '}
                <span className="font-semibold">48 total number of poles</span>.
              </p>
              <button className="p-1 hover:bg-border-gray rounded transition-all self-end sm:self-center">
                <MoreHorizontal className="w-4 h-4" style={{ color: '#CCFF00' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Fully Responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Chart Section */}
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary">Graphs</h3>
          <div className="bg-card-bg rounded-lg p-4 sm:p-6">
            <Chart />
          </div>
        </div>

        {/* KPI Section */}
        <div className="space-y-4 flex flex-col">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <h3 className="text-base sm:text-lg font-semibold text-text-primary">Key Performance Indicators</h3>
            <button 
              onClick={toggleVariableEditor}
              className="flex items-center space-x-2 px-3 py-1 bg-card-bg hover:bg-border-gray rounded-lg text-sm font-medium transition-colors text-text-primary"
            >
              <span>Variables</span>
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {/* Responsive KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 flex-1">
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard