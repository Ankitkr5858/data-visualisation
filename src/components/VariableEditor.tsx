import React, { useState } from 'react';
import { X, Search, Sparkles, Play, ChevronDown, Info } from 'lucide-react';
import { useStore } from '../store/useStore';
import VariableTag from './VariableTag';

const VariableEditor = () => {
  const { 
    toggleVariableEditor, 
    searchQuery, 
    setSearchQuery, 
    filteredVariables 
  } = useStore();

  const [isPrimaryExpanded, setIsPrimaryExpanded] = useState(false);
  const [isSecondaryExpanded, setIsSecondaryExpanded] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState<string | null>('2');

  const groupedVariables = filteredVariables.reduce((acc, variable) => {
    if (!acc[variable.category]) {
      acc[variable.category] = [];
    }
    acc[variable.category].push(variable);
    return acc;
  }, {} as Record<string, typeof filteredVariables>);

  const selectedVariableData = filteredVariables.find(v => v.id === selectedVariable);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Background overlay */}
      <div 
        className="flex-1 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={toggleVariableEditor}
      />
      
      {/* Slide-over panel - Responsive */}
      <div className="w-full sm:w-[500px] bg-dark-bg border-l border-border-gray shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border-gray">
          <h2 className="text-lg font-semibold text-text-primary">Edit Variables</h2>
          <button 
            onClick={toggleVariableEditor}
            className="p-2 hover:bg-card-bg rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-primary" />
          </button>
        </div>

        {/* Search and controls */}
        <div className="p-4 sm:p-6 border-b border-border-gray">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Carbol"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-2 bg-card-bg border border-border-gray rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex space-x-2 sm:space-x-3">
              <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-card-bg hover:bg-border-gray rounded-lg transition-colors flex-1 sm:flex-none">
                <Sparkles className="w-4 h-4 text-text-primary" />
                <span className="text-sm font-medium text-text-primary">Autofill</span>
              </button>
              <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-accent-lime hover:bg-accent-green rounded-lg transition-colors flex-1 sm:flex-none">
                <Play className="w-4 h-4 text-dark-bg" />
                <span className="text-sm font-medium text-dark-bg">Rerun</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Search Results Info */}
            {searchQuery && (
              <div className="text-sm text-text-secondary">
                {filteredVariables.length} variable{filteredVariables.length !== 1 ? 's' : ''} found for "{searchQuery}"
                {filteredVariables.length === 0 && (
                  <div className="mt-2 text-text-secondary">
                    No variables match your search. Try a different term.
                  </div>
                )}
              </div>
            )}

            {/* Variable Categories */}
            {Object.entries(groupedVariables).map(([category, categoryVariables]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-text-secondary mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {categoryVariables.map((variable) => (
                    <VariableTag 
                      key={variable.id} 
                      variable={variable} 
                      isSelected={selectedVariable === variable.id}
                      onClick={() => setSelectedVariable(variable.id)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Variable Description */}
            {selectedVariableData && selectedVariableData.description && (
              <div className="bg-card-bg border border-border-gray rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <h4 className="font-medium text-text-primary">{selectedVariableData.name}</h4>
                  <Info className="w-4 h-4 text-text-secondary" />
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {selectedVariableData.description}
                </p>
              </div>
            )}

            {/* Expandable Sections */}
            <div className="space-y-3">
              <button
                onClick={() => setIsPrimaryExpanded(!isPrimaryExpanded)}
                className="w-full flex items-center justify-between p-4 bg-card-bg border border-border-gray rounded-lg hover:border-text-secondary transition-colors"
              >
                <span className="font-medium text-accent-green">Primary Variables</span>
                <ChevronDown className={`w-4 h-4 text-text-primary transition-transform ${isPrimaryExpanded ? 'rotate-180' : ''}`} />
              </button>
              
              {isPrimaryExpanded && (
                <div className="p-4 bg-card-bg border border-border-gray rounded-lg animate-fade-in">
                  <div className="space-y-3">
                    <div className="text-sm text-text-secondary">
                      Configure primary variables that directly impact the main calculations.
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-border-gray rounded-lg">
                        <div className="text-sm font-medium mb-1 text-text-primary">Max Zones</div>
                        <div className="text-xs text-text-secondary">11 zones</div>
                      </div>
                      <div className="p-3 bg-border-gray rounded-lg">
                        <div className="text-sm font-medium mb-1 text-text-primary">Total Poles</div>
                        <div className="text-xs text-text-secondary">48 poles</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsSecondaryExpanded(!isSecondaryExpanded)}
                className="w-full flex items-center justify-between p-4 bg-card-bg border border-border-gray rounded-lg hover:border-text-secondary transition-colors"
              >
                <span className="font-medium text-accent-green">Secondary Variables</span>
                <ChevronDown className={`w-4 h-4 text-text-primary transition-transform ${isSecondaryExpanded ? 'rotate-180' : ''}`} />
              </button>
              
              {isSecondaryExpanded && (
                <div className="p-4 bg-card-bg border border-border-gray rounded-lg animate-fade-in">
                  <div className="space-y-3">
                    <div className="text-sm text-text-secondary">
                      Secondary variables for fine-tuning and optimization.
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-border-gray rounded">
                        <span className="text-sm text-text-primary">Optimization threshold</span>
                        <span className="text-xs text-text-secondary">85%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-border-gray rounded">
                        <span className="text-sm text-text-primary">Buffer capacity</span>
                        <span className="text-xs text-text-secondary">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariableEditor