import React, { useState, useMemo } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiUser, FiCheck, FiX } from 'react-icons/fi';

const SiteVisitScheduler = ({ siteVisits = [], leads = [], properties = [], onSchedule, onComplete, onCancel }) => {
  const [filterLead, setFilterLead] = useState('All');

  const filteredVisits = useMemo(() => {
    const now = new Date();
    return siteVisits
      .filter(visit => filterLead === 'All' || visit.leadId === filterLead)
      .filter(visit => new Date(visit.scheduledDate) >= now)
      .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
  }, [siteVisits, filterLead]);

  const completedVisits = siteVisits.filter(v => v.status === 'completed').length;
  const cancelledVisits = siteVisits.filter(v => v.status === 'cancelled').length;

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getLeadName = (leadId) => {
    return leads.find(l => l.id === leadId)?.name || 'Unknown Lead';
  };

  const getPropertyAddress = (propId) => {
    return properties.find(p => p.id === propId)?.address || 'Unknown Property';
  };

  return (
    <section className="site-visit-scheduler glass-card">
      <div className="scheduler-header">
        <div>
          <h2 className="section-title">Site Visit Schedule</h2>
          <div className="visit-stats">
            <span className="stat-badge completed-badge">{completedVisits} Completed</span>
            <span className="stat-badge pending-badge">{filteredVisits.length} Upcoming</span>
            <span className="stat-badge cancelled-badge">{cancelledVisits} Cancelled</span>
          </div>
        </div>
        <button className="btn-primary" onClick={onSchedule}>
          <FiCalendar /> Schedule Visit
        </button>
      </div>

      <div className="visit-filters">
        <select
          value={filterLead}
          onChange={(e) => setFilterLead(e.target.value)}
          className="visit-filter-select"
        >
          <option value="All">All Leads</option>
          {leads.map(lead => (
            <option key={lead.id} value={lead.id}>{lead.name}</option>
          ))}
        </select>
      </div>

      <div className="visits-list">
        {filteredVisits.length === 0 ? (
          <div className="empty-state">No upcoming site visits scheduled</div>
        ) : (
          filteredVisits.map(visit => {
            const { date, time } = formatDateTime(visit.scheduledDate);
            return (
              <div key={visit.id} className="visit-item">
                <div className="visit-datetime">
                  <div className="visit-date">
                    <FiCalendar size={16} />
                    <span>{date}</span>
                  </div>
                  <div className="visit-time">
                    <FiClock size={16} />
                    <span>{time}</span>
                  </div>
                </div>
                <div className="visit-details">
                  <div className="visit-lead">
                    <FiUser size={16} />
                    <span className="visit-lead-name">{getLeadName(visit.leadId)}</span>
                  </div>
                  <div className="visit-property">
                    <FiMapPin size={16} />
                    <span className="visit-property-name">{getPropertyAddress(visit.propertyId)}</span>
                  </div>
                  {visit.notes && <div className="visit-notes">{visit.notes}</div>}
                </div>
                <div className="visit-actions">
                  <button
                    className="action-btn complete-btn"
                    onClick={() => onComplete(visit.id)}
                    title="Mark as completed"
                  >
                    <FiCheck size={16} />
                  </button>
                  <button
                    className="action-btn cancel-btn"
                    onClick={() => onCancel(visit.id)}
                    title="Cancel visit"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default SiteVisitScheduler;
