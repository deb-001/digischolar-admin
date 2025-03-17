import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { db } from '../../firebase'; // Import your Firebase setup
import { collection, onSnapshot } from 'firebase/firestore';

const GenderDistribution = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const COLORS = ['#10B981', '#3B82F6', '#EC4899'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    useEffect(() => {
        const usersRef = collection(db, 'users'); //  Your users collection

        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
            const genderCounts = {};

            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const gender = userData.gender; // Get the 'gender' field

                if (gender) { // Make sure 'gender' exists
                    genderCounts[gender] = (genderCounts[gender] || 0) + 1;
                }
            });

            // Convert to Recharts format
            const chartData = Object.keys(genderCounts).map((gender) => ({
                name: gender,
                value: genderCounts[gender],
            }));
          console.log("Chart Data:", chartData)

            setData(chartData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching data:", error);
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
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{
                        paddingTop: '20px'
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default GenderDistribution;