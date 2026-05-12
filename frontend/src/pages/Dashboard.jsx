import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import SearchBar from '../components/SearchBar';
import SkeletonCard from '../components/SkeletonCard';
import {Toast, ConfirmModal, SuccessModal, useToast} from '../components/Toast';

const API = 'https://contact-manager-backend-x2tn.onrender.com';

// Glitch Loader
const GlitchLoader = () => (
    <div className="fixed inset-0 bg-white z-9999 flex flex-col items-center justify-center gap-6">
        <style>{`
            @keyframes glitch {
                0%   { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); }
                10%  { clip-path: inset(30% 0 50% 0); transform: translate(4px, 0); }
                20%  { clip-path: inset(60% 0 20% 0); transform: translate(-4px, 0); }
                30%  { clip-path: inset(80% 0 5%  0); transform: translate(4px, 0); }
                40%  { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 0); }
                50%  { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); }
                60%  { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 0); }
                70%  { clip-path: inset(70% 0 15% 0); transform: translate(4px, 0); }
                80%  { clip-path: inset(40% 0 40% 0); transform: translate(-2px, 0); }
                90%  { clip-path: inset(5%  0 85% 0); transform: translate(2px, 0); }
                100% { clip-path: inset(0 0 95% 0); transform: translate(0, 0); }
            }
            @keyframes glitch2 {
                0%   { clip-path: inset(50% 0 30% 0); transform: translate(4px, 0); }
                20%  { clip-path: inset(10% 0 70% 0); transform: translate(-4px, 0); }
                40%  { clip-path: inset(75% 0 10% 0); transform: translate(2px, 0); }
                60%  { clip-path: inset(25% 0 55% 0); transform: translate(-2px, 0); }
                80%  { clip-path: inset(60% 0 20% 0); transform: translate(4px, 0); }
                100% { clip-path: inset(50% 0 30% 0); transform: translate(-4px, 0); }
            }
            @keyframes scanline {
                0%   { transform: translateY(-100%); }
                100% { transform: translateY(100vh); }
            }
            @keyframes flicker {
                0%, 95%, 100% { opacity: 1; }
                96%           { opacity: 0.4; }
                97%           { opacity: 1; }
                98%           { opacity: 0.2; }
                99%           { opacity: 1; }
            }
            .glitch-base  { animation: flicker 3s infinite; }
            .glitch-layer1 {
                position: absolute; inset: 0;
                color: #6366f1;
                animation: glitch 1.5s infinite linear;
            }
            .glitch-layer2 {
                position: absolute; inset: 0;
                color: #ec4899;
                animation: glitch2 1.8s infinite linear;
            }
            .scanline {
                position: absolute; left: 0; right: 0;
                height: 3px;
                background: linear-gradient(transparent, rgba(99,102,241,0.15), transparent);
                animation: scanline 2s linear infinite;
                pointer-events: none;
            }`}</style>

        <div className="relative overflow-hidden" style={{ height: 60 }}>
            <div className="scanline" />
            {/* Base text */}
            <h1 className="glitch-base text-4xl font-black tracking-tighter text-indigo-950 select-none">
                ContactHub
            </h1>
            {/* Glitch layers */}
            <h1 className="glitch-layer1 text-4xl font-black tracking-tighter select-none" aria-hidden>
                ContactHub
            </h1>
            <h1 className="glitch-layer2 text-4xl font-black tracking-tighter select-none" aria-hidden>
                ContactHub
            </h1>
        </div>

        {/* Animated bar */}
		<div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-indigo-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
        </div>
        <p className="text-xs text-gray-400 tracking-widest uppercase animate-pulse">Loading...</p>
    </div>
);

