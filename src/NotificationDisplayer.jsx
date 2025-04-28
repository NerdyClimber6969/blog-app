import { useEffect } from 'react';
import { useNotifications } from './context/NotificationProvider.jsx';
import Notification from './components/Notification/Notification.jsx';

function NotificationDisplayer() {
    const { notifications, setNotifications, removeNotification } = useNotifications();

    useEffect(() => {
        if (!notifications || notifications.length === 0) return;

        const timer = setTimeout(() => {      
            setNotifications(prev => prev.map(notification => ({ ...notification, isClosing: true })));

            const timer2 = setTimeout(() => {
                setNotifications([]);
                clearTimeout(timer2);
            }, 250);

        }, 5 * 1000);

        return () => clearTimeout(timer);
    }, [notifications]);

    function handleRemove(id) {
        setNotifications(prev => 
            prev.map((notification) => 
                notification.id === id ?
                ({ ...notification, isClosing: true }) :
                (notification)
            )
        );
        
        const timer = setTimeout(() => {
            removeNotification(id);
            clearTimeout(timer);
        }, 250); // Animation duration
    };

    return (
        <ul className='fixed-tr'>
            {notifications.map((notification) => (
                <Notification 
                    key={notification.id}
                    id={notification.id}
                    message={notification.message}
                    onRemove={() => handleRemove(notification.id)}
                    isClosing={notification.isClosing}
                    type={notification.type}
                />
            ))}            
        </ul>
    );
};

export default NotificationDisplayer;