import './login.scss';
import { Button, Input } from "@nextui-org/react";
import { MailIcon } from './MailIcon';

const Log = () => {
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
                        startContent={
                            <img src='user.svg' className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    <Input className='myinput'
                        type="password"
                        label="Password"
                        labelPlacement="outside"
                        startContent={
                            <img src='key.svg' className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    <Button color="primary" className='w-[80%]'>
                        Login
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default Log;