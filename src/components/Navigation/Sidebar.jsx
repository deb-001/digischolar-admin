import React from 'react';
import { Sidebar } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { HiChartPie, HiCog, HiSupport, HiArrowSmRight, HiViewGrid, HiOutlineChartBar } from 'react-icons/hi';

export default function SideNavigation({ sidebarOpen, mobileHidden, setMobileHidden, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
    setMobileHidden(true);
  };

  return (
    <>
      {/* Mobile Overlay (Click to close sidebar) */}
      {!mobileHidden && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileHidden(true)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        aria-label="Sidebar"
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 z-40 transition-all duration-300 overflow-hidden
          ${sidebarOpen || !mobileHidden ? 'w-64' : 'w-16 lg:w-16'}
          ${mobileHidden ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}
      >
        <div className="pt-4 pb-16 h-full">
          <Sidebar.Items>
            {/* Main Navigation */}
            <Sidebar.ItemGroup className="space-y-1">
              <Sidebar.Item
                as={Link}
                to="/"
                icon={HiChartPie}
                className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileHidden(true)}
              >
                {(sidebarOpen || !mobileHidden) && 'Dashboard'}
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                to="/analytics"
                icon={HiOutlineChartBar}
                className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileHidden(true)}
              >
                {(sidebarOpen || !mobileHidden) && 'Analytics'}
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                to="/applications"
                icon={HiViewGrid}
                className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileHidden(true)}
              >
                {(sidebarOpen || !mobileHidden) && 'Applications'}
              </Sidebar.Item>
            </Sidebar.ItemGroup>

            {/* Settings & Logout */}
            <Sidebar.ItemGroup className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 space-y-1">
              <Sidebar.Item
                as={Link}
                to="/settings"
                icon={HiCog}
                className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileHidden(true)}
              >
                {(sidebarOpen || !mobileHidden) && 'Settings'}
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                to="/helpcenter"
                icon={HiSupport}
                className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileHidden(true)}
              >
                {(sidebarOpen || !mobileHidden) && 'Help Center'}
              </Sidebar.Item>
              <Sidebar.Item
                as="button"
                onClick={handleLogout}
                icon={HiArrowSmRight}
                className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 w-full text-left"
              >
                {(sidebarOpen || !mobileHidden) && 'Sign Out'}
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </Sidebar>
    </>
  );
}