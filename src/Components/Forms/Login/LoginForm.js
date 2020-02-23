import React, {useEffect, useState} from 'react';
import './LoginForm.css';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import axios from '../../../axios';

import leftArr from '../../../assets/leftArr.svg';
import registerBg from '../../../assets/registerBg.jpg';

import User from '../../Lists/User/User';
import Forgot from './Forgot/Forgot';
import NewPassword from './NewPassword/NewPassword';
import Login from './Login/Login';

const LoginForm = ({history, user}) => {   
    const [loading, setLoading] = useState(false);
    const [forgotPage, setForgotPage] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [message, setMessage] = useState(null);
    const [fakeUser, setFakeUser] = useState(null);

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const footer = document.querySelector('.Footer-wrapper');
        if(navbar && footer) {
            navbar.style.display = "none";
            footer.style.display = "none";
        }

        return () => {
            navbar.style.display = "flex";
            footer.style.display = "block";
        }
    }, []);

    const setForgotPageHandler = (payload) => {
        setErrorMsg(null);
        setFakeUser(null);
        setForgotPage(payload);
    }

    const forgotSendSms = async(form) => {
        try {
            setLoading(true)
            const res = await axios.post('forgotSms', form);
            if(res.status === 226) { // ERROR
                setLoading(false);
                setErrorMsg(res.data.error);
            } else {
                setLoading(false);
                setErrorMsg(null);
                setForgotPage(false);
                setMessage(res.data.message);
            }
        } catch (err) {
            setLoading(false);
            setErrorMsg('Serverda xatolik bor');
        }
    }

    const forgotNewPassword = async(form) => {
        try {
            setLoading(true);
            const res = await axios.post('forgot', form);
            if(res.status === 226) { // ERROR
                setLoading(false);
                setErrorMsg(res.data.error);
            } else {
                setLoading(false);
                setErrorMsg(null);
                setMessage(null);
                setFakeUser({
                    ...res.data.data,
                    password: form.password
                });
            }
        } catch(err) {
            setLoading(false);
            setErrorMsg('Serverda xatolik bor');
        }
    }

    const login = async(form=fakeUser) => {
        try {
            setLoading(true);
            const res = await axios.post('login', form);
            if(res.status === 226) { // ERROR
                setLoading(false);
                setErrorMsg(res.data.error);
            } else {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', JSON.stringify(res.data.user._id));
                user(res.data.user);
                history.push('/');
            }
        } catch(err) {
            setLoading(false);
            setErrorMsg('Serverda xatolik bor');
        }
    }

    const loginToSignup = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            history.push('/signup');
        }, 300)
    }
        
    return (
        <div className="RegisterWrapper" style={{backgroundImage: `url(${registerBg})`}}>
            <div className="Register_back" onClick={() => history.push('/')}>
                <img src={leftArr} alt="back"/>
                Orqaga
            </div>
            <div className="LoginForm">
                {
                    (fakeUser && !message) ? ( 
                        <User user={fakeUser} login={login}/>
                    ) :
                    forgotPage ? (
                        <Forgot 
                            loading={loading}
                            setLoading={setLoading}
                            forgotSendSms={forgotSendSms}
                            errorMsg={errorMsg} 
                            setForgotPage={() => setForgotPageHandler(false)}/>
                    ) :
                    message ? (
                        <NewPassword 
                            loading={loading}
                            setLoading={setLoading}
                            errorMsg={errorMsg} 
                            forgotNewPassword={forgotNewPassword}/>
                    ) : 
                        <Login 
                            errorMsg={errorMsg} 
                            login={login} 
                            loading={loading}
                            setLoading={setLoading}
                            setForgotPage={() => setForgotPageHandler(true)}/>
                }
                <div 
                    onClick={loginToSignup}
                    className="Login_toSignup text-center">Ro'yxatdan o'tish
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    user: (payload) => dispatch(actions.user(payload))
})


export default connect(null, mapDispatchToProps)(withRouter(LoginForm));