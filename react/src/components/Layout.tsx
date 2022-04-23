import React from 'react';
import Navbar from './Navbar';

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="p-4 limitContent">{children}</main>
    </div>
  );
};
