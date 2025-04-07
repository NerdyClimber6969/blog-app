import { useState, useEffect, createContext, useContext } from 'react';
import { isExpired, decodeToken } from '../utils.jsx';
import { useNavigate } from 'react-router-dom';
import { useNotifications} from './NotificationProvider.jsx';

const AuthenContext = createContext();

function AuthenProvider({ children }) {
    const [user, setUser] = useState(null);
    const { createNotification, handleSetNotifications } = useNotifications();
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

    function handleLogout(path='/', message='You have been safely logged out.') {
        localStorage.removeItem('accessToken');
        setUser(null);
        handleSetNotifications(createNotification(message, 'success'));   
        return navigate(path);
    };

    return (
        <AuthenContext.Provider value={{
            user, 
            setUser, 
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