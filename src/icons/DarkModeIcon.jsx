function DarkModeIcon({ className }) {
    return (
        <svg 
            className={className}
            width='800px' 
            height='800px' 
            viewBox='0 0 48 48' 
            id='dark-mode-icon' 
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='black'
        >
            <path d='m32.8,29.3c-8.9-.8-16.2-7.8-17.5-16.6-.3-1.8-.3-3.7,0-5.4.2-1.4-1.4-2.3-2.5-1.6C6.3,9.7,2.1,16.9,2.5,25c.5,10.7,9,19.5,19.7,20.4,10.6.9,19.8-6,22.5-15.6.4-1.4-1-2.6-2.3-2-2.9,1.3-6.1,1.8-9.6,1.5Z'/>
        </svg>
    );
};

export default DarkModeIcon;