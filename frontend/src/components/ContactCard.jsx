import { motion } from 'framer-motion';
import {Phone, Mail, Trash2, Edit2} from 'lucide-react';

const ContactCard = ({ contact, onDelete, onEdit }) => {
    const type = contact.type?.toLowerCase();

    return (
        <motion.div
            layout
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.9}}
            whileHover={{y: -5}}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative p-5">

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-indigo-950 text-white rounded-full flex items-center font-bold text-lg shrink-0">
                        {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-base font-bold text-gray-800 truncate">{contact.name}</h3>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wide mt-0.5 ${type === 'professional' ? 'bg-purple-100 text-purple-900'
                            : type === 'personal' ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                            {type || 'unset'}
                        </span>
                    </div>
                </div>

                <div className="flex gap-1 shrink-0">
                    <button
                    onClick={() => onEdit(contact)}
                    className="p-2 text-gray-400 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-all">
                        <Edit2 size={16}/>
                    </button>
                    <button
                    onClick={() => onDelete(contact._id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16}/>
                    </button>
                </div>
            </div>

            <div className="space-y-2 border-t border-gray-50 pt-3">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Phone size={14} className="text-indigo-200 shrink-0" />
                    <span className="truncate">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Mail size={14} className="text-indigo-200 shrink-0"/>
                    <span className="truncate">{contact.email}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactCard;