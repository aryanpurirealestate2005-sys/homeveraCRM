import { useEffect, useState } from 'react';
import WhatsAppContact from './WhatsAppContact.jsx';
import { FiX } from 'react-icons/fi';

const emptyLead = {
  name: '',
  email: '',
  phone: '',
  status: 'New',
  source: '',
  budget: '',
  priority: 'medium',
  propertyInterest: '',
  nextFollowup: '',
  nextFollowupNote: '',
  notes: '',
  assignedAgent: '',
  createdAt: new Date().toISOString()
};

const defaultStatusOptions = ['New', 'Contacted', 'Site Visit', 'Negotiation', 'Booked', 'Lost'];
const defaultSourceOptions = ['Website', 'Referral', 'Partner', 'Social Media', 'Email Campaign', 'Direct'];
const defaultPriorityOptions = ['low', 'medium', 'high', 'hot'];

function LeadForm({ lead, statusOptions, sourceOptions, priorityOptions, onSave, onCancel }) {
  const [formLead, setFormLead] = useState(emptyLead);
  const statuses = statusOptions || defaultStatusOptions;
  const sources = sourceOptions || defaultSourceOptions;
  const priorities = priorityOptions || defaultPriorityOptions;

  useEffect(() => {
    if (lead && lead.id) {
      setFormLead(lead);
    } else {
      setFormLead(emptyLead);
    }
  }, [lead]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formLead.name || !formLead.email || !formLead.phone) return;
    onSave(formLead);
  };

  return (
    <div>
      <div className="panel-header">
        <div>
          <h2>{formLead.id ? 'Edit lead' : 'New lead'}</h2>
          <p>Keep your pipeline organized with clear status updates.</p>
        </div>
      </div>

      <form className="lead-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={formLead.name} onChange={(e) => setFormLead({ ...formLead, name: e.target.value })} placeholder="Full name" required />
        </label>
        <label>
          Email
          <input type="email" value={formLead.email} onChange={(e) => setFormLead({ ...formLead, email: e.target.value })} placeholder="Email address" required />
        </label>
        <label>
          Phone
          <input value={formLead.phone} onChange={(e) => setFormLead({ ...formLead, phone: e.target.value })} placeholder="Phone number" required />
        </label>
        <label>
          Status
          <select value={formLead.status} onChange={(e) => setFormLead({ ...formLead, status: e.target.value })}>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
        <label>
          Source
          <select value={formLead.source} onChange={(e) => setFormLead({ ...formLead, source: e.target.value })}>
            <option value="">Select source...</option>
            {sources.map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </label>
        <label>
          Budget
          <input value={formLead.budget} onChange={(e) => setFormLead({ ...formLead, budget: e.target.value })} placeholder="$250k" />
        </label>
        <label>
          Priori
        <label>
          Property Interest
          <input value={formLead.propertyInterest || ''} onChange={(e) => setFormLead({ ...formLead, propertyInterest: e.target.value })} placeholder="Type of property interested in" />
        </label>
        <label>
          Assigned Agent
         <input
  value={formLead.assignedAgent || ''}
  onChange={(e) =>
    setFormLead({ ...formLead, assignedAgent: e.target.value })
  }
/>
</label>
        
<label>
  Follow-up Date

  <input
    type="date"
    value={formLead.followUpDate || ""}
    onChange={(e) =>
      setFormLead({
        ...formLead,
        followUpDate: e.target.value
      })
    }
  />
</label>
          Additional Notes
          <textarea value={formLead.notes || ''} onChange={(e) => setFormLead({ ...formLead, notes: e.target.value })} placeholder="Any additional notes about this lead" rows="3" />
        </label>
        <label>
          Priority
          <select value={formLead.priority} onChange={(e) => setFormLead({ ...formLead, priority: e.target.value })}>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
            ))}
          </select>
        </label>
        <label>
          <label>
  Assigned Agent
  <select
    value={formLead.assignedAgent || ""}
    onChange={(e) =>
      setFormLead({
        ...formLead,
        assignedAgent: e.target.value,
      })
    }
  >
    <option value="">Select Agent</option>
    <option value="Samarth">Samarth</option>
    <option value="Aryan">Aryan</option>
    <option value="Sales Team">Sales Team</option>
  </select>
</label>
  Follow Up Date
  <input
    type="date"
    value={formLead.followUpDate || ""}
    onChange={(e) =>
      setFormLead({
        ...formLead,
        followUpDate: e.target.value,
      })
    }
  />
</label>

        <div className="form-actions">
          <button type="button" className="ghost-button" onClick={onCancel}>Cancel</button>
          <button type="submit" className="primary-button">{formLead.id ? 'Save changes' : 'Add lead'}</button>
        </div>
      </form>
    </div>
  );
}

export default LeadForm;
