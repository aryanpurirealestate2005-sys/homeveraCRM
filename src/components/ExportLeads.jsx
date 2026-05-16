import React from 'react';
import { FiDownload } from 'react-icons/fi';
import * as XLSX from 'xlsx';

const ExportLeads = ({ leads = [], properties = [] }) => {
  const handleExportLeads = () => {
    if (leads.length === 0) {
      alert('No leads to export');
      return;
    }

    const exportData = leads.map(lead => ({
      'Name': lead.name,
      'Email': lead.email,
      'Phone': lead.phone,
      'Status': lead.status,
      'Source': lead.source,
      'Budget': lead.budget,
      'Priority': lead.priority || 'Medium',
      'Created Date': new Date(lead.createdAt).toLocaleDateString(),
      'Next Followup': lead.nextFollowup ? new Date(lead.nextFollowup).toLocaleDateString() : 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
    XLSX.writeFile(workbook, `HomeveraCRM_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleExportProperties = () => {
    if (properties.length === 0) {
      alert('No properties to export');
      return;
    }

    const exportData = properties.map(prop => ({
      'Address': prop.address,
      'Type': prop.type,
      'Status': prop.status,
      'Price': prop.price,
      'Area': prop.area,
      'Bedrooms': prop.bedrooms,
      'Locality': prop.locality,
      'Owner': prop.owner || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Properties');
    XLSX.writeFile(workbook, `HomeveraCRM_Properties_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleExportSummary = () => {
    const statusCount = {};
    leads.forEach(lead => {
      statusCount[lead.status] = (statusCount[lead.status] || 0) + 1;
    });

    const summaryData = [
      { Metric: 'Total Leads', Value: leads.length },
      { Metric: 'Total Properties', Value: properties.length },
      { Metric: 'Properties Available', Value: properties.filter(p => p.status === 'Available').length },
      ...Object.entries(statusCount).map(([status, count]) => ({
        Metric: `Leads - ${status}`,
        Value: count
      }))
    ];

    const worksheet = XLSX.utils.json_to_sheet(summaryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary');
    XLSX.writeFile(workbook, `HomeveraCRM_Summary_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <section className="export-section">
      <h2 className="section-title">Export Data</h2>
      <div className="export-buttons-grid">
        <button className="export-btn leads-export" onClick={handleExportLeads}>
          <FiDownload />
          <div>
            <span className="export-title">Export Leads</span>
            <span className="export-count">{leads.length} records</span>
          </div>
        </button>

        <button className="export-btn properties-export" onClick={handleExportProperties}>
          <FiDownload />
          <div>
            <span className="export-title">Export Properties</span>
            <span className="export-count">{properties.length} records</span>
          </div>
        </button>

        <button className="export-btn summary-export" onClick={handleExportSummary}>
          <FiDownload />
          <div>
            <span className="export-title">Export Summary</span>
            <span className="export-count">Full Report</span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default ExportLeads;
