import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from './NotificationProvider.jsx';
import API from '../services/apiService.js';

const AuthenContext = createContext();

function AuthenProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { handleApiCall } = useNotifications();
    const navigate = useNavigate();

    const verifyToken = async () => {
        await handleApiCall(() => API.verify(), {
            notifySuccess: false,
            notifyError: false,
            onSuccess: (response) => {
                setUser(response.username);
                setIsAuthenticated(true);
                setLoading(false);
            },
            onError: (error) => {
                if (error.details?.failureReason === 'token expired' || error.details?.failureReason === 'invalid token') {
                    handleLogout();
                } else if (error.details?.failureReason === 'token missing') {
                    setUser(null);
                    setIsAuthenticated(false);
                };

                setLoading(false);
                return;
            }
        });

        return;
    };

    async function handleLogout(path='/', message='You have been safely logged out.') {
        await handleApiCall(async () => API.logout(), {
            successMessage: message,
            onSuccess: () => {
                setUser(null);
                setIsAuthenticated(false);
                navigate(path);
                return;
            }
        });
    };

    // Initial check on page load
    useEffect(() => {
        setTimeout(verifyToken, 4000);
    }, []);


    useEffect(() => {
        let timerId;

        if (isAuthenticated) {
            //Run every 1 minutes
            timerId = setInterval(verifyToken, 1000 * 60 * 1); 
        };
        
        return () => {
            if (timerId) {
                clearInterval(timerId);
            };
        };
    }, [isAuthenticated]);

    return (
        <AuthenContext.Provider value={{
            user, 
            setUser, 
            handleLogout,
            loading,
            isAuthenticated,
            setIsAuthenticated
        }}> 
            {children}
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