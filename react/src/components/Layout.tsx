import React from 'react';
import Navbar from './Navbar';

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4 limitContent bg-white w-full flex-1">
        {children}
      </main>
    </div>
  );
};
