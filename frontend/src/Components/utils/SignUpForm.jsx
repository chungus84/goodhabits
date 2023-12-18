import { useState, useEffect } from 'react'


const SignUpForm = ({ submitNewUser }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")

    const handleSubmit = event => {
        event.preventDefault();
        if (password === repeatPassword) {
            submitNewUser(firstName, lastName, userName, email, password)
            setFirstName("");
            setLastName("");
            setUserName("");
            setEmail("");
            setPassword("");
            setRepeatPassword("");

        }


    }



    return (
        <form aria-label="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" name="firstName" id="firstName" className='form-control' placeholder='First Name' value={firstName} onChange={event => { setFirstName(event.target.value) }} required={true} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" name="lastName" id="lastName" className='form-control' placeholder='Last Name' value={lastName} onChange={event => { setLastName(event.target.value) }} required={true} />
                </div>
                <div className="form-group">
                    <label htmlFor="userName">userName:</label>
                    <input type="text" name="userName" id="userName" className='form-control' placeholder='Username' value={userName} onChange={event => { setUserName(event.target.value) }} required={true} />
                </div>
                <label htmlFor="email">Please enter your email</label>
                <input type="email" name="email" id="email" className='form-control' placeholder='your@email.com' value={email} onChange={event => { setEmail(event.target.value) }} required={true} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" className='form-control' placeholder='Password' value={password} onChange={event => { setPassword(event.target.value) }} required={true} />
            </div>
            <div className="form-group">
                <label htmlFor="repeatPassword">Repeat Password:</label>
                <input type="password" name="repeatPassword" id="repeatPassword" className='form-control' placeholder='Repeat Password' value={repeatPassword} onChange={event => { setRepeatPassword(event.target.value) }} required={true} />
            </div>
            <div className="form-group">
                <input type="submit" value="Submit" className='form-control btn btn-danger rounded-pill' />
            </div>
        </form>
    )
}

export default SignUpForm
