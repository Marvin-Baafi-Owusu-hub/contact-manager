import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';

const ContactForm = ({ contact, onClose, onSave }) => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '',  
        phone: '', 
        type: 'personal' 
    });

    useEffect(() => {
        if (contact) setFormData(contact);
    }, [contact]);

    const update = (field, value) => setFormData(prev => ({...prev, [field]: value}));

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <motion.div
            initial={{y: 40, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: 40, opacity: 0}}
            transition={{type: "spring", damping: 25, stiffness: 300}}
            className="bg-white w-full max-w-md sm:max-w-lg rounded-3xl shadow-2xl overflow-hidden">

                <div className="bg-indigo-950 px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20  rounded-full flex items-center justify-center">
                        <Users size={20} className="text-white"/>
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-lg">
                                {contact ? 'Update Contact' : 'New Contact'}
                            </h2>
                            <p className="text-indigo-200 text-xs">
                                {contact ? 'Edit the details below' : 'Fill in the details below'}
                            </p>
                        </div>
                    </div>
                    <button
                    onClick={onClose}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all">
                        <X size={16}/>
                    </button>
                </div>

                <div className="px-6 py-6">
                    <form onSubmit={(e) => {e.preventDefault(); onSave(formData); }} className="space-y-4">

                        <div className="space-y-l">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1">
                                <User size={11}/> Full Name
                            </label>
                            <input 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-indigo-950 focus:border-transparent outline-none transition-all text-sm"
                            placeholder="Marvin Black"
                            value={formData.name}
                            onChange={(e) => update('name', e.target.value)}
                            required />
                        </div>

                        <div className="space-y-l">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-l">
                                <Mail size={11}/>Email Address
                            </label>
                            <input 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-indigo-950 focus:border-transparent outline-none transition-all text-sm"
                            placeholder="example@mail.com"
                            type="email"
                            value={formData.email}onChange={(e) => update('email', e.target.value)}
                            required />
                        </div>

                        <div className="space-y-l">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-l">
                                <Phone size={11} /> Phone Number
                            </label>
                            <input 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-indigo-950 focus:border-transparent outline-none transition-all text-sm"
                            placeholder="+233"
                            type="tel"
                            value={formaData.phone}
                            onChange={(e) => update('phone', e.target.value)}
                            required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Contact Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['personal', 'professional'].map((t) => (
                                    <label
                                    key={t}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                        formData.type === t ? t === 'personal' ? 'border-green-300 bg-green-50 text-green-700'
                                        : 'border-purple-300 bg-purple-50 text-purple-400'
                                        : 'border-gray-200 bg-gray-500 text-gray-500 hover:border-gray-300'
                                        }`}>

                                            <input
                                            type="radio"
                                            value={t}
                                            checked={formData.type === t}
                                            onChange={(e) => update('type', e.target.value)}
                                            className="sr-only" />
                                            <span className="text-sm font-semibold capitalize"></span>{t}
                                            </label>
                                ))}
                            </div>
                        </div>

                        <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-indigo-950 text-white py-3.5 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-100 mt-2">
                            <Save size={18}/>
                            {contact ? 'Update Contact' : 'Create Contact'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ContactForm;