import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './utils/css/Authentication.css';
import LoginForm from './utils/LoginForm';
import SignUpForm from './utils/SignUpForm';

const Authentication = ({ loginHandler }) => {

    // console.log(loginHandler);

    const [login, setLogin] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    const navigate = useNavigate()

    const loginClicked = () => {
        setLogin(true)
    }
    const signUpClicked = () => {
        setLogin(false)
    }

    useEffect(() => {
        // console.log(login);
    })

    const submitLogin = (email, password) => {
        // console.log('submitLogin fired');
        const loginToSubmit = {
            email: email,
            password: password
        }
        loginHandler(loginToSubmit)
        setSubmitted(true)
    }

    useEffect(() => {
        if (submitted) navigate('/')
    }, [submitted, navigate])



    return (
        <div className='authentication-form'>
            <h1>Welcome to .goodhabits.</h1>
            <h2>Login or Sign-up</h2>
            <button className={`btn btn-warning rounded-pill ${login ? 'btn-active' : ''}`} onClick={loginClicked}>Login</button>
            <button className={`btn btn-warning rounded-pill ${login ? '' : 'btn-active'}`} onClick={signUpClicked} >Sign-up</button>
            <div className="form-container">
                {login && (
                    <LoginForm submitLogin={submitLogin} />
                )}
                {!login && (
                    <SignUpForm />
                )}

            </div>



        </div>
    )
}

export default Authentication
