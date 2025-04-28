import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import styles from './SignUpPage.module.css';

function SignUpPage(props) {
    return (
        <main className={styles.layout}>
            <section className={styles.heroSection}>
                <h1 className='font-hero mb5'>Sign Up</h1>
                <div>
                    <span className='font-md'>to start using DevBlog</span>
                </div>
            </section>
            <section className={styles.formSection}>
                <SignUpForm/> 
            </section>  
        </main>
    );
};

export default SignUpPage;