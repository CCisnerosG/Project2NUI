import './login.scss';
import { Button, Input } from "@nextui-org/react";
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import loginState from '../../states/login-recoil';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const Log = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

    const handleLogin = async (e: React.MouseEvent) => {
        e.preventDefault();

        const response: AxiosResponse = await axios.post('http://localhost:8080/auth/login', { email, password });
        if (response.status === 200) {
            const { token } = response.data;
            const { userId } = response.data
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            console.log(response.data);
            console.log(token);
            console.log(userId);
            setIsLoggedIn(true);
            if (isLoggedIn == true) {
                toast.success("Welcome Back!")
            }

        } else {
            console.error("Login failed with status:", response.status);
        }


    }

    return (
        <>
            <div><Toaster /></div>
            <div className="body">
                <div className="login-container">
                    <div className="left-container">
                        <p className='login-text'>WELCOME BACK</p>
                        <div className="login-img-container">
                            <img className='img-login' src="img/ash.png" alt="Ash Trainer" />
                        </div>
                    </div>
                    <div className="input-container">
                        <p className="text">LOGIN</p>
                        <Input className='myinput'
                            type="email"
                            label="Email"
                            placeholder="you@example.com"
                            labelPlacement="outside"
                            id='mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            startContent={
                                <img src='user.svg' className="text-2xl text-default-400 pointer-events-none flex-shrink-0" alt='User icon' />
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
                                <img src='key.svg' className="text-2xl text-default-400 pointer-events-none flex-shrink-0" alt='Password Icon' />
                            }
                        />
                        <p className='signup__text'>Don't have an account? <Link to='/SignUp' className='signup__link'>Sign Up</Link></p>
                        <Button color="primary" className='w-[80%]' onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Log;