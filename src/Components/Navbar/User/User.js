import React, {useRef} from 'react';
import './User.css';

import {Link} from 'react-router-dom';
import {baseURL} from '../../../axios';

import userUrl from '../../../assets/user.svg';
import cartUrl from '../../../assets/cart.svg';
import settingUrl from '../../../assets/setting.svg';
import logoutUrl from '../../../assets/logout-1.svg';

const User = ({mobile, logout, user}) => {
    const dropMenuRef = useRef(null);
    
    const toggleDropMenu = (payload) => {
        if(payload) {
            dropMenuRef.current.classList.add('show');
        } else {
            dropMenuRef.current.classList.remove('show');
        }
    }

    return (
        <li className={`nav-item User-navItem ${!mobile && 'ml-4 mr-3'}`}>
            <div 
                className="btn-group" 
                onMouseEnter={() => toggleDropMenu(true)} 
                onMouseLeave={() => toggleDropMenu(false)}>
                <Link 
                    to="setting"
                    type="button" 
                    className="btn dropdown-toggle">
                    <img 
                        className="img-fluid" 
                        src={user.avatar ? (baseURL + user.avatar) : userUrl} alt="user" />
                </Link>
                <div className="dropdown-menu" ref={dropMenuRef}>
                    <Link 
                        className="dropdown-item" 
                        to="/cart">
                            Savatcha 
                            <img className="ml-2" src={cartUrl} alt="cart" />
                    </Link>
                    <Link 
                        className="dropdown-item" 
                        to="/setting">
                            Sozlash 
                            <img className="ml-2 py-1" src={settingUrl} alt="setting" />
                    </Link>
                    <hr />
                    <Link 
                        onClick={()=>{logout()}}
                        className="dropdown-item" 
                        to="/">
                            Chiqish
                            <img className="ml-2 py-1" src={logoutUrl} alt="setting" />
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default User; 