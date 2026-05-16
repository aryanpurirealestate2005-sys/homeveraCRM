import { useState } from "react";

function LeadTable({ leads, onEdit, onDelete, loading }) {
  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
lead.phone?.includes(search)
  );

  if (loading) {
    return <div className="loader-panel">Loading leads...</div>;
  }

  if (!leads.length) {
    return <div className="empty-state">No leads found</div>;
  }

  return (
    <div className="table-wrapper">
      

      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Source</th>
            <th>Budget</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead.id}>
              <td>
                <strong>{lead.name}</strong>
                <div>{lead.email}</div>
              </td>

              <td>
                <span
                  className={`status-badge ${lead.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {lead.status}
                </span>
              </td>

              <td>{lead.source || "-"}</td>
              <td>{lead.budget || "-"}</td>
              <td>{lead.phone}</td>

              <td className="actions-cell">
                <a
                  href={`https://wa.me/91${lead.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="whatsapp-btn">
                    WhatsApp
                  </button>
                </a>

                <button
                  className="ghost-button small"
                  onClick={() => onEdit(lead)}
                >
                  Edit
                </button>

                <button
                  className="ghost-button small danger"
                  onClick={() => onDelete(lead.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;