import LoginForm from '../components/LoginForm.jsx'

function LoginPage(props) {
    return (
        <div className='login-page authen-page page-container'>
            <div className='container authen-content flex-row m-lr-center mt7'>
                <section className='hero-section'>
                    <h1 className='font-hero mb5'>Login</h1>
                    <div>
                        <span className='font-md'>to continue to DevBlog</span>
                    </div>
                </section>
                <section className='form-section'>
                    <LoginForm/>
                </section>  
            </div>
        </div>
    );
};

export default LoginPage;