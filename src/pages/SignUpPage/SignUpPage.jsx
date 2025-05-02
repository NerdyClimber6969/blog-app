import { Navigate, useLocation } from 'react-router-dom';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import styles from './SignUpPage.module.css';

function SignUpPage(props) {
    const { isAuthenticated } = useAuthen();
    const location = useLocation();

    return (
        isAuthenticated ? (
            <Navigate to='/' state={{ from: location }} replace />
        ) : (
            <main>
                <div className='mainLayout'>
                    <div className={styles.layout}>
                        <section className={styles.heroSection}>
                            <h1 className='font-hero mb5'>Sign Up</h1>
                            <div>
                                <span className='font-md'>to start using DevBlog</span>
                            </div>
                        </section>
                        <section className={styles.formSection}>
                            <SignUpForm/> 
                        </section>  
                    </div>
                </div>
            </main>
        )
    );
};

export default SignUpPage;