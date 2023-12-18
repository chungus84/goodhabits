import React, { useState, useEffect } from 'react'
import './App.css'


import Header from './Components/Header';
import RoutedMain from './RoutedMain';
import Authentication from './Components/Authentication';

import { loginUser, addUser } from '../asyncFunctions/authenitcationAPICalls';
import { addNewUser } from '../asyncFunctions/habitAPICalls';


const App = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("")
    const [error, setError] = useState("")

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

    const signUpHandler = async (newUser) => {
        // console.log(newUser);
        const externalDataCallResult = await addUser(newUser);
        // console.log(externalDataCallResult);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem getting your habits ${externalDataCallResult.error.message}`;
            setError(errorObject);
        }


        const addUserCall = externalDataCallResult?.user ? externalDataCallResult.user : []
        const newUserToAdd = {
            userName: addUserCall.userName,
            userId: addUserCall._id

        }
        const addUserDataCallResult = await addNewUser(newUserToAdd)
        console.log(addUserDataCallResult);
        setUserId(newUserToAdd.userId)
        setUserName(newUserToAdd.userName)
        setLoggedIn(true);
    }

    const logoutHandler = () => {
        setLoggedIn(false);
        setUserId("")
        setUserName("")
    }


    return (
        <>
            <Header logout={logoutHandler} data={userName} />
            {!loggedIn && <Authentication loginHandler={loginHandler} signUpFunc={signUpHandler} />}
            {loggedIn && <RoutedMain userId={userId} />}


        </>
    )
}

export default App
