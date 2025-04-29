import { Link } from 'react-router-dom';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import ThemeFlyout from '../Flyout/ThemeFlyout.jsx';
import styles from './Header.module.css';

function Header(props) {
    const { user, handleLogout } = useAuthen();
    
    return (
        <header className={styles.header}>
            <div>
                <h1 className='font-lg'><Link to='/'>DevBlog</Link></h1>
            </div>
            <nav className={styles.navBar}>
                <ul>
                    <li className='font-sm'><Link to='/posts'>Posts</Link></li>
                    {user ? (
                        <>
                            <li className='font-sm'><Link onClick = {() => handleLogout()}>Logout</Link></li>
                        </>
                    ) : (    
                        <>         
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