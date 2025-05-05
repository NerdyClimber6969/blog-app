import AuthenProvider  from './AuthenProvider.jsx';
import NotificationProvider  from './NotificationProvider.jsx';

function AppProvider({ children }) {
    return (
        <NotificationProvider>
          <AuthenProvider>
              {children}
          </AuthenProvider>  
        </NotificationProvider>
      );
};

export default AppProvider;