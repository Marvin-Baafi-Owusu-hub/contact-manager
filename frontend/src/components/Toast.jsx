import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X, Trash2, UserCheck, UserCog } from 'lucide-react';

// useToast hook 
export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const showToast = useCallback((message, type = 'info', duration = 3500) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type, duration }]);
        setTimeout(() => removeToast(id), duration);
    }, [removeToast]);

    return { toasts, showToast, removeToast };
};

// Toast Notification 
const icons = {
    success: <CheckCircle  size={18} className="text-green-200 shrink-0" />,
    error:   <XCircle      size={18} className="text-red-200 shrink-0" />,
    warning: <AlertTriangle size={18} className="text-yellow-200 shrink-0" />,
    info:    <Info         size={18} className="text-indigo-200 shrink-0" />,
};

const barColors = {
    success: 'bg-green-500',
    error:   'bg-red-500',
    warning: 'bg-yellow-500',
    info:    'bg-indigo-500',
};

export const Toast = ({ toasts, removeToast }) => (
    <div className="fixed top-4 right-4 z-9999 flex flex-col gap-2 w-80">
        <AnimatePresence>
            {toasts.map(t => (
                <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: 60, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0,  scale: 1    }}
                    exit={{    opacity: 0, x: 60, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="flex items-start gap-3 px-4 py-3">
                        {icons[t.type] || icons.info}
                        <p className="text-sm text-gray-700 font-medium flex-1 leading-snug">{t.message}</p>
                        <button onClick={() => removeToast(t.id)} className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5">
                            <X size={14} />
                        </button>
                    </div>
                    <motion.div
                        className={`h-0.5 ${barColors[t.type] || barColors.info}`}
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ duration: t.duration / 1000, ease: 'linear' }} />
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
);

// Confirm Delete Modal 
export const ConfirmModal = ({ message, onConfirm, onCancel }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9998 flex items-center justify-center p-4">
        <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1,   y: 0  }}
            exit={{    scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Trash2 size={24} className="text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Contact</h3>
                <p className="text-sm text-gray-500">{message || 'Are you sure? This cannot be undone.'}</p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
                <button
                    onClick={onCancel}className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all">
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 py-3 rounded-xl bg-red-400 hover:bg-red-500 text-white font-semibold text-sm transition-all shadow-lg shadow-red-100">
                    Delete
                </button>
            </div>
        </motion.div>
    </motion.div>
);

//Success Modal(create & edit)
export const SuccessModal = ({type = 'created', contactName = '', onClose }) =>{
    const isEdit = type === 'updated';

    return(
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9998 flex items-center justify-center p-4">
            <motion.div
            initial={{scale: 0.85, y: 30}}
            animate={{scale: 1, y: 0}}
            exit={{scale: 0.85, y: 30}}
            transition={{type: 'spring', damping: 22, stiffness: 280}}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
                {/**green top accent */}
                <div className={`h-2 w-full ${isEdit ? 'bg-indigo-300':'bg-green-300'}`}/>
                <div className="px-6 pt-6 pb-4 flex flex-col items-center text-center">
                    {/*Animated checkmark circle*/}
                    <motion.div
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{type: 'spring', damping: 15, stiffness: 300, delay: 0.1}}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isEdit ? 'bg-indigo-100':'bg-green-100'}`}>
                        {isEdit
                        ? <UserCog size={28} className="text-indigo-400"/>
                        : <UserCheck size={28} className="text-green-400"/>
                        }
                    </motion.div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">
                        {isEdit ? 'Contact Updated':'Contact Created!'}
                    </h3>
                    {contactName && (
                        <p className="text-sm text-gray-500 mt-1 ">
                            <span className="font-semibold text-gray-800 ">{contactName}</span>
                            <span className="ml-1">
                            {isEdit
                            ? 'Has been updated successfully.':'has been added to your contacts.'
                            }
                            </span>
                        </p>
                    )}
                </div>
                <div className="px-6 pb-6">
                    <button 
                    onClick={onClose}
                    className={`w-full py-3 rounded-xl text-white font-bold text-sm transition-all shadow-lg 
                        ${isEdit
                        ? 'bg-indigo-400 hover:bg-indigo-900 shadow-indigo-100'
                        : 'bg-green-300 hover:bg-green-600 shadow-green-100' 
                        }`}>
                            Done
                        </button>
                </div>
            </motion.div>
        </motion.div>
    );
};