//Dashboard 
const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading]  = useState(true);
    const [filtered, setFiltered] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);
    const [pageReady, setPageReady] = useState(false);
    const [confirmId, setConfirmId] = useState(null);
    const [successInfo, setSuccessInfo] = useState(null);

    const {toasts, showToast, removeToast} = useToast();

    const getAuthConfig = () => {
        const token = localStorage.getItem('token');
        if (!token) { console.warn('No token found'); return {}; }
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/contacts`, getAuthConfig());
            setContacts(res.data);
            setFiltered(res.data);
        } catch (error) {
            console.error('Fetch Failed', error);
        } finally {
            setLoading(false);
            setPageReady(true);
        }
    };
    useEffect(() => { fetchContacts(); }, []);
    const handleSearch = (query) => {
        setFiltered(
            contacts.filter(c =>
                c.name.toLowerCase().includes(query.toLowerCase()) ||
                c.email.toLowerCase().includes(query.toLowerCase())
            )
        );
    };
    const handleDelete = (id) => setConfirmId(id);
    const confirmDelete = async () => {
        try{
            await axios.delete(`${API}/api/contacts/${confirmId}`, getAuthConfig());
            setConfirmId(null);
            fetchContacts();
            showToast('Contact deleted successfully', 'success');
        } catch{
            setConfirmId(null);
            showToast('Failed to delete contact', 'error');
        }
    };
    const handleSaveContact = async (formData) => {
        try {
            const config = getAuthConfig();
            const isEdit = !!currentContact?._id;
            if(isEdit){
                await axios.put(`${API}/api/contacts/${currentContact._id}`, formData, config);
            }else{
                await axios.post(`${API}/api/contacts`, formData, config);
            }
            setShowForm(false);
            setCurrentContact(null);
            fetchContacts();
            //show success modal with contact name and action type
            setSuccessInfo({
                type: isEdit ? 'updated' : 'created',
                name: formData.name
            });
        } catch(err) {
            showToast(err.response?.data?.message || 'An unexpected error occurred', 'error');
            console.error('Save failed:', err);
        }
    };
    // Show glitch loader until first fetch completes
    if (!pageReady) return <GlitchLoader />;
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-4xl mx-auto">
            <Toast toasts={toasts} removeToast={removeToast} />
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                        <Users className="text-indigo-950 mt-1" /> My Contacts
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage your professional and personal network.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setCurrentContact(null); setShowForm(true); }}
                    className="bg-indigo-900 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 self-start sm:self-auto whitespace-nowrap">
                    <Plus size={18} /> Add Contact
                </motion.button>
            </header>
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
                {loading ? (
                    [1, 2, 3].map(n => <SkeletonCard key={n} />)
                ) : (
                    <AnimatePresence>
                        {filtered.length > 0 ? (
                            filtered.map(contact => (
                                <ContactCard
                                    key={contact._id}
                                    contact={contact}
                                    onDelete={handleDelete}
                                    onEdit={(c) => { setCurrentContact(c); setShowForm(true); }} />
                            ))
                        ) : (
                            <div className="text-center col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-500 font-medium">No contacts found.</p>
                                <p className="text-sm text-gray-400 mt-1">Click "Add Contact" to start building your list.</p>
                            </div>
                        )}
                    </AnimatePresence>
                )}
            </div>
            {/*ContactForm rendered at root level with high z-index so it's never hidden */}
            <AnimatePresence>
                {showForm && (
                    <ContactForm
                        contact={currentContact}
                        onSave={handleSaveContact}
                        onClose={() => { setShowForm(false); setCurrentContact(null); }} />
                )}
            </AnimatePresence>
            {/**custom delete confirm modal */}
            <AnimatePresence>
                {confirmId && (
                    <ConfirmModal 
                    message="Are you sure you want to delete contact? This cannot be undone."
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmId(null)} />
                )}
            </AnimatePresence>
            {/**success modal; create or edit */}
            <AnimatePresence>
                {successInfo && (
                    <SuccessModal
                    type={successInfo.type}
                    contactName={successInfo.name}
                    onClose={() => setSuccessInfo(null)} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Dashboard;
