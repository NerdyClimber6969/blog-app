import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthen } from '../context/AuthenProvider.jsx';
import { useNotifications } from '../context/NotificationProvider.jsx';

function RequireAuth({ children }) {
    const { user } = useAuthen();
    const { handleSetNotifications, createNotification } = useNotifications();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            handleSetNotifications(createNotification('Please login before continue', 'error'));
        };
    }, []);

    if (!user) {
        // Redirect to login but save the current location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    };

    return children;
};

export default RequireAuth;