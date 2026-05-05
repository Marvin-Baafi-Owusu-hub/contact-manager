import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock } from 'lucide-react';
import useAuth from '../hooks/useAuth'; 

const Signin = () => {
    const { setUser } = useAuth(); 
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/users/login', formData);
            
            const token = res.data.accessToken || res.data.token;

            if (token) {
                localStorage.setItem('token', token);
                const userData = res.data.user || { email: formData.email };
                localStorage.setItem('user', JSON.stringify(userData));
                
                setUser(userData); 
                navigate('/');
            }
        } catch(err) {
            console.error("Full Error Object:", err);
            const message = err.response?.data?.message || "Invalid Credentials or a Server Down";
            alert(message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <LogIn size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to manage your contacts</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            required
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-300 outline-none"
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-300 outline-none"
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        />
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-indigo-950 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-100"
                    >
                        Sign In
                    </motion.button>
                </form>
                
                <p className="text-center mt-8 text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-indigo-900 font-bold hover:underline">Create one</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signin;