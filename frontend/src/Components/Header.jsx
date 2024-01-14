import './utils/css/Header.css';
import userPic from '../assets/user.png';
import { useNavigate } from 'react-router-dom';

const Header = (data) => {
    const navigate = useNavigate();

    const userName = data.data

    return (
        <>
            <h1 className='header-band py-2 px-2 logo' onClick={() => navigate('/')}>.goodhabits.</h1>
            <div className="row ">
                <div className='py-2 my-2 bg-white text-end'>
                    {userName && (
                        <>
                            <img src={userPic} alt="user profile image" className="rounded-circle mx-2" />
                            <span>Hi, {userName}</span>
                            <button className="btn btn-logout mx-2" onClick={data.logout}>Logout</button>
                        </>
                    )}



                </div>
            </div >
        </>

    )
}

export default Header
