import {useState, useRef, useEffect} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Contact, UserCircle, Mail, User, ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, logout }) => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const dropdownRef = useRef(null);

    //close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

const handleLogout = () => {
    setShowProfile(false);
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
        
    <div className="flex items-center gap-6" ref={dropdownRef}>
        {user && (  
            <div className="relative">
                <motion.button
                whileHover={{scale: 1.03}}
                whileTap={{scale: 0.97}}
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-950 -px-3 py-2 rounded-xl transition-all">
                    <div className="w-7 h-7 bg-indigo-950 text-white rounded-full flex items-center justify font-bold text-sm">
                        {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-sm font-semibold">{user.username}</span>
                    <ChevronDown size={14} className={`transition-transition ${showProfile ? 'rotate-180' : ''}`}/>
                </motion.button>

                <AnimatePresence>
                    {showProfile && (
                        <motion.div
                        initial={{opacity: 0, y: -8, scale: 0.95}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: -8, scale: 0.95}}
                        transition={{duration: 0.15}}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">

                            <div className="bg-indigo-950 px-5 py-4 flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                {user.username?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{user.username}</p>
                                    <p className="text-indigo-200 text-xs truncate max-w-40">{user.email}</p>
                                </div>
                            </div>
                            <div className="px-5 py-5 space-y-3">
                                <div className="flex items-center gap-3 text-gray-600 text-sm">
                                    <User size={15} className="text-indigo-300 shrink-0"/>
                                    <div>
                                        <p className="text-[10px] text-indigo-300 uppercase font-bold">Email</p>
                                        <p className="font-medium text-gray-800 truncate max-w-42.5">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 px-5 py-3">
                                <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                                    <LogOut size={15}/>
                                    Sign Out
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )}
        </div>
    </nav>
    );
};

export default Navbar;
