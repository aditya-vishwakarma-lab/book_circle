import React from 'react';
import { Bell, Search } from 'lucide-react';

export const Header = ({ title, user, showSearch = false }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-xl">📚</div>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center space-x-2">
          {showSearch && (
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Search className="w-5 h-5" />
            </button>
          )}
          <button className="p-2 text-gray-600 hover:text-gray-900 relative">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>
    </div>
  </header>
);