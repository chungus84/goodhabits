import './utils/css/Header.css';
import userPic from '../assets/user.png';

const Header = (data) => {
    const userName = data.data
    return (
        <>
            <h1 className='header-band py-2 px-2'>goodhabits.</h1>
            <div className="row ">
                <div className='col-9 py-2 my-2 bg-white'></div>
                <div className="col-3 bg-white my-2">
                    <img src={userPic} alt="user profile image" className="rounded-circle mx-2" />
                    <span>Hi, {userName}</span>
                </div>

            </div>

        </>

    )
}

export default Header
