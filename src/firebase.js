import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as firebaseAuthStateChanged
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
  limit
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:"AIzaSyAy9Jn-l-b1rwaymdFicEZvCBzcKiYh0qM",
  authDomain:"homeveracrm.firebaseapp.com",
  projectId:"homeveracrm",
  storageBucket:"homeveracrm.firebasestorage.app",
  messagingSenderId:"1067789148327",
  appId:"1:1067789148327:web:b48043ec29e8dbdce97b82",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const leadsCollection = collection(db, 'leads');

const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
const logoutUser = () => signOut(auth);
const subscribeAuthState = (callback) => firebaseAuthStateChanged(auth, callback);
const fetchLeads = async () => {
  const q = query(leadsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
};

const addLead = async (lead) => {
  const data = {
    ...lead,
    createdAt: new Date().toISOString()
  };
  const docRef = await addDoc(leadsCollection, data);
  return { id: docRef.id, ...data };
};

const updateLead = async (id, lead) => {
  const leadDoc = doc(db, 'leads', id);
  await updateDoc(leadDoc, lead);
  return { id, ...lead };
};

const deleteLead = async (id) => {
  const leadDoc = doc(db, 'leads', id);
  await deleteDoc(leadDoc);
};

// Real-time listener for leads
const subscribeToLeads = (callback) => {
  const q = query(leadsCollection, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const leadsData = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data()
    }));
    callback(leadsData);
  });
};

// Get leads by status
const getLeadsByStatus = async (status) => {
  const q = query(leadsCollection, where('status', '==', status));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
};

// Get recent activity
const getRecentActivity = async () => {
  const q = query(leadsCollection, orderBy('createdAt', 'desc'), limit(5));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
};

export { auth, db, loginUser, logoutUser, subscribeAuthState, fetchLeads, addLead, updateLead, deleteLead, subscribeToLeads, getLeadsByStatus, getRecentActivity };
