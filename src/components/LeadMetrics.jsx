import React from 'react';
import { FiTrendingUp, FiZap, FiCalendar, FiMap, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const LeadMetrics = ({ leads = [] }) => {
  // Calculate metrics from leads
  const totalLeads = leads.length;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const newLeadsToday = leads.filter(l => {
    const leadDate = new Date(l.createdAt);
    leadDate.setHours(0, 0, 0, 0);
    return leadDate.getTime() === today.getTime();
  }).length;

  const followupsToday = leads.filter(l => l.nextFollowup && new Date(l.nextFollowup).toDateString() === today.toDateString()).length;
  
  const siteVisits = leads.filter(l => l.status === 'Site Visit').length;
  
  const closedDeals = leads.filter(l => l.status === 'Booked' || l.status === 'Closed').length;
  
  const hotLeads = leads.filter(l => l.priority === 'hot' || l.status === 'Negotiation').length;

  const metrics = [
    { label: 'Total Leads', value: totalLeads, icon: FiTrendingUp, color: 'primary' },
    { label: 'New Leads', value: newLeadsToday, icon: FiZap, color: 'success' },
    { label: 'Follow-ups Today', value: followupsToday, icon: FiCalendar, color: 'warning' },
    { label: 'Site Visits', value: siteVisits, icon: FiMap, color: 'info' },
    { label: 'Closed Deals', value: closedDeals, icon: FiCheckCircle, color: 'success' },
    { label: 'Hot Leads', value: hotLeads, icon: FiAlertCircle, color: 'danger' }
  ];

  return (
    <div className="metrics-grid">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div key={idx} className={`metric-card metric-${metric.color}`}>
            <div className="metric-icon">
              <Icon />
            </div>
            <div className="metric-content">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value">{metric.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeadMetrics;
