import React, { useMemo } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const PipelineStages = ({ leads = [] }) => {
  const stages = [
    { name: 'New', color: 'stage-new', description: 'Fresh leads' },
    { name: 'Contacted', color: 'stage-contacted', description: 'Initial contact' },
    { name: 'Site Visit', color: 'stage-visit', description: 'Property tour' },
    { name: 'Negotiation', color: 'stage-negotiation', description: 'In negotiation' },
    { name: 'Booked', color: 'stage-booked', description: 'Deal closed' },
    { name: 'Lost', color: 'stage-lost', description: 'Lost opportunity' }
  ];

  const stageCounts = useMemo(() => {
    const counts = {};
    stages.forEach(stage => {
      counts[stage.name] = leads.filter(l => l.status === stage.name).length;
    });
    return counts;
  }, [leads]);

  const totalLeads = leads.length;
  const conversionRate = totalLeads > 0 ? Math.round((stageCounts['Booked'] / totalLeads) * 100) : 0;

  return (
    <section className="pipeline-section">
      <div className="pipeline-header">
        <div>
          <h2 className="section-title">Lead Pipeline</h2>
          <p className="section-description">Track leads through each stage of the sales funnel</p>
        </div>
        <div className="conversion-badge">
          <span className="badge-label">Conversion Rate</span>
          <span className="badge-value">{conversionRate}%</span>
        </div>
      </div>

      <div className="pipeline-container">
        {stages.map((stage, index) => (
          <div key={stage.name} className="pipeline-stage-wrapper">
            <div className={`pipeline-stage ${stage.color}`}>
              <div className="stage-header">
                <h3 className="stage-name">{stage.name}</h3>
                <div className="stage-count">{stageCounts[stage.name]}</div>
              </div>
              <p className="stage-description">{stage.description}</p>
              
              {stageCounts[stage.name] > 0 && (
                <div className="stage-leads-preview">
                  {leads
                    .filter(l => l.status === stage.name)
                    .slice(0, 2)
                    .map(lead => (
                      <div key={lead.id} className="lead-preview">
                        <div className="lead-name" title={lead.name}>{lead.name}</div>
                        {lead.budget && <div className="lead-budget">{lead.budget}</div>}
                      </div>
                    ))}
                  {stageCounts[stage.name] > 2 && (
                    <div className="lead-more">+{stageCounts[stage.name] - 2} more</div>
                  )}
                </div>
              )}
            </div>

            {index < stages.length - 1 && (
              <div className="pipeline-arrow">
                <FiArrowRight />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pipeline-stats">
        <div className="stat-item">
          <span className="stat-label">Total in Pipeline</span>
          <span className="stat-value">{totalLeads}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Stage</span>
          <span className="stat-value">{stages[Math.floor(totalLeads > 0 ? (stageCounts['Booked'] / totalLeads) * stages.length : 0)]?.name || 'New'}</span>
        </div>
      </div>
    </section>
  );
};

export default PipelineStages;
