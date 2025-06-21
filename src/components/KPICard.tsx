import React, { useState } from 'react';
import { LucideIcon, HelpCircle } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-card-bg border border-border-gray rounded-lg p-4 hover:border-text-secondary transition-all duration-200 relative flex flex-col justify-between min-h-[140px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Title and Icon at top */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-medium text-white pr-2">{title}</h4>
        <div className="flex-shrink-0">
          <HelpCircle className="w-4 h-4 text-text-secondary" />
        </div>
      </div>
      
      {/* Description in middle */}
      <p className="text-xs text-text-secondary leading-relaxed mb-4 flex-1">{description}</p>
      
      {/* Value at bottom right */}
      <div className="text-2xl font-bold text-text-primary text-right">{value}</div>
      
      {isHovered && (
        <div className="absolute inset-0 bg-border-gray bg-opacity-90 rounded-lg p-4 flex items-center justify-center animate-fade-in">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary mb-2">{title}</div>
            <div className="text-3xl font-bold text-accent-green mb-2">{value}</div>
            <div className="text-sm text-text-secondary">{description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPICard