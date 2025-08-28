import React from 'react';
import { User, MapPin } from 'lucide-react';

export const Profile = ({ user, onLogout }) => (
  <div className="p-4 pb-20">
    <div className="space-y-6">
      {/* User Info */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <div className="flex items-center mt-1">
              <MapPin className="w-3 h-3 text-gray-500 mr-1" />
              <span className="text-xs text-gray-500">Bandra West, 400050</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 space-y-3">
          <button className="w-full text-left py-2 text-gray-900 hover:text-blue-600">
            Edit Profile
          </button>
          <button className="w-full text-left py-2 text-gray-900 hover:text-blue-600">
            Notification Settings
          </button>
          <button className="w-full text-left py-2 text-gray-900 hover:text-blue-600">
            Help & Support
          </button>
          <button 
            onClick={onLogout}
            className="w-full text-left py-2 text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
);