import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { db } from '../../firebase'; 
import { collection, onSnapshot } from 'firebase/firestore';

const SchoolDistribution = ({ limit = null }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const usersRef = collection(db, 'users');

        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
            const schoolCounts = {};

            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const school = userData.school;

                if (school) { 
                    schoolCounts[school] = (schoolCounts[school] || 0) + 1;
                }
            });

           
            let chartData = Object.keys(schoolCounts)
                .map((school) => ({
                    school: school,
                    applications: schoolCounts[school],
                }))
                .sort((a, b) => b.applications - a.applications); 
            
            
            if (limit && chartData.length > limit) {
                chartData = chartData.slice(0, limit);
            }
            
            console.log("Chart Data:", chartData);

            setData(chartData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching data:", error);
            setError(error.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [limit]);

    if (loading) {
        return <div>Loading chart data...</div>;
    }

    if (error) {
        return <div>Error loading chart data: {error}</div>;
    }
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                    type="number"
                    dataKey="applications" 
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={{ stroke: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis
                    type="category"
                    dataKey="school"     
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={{ stroke: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    width={150}         
                />
                <Tooltip content={<CustomTooltip/>} />
                <Bar
                    dataKey="applications"
                    barSize={15}
                    fill="#3B82F6"
                    radius={[0, 4, 4, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SchoolDistribution;