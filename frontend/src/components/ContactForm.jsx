import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-100 p-4">
            
            <motion.div
                initial={{ y: 50 }} animate={{ y: 0 }}
                className="bg-white w-full max-w-2xl rounded-3xl p-0 overflow-hidden shadow-2xl relative flex">
                
                {/*LEFT SIDE: IMAGE AREA*/}
                <div className="w-1/3 bg-indigo-50 flex flex-col items-center justify-center p-6 border-r border-gray-100">
                    <img 
                        src="https://plus.unsplash.com/premium_photo-1684761949431-53b58936cf2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbnRhY3QlMjBmb3JtfGVufDB8fDB8fHww" 
                        alt="Contact"
                        className="h-full rounded-xl object-cover shadow-lg mb-4"
                    />
                    <h2 className="text-xl font-black text-indigo-950 text-center">
                        {contact ? 'Update\nContact' : 'New\nContact'}
                    </h2>
                </div>

                {/*RIGHT SIDE: FORM AREA*/}
                <div className="w-2/3 p-10 relative">
                    <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>

                    <form onSubmit={(e) => { e.preventDefault(); onSave(formData)}} className="space-y-5">
                        {/* Name Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                            <input 
                                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="Marvin Black"
                                value={formData.name} 
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required />
                            
                        </div>
                        
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                            <input 
                                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="example@mail.com"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required />
                            
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Phone Number</label>
                            <input 
                                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"placeholder="+233"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required />
                            
                        </div>

                        <div className="flex gap-6 py-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="radio" name="type" value="personal" 
                                    checked={formData.type === 'personal'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-4 h-4 accent-indigo-600" />
                                <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600">Personal</span>               
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="radio" name="type" value="professional" 
                                    checked={formData.type === 'professional'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-4 h-4 accent-indigo-600" />
                                <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600">Professional</span>
                            </label>                   
                        </div>

                        <button type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-indigo-950 text-white p-4 rounded-2xl font-bold hover:bg-indigo-900 shadow-xl shadow-indigo-100 transition-all active:scale-95">
                            <Save size={20} /> 
                            {contact ? 'Update Contact' : 'Create Contact'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ContactForm;