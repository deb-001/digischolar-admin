import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { UserGroupIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const StatsCards = () => {
    const [stats, setStats] = useState([
        {
            title: 'Total Applications',
            value: '0',
            icon: UserGroupIcon,
            change: '0%',
        },
        {
            title: 'Approved',
            value: '0',
            icon: CheckCircleIcon,
            change: '0%',
        },
        {
            title: 'Pending',
            value: '0',
            icon: ClockIcon,
            change: '0%',
        }
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const usersRef = collection(db, 'users');

        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
            let totalApplications = querySnapshot.size;
            let approvedCount = 0;
            let pendingCount = 0;

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const status = data.status || 'Pending';

                if (status === 'Scholarship Approved') {
                    approvedCount++;
                } else if (status !== 'Rejected') { 
                    pendingCount++;
                }
            });

            // Set updated stats
            const newStats = [
                {
                    title: 'Total Applications',
                    value: totalApplications.toString(),
                    icon: UserGroupIcon,
                    change: '+5%',
                },
                {
                    title: 'Approved',
                    value: approvedCount.toString(),
                    icon: CheckCircleIcon,
                    change: '+12%',
                },
                {
                    title: 'Pending',
                    value: pendingCount.toString(),
                    icon: ClockIcon,
                    change: '-8%',
                }
            ];

            setStats(newStats);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching data:", error);
            setError(error.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading stats...</div>;
    }

    if (error) {
        return <div>Error loading stats: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((stat, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-700 dark:text-gray-300">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-black dark:text-white">{stat.value}</h3>
                            <p className={`text-sm font-medium ${
                                stat.change.startsWith('-') ? 'text-red-500' : 'text-green-500'
                            }`}>
                                {stat.change} from last month
                            </p>
                        </div>
                        <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <stat.icon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default StatsCards;
