import React, { useMemo } from 'react';
import { FiUser, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

const RecentActivity = ({ leads = [] }) => {
  const recentLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);
  }, [leads]);

  const getActivityType = (lead) => {
    const statusMap = {
      'New': { type: 'New Lead', icon: FiUser, color: 'activity-new' },
      'Contacted': { type: 'Contacted', icon: FiPhone, color: 'activity-contacted' },
      'Site Visit': { type: 'Site Visit', icon: FiMapPin, color: 'activity-visit' },
      'Negotiation': { type: 'Negotiating', icon: FiClock, color: 'activity-negotiation' },
      'Booked': { type: 'Deal Closed', icon: FiUser, color: 'activity-booked' },
      'Lost': { type: 'Lost Lead', icon: FiUser, color: 'activity-lost' }
    };
    return statusMap[lead.status] || { type: 'Update', icon: FiUser, color: 'activity-update' };
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <section className="activity-section glass-card">
      <div className="activity-header">
        <h2 className="section-title">Recent Activity</h2>
        <a href="#" className="view-all-link">View All →</a>
      </div>

      <div className="activity-list">
        {recentLeads.length === 0 ? (
          <div className="empty-state">
            <p>No recent activity yet</p>
          </div>
        ) : (
          recentLeads.map((lead, index) => {
            const activity = getActivityType(lead);
            const Icon = activity.icon;
            return (
              <div key={lead.id} className={`activity-item ${activity.color}`}>
                <div className="activity-icon">
                  <Icon />
                </div>
                <div className="activity-content">
                  <div className="activity-main">
                    <div className="activity-name">{lead.name}</div>
                    <div className="activity-type">{activity.type}</div>
                  </div>
                  <div className="activity-details">
                    {lead.source && <span className="activity-badge activity-source">{lead.source}</span>}
                    {lead.budget && <span className="activity-badge activity-budget">{lead.budget}</span>}
                  </div>
                </div>
                <div className="activity-time">
                  {formatTime(lead.createdAt)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default RecentActivity;
