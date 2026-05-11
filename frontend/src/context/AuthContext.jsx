import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API = 'https://contact-manager-backend-x2tn.onrender.com';

export const AuthProvider = ({ children }) => {
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken]     = useState(() => localStorage.getItem('token'));

    // Set axios Authorization header whenever token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }, [token]);

    // Load user from localStorage instantly — no API call blocking navigation
    // Only hit the API if we have a token but no cached user
    useEffect(() => {
        const loadUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            // Try cached user first for instant load
            const cached = localStorage.getItem('user');
            if (cached) {
                setUser(JSON.parse(cached));
                setLoading(false);
                return; // ← skip API call, page loads instantly
            }
            // No cache — fetch from API once
            try {
                const res = await axios.get(`${API}/api/users/current`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data)); // cache it
            } catch {
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post(`${API}/api/users/login`, { email, password });
        const { accessToken } = res.data;
        setToken(accessToken);
        // Fetch and cache user after login
        const userRes = await axios.get(`${API}/api/users/current`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        setUser(userRes.data);
        localStorage.setItem('user', JSON.stringify(userRes.data));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('user'); // clear cache on logout
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};