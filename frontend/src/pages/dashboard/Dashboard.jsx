import React from 'react';

export const Dashboard = () => (
  <div className="p-4 pb-20">
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">3</div>
          <div className="text-sm text-gray-600">Books Borrowed</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">2</div>
          <div className="text-sm text-gray-600">Books Lent</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">✓</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Request Accepted</p>
              <p className="text-xs text-gray-500">Alice accepted your request for "The Great Gatsby"</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">📚</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">New Request</p>
              <p className="text-xs text-gray-500">Bob requested to borrow your "1984"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
