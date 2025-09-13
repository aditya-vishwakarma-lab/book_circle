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
  <div className="flex flex-col min-h-screen">
    <Header 
      title={title} 
      user={user}
    />
    
    <main className="flex-1 pb-18">
      {children}
    </main>
    
    <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
  </div>
);