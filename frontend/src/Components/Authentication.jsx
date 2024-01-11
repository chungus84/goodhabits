import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './utils/css/Authentication.css';
import LoginForm from './utils/LoginForm';
import SignUpForm from './utils/SignUpForm';

const Authentication = ({ loginHandler, signUpFunc, loginFunc, login }) => {

    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate()

    const loginClicked = () => {
        loginFunc(true)
    }

    const signUpClicked = () => {
        loginFunc(false)
    }

    const submitLogin = (email, password) => {
        const loginToSubmit = {
            email: email,
            password: password
        }
        loginHandler(loginToSubmit)
        setSubmitted(true)
    }

    const signUp = (firstName, lastName, userName, email, password, repeatedPassword) => {
        const newUserToSubmit = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password
        }
        signUpFunc(newUserToSubmit)
        setSubmitted(true);
    }

    useEffect(() => {
        if (submitted) navigate('/')
    }, [submitted, navigate, login])

    return (
        <div className='authentication-form'>
            <h1>Welcome to .goodhabits.</h1>
            {login && (
                <>
                    <h2>Login</h2>
                    <button className={'btn btn-warning rounded-pill'} onClick={signUpClicked} >Sign-up</button>
                </>
            )}
            {!login && (
                <>
                    <h2>Sign Up</h2>
                    <button className={`btn btn-warning rounded-pill ${login ? 'btn-active' : ''}`} onClick={loginClicked}>Login</button>
                </>
            )}
            <div className="form-container">
                {login && (
                    <LoginForm submitLogin={submitLogin} />
                )}
                {!login && (
                    <SignUpForm submitNewUser={signUp} />
                )}
            </div>
        </div>
    )
}

export default Authentication
