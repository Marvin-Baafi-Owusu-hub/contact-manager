import { motion } from 'framer-motion';
import {Phone, Mail, Trash2, Edit2, Star} from 'lucide-react';

const ContactCard = ({ contact, onDelete, onEdit }) => {
    return (
        <motion.div
            layout
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.9}}
            whileHover={{y: -5}}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden">

            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-900 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl">
                    {contact.name.charAt(0)}
                </div>
                <div className="flex gap-1">
                    <button onClick={() => onEdit(contact)} className="p-2 text-gray-400 hover:text-blue-800 transition-colors">
                        <Edit2 size={18} />
                    </button>
                    <button onClick={() => onDelete(contact._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 truncate">{contact.name}</h3>
            <div className="space-y-2 mt-2">
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Phone size={16} className="text-indigo-200"/>
                    <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Mail size={16} className="text-indigo-200"/>
                    <span className="truncate">{contact.email}</span>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${contact.type === 'professional' ? 'bg-purple-100 text-purple-900' : 'bg-green-100 text-green-600'}`}>
                    {contact.type}
                </span>
            </div>
        </motion.div>
    );
};

export default ContactCard;