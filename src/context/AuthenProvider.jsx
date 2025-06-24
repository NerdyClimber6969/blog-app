import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from './NotificationProvider.jsx';
import API from '../services/apiService.js';

const AuthenContext = createContext();

function AuthenProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [logoutTimer, setLogoutTimer] = useState(null);
    const { handleApiCall } = useNotifications();
    const navigate = useNavigate();

    const verifyToken = async () => {
        setLoading(true);

        await handleApiCall(() => API.verify(), {
            notifySuccess: false,
            notifyError: false,
            onSuccess: (response) => {
                setUser(response.username);
                setIsAuthenticated(true);
                scheduleLogout(response.exp);
            },
            onError: (error) => {
                if (error.details?.failureReason === 'token expired' || error.details?.failureReason === 'invalid token') {
                    handleLogout();
                } else if (error.details?.failureReason === 'token missing') {
                    handleLogout(null, null);
                };                
            }
        });

        setLoading(false);
    };

    async function handleLogout(path='/', message='You have been safely logged out.', ) {
        await handleApiCall(() => API.logout(), {
            successMessage: message,
            onSuccess: () => {
                setUser(null);               
                setIsAuthenticated(false);

                clearTimeout(logoutTimer)
                setLogoutTimer(null);

                if (!path || path === '') return;  
                navigate(path);     
                                          
                return;
            }
        });
    };

    async function handleLogin(username, password) {        
        await handleApiCall(() => API.login(username, password), {
            successMessage: 'Login successfully',
            onSuccess: (response) => {
                setUser(response.username);
                setIsAuthenticated(true);
                scheduleLogout(response.exp);
                navigate('/');
                return;
            }
        });
    };

    function scheduleLogout(exp) {
        const timeRemaining = exp - Date.now();

        if (timeRemaining > 0 && !logoutTimer) {
            const timer = setTimeout(() => { handleLogout() }, timeRemaining);
            setLogoutTimer(timer);
        };
    };

    // Initial check on page load
    useEffect(() => {verifyToken()}, []);

    return (
        <AuthenContext.Provider value={{
            user, 
            setUser, 
            handleLogout,
            loading,
            isAuthenticated,
            setIsAuthenticated,
            scheduleLogout,
            handleLogin
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