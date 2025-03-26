import { useEffect, useState } from 'react';
import FlyOut from './FlyOut';
import DarkModeIcon from '../icons/DarkModeIcon.jsx';
import LightModeIcon from '../icons/LightModeIcon.jsx';

function ThemeToggle(props) {
    const getDefaultTheme = () => {
        const isDark = window.matchMedia('prefers-color-scheme: dark').matches
        const theme = isDark ? 'dark' : 'light';
        return theme;
    };

    const [theme, setTheme] = useState(getDefaultTheme());

    useEffect(() => {
        const root = document.documentElement;
        root.className = theme;
        return;
    }, [theme]);

    return (
        <FlyOut>
            <FlyOut.Toggle iconRender={() => (
               <div className='svg-container'>
                    {theme === 'dark' ? (
                        <LightModeIcon className='fly-out-icon'/>
                    ) : (
                        <DarkModeIcon className='fly-out-icon'/>
                    )}  
               </div> 
            )}/>
            <FlyOut.Menu>
                <FlyOut.Item 
                    className='flex-row'
                    onClick={() => setTheme('light')}
                >
                    <div className='svg-container'>
                        <LightModeIcon className='fly-out-icon'/>
                    </div> 
                    <div><span>Light</span></div>
                </FlyOut.Item>
                <FlyOut.Item 
                    className='flex-row'
                    onClick={() => setTheme('dark')}
                >
                    <div className='svg-container'>
                        <DarkModeIcon className='fly-out-icon'/>
                    </div> 
                    <div><span>Dark Mode</span></div>
                </FlyOut.Item>
            </FlyOut.Menu>
        </FlyOut>
    );
};

export default ThemeToggle;