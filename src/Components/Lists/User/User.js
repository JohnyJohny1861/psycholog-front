import React from 'react';
import './User.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

import userUrl from '../../../assets/user.svg';

const User = ({user, login, fakeUser, modalHandler}) => {
    const {avatar, firstName, lastName, phoneNumber} = user;

    const closeModalHandler = () => {
        modalHandler(false)
    }

    const loginHandler = () => {
        login(fakeUser);
    }
    return (
        <div className="User card mx-auto w-75">
            <div className="card-body">
                <img src={avatar || userUrl} className="card-img-top mb-3 w-50" alt="user"/>
                <h2 className="card-title mb-3">Ism: {firstName}</h2>
                <h2 className="card-title mb-3">Familiya: {lastName}</h2>
                <h3 className="card-title mb-5">Telefon: {phoneNumber}</h3>
                <button 
                    onClick={closeModalHandler}
                    className="btn btn-warning mr-3">Tamomlash</button>
                <button 
                    onClick={loginHandler}
                    className="btn btn-primary">Kirish</button>  
            </div>
        </div>
    )
}

const mapStateToProps = ({fakeUser, }) => ({
    fakeUser
})

const mapDispatchToProps = dispatch => ({
    login: (fakeUser) => dispatch(actions.login(fakeUser)),
    modalHandler: (payload) => dispatch(actions.modalHandler(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(User);