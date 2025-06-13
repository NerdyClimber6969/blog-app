import { Link } from 'react-router-dom';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import ThemeFlyout from '../Flyout/ThemeFlyout.jsx';
import styles from './Header.module.css';

function Header(props) {
    const { user, handleLogout } = useAuthen();
    
    return (
        <header className={styles.header}>
            <div>
                <span className='font-md bold'><Link to='/'>DevBlog</Link></span>
            </div>
            <nav className={styles.navBar}>
                <ul>
                    {user ? (
                        <>  
                            <li className='font-sm'><a href='http://localhost:3001/'>Studio</a></li>
                            <li className='font-sm'><Link to='/posts' state={{ reset: true }}>Posts</Link></li>
                            <li className='font-sm'><Link onClick = {() => handleLogout()}>Logout</Link></li>                           
                        </>
                    ) : (    
                        <>   
                            <li className='font-sm'><Link to='/posts' state={{ reset: true }}>Posts</Link></li>      
                            <li className='font-sm'><Link to='/login'>Login</Link></li>
                            <li className='font-sm'><Link to='/sign-up'>Sign Up</Link></li>
                        </>   
                    )}
                    <ThemeFlyout/>
                </ul>
            </nav>
        </header>
    );
};

export default Header;