// Analytics.jsx
import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import ApplicationChart from '../components/Charts/ApplicationChart';
import GenderDistribution from '../components/Charts/GenderDistribution';
import SchoolDistribution from '../components/Charts/SchoolDistribution';
import DistrictDistribution from '../components/Charts/DistrictDistribution';
import CSVExport from '../components/CSVExport';
import { db } from '../firebase'; // Import your Firebase setup
import { collection, onSnapshot } from 'firebase/firestore';

const Analytics = () => {
    const [applicationTrendsData, setApplicationTrendsData] = useState([]);
    const [genderDistributionData, setGenderDistributionData] = useState([]);
    const [schoolDistributionData, setSchoolDistributionData] = useState([]);
    const [districtDistributionData, setDistrictDistributionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


     useEffect(() => {
        const unsubscribeApplications = onSnapshot(collection(db, 'applications'), (querySnapshot) => {
            const monthlyData = {};
            querySnapshot.forEach((doc) => {
                const appData = doc.data();
                const submissionDateStr = appData.submissionDate;

                if (submissionDateStr) {
                    const dateParts = submissionDateStr.split(' ');
                    const day = parseInt(dateParts[0], 10);
                    const monthName = dateParts[1];
                    const year = parseInt(dateParts[2], 10);
                    const timeParts = dateParts[4].split(':');
                    const hours = parseInt(timeParts[0], 10);
                    const minutes = parseInt(timeParts[1], 10);
                    const seconds = parseInt(timeParts[2], 10);

                    const dateObj = new Date(year, getMonthIndex(monthName), day, hours, minutes, seconds);
                    const shortMonth = dateObj.toLocaleString('default', { month: 'short' });
                    monthlyData[shortMonth] = (monthlyData[shortMonth] || 0) + 1;
                }
            });

            const chartData = Object.keys(monthlyData)
            .sort((a, b) => {
                const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return monthsOrder.indexOf(a) - monthsOrder.indexOf(b);
            })
            .map((month) => ({
                month: month,
                applications: monthlyData[month],
            }));

            setApplicationTrendsData(chartData);
        }, (error) => {
            console.error("Error fetching application trends data:", error);
            setError("Failed to fetch application trends data.");
        });

        const unsubscribeUsers = onSnapshot(collection(db, 'users'), (querySnapshot) => {
            const genderCounts = {};
            const schoolCounts = {};
            const districtCounts = {};

            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const { gender, school, district } = userData;

                if (gender) {
                    genderCounts[gender] = (genderCounts[gender] || 0) + 1;
                }
                if (school) {
                    schoolCounts[school] = (schoolCounts[school] || 0) + 1;
                }
                if (district) {
                    districtCounts[district] = (districtCounts[district] || 0) + 1;
                }
            });

            const genderChartData = Object.keys(genderCounts).map((gender) => ({
                name: gender,
                value: genderCounts[gender],
            }));

            const schoolChartData = Object.keys(schoolCounts)
                .map((school) => ({ school: school, applications: schoolCounts[school] }))
                .sort((a, b) => b.applications - a.applications);

            const predefinedDistricts = ["Anantnag", "Baramulla", "Srinagar", "Jammu", "Udhampur", "Leh", "Kargil"];
            const districtChartData = predefinedDistricts.map(district => ({
                district: district,
                applications: districtCounts[district] || 0,
            }));


            setGenderDistributionData(genderChartData);
            setSchoolDistributionData(schoolChartData);
            setDistrictDistributionData(districtChartData);
            setLoading(false);

        }, (error) => {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch user data.");
            setLoading(false);
        });

        return () => {
            unsubscribeApplications();
            unsubscribeUsers();
        }
    }, []);

      
    function getMonthIndex(monthName) {
        const months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
        return months.findIndex(month => month.toLowerCase() === monthName.toLowerCase());
    }


      if (loading) {
        return <div>Loading...</div>;
      }

      if (error) {
          return <div>Error: {error}</div>;
      }


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 dark:text-white">Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Application Trends Card */}
                <Card className="h-[450px]">
                    <div className="flex justify-between items-start">
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Application Trends
                        </h5>
                        <CSVExport data={applicationTrendsData} filename="application_trends.csv" headers={['month', 'applications']} />
                    </div>
                    <ApplicationChart />
                </Card>

                {/* Gender Distribution Card */}
                <Card className="h-[450px]">
                    <div className="flex justify-between items-start">
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Gender Distribution
                        </h5>
                        <CSVExport data={genderDistributionData} filename="gender_distribution.csv" headers={['name', 'value']} />
                    </div>
                    <GenderDistribution />
                </Card>

                {/* School Distribution Card */}
                <Card className="h-[450px]">
                    <div className="flex justify-between items-start">
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            School Distribution
                        </h5>
                        <CSVExport data={schoolDistributionData} filename="school_distribution.csv" headers={['school', 'applications']} />
                    </div>
                    <SchoolDistribution />
                </Card>

                {/* District Distribution Card */}
                <Card className="h-[450px]">
                    <div className="flex justify-between items-start">
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            District Distribution
                        </h5>
                        <CSVExport data={districtDistributionData} filename="district_distribution.csv" headers={['district', 'applications']} />
                    </div>
                    <DistrictDistribution />
                </Card>
            </div>
        </div>
    );
};

export default Analytics;