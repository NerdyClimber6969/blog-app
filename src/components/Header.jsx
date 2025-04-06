import { Link } from 'react-router-dom';
import { useAuthen } from '../context/AuthenProvider.jsx';
import ThemeToggle from './fly-out/ThemeToggle.jsx';

function Header(props) {
    const { user, handleLogout } = useAuthen();
    
    return (
        <header>
            <div>
                <h1 className='font-lg'>DevBlog</h1>
            </div>
            <nav className="nav-bar">
                <ul>
                    <li className='font-sm'><Link to='/'>Home</Link></li>
                    <li className='font-sm'><Link to='/posts'>Posts</Link></li>
                    {user ? (
                        <>
                            <li className='font-sm'><Link to='/profiles'>Profile</Link></li>
                            <li className='font-sm'><Link onClick = {() => handleLogout()}>Logout</Link></li>
                        </>
                    ) : (    
                        <>         
                            <li className='font-sm'><Link to='/login'>Login</Link></li>
                            <li className='font-sm'><Link to='/sign-up'>Sign Up</Link></li>
                        </>   
                    )}
                    <ThemeToggle/>
                </ul>
            </nav>
        </header>
    );
};

export default Header;