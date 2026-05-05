import { createContext, useState, useEffect, useCallback }  from "react";
import axios from "axios";

export const ContactContext = createContext();

export const ContactProvider = ({children}) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // GET contacts  
const getContacts = useCallback(async () => {
    setLoading(true);

    try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
            'http://localhost:5001/api/contacts',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setContacts(res.data);

    } catch (err) {
        setError(err.response?.data?.message || 'Error fetching contacts');
    } finally {
        setLoading(false);
    }
}, []);

    // ADD contacts
    const addContact = async(contact) => {
        try {
            const res = await axios.post('http://localhost:5001/api/contacts', contact);
            setContacts([res.data, ...contacts]);
        } catch(err) {
            setError(err.response?.data?.msg || 'Error adding contact')
        }
    };

    // UPDATE contacts
    const updateContact = async (id, updatedData) => {
        try{
        const res = await axios.put(`http://localhost:5001/api/contacts/${id}`, updatedData);
        setContacts(contacts.map(c => (c._id === id ? res.data : c)));
        } catch(err){
            setError(err.response?.data?.msg || 'Error updating contact');
        }
    };

    //DELETE contact
    const deleteContact = async(id) => {
        const res = await axios.delete(`http://localhost:5001/api/contacts/${id}`);
        setContacts(contacts.filtered(c => c._id !== id));
    }

    return(
        <ContactContext.Provider value={{contacts, loading, error, getContacts, addContact, updateContact, deleteContact}}>
            {children}
        </ContactContext.Provider>
    );
};