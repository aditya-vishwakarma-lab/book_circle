import React from 'react';
import { Home, BarChart3, BookOpen, User } from 'lucide-react';

export const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'browse', icon: Home, label: 'Browse' },
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'books', icon: BookOpen, label: 'My Books' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-18">
      <div className="flex">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex-1 py-2 px-1 text-center ${
              activeTab === id 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className={`w-6 h-6 mx-auto mb-1 ${
              activeTab === id ? 'text-blue-600' : 'text-gray-600'
            }`} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};