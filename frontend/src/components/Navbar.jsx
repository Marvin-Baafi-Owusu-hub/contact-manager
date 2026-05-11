import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Contact, Mail, User, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getInitials = (name = '') => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) { 
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

const Navbar = ({ user, logout }) => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setShowProfile(false);
        logout();
    };

    const initials = getInitials(user?.username || user?.name || '');
    const displayName = user?.username || user?.name || '';
    const displayEmail = user?.email || '';

    return (
        <nav className="flex justify-between items-center px-4 py-3 sm:px-6 bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
            <motion.div
                whileHover={{ x: 3 }}
                className="flex items-center gap-2 font-bold text-lg sm:text-xl text-indigo-950 cursor-pointer"
                onClick={() => navigate("/")}>
                <Contact size={24} />
                <span>ContactHub</span>
            </motion.div>

            {/* Right side */}
            {user && (
                <div className="relative" ref={dropdownRef}>
                    {/* Avatar trigger button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-2 cursor-pointer select-none">
                        {/* Initials circle — matches screenshot style */}
                        <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-sm">
                            {initials}
                        </div>
                        {showProfile
                            ? <ChevronUp size={16} className="text-gray-500" />
                            : <ChevronDown size={16} className="text-gray-500" />
                        }
                    </motion.button>

                    {/* Dropdown */}
                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">

                                {/* Header — dark background with avatar + name + email */}
                                <div className="bg-indigo-950 px-5 py-4 flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-xl tracking-wide shrink-0">
                                        {initials}
                                    </div>
                                    <div className="min-w-0"><p className="text-white font-bold text-base leading-tight truncate">
                                            {displayName}
                                        </p>
                                        <p className="text-indigo-300 text-xs mt-0.5 truncate">
                                            {displayEmail}
                                        </p>
                                    </div>
                                </div>

                                {/* Credentials detail rows */}
                                <div className="px-5 py-4 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <User size={15} className="text-gray-400 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Username</p>
                                            <p className="text-sm font-semibold text-gray-800">{displayName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail size={15} className="text-gray-400 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Email</p>
                                            <p className="text-sm font-semibold text-gray-800 truncate max-w-50">{displayEmail}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sign Out */}
                                <div className="px-5 pb-4">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 py-2.5 rounded-xl text-sm font-semibold transition-all">
                                        <LogOut size={15} />
                                        Sign Out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
