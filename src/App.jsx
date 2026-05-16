import { useEffect, useMemo, useState } from 'react';
import { loginUser, logoutUser, subscribeAuthState, fetchLeads, addLead, updateLead, deleteLead } from './firebase.js';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
const defaultLeads = [
  {
    id: 'lead-1',
    name: 'Samantha Joy',
    email: 'samantha@example.com',
    phone: '+1 415 555 0123',
    status: 'New',
    source: 'Website',
    budget: '$350k',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    nextFollowup: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    nextFollowupNote: 'Call to discuss property options'
  },
  {
    id: 'lead-2',
    name: 'Marcus Lee',
    email: 'marcus@example.com',
    phone: '+1 415 555 0198',
    status: 'Contacted',
    source: 'Referral',
    budget: '$550k',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    nextFollowup: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    nextFollowupNote: 'Schedule property tour'
  },
  {
    id: 'lead-3',
    name: 'Jennifer Walsh',
    email: 'jennifer.w@example.com',
    phone: '+1 415 555 0145',
    status: 'Site Visit',
    source: 'Website',
    budget: '$450k',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'hot',
    nextFollowup: new Date(Date.now()).toISOString(),
    nextFollowupNote: 'Follow-up after site visit'
  },
  {
    id: 'lead-4',
    name: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1 415 555 0167',
    status: 'Negotiation',
    source: 'Partner',
    budget: '$750k',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'hot',
    nextFollowup: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    nextFollowupNote: 'Review offer'
  },
  {
    id: 'lead-5',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '+1 415 555 0189',
    status: 'Booked',
    source: 'Referral',
    budget: '$650k',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium'
  },
  {
    id: 'lead-6',
    name: 'Robert Thompson',
    email: 'robert.t@example.com',
    phone: '+1 415 555 0156',
    status: 'Lost',
    source: 'Website',
    budget: '$280k',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low'
  },
  {
    id: 'lead-7',
    name: 'Linda Martinez',
    email: 'linda.m@example.com',
    phone: '+1 415 555 0134',
    status: 'New',
    source: 'Social Media',
    budget: '$500k',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    nextFollowup: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    nextFollowupNote: 'Send property listings'
  },
  {
    id: 'lead-8',
    name: 'James Wilson',
    email: 'james.w@example.com',
    phone: '+1 415 555 0172',
    status: 'Contacted',
    source: 'Email Campaign',
    budget: '$600k',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    nextFollowup: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    nextFollowupNote: 'Send meeting proposal'
  },
  {
    id: 'lead-9',
    name: 'Sofia Garcia',
    email: 'sofia.g@example.com',
    phone: '+1 415 555 0143',
    status: 'Site Visit',
    source: 'Referral',
    budget: '$425k',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    nextFollowup: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    nextFollowupNote: 'Discuss financing options'
  },
  {
    id: 'lead-10',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '+1 415 555 0165',
    status: 'Negotiation',
    source: 'Website',
    budget: '$800k',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'hot',
    nextFollowup: new Date(Date.now()).toISOString(),
    nextFollowupNote: 'Finalize terms'
  },
  {
    id: 'lead-11',
    name: 'Amanda Johnson',
    email: 'amanda.j@example.com',
    phone: '+1 415 555 0178',
    status: 'New',
    source: 'Direct',
    budget: '$400k',
    createdAt: new Date(Date.now()).toISOString(),
    priority: 'medium',
    nextFollowup: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    nextFollowupNote: 'Initial consultation'
  },
  {
    id: 'lead-12',
    name: 'Christopher Davis',
    email: 'chris.d@example.com',
    phone: '+1 415 555 0191',
    status: 'Contacted',
    source: 'Partner',
    budget: '$700k',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    nextFollowup: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    nextFollowupNote: 'Schedule walkthrough'
  }
];

function App() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState(defaultLeads);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    return subscribeAuthState((authUser) => {
      setUser(authUser || null);
      setError('');
    });
  }, []);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError('');
    try {
      await loginUser(email, password);
    } catch (err) {
      setError('Unable to login. Check your credentials or Firebase configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
  };

  const loadLeads = async () => {
    setIsLoading(true);
    setError('');
    try {
      const fetched = await fetchLeads();
      if (fetched.length) {
        setLeads(fetched);
      }
    } catch {
      setError('Failed to load leads. Using local demo leads.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLead = async (lead) => {
    setIsLoading(true);
    setError('');
    try {
      const created = await addLead(lead);
      setLeads((current) => [created, ...current]);
    } catch {
      setLeads((current) => [{ id: `lead-${Date.now()}`, ...lead }, ...current]);
      setError('Lead saved locally; configure Firestore for persistent storage.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLead = async (id, lead) => {
    setIsLoading(true);
    setError('');
    try {
      await updateLead(id, lead);
      setLeads((current) => current.map((item) => (item.id === id ? { id, ...lead } : item)));
    } catch {
      setLeads((current) => current.map((item) => (item.id === id ? { id, ...lead } : item)));
      setError('Edit saved locally; update Firestore configuration to persist changes.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLead = async (id) => {
    setIsLoading(true);
    setError('');
    try {
      await deleteLead(id);
      setLeads((current) => current.filter((item) => item.id !== id));
    } catch {
      setLeads((current) => current.filter((item) => item.id !== id));
      setError('Lead removed locally; delete will sync after Firestore setup.');
    } finally {
      setIsLoading(false);
    }
  };

  const stats = useMemo(() => {
    return {
      total: leads.length,
      calls: leads.filter((lead) => ['Follow Up', 'Visit'].includes(lead.status)).length,
      visits: leads.filter((lead) => ['Visit', 'Booking'].includes(lead.status)).length
    };
  }, [leads]);

  if (!user && !demoMode) {
    return <LoginPage onLogin={handleLogin} loading={isLoading} error={error} />;
  }

  return (
    <Dashboard
      user={user}
      leads={leads}
      loading={isLoading}
      error={error}
      onLogout={demoMode ? () => setDemoMode(false) : handleLogout}
      onLoadLeads={loadLeads}
      onAddLead={handleAddLead}
      onUpdateLead={handleUpdateLead}
      onDeleteLead={handleDeleteLead}
    />
  );
}

export default App;
