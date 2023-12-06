import { useState, useEffect } from 'react'

const LoginForm = ({ submitLogin }) => {

    // console.log(submitLogin);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = event => {
        event.preventDefault();
        console.log('handlesubmit');
        submitLogin(email, password);
        setEmail("");
        setPassword("");


    }

    useEffect(() => {
        // console.log(password);
    })
    return (
        <form aria-label="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Please enter your email</label>
                <input type="email" name="email" id="" className='form-control' placeholder='your@email.com' value={email} onChange={event => { setEmail(event.target.value) }} required={true} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="" className='form-control' placeholder='Password' value={password} onChange={event => { setPassword(event.target.value) }} required={true} />
            </div>
            <div className="form-group">
                <input type="submit" value="Submit" className='form-control btn btn-danger rounded-pill' />
            </div>


        </form>
    )
}

export default LoginForm
