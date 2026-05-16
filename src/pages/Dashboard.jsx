import { useState, useEffect, useMemo } from 'react';
import { FiLogOut, FiPlus, FiSearch, FiFilter, FiRefreshCw, FiMenu, FiX } from 'react-icons/fi';
import LeadMetrics from '../components/LeadMetrics.jsx';
import ChartSection from '../components/ChartSection.jsx';
import PipelineStages from '../components/PipelineStages.jsx';
import RecentActivity from '../components/RecentActivity.jsx';
import UpcomingFollowups from '../components/UpcomingFollowups.jsx';
import LeadForm from '../components/LeadForm.jsx';
import LeadTable from '../components/LeadTable.jsx';
import PropertyInventory from '../components/PropertyInventory.jsx';
import SiteVisitScheduler from '../components/SiteVisitScheduler.jsx';
import DailySalesAnalytics from '../components/DailySalesAnalytics.jsx';
import AgentPerformance from '../components/AgentPerformance.jsx';
import ExportLeads from '../components/ExportLeads.jsx';
import NotificationSystem from '../components/NotificationSystem.jsx';

function Dashboard({ 
  user, 
  leads = [], 
  loading = false, 
  error = '', 
  onLogout, 
  onLoadLeads, 
  onAddLead, 
  onUpdateLead, 
  onDeleteLead 
}) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [view, setView] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [properties, setProperties] = useState([
    {
      id: 'prop-1',
      address: '123 Oak Street, Downtown',
      type: 'Apartment',
      status: 'Available',
      price: '$450,000',
      area: '1200',
      bedrooms: '2',
      locality: 'Downtown'
    },
    {
      id: 'prop-2',
      address: '456 Maple Avenue, Suburbs',
      type: 'House',
      status: 'Available',
      price: '$750,000',
      area: '2500',
      bedrooms: '4',
      locality: 'Suburbs'
    }
  ]);
  const [siteVisits, setSiteVisits] = useState([]);
  const [agents, setAgents] = useState([
    { id: 'agent-1', name: 'John Smith', revenue: 125000 },
    { id: 'agent-2', name: 'Sarah Johnson', revenue: 98000 },
    { id: 'agent-3', name: 'Mike Davis', revenue: 87000 }
  ]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchText = `${lead.name} ${lead.email} ${lead.phone} ${lead.status} ${lead.source}`.toLowerCase();
      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, filterStatus]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onLoadLeads();
    addNotification({ title: 'Data Synced', type: 'success' });
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleAddLead = async (newLead) => {
    await onAddLead(newLead);
    setSelectedLead(null);
    addNotification({ title: 'Lead Added', message: `${newLead.name} has been added to your leads.`, type: 'success' });
  };

  const handleUpdateLead = async (id, updatedLead) => {
    await onUpdateLead(id, updatedLead);
    setSelectedLead(null);
    addNotification({ title: 'Lead Updated', message: 'Lead information updated successfully.', type: 'success' });
  };

  const addNotification = (notification) => {
    setNotifications([notification, ...notifications]);
    setTimeout(() => {
      setNotifications(prev => prev.filter((_, idx) => idx !== 0));
    }, 3000);
  };

  const statusOptions = ['All', 'New', 'Contacted', 'Site Visit', 'Negotiation', 'Booked', 'Lost'];

  return (
    <div className="dashboard-container">
      {/* Notification System */}
      <NotificationSystem notifications={notifications} onDismiss={(idx) => {
        setNotifications(notifications.filter((_, i) => i !== idx));
      }} />

      {/* Header */}
      <header className="dashboard-header glass-card">
        <div className="header-left">
          <div className="header-branding">
            <h1 className="dashboard-title">Homevera CRM</h1>
            <p className="dashboard-subtitle">Complete Real Estate Sales System</p>
          </div>
        </div>
        
        {/* Desktop View Navigation */}
        <div className="view-nav" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setView('overview')} 
            className={view === 'overview' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '8px 12px' }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setView('leads')} 
            className={view === 'leads' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '8px 12px' }}
          >
            Leads
          </button>
          <button 
            onClick={() => setView('properties')} 
            className={view === 'properties' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '8px 12px' }}
          >
            Properties
          </button>
          <button 
            onClick={() => setView('visits')} 
            className={view === 'visits' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '8px 12px' }}
          >
            Site Visits
          </button>
          <button 
            onClick={() => setView('analytics')} 
            className={view === 'analytics' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '8px 12px' }}
          >
            Analytics
          </button>
          <button 
            onClick={() => setView('performance')} 
            className={view === 'performance' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '8px 12px' }}
          >
            Performance
          </button>
        </div>

        <div className="header-actions">
          <button 
            className={`btn-primary ${isRefreshing ? 'loading' : ''}`}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <FiRefreshCw /> {isRefreshing ? 'Syncing...' : 'Sync'}
          </button>
          <button className="btn-primary" onClick={() => setSelectedLead({})}>
            <FiPlus /> Add Lead
          </button>
          <button className="btn-secondary" onClick={onLogout}>
            <FiLogOut /> Sign Out
          </button>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav glass-card">
          <button onClick={() => { setView('overview'); setMobileMenuOpen(false); }} className={view === 'overview' ? 'active' : ''}>
            Dashboard
          </button>
          <button onClick={() => { setView('leads'); setMobileMenuOpen(false); }} className={view === 'leads' ? 'active' : ''}>
            All Leads
          </button>
          <button onClick={() => { setView('properties'); setMobileMenuOpen(false); }} className={view === 'properties' ? 'active' : ''}>
            Properties
          </button>
          <button onClick={() => { setView('visits'); setMobileMenuOpen(false); }} className={view === 'visits' ? 'active' : ''}>
            Site Visits
          </button>
          <button onClick={() => { setView('analytics'); setMobileMenuOpen(false); }} className={view === 'analytics' ? 'active' : ''}>
            Analytics
          </button>
          <button onClick={() => { setView('performance'); setMobileMenuOpen(false); }} className={view === 'performance' ? 'active' : ''}>
            Agent Performance
          </button>
        </div>
      )}

      {/* Lead Form Modal */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <LeadForm
              lead={selectedLead}
              onSave={selectedLead.id ? (updatedLead) => handleUpdateLead(selectedLead.id, updatedLead) : handleAddLead}
              onCancel={() => setSelectedLead(null)}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="error-banner glass-card">
          <span>{error}</span>
        </div>
      )}

      {/* Dashboard Views */}
      {view === 'overview' && (
        <>
          <section className="metrics-section">
            <LeadMetrics leads={leads} />
          </section>
          <DailySalesAnalytics leads={leads} />
          <ChartSection leads={leads} />
          <PipelineStages leads={leads} />
          <div className="two-column-layout">
            <RecentActivity leads={leads} />
            <UpcomingFollowups leads={leads} />
          </div>
          <ExportLeads leads={leads} properties={properties} />
        </>
      )}

      {view === 'leads' && (
        <section className="leads-management-section glass-card">
          <div className="stats-grid">
  <div className="stat-card">
    <h3>Total Leads</h3>
    <p>{leads.length}</p>
  </div>

  <div className="stat-card">
    <h3>New Leads</h3>
    <p>{leads.filter((lead) => lead.status === "New").length}</p>
  </div>

  <div className="stat-card">
    <h3>Site Visits</h3>
    <p>{leads.filter((lead) => lead.status === "Site Visit").length}</p>
  </div>

  <div className="stat-card">
    <h3>Booked</h3>
    <p>{leads.filter((lead) => lead.status === "Booked").length}</p>
  </div>
</div>
          <div className="leads-management-header">
            <div>
              <h2 className="section-title">Manage All Leads</h2>
              <p className="section-description">Search, filter, and manage your entire lead database</p>
            </div>
            <button className="btn-primary" onClick={() => setSelectedLead({})}>
              <FiPlus /> Add New Lead
            </button>
          </div>

          <div className="leads-filters">
            <div className="search-box">
              <FiSearch />
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="leads-stats">
            <span className="leads-count">Showing {filteredLeads.length} of {leads.length} leads</span>
          </div>

          <div className="leads-table-wrapper">
            {loading ? (
              <div className="loading-state">
                <p>Loading leads...</p>
              </div>
            ) : (
              <LeadTable
                leads={filteredLeads}
                onEdit={(lead) => setSelectedLead(lead)}
                onDelete={onDeleteLead}
              />
            )}
          </div>
        </section>
      )}

      {view === 'properties' && (
        <PropertyInventory
          properties={properties}
          onAdd={() => alert('Add property feature coming soon')}
          onEdit={() => alert('Edit property feature coming soon')}
          onDelete={(id) => setProperties(properties.filter(p => p.id !== id))}
        />
      )}

      {view === 'visits' && (
        <SiteVisitScheduler
          siteVisits={siteVisits}
          leads={leads}
          properties={properties}
          onSchedule={() => alert('Schedule visit feature coming soon')}
          onComplete={(id) => {
            setSiteVisits(siteVisits.map(v => v.id === id ? { ...v, status: 'completed' } : v));
            addNotification({ title: 'Visit Completed', type: 'success' });
          }}
          onCancel={(id) => {
            setSiteVisits(siteVisits.map(v => v.id === id ? { ...v, status: 'cancelled' } : v));
          }}
        />
      )}

      {view === 'analytics' && (
        <DailySalesAnalytics leads={leads} />
      )}

      {view === 'performance' && (
        <AgentPerformance leads={leads} agents={agents} />
      )}
    </div>
  );
}

export default Dashboard;
