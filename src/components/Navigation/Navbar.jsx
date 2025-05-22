import React, { useState, useEffect } from 'react';
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Navbar,
  TextInput,
} from 'flowbite-react';
import {
  HiSearch,
  HiBell,
  HiOutlineMenuAlt1,
  HiChevronLeft,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function TopNavbar({ onMenuToggle, sidebarOpen, setSidebarOpen, setIsLoggedIn }) {
  
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedLoggedInUserName = localStorage.getItem('loggedInUserIDValue');
    if (storedLoggedInUserName) {
      setLoggedInUserName(storedLoggedInUserName);
    } else {
      const storedUserId = localStorage.getItem('userId');
      setLoggedInUserName(storedUserId || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('loggedInUserIDValue');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <Navbar fluid className="fixed top-0 left-0 w-full z-50 bg-white border-b dark:bg-gray-800 h-16">
        <div className="w-full px-4 flex items-center justify-between">
          {/* Left Section - Brand & Controls */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle (Sidebar) - Extreme Left */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <HiOutlineMenuAlt1 className="h-5 w-5" />
            </button>

            {/* Desktop Sidebar Toggle - Extreme Left (Desktop Only) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {sidebarOpen ? <HiChevronLeft className="h-5 w-5" /> : <HiOutlineMenuAlt1 className="h-5 w-5" />}
            </button>

            {/* Brand Logo & Name - Left Middle */}
            <Navbar.Brand href="/" className="flex items-center gap-2 lg:mr-8">
              <img src="/logo.png" className="mr-3 h-6 rounded-full sm:h-9" alt="Digischolar Logo" />
              <span className="hidden lg:inline-block self-center whitespace-nowrap text-xl font-bold text-gray-900 dark:text-white">
                DIGISCHOLAR-ADMIN
              </span>
            </Navbar.Brand>
          </div>



          {/* Right Section - Notifications, Theme Toggle, and Profile - Extreme Right */}
          <div className="flex items-center gap-2 lg:ml-auto">
            {/* Notifications Bell (Always Visible) */}
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <HiBell className="h-5 w-5" />
            </button>

            {/* Dark Mode Toggle (Always Visible) */}
            <DarkThemeToggle />

            {/* User Profile Dropdown (Mobile Menu Trigger) */}
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex items-center gap-2">
                  <span className="hidden md:block text-sm font-medium text-gray-900 dark:text-white">
                    {loggedInUserName}
                  </span>
                  <Avatar
                    alt={loggedInUserName}
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                    size="sm"
                    className="hover:ring-2 ring-gray-300 dark:ring-gray-500"
                  />
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium truncate">{loggedInUserName}</span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => navigate('/dashboard')}>
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/settings')}>
                Settings
              </Dropdown.Item>
              
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </Navbar>
    </>
  );
}