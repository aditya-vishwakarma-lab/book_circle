import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AUDIENCE = import.meta.env.VITE_AUTH0_API_AUDIENCE;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProfileCreation = ({ user, onComplete }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    area: '',
    pincode: '',
    auth0_user_id: user?.sub || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async () => {
    if (!formData.name) {
      alert('Please fill all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: AUDIENCE
        },
      });

      const response = await fetch(`${API_BASE_URL}/api/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: formData.name,
          auth0_user_id: formData.auth0_user_id,
          phone: formData.phone,
          address: formData.area, // Map 'area' to 'address' as expected by backend
          pincode: formData.pincode,
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedUser = await response.json();
      onComplete(updatedUser);
      
    } catch (error) {
      console.error('Profile completion error:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">👋</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to BookCircle!</h2>
          <p className="text-gray-600">Let's complete your profile to get started</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+91 98765 43210"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Area/Locality *</label>
            <input
              type="text"
              value={formData.area}
              onChange={(e) => setFormData({...formData, area: e.target.value})}
              placeholder="e.g., Bandra West, Andheri East"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({...formData, pincode: e.target.value})}
              placeholder="400001"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors mt-6 ${
              isSubmitting 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Complete Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};
