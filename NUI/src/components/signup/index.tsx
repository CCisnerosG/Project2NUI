import './signup.scss';
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpModal from '../signup-modal';
import axios from 'axios';
import loginState from '../../states/login-recoil';
import { useRecoilState } from 'recoil';
import toast, { Toaster } from 'react-hot-toast';

const Sign = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isValidPass, setIsValidPass] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordError, setPasswordError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/', { replace: true });
        }
    });

    useEffect(() => {
        const validateForm = () => {
            const isEmailValid = email.includes('@');
            const isFullNameValid = fullName.trim() !== "";
            const isPasswordValid = validatePassword(password);
            const passwordsMatch = password === confirmPassword;
            setPasswordsMatch(passwordsMatch);
            setIsButtonDisabled(!(isEmailValid && isFullNameValid && isPasswordValid && passwordsMatch));
        };
        validateForm();
    }, [fullName, email, password, confirmPassword]);


    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value);
        const isValid = validatePassword(value);
        setIsValidPass(isValid);
        setPasswordsMatch(value === confirmPassword);
        setPasswordError(isValid ? "" : "Password must have 8 characters, a capital letter, and a special character");
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setConfirmPassword(value);
        setPasswordsMatch(password === value);
    };

    function validatePassword(value: string) {
        const regexValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regexValidation.test(value);
    }

    const Signup = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth/signup', { fullName, email, password })
            .then((response) => {
                onOpen();
            })
            .catch(error => {
                notification(error.response.data.message);
            });
    };

    const notification = (value: string) => {
        toast.error(value);
    }

    return (
        <>
            <Toaster />
            <div className="body">
                <div className="signup-container">
                    <div className="signup__input-container">
                        <p className="signup__text-title">SIGN UP</p>
                        <Input
                            isRequired
                            className='signup__myinput'
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
                        <Input
                            isRequired
                            className='signup__myinput'
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
                        <div className="signup__myinput-passwords">
                            <Input
                                isRequired
                                className='signup__myinput-pass'
                                type="password"
                                label="Password"
                                id='password'
                                labelPlacement="outside"
                                value={password}
                                onChange={handlePasswordChange}
                                startContent={
                                    <img src='key.svg' className="text-2xl text-default-400 pointer-events-none flex-shrink-0" alt='Password Icon' />
                                }
                            />

                            <Input
                                isRequired
                                className='signup__myinput-pass'
                                type="password"
                                label="Confirm Password"
                                id='password_2'
                                labelPlacement="outside"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                startContent={
                                    <img src='key.svg' className="text-2xl text-default-400 pointer-events-none flex-shrink-0" alt='Password Icon' />
                                }
                            />

                        </div>
                        {!isValidPass && (
                            <p className="signup__error-text">{passwordError}</p>
                        )}
                        {!passwordsMatch && (
                            <p className="signup__error-text">Passwords must be the same</p>
                        )}
                        <p className='signup__text'>Have an account? <Link to='/Login' className='signup__link'>Log In</Link></p>
                        <Button color="primary" className='w-[80%]' isDisabled={isButtonDisabled} onClick={Signup}>
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
        </>
    )
}

export default Sign;
