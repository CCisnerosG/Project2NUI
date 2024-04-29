import './login.scss';
import { Button, Input } from "@nextui-org/react";
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUserContext } from '../../context/user-context';


const Log = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const data = useUserContext();


    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        const user = data.find(user => user.mail === username && user.pass === password);

        if (user) {
            await login({ username: user.mail });
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="body">
            <div className="login-container">
                <div className="left-container">
                    <p className='login-text'>WELCOME BACK</p>
                </div>
                <div className="input-container">
                    <p className="text">LOGIN</p>
                    <Input className='myinput'
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                        labelPlacement="outside"
                        id='mail'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        startContent={
                            <img src='user.svg' className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    <Input className='myinput'
                        type="password"
                        label="Password"
                        id='password'
                        labelPlacement="outside"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        startContent={
                            <img src='key.svg' className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    <Button color="primary" className='w-[80%]' onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default Log;