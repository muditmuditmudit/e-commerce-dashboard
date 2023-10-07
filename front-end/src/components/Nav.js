import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const Auth = localStorage.getItem('user');
    //console.log(Auth);
    const Logout = () => {
        if (Auth) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/signup');
        }
    }

    //
    return (
        <div>
            <img className='logo'  alt='logo' 
            src='https://t4.ftcdn.net/jpg/02/69/32/31/360_F_269323177_Al3F8M5EAWmDQqkFdusoinJHH3HaSxTT.jpg' />
            {
            Auth ?
                <ul className="nav-ul">

                    <li><Link to="/">Products</Link> </li>
                    <li><Link to="/add">Add Products</Link></li>
                    <li><Link to="/update">Update Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={Logout} to="/signup">Logout ({JSON.parse(Auth).name})</Link></li>
                </ul> :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup"> Sign Up </Link></li>
                    <li><Link to="/login"> Login </Link></li>
                </ul>
        }
        </div>
    )
}

export default Nav;