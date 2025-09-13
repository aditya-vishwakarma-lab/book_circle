import React from 'react';
import { Bell, Search, Library } from 'lucide-react';

export const Header = ({ title }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Library className="w-8 h-8" />
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 relative">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>
    </div>
  </header>
);