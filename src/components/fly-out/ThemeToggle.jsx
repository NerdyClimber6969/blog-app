import { useEffect, useState } from 'react';
import FlyOut from './FlyOut.jsx';
import DarkModeIcon from '../../icons/DarkModeIcon.jsx';
import LightModeIcon from '../../icons/LightModeIcon.jsx';

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
            <FlyOut.Toggle 
                iconRender={() => 
                    theme === 'dark' ? (
                        <LightModeIcon className='svg-icon'/>
                    ) : (
                        <DarkModeIcon className='svg-icon'/>
                    ) 
                }
            />
            <FlyOut.Menu>
                <FlyOut.Item 
                    className='flex-row'
                    onClick={() => setTheme('light')}
                >                    
                    <LightModeIcon className='svg-icon'/>                    
                    <div>
                        <span>Light</span>
                    </div>
                </FlyOut.Item>
                <FlyOut.Item 
                    className='flex-row'
                    onClick={() => setTheme('dark')}
                >
                    <DarkModeIcon className='svg-icon'/>
                    <div>
                        <span>Dark Mode</span>
                    </div>
                </FlyOut.Item>
            </FlyOut.Menu>
        </FlyOut>
    );
};

export default ThemeToggle;