import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationProvider.jsx';
import Input from '../Input/Input.jsx';
import API from '../../services/apiService.js';

function SignUpForm(props) {
    const defaultFormData = {        
        firstName:'', 
        lastName:'', 
        username: '',
        password: '',
        confirm: ''
    };

    const defaultValidationMessage = {
        firstName:'i.e. Ben', 
        lastName:'i.e. Wong', 
        username: 'Use 8 to 15 alphabet or number for your username.',
        password: 'Use 10 to 20 alphabet or number for your password.',
        confirm: 'Those passwords didn’t match. Try again.'
    };

    const navigate = useNavigate()
    const { handleApiCall } = useNotifications();
    const [formData, setFormData] = useState(defaultFormData);
    const [validationMessage, setValidationMessage] = useState(defaultValidationMessage);
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
    const formRef = useRef(null);

    useEffect(() => {   
        const isValidForm = () => {
            const inputs = Array.from(formRef.current.querySelectorAll('input'));
            for (const input of inputs) {
                if (!input.validity.valid) {
                    return false;
                };
            };

            return true;
        };

        const isValid = isValidForm();
        setSubmitBtnDisabled(!isValid)

        return;
    }, [formData]);

    function handleFormUpdate(e) {
        const key = e.target.id;
        const value = e.target.value;

        return setFormData({...formData, [key]: value});
    };

    async function handleSignUp(e, formData) {
        e.preventDefault();

        await handleApiCall(()=> API.signUp(formData), {
            successMessage: 'Register successfully, you can now login.',
            onSuccess: () => navigate('/login'),
            onError: (error) => {
                if (error.name === 'ValidationError' && Array.isArray(error.details?.invalidFields)) {
                    const newValidationMessage = { ...defaultValidationMessage };

                    for (const field of error.details.invalidFields) {
                        newValidationMessage[field.path] = field.msg
                    };
                    setValidationMessage(newValidationMessage);
                };
            }
        });
    };

    return (
        <>
            <form className='sign-up-form' ref={formRef} novalidate>
                <Input
                    label='First Name'
                    type='text'
                    id='firstName'
                    placeholder='First Name'
                    value={formData.firstName}
                    required
                    errorMessage={validationMessage.firstName}
                    onChange={(e) => handleFormUpdate(e)}
                    pattern='[a-zA-Z]+'
                />
                <Input
                    label='Last Name'
                    type='text'
                    id='lastName'
                    placeholder='Last Name'
                    value={formData.lastName}
                    required
                    errorMessage={validationMessage.lastName}
                    onChange={(e) => handleFormUpdate(e)}
                    pattern='[a-zA-Z]+'
                />            
                <Input
                    label='Username'
                    type='text'
                    id='username'
                    placeholder='Username'
                    value={formData.username}
                    required
                    errorMessage={validationMessage.username}
                    onChange={(e) => handleFormUpdate(e)}
                    pattern='^[a-zA-Z0-9]{8,15}$' 
                    minLength={8} 
                    maxLength={15} 
                />     
                <Input
                    label='Password'
                    type='password'
                    id='password'
                    placeholder='Password'
                    value={formData.password}
                    required
                    errorMessage={validationMessage.password}
                    onChange={(e) => handleFormUpdate(e)}
                    pattern='(?=.*\d)(?=.*[a-zA-Z])^[a-zA-Z0-9]{10,20}$'
                    minLength={10} 
                    maxLength={20} 
                />    
                <Input
                    label='Confirm Passowrd'
                    type='password'
                    id='confirm'
                    placeholder='Confirm Password'
                    value={formData.confirm}
                    required
                    errorMessage={validationMessage.confirm}
                    onChange={(e) => handleFormUpdate(e)}
                    pattern={formData.password}
                />           
                <button 
                    type='submit' 
                    onClick={(e) => handleSignUp(e, formData)}
                    disabled={submitBtnDisabled}
                >
                    Sign Up
                </button>
            </form>            
        </>
    );
};

export default SignUpForm;