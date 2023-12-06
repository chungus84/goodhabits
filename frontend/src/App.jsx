import React, { useState, useEffect } from 'react'
import './App.css'

import Header from './Components/Header';
import RoutedMain from './RoutedMain';
import Authentication from './Components/Authentication';

import { loginUser } from '../asyncFunctions/authenitcationAPICalls';


const App = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("")

    const loginHandler = async (user) => {
        const externalDataCallResult = await loginUser(user);
        // console.log(externalDataCallResult?.user);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem getting your habits ${externalDataCallResult.error.message}`;
            setError(errorObject);
        }
        const loginCall = externalDataCallResult?.user ? externalDataCallResult.user : []
        // console.log(loginCall.user.userId);
        setUserId(loginCall.user.userId)
        setUserName(loginCall.user.userName)
        setLoggedIn(true)
        // console.log(userId);


    }

    const logoutHandler = () => {
        setLoggedIn(false);
        setUserId("")
        setUserName("")
    }

    // const testUserLogin = {
    //     email: "test@testing.com",
    //     password: "password"
    // }

    // loginHandler(testUserLogin)

    return (
        <>
            <Header logout={logoutHandler} data={userName} />
            {!loggedIn && <Authentication loginHandler={loginHandler} />}
            {loggedIn && <RoutedMain userId={userId} />}


        </>
    )
}

export default App
