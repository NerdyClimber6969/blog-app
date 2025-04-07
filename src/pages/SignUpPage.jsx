import SignUpForm from '../components/SignUpForm.jsx';
import '../style/pages/_authen.css';

function SignUpPage(props) {
    return (
        <div className='sign-up-page authen-page page-container'>
            <div className='container authen-content flex-row m-lr-center mt5'>
                <section className='hero-section'>
                    <h1 className='font-hero mb5'>Sign Up</h1>
                    <div>
                        <span className='font-md'>to start using DevBlog</span>
                    </div>
                </section>
                <section className='form-section'>
                    <SignUpForm/> 
                </section>  
            </div>
        </div>
    );
};

export default SignUpPage;