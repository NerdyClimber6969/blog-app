import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import { useNotifications } from '../../context/NotificationProvider.jsx';
import Input from '../Input/Input.jsx';
import API from '../../services/apiService.js';

function LoginForm(props) {
    const navigate = useNavigate()
    const { setUser } =  useAuthen();
    const { handleApiCall } = useNotifications();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e, username, password) {
        e.preventDefault();
        
        await handleApiCall(() => API.login({ username, password }), {
            successMessage: 'Login successfully',
            onSuccess: () => {
                setUser(username);
                navigate('/');
                return;
            }
        });
    };

    return (
        <>
            <form className='login-form'>
                <Input
                    label='Username'
                    type='text'
                    id='username'
                    placeholder='Username'
                    value={username}
                    required
                    errorMessage='Username required'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    label='Password'
                    type='password'
                    id='password'
                    placeholder='Password'
                    value={password}
                    required
                    errorMessage='Password required'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' onClick={(e) => handleLogin(e, username, password)}>Sign In</button>
            </form>
        </>
    );
};

export default LoginForm;