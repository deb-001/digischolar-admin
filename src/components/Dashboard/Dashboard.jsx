// dashboard.jsx
import React from 'react';
import { Card } from 'flowbite-react';
import ApplicationChart from "../Charts/ApplicationChart";
import GenderDistribution from "../Charts/GenderDistribution";
import SchoolDistribution from "../Charts/SchoolDistribution";
import StatsCards from "./StatsCards";
import RequestsTable from "../Tables/RequestsTable";

const Dashboard = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">
        Admin Dashboard
      </h2>

      <StatsCards />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="h-[400px]">
          <div className="p-4 h-full flex flex-col">
            <h5 className="text-lg font-bold mb-4 dark:text-white">Application Trends</h5>
            <div className="flex-1 relative">
              <ApplicationChart />
            </div>
          </div>
        </Card>

        <Card className="h-[400px]">
          <div className="p-4 h-full flex flex-col">
            <h5 className="text-lg font-bold mb-4 dark:text-white">Gender Distribution</h5>
            <div className="flex-1 relative">
              <GenderDistribution />
            </div>
          </div>
        </Card>

        <Card className="h-[400px]">
          <div className="p-4 h-full flex flex-col">
            <h5 className="text-lg font-bold mb-4 dark:text-white">School Distribution</h5>
            <div className="flex-1 relative">
              <SchoolDistribution />
            </div>
          </div>
        </Card>
      </div>

      <Card className="mb-8">
        <div className="p-4">
          <h5 className="text-lg font-bold mb-4 dark:text-white">Applications</h5>
          <RequestsTable />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;