// src/pages/Applications.jsx
import React from 'react';
import { Card } from 'flowbite-react'; // Assuming you might want cards here too
import StatsCards from '../components/Dashboard/StatsCards';
import RequestsTable from '../components/Tables/RequestsTable';

const Applications = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Applications</h1>

      <StatsCards />

      <Card>
        <RequestsTable />
      </Card>
    </div>
  );
};

export default Applications;