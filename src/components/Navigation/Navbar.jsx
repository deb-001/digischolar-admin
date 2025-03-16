import React, { useState, useEffect } from 'react';
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Navbar,
  TextInput,
} from 'flowbite-react';
import { HiSearch, HiBell, HiOutlineMenuAlt1, HiChevronLeft } from 'react-icons/hi';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function TopNavbar({ onMenuToggle, sidebarOpen, setSidebarOpen }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const loginRef = collection(db, 'login');
        const q = query(loginRef, where("ID", "==", "Khushal Jhingan")); // Replace with actual logged-in user ID
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        } else {
          setError("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
              <Avatar
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
                size="sm"
                className="hover:ring-2 ring-gray-300 dark:ring-gray-500"
              />
            }
          >
            <Dropdown.Header>
              {loading && <span className="text-sm block">Loading...</span>}
              {error && <span className="text-sm block text-red-500">Error: {error}</span>}
              {userData && <span className="text-sm block">{userData.ID}</span>}
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
}
