import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const location = useLocation();
  const hideSidebarPaths = ['/', '/register', '/*'];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <div className="flex h-screen bg-[#1E1E1E]">
      {!shouldHideSidebar && <Sidebar />}
      <main className="flex-1  overflow-y-auto ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
