import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('Use Auth must be used within an Auth Provider');
    }
    return context;
};

export default useAuth;   