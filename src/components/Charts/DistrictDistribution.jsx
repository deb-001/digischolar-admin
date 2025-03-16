import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { db } from '../../firebase'; // Import your Firebase setup
import { collection, onSnapshot } from 'firebase/firestore';

const DistrictDistribution = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define your predefined districts
    const predefinedDistricts = [
        'Anantnag',
        'Baramulla',
        'Srinagar',
        'Jammu',
        'Udhampur',
        'Leh',
        'Kargil',
    ];

    useEffect(() => {
        const usersRef = collection(db, 'users');

        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
            const districtCounts = {};

            // Initialize counts for ALL predefined districts to 0
            predefinedDistricts.forEach((district) => {
                districtCounts[district] = 0;
            });

            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const district = userData.district;

                if (district && predefinedDistricts.includes(district)) {
                    districtCounts[district] += 1;
                }
            });

            // Convert to array for Recharts, sorted by predefinedDistricts order
            const chartData = Object.keys(districtCounts)
              .sort((a, b) => predefinedDistricts.indexOf(a) - predefinedDistricts.indexOf(b))
              .map((district) => ({
                  district: district,
                  applications: districtCounts[district],
              }));

            console.log('Chart Data:', chartData);
            setData(chartData);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching data:', error);
            setError(error.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading chart data...</div>;
    }

    if (error) {
        return <div>Error loading chart data: {error}</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 40, // Increased bottom margin
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                    dataKey="district"
                    tick={{ fill: '#6B7280', fontSize: 12, angle: -45, textAnchor: 'end' }} // Rotated labels
                    type="category"
                    interval={0}
                />
                <YAxis
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    domain={[0, 'dataMax + 1']}
                    allowDecimals={false}
                    interval={0}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                    }}
                />
                <Bar dataKey="applications" fill="#8884d8" barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DistrictDistribution;