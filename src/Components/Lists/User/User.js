import React, {useEffect} from 'react';
import './User.css';
import {withRouter} from 'react-router-dom';

import userUrl from '../../../assets/user.svg';

const User = ({user, login, history}) => {
    const {avatar, firstName, lastName, phoneNumber} = user;

    useEffect(() => {
        const txt = document.querySelector('.Login_toSignup');
        if(txt){
            txt.style.display = 'none';
        }
        return () => {
            if(txt) {
                txt.style.display = 'block';
            }
        }
    }, [])

    const endAction = () => {
        history.push('/');
    }

    const loginHandler = () => {
        login();
        history.push('/');
    }
    return (
        <div className="User card mx-auto w-75">
            <div className="card-body d-flex align-items-start flex-column">
                <img 
                    src={avatar || userUrl} 
                    className="card-img-top mb-3 w-50 align-self-center" 
                    alt="user"/>
                <h2 className="card-title mb-3">Ism: {firstName}</h2>
                <h2 className="card-title mb-3">Familiya: {lastName}</h2>
                <h3 className="card-title mb-5">Telefon: {phoneNumber}</h3>
                <button 
                    onClick={endAction}
                    className="btn btn-warning mr-3">Tamomlash</button>
                <button 
                    onClick={loginHandler}
                    className="btn btn-primary mt-3">Kirish</button>  
            </div>
        </div>
    )
}

export default withRouter(User);