import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import styles from './LoginPage.module.css';

function LoginPage(props) {
    return (
        <main className={styles.layout}>            
            <section className={styles.heroSection}>
                <h1 className='font-hero mb5'>Login</h1>
                <div>
                    <span className='font-md'>to continue to DevBlog</span>
                </div>
            </section>
            <section className={styles.formSection}>
                <LoginForm/>
            </section>              
        </main>
    );
};

export default LoginPage;