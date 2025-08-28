import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

// Import separated componentsprofile_completed_
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/auth/LandingPage';
import { ProfileCreation } from './pages/auth/ProfileCreation';
import { BrowseBooks } from './pages/books/BrowseBooks';
import { Dashboard } from './pages/dashboard/Dashboard';
import { MyBooks } from './pages/books/MyBooks';
import { Profile } from './pages/profile/Profile';

const AUDIENCE = import.meta.env.VITE_AUTH0_API_AUDIENCE;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout: auth0Logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [activeTab, setActiveTab] = useState('browse');
  const [profileExists, setProfileExists] = useState(false);

  // Auth0 login with signup hint
  const signup = () =>
    loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

  // Auth0 logout
  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  // Check if user profile is completed (you'll replace this with API call)
  useEffect(() => {
    if (isAuthenticated && user) {
      // TODO: Replace with actual API call to check if user profile exists
      checkUserProfile(user.sub)
        .then(async (exists) => {
          if (exists) {
            setProfileExists(true)
          } else {
            setProfileExists(false)
          }
        })
    }
  }, [isAuthenticated, user]);

  const checkUserProfile = async (auth0_user_id) => {
    try {
      // Replace with your backend API URL
      const url = `${API_BASE_URL}/api/users/${encodeURIComponent(auth0_user_id)}/`;

      // Get access token needed to authenticate the request
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: AUDIENCE
        },
      });

      // Make GET request to fetch user profile
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // Profile not found
          return false;
        }
        throw new Error('Network response was not ok');
      }

      const userProfile = await response.json();

      // If userProfile data exists and is valid, return true
      return !!userProfile;

    } catch (error) {
      console.error('Error checking user profile:', error);
      // Optional: decide if error means profile does not exist or just fail silently
      return false;
    }
  };


  // Handle profile completion
  const handleProfileCreation = () => {
    setProfileExists(true);
  };

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Not authenticated - show landing page
  if (!isAuthenticated) {
    return (
      <LandingPage 
        onLogin={loginWithRedirect}
        onSignup={signup}
        error={error}
      />
    );
  }

  // Authenticated but profile not exists
  if (!profileExists) {
    return (
      <ProfileCreation 
        user={user} 
        onComplete={handleProfileCreation} 
      />
    );
  }

  // Main app - authenticated with completed profile
  const renderContent = () => {
    switch (activeTab) {
      case 'browse':
        return <BrowseBooks />;
      case 'dashboard':
        return <Dashboard />;
      case 'books':
        return <MyBooks />;
      case 'profile':
        return <Profile user={user} onLogout={logout} />;
      default:
        return <BrowseBooks />;
    }
  };

  const getPageTitle = () => {
    const titles = {
      browse: 'Browse Books',
      dashboard: 'Dashboard', 
      books: 'My Books',
      profile: 'Profile'
    };
    return titles[activeTab] || 'BookCircle';
  };

  return (
    <AppLayout
      title={getPageTitle()}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      user={user}
      showSearch={activeTab === 'browse'}
    >
      {renderContent()}
    </AppLayout>
  );
}

export default App;