import { useState, useEffect, createContext, useContext } from 'react';
import { isExpired, decodeToken } from '../utils.jsx';
import { useNavigate } from 'react-router-dom';
import { useNotifications} from './NotificationProvider.jsx';

const AuthenContext = createContext();

function AuthenProvider({ children }) {
    const [user, setUser] = useState(null);
    const { setNotifications } = useNotifications();
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                if (user !== null) {
                    setUser(null);  
                };
                return;
            };
    
            const decodedToken = decodeToken(token);
            if (isExpired(decodedToken.payload.exp)) {
                handleLogout('/', 'Your session has expired. Please log in again.');
            } else if (!user) {
                setUser(decodedToken.payload.username);
            };
        };

        validateToken();
        const intervalTimerId = setInterval(validateToken, 1000 * 60);
        return () => clearInterval(intervalTimerId);
    }, []);

    async function signUp(firstName, lastName, username, password, confirm) {
        const response = await fetch('http://localhost:3000/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, username, password, confirm })
        });
    
        const json = await response.json();
        return json;
    };

    async function login(username, password) {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
    
        const json = await response.json();
        return json;
    };

    function handleLogout(path='/', message='You have been safely logged out.') {
        localStorage.removeItem('accessToken');
        setUser(null);
        setNotifications([{ message: message, id: 1, isClosing: false, type: 'success'}]);   
        return navigate(path);
    };

    return (
        <AuthenContext.Provider value={{
            user, 
            setUser, 
            signUp,
            login,
            handleLogout,
        }}>
            { children }
        </AuthenContext.Provider>
    );  
};

function useAuthen() {
    const authenContext = useContext(AuthenContext);

    // Return combined context with navigation functions
    return {
        ...authenContext
    };
};

export { AuthenProvider as default, useAuthen };