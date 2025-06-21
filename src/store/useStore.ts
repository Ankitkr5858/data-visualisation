import { create } from 'zustand';

export interface Variable {
  id: string;
  name: string;
  category: string;
  isActive: boolean;
  type: 'fixed' | 'adjustable';
  value?: number;
  description?: string;
}

export interface ChartDataPoint {
  month: string;
  value: number;
  fullMonth: string;
}

interface Store {
  isVariableEditorOpen: boolean;
  isSidebarCollapsed: boolean;
  selectedDataPoint: ChartDataPoint | null;
  hoveredDataPoint: ChartDataPoint | null;
  searchQuery: string;
  variables: Variable[];
  filteredVariables: Variable[];
  loading: boolean;
  error: string | null;
  
  toggleVariableEditor: () => void;
  toggleSidebar: () => void;
  setSelectedDataPoint: (point: ChartDataPoint | null) => void;
  setHoveredDataPoint: (point: ChartDataPoint | null) => void;
  setSearchQuery: (query: string) => void;
  toggleVariable: (id: string) => void;
  updateVariableValue: (id: string, value: number) => void;
  filterVariables: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialVariables: Variable[] = [
  { id: '1', name: 'Carbon 1', category: 'Variable category 1', isActive: false, type: 'adjustable' },
  { id: '2', name: 'Co2 Distribution', category: 'Variable category 1', isActive: true, type: 'adjustable', description: 'But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people of all ages. Whether you\'re a student, a professional, or a senior citizen, Switch adapts to your needs and lifestyle.' },
  { id: '3', name: 'Fleet sizing', category: 'Variable category 1', isActive: true, type: 'adjustable' },
  { id: '4', name: 'Parking Rate', category: 'Variable Category 2', isActive: false, type: 'adjustable' },
  { id: '5', name: 'Border Rate', category: 'Variable Category 2', isActive: true, type: 'adjustable' },
  { id: '6', name: 'Request rate', category: 'Variable Category 2', isActive: true, type: 'adjustable' },
  { id: '7', name: 'Variable 1', category: 'Variable Category 2', isActive: false, type: 'fixed' },
  { id: '8', name: 'Variable 1', category: 'Variable Category 3', isActive: false, type: 'fixed' },
  { id: '9', name: 'Variable 1', category: 'Variable Category 3', isActive: true, type: 'adjustable' },
  { id: '10', name: 'Variable 1', category: 'Variable Category 3', isActive: true, type: 'adjustable' },
];

export const useStore = create<Store>((set, get) => ({
  isVariableEditorOpen: false,
  isSidebarCollapsed: true,
  selectedDataPoint: null,
  hoveredDataPoint: null,
  searchQuery: '',
  variables: initialVariables,
  filteredVariables: initialVariables,
  loading: false,
  error: null,
  
  toggleVariableEditor: () => set((state) => ({ isVariableEditorOpen: !state.isVariableEditorOpen })),
  
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  
  setSelectedDataPoint: (point) => set({ selectedDataPoint: point }),
  
  setHoveredDataPoint: (point) => set({ hoveredDataPoint: point }),
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterVariables();
  },
  
  toggleVariable: (id) => {
    set((state) => ({
      variables: state.variables.map(v => 
        v.id === id ? { ...v, isActive: !v.isActive } : v
      )
    }));
    get().filterVariables();
  },
  
  updateVariableValue: (id, value) => {
    set((state) => ({
      variables: state.variables.map(v => 
        v.id === id ? { ...v, value } : v
      )
    }));
    get().filterVariables();
  },

  filterVariables: () => {
    const { variables, searchQuery } = get();
    if (!searchQuery.trim()) {
      set({ filteredVariables: variables });
      return;
    }
    
    const filtered = variables.filter(variable =>
      variable.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      variable.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    set({ filteredVariables: filtered });
  },

  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));