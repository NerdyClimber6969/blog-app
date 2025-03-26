import { useState, createContext, useContext, useRef, useEffect } from 'react';

const FlyOutContext = createContext();

function FlyOut(props) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const toggleRef = useRef();

    return (
        <div className='fly-out'>
            <FlyOutContext.Provider value={{open, setOpen, menuRef, toggleRef}}>
                {props.children}
            </FlyOutContext.Provider>
        </div>
    );
};

function Toggle({ iconRender }) {
    const { open, setOpen, toggleRef } = useContext(FlyOutContext);

    return (
        <button 
            className='fly-out-toggle'
            onClick={() => setOpen(!open)}
            ref={toggleRef}
        >
            {iconRender()}
        </button>
    );
};

function Menu(props) {
    const { open, setOpen, menuRef, toggleRef } = useContext(FlyOutContext);

    const style = {
        position: 'absolute',
        display: 'block',
        transform: `translateX(-80%)`
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            setOpen((currentOpenState) => {
                if (currentOpenState &&
                    menuRef.current && !menuRef.current.contains(e.target) &&
                    toggleRef.current && !toggleRef.current.contains(e.target)
                ) {
                    return false;
                }

                return currentOpenState;
            });
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        open && (
            <ul 
                className='fly-out-menu'
                style={style}
                ref={menuRef}
            >
                {props.children}
            </ul>
        )
    );
};

function Item({ className='', children, onClick }) {
    const { setOpen } = useContext(FlyOutContext);

    const handleItemClick = (e) => {
        onClick(e);
        setOpen(false);
    };

    return (
        <li 
            className={`fly-out-item ${className}`}
            onClick={(e) => handleItemClick(e)}
        >
            {children}
        </li>
    );
};

FlyOut.Toggle = Toggle;
FlyOut.Menu = Menu;
FlyOut.Item = Item;

export default FlyOut;