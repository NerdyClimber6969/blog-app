import { Navigate, useLocation } from 'react-router-dom';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import styles from './LoginPage.module.css';

function LoginPage(props) {
    const { isAuthenticated } = useAuthen();
    const location = useLocation();

    return (
        <main>
            <div className='mainLayout'>
                <div className={styles.layout}>
                    <section className={styles.heroSection}>
                        <h1 className='font-hero mb5'>Login</h1>
                        <div>
                            <span className='font-md'>to continue to DevBlog</span>
                        </div>
                    </section>
                    <section className={styles.formSection}>
                        <LoginForm/>
                    </section>                       
                </div>
            </div>            
        </main>
    );
};

export default LoginPage;