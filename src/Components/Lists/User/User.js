import React, {useState} from 'react';
import './User.css';
import userUrl from '../../../assets/user.svg';
import {Link} from 'react-router-dom';

const User = ({user}) => {
    const {avatar, firstName, lastName, phoneNumber} = user;

    return (
        <div className="User card mx-auto w-75">
            <div className="card-body">
                <img src={avatar || userUrl} className="card-img-top mb-3 w-50" alt="user"/>
                <h2 className="card-title mb-3">Ism: {firstName}</h2>
                <h2 className="card-title mb-3">Familiya: {lastName}</h2>
                <h3 className="card-title mb-5">Telefon: {phoneNumber}</h3>
                {
                    window.localStorage.hasItem('token') ? (
                        <Link to="/setting" className="btn btn-primary">Sozlash</Link>
                    ) : (
                        <Link to="/" className="btn btn-primary">Kirish</Link>
                    )
                }
                
            </div>
        </div>
    )
}

export default User