import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthen } from '../context/AuthenProvider.jsx';
import { useNotifications } from '../context/NotificationProvider.jsx';

function RequireAuth({ children }) {
    const { user } = useAuthen();
    const { setNotifications } = useNotifications();
    const location = useLocation();
    console.log(user)
    useEffect(() => {
        if (!user) {
            setNotifications([{ 
                message: 'Please login before continue', 
                id: Date.now(), // Use unique ID
                isClosing: false, 
                type: 'error'
            }]);
        }
    }, []);

    if (!user) {
        // Redirect to login but save the current location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    };

    return children;
};

export default RequireAuth;