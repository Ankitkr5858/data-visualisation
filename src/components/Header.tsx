import React from 'react';
import { Search, Menu, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { toggleSidebar } = useStore();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="h-14 sm:h-16 bg-dark-bg border-b border-border-gray flex items-center justify-between px-4 sm:px-6">
      {/* Mobile hamburger menu - only show on mobile */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="sm:hidden p-2 hover:bg-card-bg rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
        
        {/* Navigation tabs */}
        <nav className="flex items-center space-x-1">
          <button className="px-3 py-2 sm:px-4 bg-card-bg text-white rounded-lg font-medium text-sm sm:text-base">
            Charging Stations
          </button>
          <button className="hidden sm:block px-4 py-2 text-white hover:text-white hover:bg-card-bg rounded-lg font-medium transition-colors">
            Fleet Sizing
          </button>
          <button className="hidden sm:block px-4 py-2 text-white hover:text-white hover:bg-card-bg rounded-lg font-medium transition-colors">
            Parking
          </button>
        </nav>
      </div>
      
      {/* Right side - Search and User Actions */}
      <div className="flex items-center space-x-4">
        {/* Search - Responsive */}
        <div className="relative flex-1 max-w-xs sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-card-bg border border-border-gray rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent text-sm sm:text-base"
          />
        </div>

        {/* User Actions */}
        {user && (
          <div className="flex items-center space-x-2">
            {/* User email - hidden on mobile */}
            <span className="hidden sm:block text-sm text-text-secondary">
              {user.email}
            </span>
            
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-card-bg rounded-lg transition-colors group"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-text-secondary group-hover:text-text-primary" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;