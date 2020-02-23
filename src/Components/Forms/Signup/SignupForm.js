import React, {useEffect, useState} from 'react';
import './SignupForm.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import {withRouter} from 'react-router-dom';
import axios from '../../../axios';

import leftArr from '../../../assets/leftArr.svg';
import registerBg from '../../../assets/registerBg.jpg';

import User from '../../Lists/User/User';
import SignUp from './Signup/Signup';
import SendSms from './SendSms/SendSms';

const SignUpForm = ({ history, user }) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [fakeUser, setFakeUser] = useState(null);
    const [message, setMessage] = useState(null);

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
    }, [])

    const sendSms = async(form) => {
        try {
            setLoading(true);
            const res = await axios.post('signupSms', form);
            if(res.status === 226) { // ERROR
                setLoading(false);
                setErrorMsg(res.data.error);
            } else {
                setLoading(false);
                setErrorMsg(null);
                setFakeUser(form);
                setMessage(res.data.message);
            }
        } catch(err) {
            setLoading(false);
            setErrorMsg('Serverda xatolik bor');
        }
    }

    const signup = async(smsCode) => {
        try {
            setLoading(true);
            const res = await axios.post('signup', {smsCode});
            if(res.status === 226) {
                setErrorMsg(res.data.error);
                setLoading(false);
            } else {
                setMessage(null);
                setErrorMsg(null);
                setLoading(false);
            }
        } catch (err) {
            setLoading(true);
            setErrorMsg('Serverda xatolik bor');
        }
    }

    const login = async() => {
        try {
            setLoading(true);
            const res = await axios.post('login', fakeUser);
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
            history.push('/login');
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
                    message ? (
                        <SendSms 
                            signup={signup}
                            errorMsg={errorMsg}
                            user={fakeUser}
                            sendSms={sendSms}
                            loading={loading}/>
                    ) : (
                        <SignUp 
                            sendSms={sendSms}
                            errorMsg={errorMsg} 
                            loading={loading}/>
                    )
                }
                <div 
                    onClick={loginToSignup}
                    className="Login_toSignup text-center">Tizimga kirish
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    user: payload => dispatch(actions.user(payload))
})

export default connect(null, mapDispatchToProps)(withRouter(SignUpForm));