import React from 'react';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { Variable, useStore } from '../store/useStore';

interface VariableTagProps {
  variable: Variable;
  isSelected: boolean;
  onClick: () => void;
}

const VariableTag: React.FC<VariableTagProps> = ({ variable, isSelected, onClick }) => {
  const { toggleVariable } = useStore();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleVariable(variable.id);
  };

  return (
    <div 
      className={`flex items-center rounded-full border transition-all cursor-pointer ${
        variable.isActive
          ? 'bg-accent-lime bg-opacity-20 border-accent-lime text-accent-lime'
          : 'bg-card-bg border-border-gray text-text-secondary hover:border-text-secondary'
      } ${isSelected ? 'ring-2 ring-accent-lime ring-opacity-50' : ''}`}
      onClick={onClick}
    >
      <button
        onClick={handleToggle}
        className={`p-2 rounded-full transition-colors ${
          variable.isActive 
            ? 'hover:bg-accent-lime hover:text-dark-bg' 
            : 'hover:bg-border-gray'
        }`}
      >
        {variable.isActive ? (
          <Minus className="w-4 h-4" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </button>
      
      <span className="px-3 py-2 text-sm font-medium">
        {variable.name}
      </span>
      
      {variable.type === 'adjustable' && (
        <button 
          className={`p-2 rounded-full transition-colors ${
            variable.isActive 
              ? 'hover:bg-accent-lime hover:text-dark-bg' 
              : 'hover:bg-border-gray'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default VariableTag