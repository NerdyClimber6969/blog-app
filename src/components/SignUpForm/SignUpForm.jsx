import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationProvider.jsx';
import '../Input/Input.css';
import API from '../../services/apiService.js';

function SignUpForm(props) {
    const defaultFormData = {        
        firstName:'', 
        lastName:'', 
        username: '',
        password: '',
        confirm: ''
    };

    const navigate = useNavigate()
    const { handleSetNotifications, createNotification } = useNotifications();
    const [formData, setFormData] = useState(defaultFormData);
    const formRef = useRef(null);
    const submitBtnRef = useRef(null);

    useEffect(() => {
        function validateForm() {
            const inputs = Array.from(formRef.current.querySelectorAll('input'));
            let password, confirm;
            let valid = true;

            for (const input of inputs) {
                if (input.id === 'password') password = input;
                if (input.id === 'confirm') {
                    confirm = input;
                    continue;
                };

                if (!input.validity.valid) {
                    input.classList.add('invalid');
                    valid = false;
                } else {
                    input.classList.remove('invalid');
                };
            };
    
            if (password.value !== confirm.value || confirm.value === '') {
                confirm.classList.add('invalid');
                valid = false;
            } else {
                confirm.classList.remove('invalid');
            };

            return valid;
        };

        const valid = validateForm();
        if (valid) { 
            submitBtnRef.current.disabled = false;
        } else {
            submitBtnRef.current.disabled = true;
        };
        
        return;
    }, [formData]);

    function handleFormUpdate(e) {
        const key = e.target.id;
        const value = e.target.value;

        return setFormData({...formData, [key]: value});
    };

    async function handleSignUp(e, formData) {
        e.preventDefault();

        const response = await API.signUp(formData);
        if (response.success) {
            handleSetNotifications(createNotification('Register successfully, you can now login.', 'success'));
            return navigate('/login');
        };

        return handleSetNotifications(response.errors.map((error) => 
            createNotification(error.msg || error.message, 'error')
        ));
    };

    return (
        <>
            <form className='sign-up-form' ref={formRef}>
                <div className='container input-container' data-help='i.e. Ben'> 
                    <div className='font-sm'>
                        <input 
                            className='font-sm' type='text' id='firstName' name='firstName' pattern='[a-zA-Z]+' placeholder='First Name' required
                            value={formData.firstName} onChange={(e) => handleFormUpdate(e)}
                        />
                        <label className='font-sm' htmlFor='firstName'>First Name</label>
                    </div>                  
                </div>     
                <div className='container input-container' data-help='i.e. Wong'>
                    <div className='font-sm'>
                        <input 
                            className='font-sm' type='text' id='lastName' name='lastName' pattern='[a-zA-Z]+' placeholder='Last Name' required
                            value={formData.lastName} onChange={(e) => handleFormUpdate(e)}
                        />
                        <label className='font-sm' htmlFor='lastName' >Last Name</label>
                    </div>   
                </div>                       
                <div className='container input-container' data-help='Use 8 to 15 alphabet or number for your username'>
                    <div className='font-sm'>
                        <input 
                            className='font-sm' type='text' id='username' name='username' placeholder='Username' required
                            pattern='^[a-zA-Z0-9]{8,15}$' minLength={8} maxLength={15} 
                            value={formData.username} onChange={(e) => handleFormUpdate(e)}
                        />
                        <label className='font-sm' htmlFor='username'>Username</label>
                    </div>
                </div>
                <div className='container input-container' data-help='Use 10 to 20 alphabet or number for your password'>
                    <div className='font-sm'>
                        <input 
                            className='font-sm' type='password' id='password' name='password' placeholder='Password'
                            pattern='(?=.*\d)(?=.*[a-zA-Z])^[a-zA-Z0-9]{10,20}$' minLength={10} maxLength={20} required
                            value={formData.password} onChange={(e) => handleFormUpdate(e)}
                        />
                        <label className='font-sm' htmlFor='password'>Password</label>
                    </div>
                </div>
                <div className='container input-container' data-help='Those passwords didn’t match. Try again.'>
                    <div className='font-sm'>
                        <input 
                            className='font-sm' type='password' id='confirm' name='confirm' placeholder='Confirm' required
                            value={formData.confirm} onChange={(e) => handleFormUpdate(e)}
                        />
                        <label className='font-sm' htmlFor='confirm'>Confirm Password</label>
                    </div>
                </div>
                <button type='submit' onClick={(e) => handleSignUp(e, formData)} ref={submitBtnRef}>Sign Up</button>
            </form>            
        </>
    );
};

export default SignUpForm;