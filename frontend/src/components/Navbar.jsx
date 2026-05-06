import React from "react";
import { motion } from "framer-motion";
import { LogOut, Contact, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, logout }) => {
    const navigate = useNavigate();

const handleLogout = () => {
        logout();
    };

return (
    <nav className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <motion.div
        whileHover={{ x: 5 }}
        className="flex items-center gap-2 font-bold text-xl text-indigo-950 cursor-pointer"
        onClick={() => navigate("/")}>
        <Contact size={28} />
        <span>ContactHub</span>
        </motion.div>
        
    <div className="flex items-center gap-6">
        {user && (
            <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-1 rounded-lg">
            <UserCircle size={20} className="text-indigo-500" />
            <span className="hidden md:inline font-medium">{user.username}</span>
            </div>
        )}

        <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#fee2e2" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm">
            <LogOut size={16} />
            <span>Sign Out</span>
        </motion.button>
        </div>
    </nav>
    );
};

export default Navbar;
