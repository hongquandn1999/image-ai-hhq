import React from 'react';
import SideBar from '../components/shared/SideBar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="root">
      {/* SideBar */}
      <SideBar />
      {/* Mobile */}
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
