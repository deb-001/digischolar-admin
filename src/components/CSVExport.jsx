// src/components/CSVExport.jsx
import React from 'react';
import { Button } from 'flowbite-react';

const CSVExport = ({ data, filename, headers }) => {
  const convertToCSV = (data, headers) => {
    const headerRow = headers.join(',');
    const dataRows = data.map(item => {
      return headers.map(header => {
        // Handle potential commas and quotes in data
        let cell = item[header] || ''; // Use empty string if data is missing
        cell = String(cell).replace(/"/g, '""'); // Escape double quotes
        if (cell.includes(',') || cell.includes('"')) {
          cell = `"${cell}"`; // Enclose in double quotes if comma or quote exists
        }
        return cell;
      }).join(',');
    });
    return [headerRow, ...dataRows].join('\n');
  };

  const downloadCSV = () => {
    const csvContent = convertToCSV(data, headers);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={downloadCSV} size="sm" color="gray">
      Export to CSV
    </Button>
  );
};

export default CSVExport;