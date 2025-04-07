import { createContext, useState,  useContext, useEffect } from "react";

const NotificationContext = createContext();

function NotificationProvider(props) {
    const [notifications, setNotifications] = useState([]);

    function removeNotification(id) {
        setNotifications(notifications.filter((notification) => notification.id !== id));
    };

    function handleSetNotifications(notifications) {
        if (!notifications || typeof notifications !== 'object') {
            return;
        };

        if (Array.isArray(notifications)) {
            return setNotifications(notifications);
        } else {
            return setNotifications([notifications]);
        };
    }

    function createNotification(message, type='error', id=Date.now()) {
        return {
            message,
            id,
            isClosing: false,
            type
        };
    };

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications, handleSetNotifications, removeNotification, createNotification }}>
            {props.children}
        </NotificationContext.Provider>
    )
};

export function useNotifications() {
    return useContext(NotificationContext);
};

export default NotificationProvider;