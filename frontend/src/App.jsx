import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ContactProvider } from './context/ContactContext';
// Hooks
import useAuth from './hooks/useAuth';
// Components
import Navbar from './components/Navbar';
// Pages
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeOut" }}>
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-950 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes: Redirect to Dashboard if already logged in */}
        <Route 
          path="/signin" 
          element={!user ? <PageWrapper><Signin /></PageWrapper> : <Navigate to="/" />} />
        <Route 
          path="/signup" 
          element={!user ? <PageWrapper><Signup /></PageWrapper> : <Navigate to="/" />} />

        {/* Protected Route: Redirect to Signin if not logged in */}
        <Route 
          path="/" 
          element={user ? <PageWrapper><Dashboard /></PageWrapper> : <Navigate to="/signin" />} />

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

/**
 * The Main App component wrapped in all necessary Providers.
 */
const App = () => {
  return (
    <AuthProvider>
      <ContactProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      
            <AuthNavBarWrapper />
            <main className="container mx-auto px-4 py-8">
              <AnimatedRoutes />
            </main>
          </div>
        </Router>
      </ContactProvider>
    </AuthProvider>
  );
};

const AuthNavBarWrapper = () => {
  const { user, logout } = useAuth();
  return user ? <Navbar user={user} logout={logout} /> : null;
};

export default App;