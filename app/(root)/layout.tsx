import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="root">
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
