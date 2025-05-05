import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import { Outlet } from 'react-router-dom';
import config from './config.jsx';

function withAuthenGuard(Element, config) {
    return function(props) {
        const { isAuthenticated } = useAuthen();
        const navigate = useNavigate();
        const location = useLocation();
        
        useEffect(() => {
            const redirect = () => {
                if (!config[location.pathname]) {
                    return;
                };

                const redirectDestination = config[location.pathname](isAuthenticated);
            
                if (redirectDestination) {
                    navigate(redirectDestination);
                };
    
                return;
            };
    
            redirect();
            return;
    
        }, [isAuthenticated, location.pathname]);
        
        return <Element {...props}/>;
    };
};

const GuardedOutlet = withAuthenGuard(Outlet, config);
export default GuardedOutlet;