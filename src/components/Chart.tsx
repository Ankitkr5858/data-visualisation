import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Dot, CartesianGrid } from 'recharts';
import { useStore } from '../store/useStore';
import DataPointTooltip from './DataPointTooltip';
import LoadingSpinner from './LoadingSpinner';

const Chart = () => {
  const { setHoveredDataPoint, hoveredDataPoint, loading, error } = useStore();

  const data = [
    { month: 'Apr', value: 35000, fullMonth: 'April' },
    { month: 'May', value: 28000, fullMonth: 'May' },
    { month: 'Jun', value: 52000, fullMonth: 'June' },
    { month: 'Jul', value: 42000, fullMonth: 'July' },
    { month: 'Aug', value: 89000, fullMonth: 'August' },
    { month: 'Sep', value: 65000, fullMonth: 'September' },
    { month: 'Oct', value: 38000, fullMonth: 'October' },
    { month: 'Nov', value: 58000, fullMonth: 'November' },
  ];

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isHovered = hoveredDataPoint?.month === payload.month;
    
    return (
      <Dot
        cx={cx}
        cy={cy}
        r={isHovered ? 6 : 4}
        fill={isHovered ? '#84cc16' : '#a3e635'}
        stroke={isHovered ? '#ffffff' : 'none'}
        strokeWidth={isHovered ? 2 : 0}
        className="transition-all duration-200"
      />
    );
  };

  const handleMouseEnter = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      setHoveredDataPoint(data.activePayload[0].payload);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDataPoint(null);
  };

  if (loading) {
    return (
      <div className="relative h-64 sm:h-80 border border-border-gray rounded-lg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-64 sm:h-80 border border-border-gray rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-2">Failed to load chart data</p>
          <p className="text-text-secondary text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Chart container with responsive height */}
      <div className="relative h-64 sm:h-80 border border-border-gray rounded-lg">
        {/* Dropdown positioned responsively */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
          <select 
            className="px-2 py-1 sm:px-3 sm:py-2 border border-border-gray rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-green text-white"
            style={{ backgroundColor: '#18181A' }}
          >
            <option>Unsatisfied Demand %</option>
            <option>Satisfied Demand %</option>
            <option>Profit Margin %</option>
          </select>
        </div>
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            onMouseMove={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            margin={{ 
              top: 50, 
              right: 20, 
              left: 30, 
              bottom: 20 
            }}
          >
            {/* Add grid lines */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#404040" 
              strokeOpacity={0.3}
              horizontal={true}
              vertical={true}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a3a3a3', fontSize: 10 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a3a3a3', fontSize: 10 }}
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#a3e635"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={false}
            />
            {hoveredDataPoint && (
              <ReferenceLine 
                x={hoveredDataPoint.month} 
                stroke="#a3e635" 
                strokeDasharray="2 2"
                strokeOpacity={0.6}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {hoveredDataPoint && <DataPointTooltip dataPoint={hoveredDataPoint} />}
    </div>
  );
};

export default Chart;