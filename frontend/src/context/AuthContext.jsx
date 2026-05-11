import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API = 'https://contact-manager-backend-x2tn.onrender.com';

export const AuthProvider = ({ children }) => {
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken]     = useState(() => localStorage.getItem('token'));

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

    useEffect(() => {
        const loadUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            // always validate cached user has username
            // If cache only has email (stale), bust it and re-fetch
            const cached = localStorage.getItem('user');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.username) {
                    setUser(parsed);
                    setLoading(false);
                    return;
                }
                localStorage.removeItem('user');
            }
            // Fetch fresh from API
            try {
                const res = await axios.get(`${API}/api/users/current`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
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
        // Always fetch fresh user after login — never rely on stale cache
        const userRes = await axios.get(`${API}/api/users/current`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        setUser(userRes.data);
        localStorage.setItem('user', JSON.stringify(userRes.data));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};