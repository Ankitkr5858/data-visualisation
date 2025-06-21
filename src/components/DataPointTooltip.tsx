import React from 'react';
import { ChartDataPoint } from '../store/useStore';

interface DataPointTooltipProps {
  dataPoint: ChartDataPoint;
}

const DataPointTooltip: React.FC<DataPointTooltipProps> = ({ dataPoint }) => {
  return (
    <div className="absolute top-4 right-4 bg-dark-bg border border-border-gray rounded-lg p-4 shadow-lg animate-fade-in z-10">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-accent-green rounded-full"></div>
          <span className="text-sm font-medium text-text-primary">{dataPoint.fullMonth} Data Point</span>
        </div>
        <div className="text-2xl font-bold text-text-primary">
          ${(dataPoint.value / 1000).toFixed(0)}K
        </div>
        <div className="text-sm text-text-secondary">
          Unsatisfied Demand Percentage
        </div>
        <div className="text-xs text-text-secondary pt-2 border-t border-border-gray">
          This data represents the unsatisfied demand percentage for charging stations in {dataPoint.fullMonth}.
        </div>
      </div>
    </div>
  );
};

export default DataPointTooltip