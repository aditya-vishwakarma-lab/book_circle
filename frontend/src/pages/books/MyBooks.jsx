import React from 'react';
import { Plus } from 'lucide-react';

export const MyBooks = () => (
  <div className="p-4 pb-20">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-900">My Books (2)</h2>
      <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
        <Plus className="w-5 h-5" />
      </button>
    </div>
    
    <div className="space-y-3">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex space-x-3">
          <div className="text-3xl">📘</div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">1984</h3>
            <p className="text-sm text-gray-600">by George Orwell</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                1 Request
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);