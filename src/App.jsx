import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';
import TopNavbar from './components/Navigation/Navbar';
import SideNavigation from './components/Navigation/Sidebar';
import PageFooter from './components/Navigation/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import Analytics from './pages/Analytics';
import Applications from './pages/Applications';
import Login from './components/Dashboard/login';
import { migrateTimestamps } from './utils/migration';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';

const theme = {
    theme: {
        root: {
            base: "bg-gray-50 dark:bg-gray-900",
            content: "py-2 px-1"
        }
    }
};

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarHidden, setMobileSidebarHidden] = useState(false);
    const wasSidebarOpen = useRef(true);
    const isDesktop = useRef(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        }
        migrateTimestamps().catch(console.error);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                if (!isDesktop.current) {
                    setSidebarOpen(wasSidebarOpen.current);
                }
                isDesktop.current = true;
                setMobileSidebarHidden(true);
            } else {
                isDesktop.current = false;
                if (wasSidebarOpen.current) {
                    setSidebarOpen(false);
                    setMobileSidebarHidden(true);
                }
            }
        };

        handleResize();

        const saveDesktopState = () => {
            if (window.innerWidth >= 1024) {
                wasSidebarOpen.current = sidebarOpen;
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('resize', saveDesktopState);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('resize', saveDesktopState);
        };
    }, [sidebarOpen]);

    return (
        <Flowbite theme={theme}>
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                {isLoggedIn ? (
                    <>
                        <SideNavigation
                            sidebarOpen={sidebarOpen}
                            mobileHidden={mobileSidebarHidden}
                            setMobileHidden={setMobileSidebarHidden}
                            setIsLoggedIn={setIsLoggedIn}
                        />
                        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 
                            ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} 
                            ${!mobileSidebarHidden ? 'lg:ml-64' : ''}`}>
                            <TopNavbar
                                onMenuToggle={() => {
                                    if (isDesktop.current) {
                                        setSidebarOpen(!sidebarOpen);
                                        wasSidebarOpen.current = !sidebarOpen;
                                    } else {
                                        setMobileSidebarHidden(!mobileSidebarHidden);
                                    }
                                }}
                                sidebarOpen={sidebarOpen}
                                setSidebarOpen={setSidebarOpen}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                            <main className="flex-1 overflow-y-auto pt-20">
                                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                                    <Routes>
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/analytics" element={<Analytics />} />
                                        <Route path="/applications" element={<Applications />} />
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="/helpcenter" element={<HelpCenter />} />
                                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                                    </Routes>
                                </div>
                                <PageFooter />
                            </main>
                        </div>
                    </>
                ) : (
                    <Routes>
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                )}
            </div>
        </Flowbite>
    );
}

export default App;
