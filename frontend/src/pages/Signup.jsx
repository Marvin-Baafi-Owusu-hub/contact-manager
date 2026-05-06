import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('https://contact-manager-backend-x2tn.onrender.com/api/users/register', formData);
        alert("Account created!");
        navigate('/signin');
    } catch (err) {
        // This will alert the ACTUAL reason the backend sent a 400
        const serverMessage = err.response?.data?.message || "Registration failed";
        alert(serverMessage); 
        console.log("Server Error Data:", err.response?.data);
    }
};
    return (
    <div className="max-w-md mx-auto mt-20">
        <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
    
        <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus size={32} />
        </div>
            <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
            <p className="text-gray-500 mt-2">Join us to stay organized</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                name="username"
                type="text" placeholder="Full Name" required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-green-500 outline-none"
                onChange={(e) => setFormData({...formData, username: e.target.value})} />
            
        </div>
        <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="email" placeholder="Email Address" required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-green-500 outline-none"
                onChange={(e) => setFormData({...formData, email: e.target.value})} />
            
        </div>
        <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="password" placeholder="Password" required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-green-500 outline-none"
                onChange={(e) => setFormData({...formData, password: e.target.value})} />
            
        </div>
            <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-100">
        
            Get Started
            </motion.button>
        </form>
        
        <p className="text-center mt-8 text-gray-600">
            Already have an account? <Link to="/signin" className="text-green-600 font-bold hover:underline">Sign In</Link>
        </p>
        </motion.div>
    </div>
    );
};

export default Signup;