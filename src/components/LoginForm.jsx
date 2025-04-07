import { useState } from 'react';
import { useAuthen } from '../context/AuthenProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationProvider.jsx';
import '../style/components/_input.css';

function LoginForm(props) {
    const navigate = useNavigate()
    const { login, setUser } =  useAuthen();
    const { setNotifications } = useNotifications();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e, username, password) {
        e.preventDefault();
        
        const response = await login(username, password);

        if (!response.success) {
            return setNotifications(response.errors.map((error, index) => {
                return {
                    message: error.msg || error.message, 
                    id: index,
                    isClosing: false,
                    type: 'error'
                };
            }));
        };

        localStorage.setItem('accessToken', response.token);
        setUser(username);
        setNotifications([{ message: 'Login successfully', id: 1, isClosing: false, type: 'success'}]);
        return navigate('/');
    };

    return (
        <>
            <form className='login-form'>
                <div className='container input-container'>
                    <div className='font-sm'>
                        <input 
                            className='font-sm' type='text' id='username' placeholder='Username' required
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor='username'>Username</label>
                    </div>
                </div>
                <div className='container input-container'>
                    <div className='font-sm'>
                        <input 
                            className='font-sm' type='password' id='password' placeholder='Password' required
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor='password'>Password</label>
                    </div>
                </div>
                <button type='submit' onClick={(e) => handleLogin(e, username, password)}>Sign In</button>
            </form>
        </>
    );
};

export default LoginForm;