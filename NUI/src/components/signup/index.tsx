import './signup.scss';
import { Button, Input, useDisclosure } from "@nextui-org/react";
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpModal from '../signup-modal';


const Sign = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleSignup = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth/signup', { fullName, email, password })
            .then((response) => {
                const token = response.data;
                console.log(token);
            });
    };

    return (
        <div className="body">
            <div className="signup-container">
                <div className="signup__input-container">
                    <p className="signup__text-title">SIGN UP</p>
                    <Input className='signup__myinput'
                        type="text"
                        label="Full Name"
                        placeholder="John Doe"
                        labelPlacement="outside"
                        id='fullName'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        startContent={
                            <img src='user.svg' className="text-2xl text-default-400 pointer-events-none flex-shrink-0" alt='User icon' />
                        }
                    />
                    <Input className='signup__myinput'
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
                    <Input className='signup__myinput'
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
                    <p className='signup__text'>Have an account? <Link to='/Login' className='signup__link'>Log In</Link></p>
                    <Button color="primary" className='w-[80%]' onClick={handleSignup} onPress={onOpen}>
                        Sign Up
                    </Button>
                    <SignUpModal isOpen={isOpen} onClose={onClose} />
                </div>
                <div className="right-container">
                    <p className='login-text'>BE A PART OF US!</p>
                    <div className="login-img-container">
                        <img className='img-login' src="img/ash-pika.png" alt="Ash Trainer" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Sign;