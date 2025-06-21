import React from 'react';
import { Home, Bell, Truck, Users, Settings, User, Menu, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { isSidebarCollapsed, toggleSidebar } = useStore();
  const { logout, user } = useAuth();

  const menuItems = [
    { icon: Home, active: true, label: 'Home' },
    { icon: Bell, active: false, label: 'Notifications' },
    { icon: Truck, active: false, label: 'Fleet' },
    { icon: Users, active: false, label: 'Users' },
    { icon: Settings, active: false, label: 'Settings' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isSidebarCollapsed ? '-translate-x-full sm:translate-x-0 sm:w-16' : 'translate-x-0 w-64'} 
        fixed sm:relative z-50 sm:z-auto h-screen bg-dark-bg border-r border-border-gray flex flex-col transition-all duration-300
      `}>
        {/* Desktop hamburger menu button - only show on desktop, positioned in top right of sidebar */}
        <div className="hidden sm:flex justify-end p-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-card-bg rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Mobile logo/brand section - only show on mobile */}
        <div className="sm:hidden p-4">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-dark-bg rounded-sm"></div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full h-12 flex items-center transition-colors ${
                item.active 
                  ? 'bg-card-bg border-r-2 border-accent-green' 
                  : 'hover:bg-card-bg'
              } ${isSidebarCollapsed ? 'justify-center' : 'justify-start px-4'}`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-accent-green' : 'text-text-secondary'} ${!isSidebarCollapsed ? 'mr-3' : ''}`} />
              {!isSidebarCollapsed && (
                <span className={`${item.active ? 'text-accent-green' : 'text-text-secondary'}`}>
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        {/* User profile and logout at bottom */}
        <div className="p-4 space-y-2">
          {/* User Profile */}
          <button className={`w-full h-12 flex items-center hover:bg-card-bg rounded transition-colors ${isSidebarCollapsed ? 'justify-center' : 'justify-start px-4'}`}>
            <User className="w-5 h-5 text-text-secondary" />
            {!isSidebarCollapsed && (
              <div className="ml-3 text-left flex-1">
                <div className="text-text-secondary text-sm">Profile</div>
                {user?.email && (
                  <div className="text-text-secondary text-xs truncate">
                    {user.email}
                  </div>
                )}
              </div>
            )}
          </button>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className={`w-full h-12 flex items-center hover:bg-red-500 hover:bg-opacity-20 rounded transition-colors group ${isSidebarCollapsed ? 'justify-center' : 'justify-start px-4'}`}
          >
            <LogOut className="w-5 h-5 text-text-secondary group-hover:text-red-400" />
            {!isSidebarCollapsed && (
              <span className="text-text-secondary group-hover:text-red-400 ml-3">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;