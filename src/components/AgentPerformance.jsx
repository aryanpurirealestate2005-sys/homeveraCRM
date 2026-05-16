import React, { useMemo } from 'react';
import { FiUser, FiTrendingUp, FiTarget, FiAward } from 'react-icons/fi';

const AgentPerformance = ({ leads = [], agents = [] }) => {
  const agentStats = useMemo(() => {
    return agents.map(agent => {
      const agentLeads = leads.filter(l => l.assignedTo === agent.id || l.assignedAgent === agent.name);
      const closedDeals = agentLeads.filter(l => l.status === 'Booked').length;
      const totalLeads = agentLeads.length;
      const conversionRate = totalLeads > 0 ? Math.round((closedDeals / totalLeads) * 100) : 0;

      return {
        id: agent.id,
        name: agent.name,
        totalLeads,
        closedDeals,
        conversionRate,
        revenue: agent.revenue || 0
      };
    }).sort((a, b) => b.closedDeals - a.closedDeals);
  }, [leads, agents]);

  return (
    <section className="agent-performance glass-card">
      <div className="performance-header">
        <h2 className="section-title">Agent Performance</h2>
        <p className="section-description">Top performers this month</p>
      </div>

      <div className="agents-table-wrapper">
        <table className="agents-table">
          <thead>
            <tr>
              <th>Agent Name</th>
              <th>Total Leads</th>
              <th>Deals Closed</th>
              <th>Conversion Rate</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {agentStats.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-message">No agent data available</td>
              </tr>
            ) : (
              agentStats.map((agent, idx) => (
                <tr key={agent.id} className={idx === 0 ? 'top-agent' : ''}>
                  <td className="agent-name-cell">
                    <div className="agent-badge">
                      <FiUser size={16} />
                    </div>
                    <span>{agent.name}</span>
                  </td>
                  <td className="metric-cell">
                    <div className="metric-badge metric-leads">
                      {agent.totalLeads}
                    </div>
                  </td>
                  <td className="metric-cell">
                    <div className="metric-badge metric-deals">
                      {agent.closedDeals}
                    </div>
                  </td>
                  <td className="metric-cell">
                    <div className="conversion-bar">
                      <div className="conversion-fill" style={{ width: `${agent.conversionRate}%` }}></div>
                      <span className="conversion-text">{agent.conversionRate}%</span>
                    </div>
                  </td>
                  <td className="revenue-cell">
                    <span className="revenue-badge">${agent.revenue.toLocaleString()}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {agentStats.length > 0 && (
        <div className="top-performer">
          <FiAward size={24} />
          <div>
            <span className="top-performer-label">Top Performer</span>
            <span className="top-performer-name">{agentStats[0].name}</span>
            <span className="top-performer-info">{agentStats[0].closedDeals} deals closed</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default AgentPerformance;
