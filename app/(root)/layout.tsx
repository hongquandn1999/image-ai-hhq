import React from 'react';
import MobileNav from '../components/shared/MobileNav';
import SideBar from '../components/shared/SideBar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="root">
      {/* SideBar */}
      <SideBar />
      {/* Mobile */}

      <MobileNav />

      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
