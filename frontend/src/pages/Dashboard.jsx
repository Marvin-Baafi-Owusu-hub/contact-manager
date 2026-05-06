import  {useEffect, useState} from 'react';
import axios from 'axios'; 
import { Plus, Users, Contact } from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';
import  ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import SearchBar from '../components/SearchBar';
import SkeletonCard from '../components/SkeletonCard';

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtered, setFiltered] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);
    const [pageReady, setPageReady] = useState(false);

    const getAuthConfig = () => {
        const token = localStorage.getItem('token');

        if(!token){
            console.warn("No token found");
            return{};
        }
        return{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
    }

const fetchContacts =async () => {
    setLoading(true);
    try{
        const res = await axios.get('https://contact-manager-backend-x2tn.onrender.com/api/contacts', getAuthConfig());
        setContacts(res.data);
        setFiltered(res.data);
    }catch(error){
        console.error('Fetch Failed', error);
    } finally{
        setLoading(false);
        setPageReady(true);
    }
};

useEffect(() => {
    fetchContacts();
}, []);

const handleSearch = (query) => {
    const results = contacts.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase())    
    )
    setFiltered(results);
};

const handleDelete = async(id) => {
    if(window.confirm("Delete this contacts?")) {
        try{
            await axios.delete(`https://contact-manager-backend-x2tn.onrender.com/api/contacts/${id}`, getAuthConfig());
            fetchContacts();
        } catch(err){
            alert("Failed to delete contacts");
        }
    }
};

const handleSaveContact = async (formData) => {
    try{
        const config = getAuthConfig();
        if (currentContact && currentContact._id) {
            await axios.put(`https://contact-manager-backend-x2tn.onrender.com/api/contacts/${currentContact._id}`, formData, config);
        } else {
            await axios.post('https://contact-manager-backend-x2tn.onrender.com/api/contacts', formData, config);
        }
        setShowForm(false);
        setCurrentContact(null);
        fetchContacts();
        alert("Contact Saved Successfully");
    } catch(err){
        const errorMsg = err.response?.data?.message || "An unexpected error occurred ";
        alert(errorMsg);
        console.error("Save failed:", err);
    }
}

return (
    <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                    <Users className="text-indigo-950 mt-1"/> My Contacts
                </h1>
                <p className="text-gray-500 mt-1">Manage your professional and personal network.</p>
            </div>
            <motion.button
                whileHover={{scale: 1.05}} whileTap={{scale:  0.95}}
                onClick={() => {setCurrentContact(null); setShowForm(true);}}
                className="bg-indigo-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200">
                    <Plus size={20} />Add Contact
                </motion.button>
        </header>
        <SearchBar onSearch={handleSearch}/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
                [1, 2, 3].map(n => <SkeletonCard key={n} />) 
            ) : (
                <AnimatePresence>
                    {filtered.length > 0 ? (
                        filtered.map(contact => (
                            <ContactCard
                            key={contact._id} //using MongoDB ID
                            contact={contact}
                            onDelete={handleDelete}
                            onEdit={(c) => {
                                setCurrentContact(c);
                                setShowForm(true);
                            }} />

                        ))
                    ):(
                        // message shown if the database is empty
                        <div className="text-center col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500 font-medium">No contacts found.</p>
                            <p className="text-sm text-gray-400">Click "Add Contact" to start building your list.</p>
                        </div>
                    )}
                </AnimatePresence>
            )}
        </div>

        {showForm && (
            <ContactForm
                contact={currentContact}
                onSave={handleSaveContact}
                onClose={() => setShowForm(false)}/>
        )}
    </div>
    );
};

export default Dashboard;

