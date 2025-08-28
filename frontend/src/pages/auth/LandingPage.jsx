import React from 'react';
import { MapPin } from 'lucide-react';

export const LandingPage = ({ onLogin, onSignup, error }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-6">
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="text-6xl">📚</div>
        <h1 className="text-4xl font-bold text-gray-900">BookCircle</h1>
        <p className="text-lg text-gray-600 max-w-sm">
          Borrow and lend books with people in your neighborhood
        </p>
        <div className="flex items-center justify-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          Mumbai, India
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-sm mx-auto">
          <p className="text-sm text-red-600">
            <strong>Error:</strong> {error.message}
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        <button 
          onClick={onSignup}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
        
        <button 
          onClick={onLogin}
          className="w-full bg-white text-blue-600 border-2 border-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Login
        </button>
        
        <div className="text-xs text-gray-500 space-y-2 mt-6">
          <p>• Find books near you</p>
          <p>• Lend your unused books</p>
          <p>• Build a reading community</p>
        </div>
      </div>
    </div>
  </div>
);
