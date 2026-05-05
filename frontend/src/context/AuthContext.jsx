import {createContext,useState, useEffect} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // set axios default header whenever token changes
    useEffect(() => {
        if(token){
            axios.defaults.headers.common['Authorization'] = Bearer `${token}`;
            localStorage.setItem('token', token);
        } else{
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }, [token]);

    // load user on start
    useEffect(() => {
        const loadUser = async() => {
            if(!token){
                setLoading(false);
                return;
            }
            try{
                // assuming we have api/auth/me an endpoint to get user info based on token 
                const config = {headers : { Authorization:`Bearer  ${token}`}}
                const res = await axios.get('http://localhost:5001/api/users/current', config);
                setUser(res.data);
            } catch (error) {
                setToken(null);
                setUser(null);
            }
            setLoading(false);   
        }

        loadUser();
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5001/api/users/login', {email, password});
        const {accessToken} = res.data;
        setToken(accessToken);
        const userRes = await axios.get('http://localhost:5001/api/users/current', {
            headers: {Authorization: `Bearer ${accessToken}` }
        });
        setUser(userRes.data);
    }
    
    const logout = () => {
        setToken(null);
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{user, token, loading, login, logout, setUser}}>
            {children}
        </AuthContext.Provider>
    )
};