import React, { useState, useMemo } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiDollarSign, FiCalendar } from 'react-icons/fi';

const PropertyInventory = ({ properties = [], onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      const searchMatch = `${prop.address} ${prop.type} ${prop.locality}`.toLowerCase().includes(search.toLowerCase());
      const statusMatch = filterStatus === 'All' || prop.status === filterStatus;
      return searchMatch && statusMatch;
    });
  }, [properties, search, filterStatus]);

  const statusOptions = ['All', 'Available', 'Sold', 'Pending', 'Rented'];
  const propertyTypes = ['All', 'Apartment', 'House', 'Commercial', 'Plot'];

  const getStatusColor = (status) => {
    if (status === 'Available') return 'status-available';
    if (status === 'Sold') return 'status-sold';
    if (status === 'Pending') return 'status-pending';
    if (status === 'Rented') return 'status-rented';
    return 'status-default';
  };

  return (
    <section className="property-inventory glass-card">
      <div className="inventory-header">
        <div>
          <h2 className="section-title">Property Inventory</h2>
          <p className="section-description">{filteredProperties.length} properties</p>
        </div>
        <button className="btn-primary" onClick={onAdd}>
          <FiPlus /> Add Property
        </button>
      </div>

      <div className="inventory-filters">
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="inventory-search"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="inventory-filter-select"
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="properties-grid">
        {filteredProperties.length === 0 ? (
          <div className="empty-state">No properties found</div>
        ) : (
          filteredProperties.map(prop => (
            <div key={prop.id} className={`property-card ${getStatusColor(prop.status)}`}>
              <div className="property-header">
                <h3 className="property-type">{prop.type}</h3>
                <span className={`property-status-badge ${getStatusColor(prop.status)}`}>
                  {prop.status}
                </span>
              </div>
              <div className="property-address">
                <FiMapPin size={14} />
                <span>{prop.address}</span>
              </div>
              <div className="property-details">
                {prop.price && (
                  <div className="property-detail">
                    <FiDollarSign size={14} />
                    <span>{prop.price}</span>
                  </div>
                )}
                {prop.area && (
                  <div className="property-detail">
                    <span>{prop.area} sq.ft</span>
                  </div>
                )}
                {prop.bedrooms && (
                  <div className="property-detail">
                    <span>{prop.bedrooms} BHK</span>
                  </div>
                )}
              </div>
              <div className="property-actions">
                <button className="action-btn edit-btn" onClick={() => onEdit(prop)}>
                  <FiEdit2 size={16} />
                </button>
                <button className="action-btn delete-btn" onClick={() => onDelete(prop.id)}>
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PropertyInventory;
