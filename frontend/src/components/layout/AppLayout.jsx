import React from 'react';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';

export const AppLayout = ({ 
  children, 
  title, 
  activeTab, 
  onTabChange, 
  user, 
  showSearch = false 
}) => (
  <div className="min-h-screen bg-gray-50">
    <Header 
      title={title} 
      user={user} 
      showSearch={showSearch} 
    />
    
    <main className="min-h-screen">
      {children}
    </main>
    
    <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
  </div>
);