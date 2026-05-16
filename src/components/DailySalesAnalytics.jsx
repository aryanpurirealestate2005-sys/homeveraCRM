import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FiTrendingUp, FiBarChart2, FiPercent } from 'react-icons/fi';

const DailySalesAnalytics = ({ leads = [] }) => {
  const today = new Date();
  
  const dailyMetrics = useMemo(() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const dateKey = date.toDateString();
      
      const dayLeads = leads.filter(l => new Date(l.createdAt).toDateString() === dateKey);
      const dayDeals = dayLeads.filter(l => l.status === 'Booked').length;
      const dayContacts = dayLeads.filter(l => l.status === 'Contacted').length;
      
      last7Days.push({
        date: dateStr,
        leads: dayLeads.length,
        deals: dayDeals,
        contacts: dayContacts,
        conversion: dayLeads.length > 0 ? Math.round((dayDeals / dayLeads.length) * 100) : 0
      });
    }
    return last7Days;
  }, [leads]);

  const todayMetrics = useMemo(() => {
    const todayStr = today.toDateString();
    const todayLeads = leads.filter(l => new Date(l.createdAt).toDateString() === todayStr);
    return {
      newLeads: todayLeads.length,
      dealsClosedToday: todayLeads.filter(l => l.status === 'Booked').length,
      contactsMadeToday: todayLeads.filter(l => l.status === 'Contacted').length,
      followupsToday: leads.filter(l => {
        const followupDate = new Date(l.nextFollowup);
        return followupDate.toDateString() === todayStr;
      }).length
    };
  }, [leads]);

  const conversionRate = useMemo(() => {
    const totalLeads = leads.length;
    const closedDeals = leads.filter(l => l.status === 'Booked').length;
    return totalLeads > 0 ? Math.round((closedDeals / totalLeads) * 100) : 0;
  }, [leads]);

  return (
    <section className="daily-sales-analytics">
      <h2 className="section-title">Daily Sales Analytics</h2>

      {/* Today's Metrics */}
      <div className="today-metrics">
        <div className="metric-box metric-new-leads">
          <div className="metric-box-icon">
            <FiTrendingUp />
          </div>
          <div className="metric-box-content">
            <span className="metric-box-label">New Leads Today</span>
            <span className="metric-box-value">{todayMetrics.newLeads}</span>
          </div>
        </div>

        <div className="metric-box metric-deals-today">
          <div className="metric-box-icon">
            <FiBarChart2 />
          </div>
          <div className="metric-box-content">
            <span className="metric-box-label">Deals Closed Today</span>
            <span className="metric-box-value">{todayMetrics.dealsClosedToday}</span>
          </div>
        </div>

        <div className="metric-box metric-contacts-today">
          <div className="metric-box-icon">
            <FiBarChart2 />
          </div>
          <div className="metric-box-content">
            <span className="metric-box-label">Contacts Made</span>
            <span className="metric-box-value">{todayMetrics.contactsMadeToday}</span>
          </div>
        </div>

        <div className="metric-box metric-conversion">
          <div className="metric-box-icon">
            <FiPercent />
          </div>
          <div className="metric-box-content">
            <span className="metric-box-label">Conversion Rate</span>
            <span className="metric-box-value">{conversionRate}%</span>
          </div>
        </div>
      </div>

      {/* 7-Day Trend */}
      <div className="analytics-charts">
        <div className="chart-card glass-card">
          <h3 className="chart-title">Lead Generation - Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis stroke="rgba(255, 255, 255, 0.5)" />
              <YAxis stroke="rgba(255, 255, 255, 0.5)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(13, 18, 34, 0.95)', border: '1px solid rgba(93, 112, 255, 0.3)', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="leads" fill="#5d70ff" name="New Leads" />
              <Bar dataKey="deals" fill="#66d966" name="Deals Closed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card glass-card">
          <h3 className="chart-title">Conversion Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis stroke="rgba(255, 255, 255, 0.5)" />
              <YAxis stroke="rgba(255, 255, 255, 0.5)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(13, 18, 34, 0.95)', border: '1px solid rgba(93, 112, 255, 0.3)', borderRadius: '8px' }} />
              <Line
                type="monotone"
                dataKey="conversion"
                stroke="#ffaa33"
                strokeWidth={3}
                dot={{ fill: '#ffaa33', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default DailySalesAnalytics;
