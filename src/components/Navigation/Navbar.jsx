import React, { useState, useEffect } from 'react';
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Navbar,
  TextInput,
} from 'flowbite-react';
import { HiSearch, HiBell, HiOutlineMenuAlt1, HiChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function TopNavbar({ onMenuToggle, sidebarOpen, setSidebarOpen, setIsLoggedIn }) {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user ID from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('userId');
    // Update login state
    setIsLoggedIn(false);
    // Navigate to login
    navigate('/login');
  };

  return (
    <Navbar fluid className="fixed top-0 left-0 w-full z-40 bg-white border-b dark:bg-gray-800 h-16">
      <div className="w-full px-4 flex items-center justify-between">
        {/* Left Section - Brand & Controls */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <HiOutlineMenuAlt1 className="h-5 w-5" />
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            {sidebarOpen ? <HiChevronLeft className="h-5 w-5" /> : <HiOutlineMenuAlt1 className="h-5 w-5" />}
          </button>

          {/* Brand Logo & Name */}
          <Navbar.Brand href="/" className="flex items-center gap-2">
            <img src="/logo.png" className="mr-3 h-6 rounded-full sm:h-9" alt="Digischolar Logo" />
            <span className="self-center whitespace-nowrap text-xl font-bold text-gray-900 dark:text-white">
              DIGISCHOLAR-ADMIN
            </span>
          </Navbar.Brand>
        </div>

        {/* Right Section - Search, Notifications, Theme Toggle, and Profile */}
        <div className="flex items-center gap-4">
          {/* Search Bar (Desktop Only) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <TextInput
              icon={HiSearch}
              placeholder="Search..."
              type="search"
              className="w-full"
              sizing="md"
            />
          </div>

          {/* Notifications Bell */}
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <HiBell className="h-5 w-5" />
          </button>

          {/* Dark Mode Toggle */}
          <DarkThemeToggle />

          {/* User Profile Dropdown */}
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="flex items-center gap-2">
                <span className="hidden md:block text-sm font-medium text-gray-900 dark:text-white">
                  {userId}
                </span>
                <Avatar
                  alt={userId}
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                  size="sm"
                  className="hover:ring-2 ring-gray-300 dark:ring-gray-500"
                />
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium truncate">{userId}</span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
}
