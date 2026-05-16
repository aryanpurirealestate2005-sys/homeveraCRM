import React, { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartSection = ({ leads = [] }) => {
  // Monthly lead growth data
  const monthlyData = useMemo(() => {
    const months = {};
    leads.forEach(lead => {
      const date = new Date(lead.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months[monthKey] = (months[monthKey] || 0) + 1;
    });
    
    const last6Months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      last6Months.push({
        name: monthName,
        leads: months[monthKey] || 0
      });
    }
    return last6Months;
  }, [leads]);

  // Lead source analytics
  const sourceData = useMemo(() => {
    const sources = {};
    leads.forEach(lead => {
      const source = lead.source || 'Unknown';
      sources[source] = (sources[source] || 0) + 1;
    });
    return Object.entries(sources).map(([name, value]) => ({ name, value }));
  }, [leads]);

  // Conversion rate by status
  const statusData = useMemo(() => {
    const statuses = {};
    leads.forEach(lead => {
      const status = lead.status || 'New';
      statuses[status] = (statuses[status] || 0) + 1;
    });
    return Object.entries(statuses).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const COLORS = ['#5d70ff', '#68beff', '#66d966', '#ffaa33', '#ff6b6b', '#c25cff'];

  return (
    <section className="charts-section">
      <h2 className="section-title">Analytics & Performance</h2>
      
      <div className="charts-grid">
        {/* Monthly Lead Growth */}
        <div className="chart-card glass-card">
          <h3 className="chart-title">Monthly Lead Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis stroke="rgba(255, 255, 255, 0.5)" />
              <YAxis stroke="rgba(255, 255, 255, 0.5)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(13, 18, 34, 0.95)', border: '1px solid rgba(93, 112, 255, 0.3)', borderRadius: '8px' }} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#5d70ff" 
                strokeWidth={3}
                dot={{ fill: '#5d70ff', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Source Analytics */}
        <div className="chart-card glass-card">
          <h3 className="chart-title">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#5d70ff"
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgba(13, 18, 34, 0.95)', border: '1px solid rgba(93, 112, 255, 0.3)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Rate by Status */}
        <div className="chart-card glass-card">
          <h3 className="chart-title">Lead Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis stroke="rgba(255, 255, 255, 0.5)" />
              <YAxis stroke="rgba(255, 255, 255, 0.5)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(13, 18, 34, 0.95)', border: '1px solid rgba(93, 112, 255, 0.3)', borderRadius: '8px' }} />
              <Bar dataKey="value" fill="#68beff" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default ChartSection;
