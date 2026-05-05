import {useState, useEffect} from 'react';

const useLocalStorage = (key, initialValue) => {
    //GET from local storage then parse stored json or return initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try{
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue
        } catch(error){
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try{
            //allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch(error){
            console.log(error);
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;