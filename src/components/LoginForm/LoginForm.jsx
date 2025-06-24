import { useState } from 'react';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import Input from '../Input/Input.jsx';

function LoginForm(props) {
    const { handleLogin } =  useAuthen();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                <button type='button' onClick={(e) => handleLogin(username, password)}>Sign In</button>
            </form>
        </>
    );
};

export default LoginForm;