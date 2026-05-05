import {useState} from 'react';
import { ContactContext } from '../context/ContactContext';

const useContacts = () => {
    const context = useContext(ContactContext);

    if(!context){
        throw new Error('use Contacts must be used within a Contact Provider');
    }

    return context;
};

export default useContacts;