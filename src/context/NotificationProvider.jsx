import { createContext, useState,  useContext, useEffect } from "react";

const NotificationContext = createContext();

function NotificationProvider(props) {
    const [notifications, setNotifications] = useState([]);

    function removeNotification(id) {
        setNotifications(notifications.filter((notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications, removeNotification }}>
            {props.children}
        </NotificationContext.Provider>
    )
};

export function useNotifications() {
    return useContext(NotificationContext);
};

export default NotificationProvider;