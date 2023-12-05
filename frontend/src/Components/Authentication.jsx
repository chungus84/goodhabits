import { useState, useEffect } from 'react'
import './utils/css/Authentication.css';
import LoginForm from './utils/LoginForm';
import SignUpForm from './utils/SignUpForm';

const Authentication = () => {

    const [login, setLogin] = useState(false);

    const loginClicked = () => {
        setLogin(true)
    }
    const signUpClicked = () => {
        setLogin(false)
    }

    useEffect(() => {
        // console.log(login);
    })



    return (
        <div className='authentication-form'>
            <h1>Welcome to .goodhabits.</h1>
            <h2>Login or Sign-up</h2>
            <button className={`btn btn-warning rounded-pill ${login ? 'btn-active' : ''}`} onClick={loginClicked}>Login</button>
            <button className={`btn btn-warning rounded-pill ${login ? '' : 'btn-active'}`} onClick={signUpClicked} >Sign-up</button>
            <div className="form-container">
                {login && (
                    <LoginForm />
                )}
                {!login && (
                    <SignUpForm />
                )}

            </div>



        </div>
    )
}

export default Authentication
