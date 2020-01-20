import React, {useState} from 'react';
import './SignUp.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

import Loader from '../../../UI/Loader/Loader';
import User from '../../Lists/User/User';
import eyeUrl from '../../../assets/eye-show.svg';
import hideUrl from '../../../assets/eye-hide.svg';

const SignUp = ({message, loading, errorMsg, fakeUser, sendSms, signup}) => {
    const [form, setForm] = useState({
        firstName: { 
            label: 'Ism',
            value: '', 
            errorMsg: null, 
            clsName: ''
        },
        lastName: {
            label: 'Familiya',
            value: '', 
            errorMsg: null, 
            clsName: ''
        },
        password: { 
            label: 'Parol',
            value: '', 
            errorMsg: null, 
            clsName: ''
        },
        phoneNumber: { 
            label: 'Telefon Nomeri',
            value: '', 
            errorMsg: null, 
            clsName: ''
        },
        smsCode: {
            label: 'Sms Kod',
            value: '',
            errorMsg: null,
            clsName: ''
        }
    });
    const [passwordType, setPasswordType] = useState('password');

    const passwordShow = () => setPasswordType(passwordType === 'password' ? 'text' : 'password');
    
    const submitHandler = (e) => {
        e.preventDefault();
        let err = false;
        let updatedForm = {...form};
        for(let key in form) {
            if(!message && key === 'smsCode') continue;
            const f = form[key];
            if(f.value.length <= 0){
                updatedForm = {
                    ...updatedForm,
                    [key]: {
                        ...f,
                        errorMsg: `${f.label} ni kiriting`,
                        clsName: `is-invalid`
                    }
                }
                err = true;
            }
        }
        if(err) {
            setForm(updatedForm)
        } else if (message) {
            signup(form.smsCode.value);
        } else {
            sendSms({
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                password: form.password.value,
                phoneNumber: form.phoneNumber.value
            }) 
        }
    }

    const inpChangeHandler = (e) => {
        let hasError = false;
        let errText = null;
        if(e.target.value.length === 0) {
            hasError = true;
            errText = `${form[e.target.name].label} ni kiriting`
        } else if(e.target.name === 'password') {
            hasError = e.target.value.length < 6;
            errText = `${form[e.target.name].label} 6 tadan kam bo'lmasligi kereak`
        }
        setForm({
            ...form,
            [e.target.name]: {
                ...form[e.target.name],
                value: e.target.value,
                errorMsg: hasError ? errText : null,
                clsName: `is-${hasError ? 'in' : ''}valid`
            }
        })
    }

    return (
        <div className="Signup-wrapper">
            {   
                loading ? <Loader /> :
                (fakeUser && !message) ? (
                    <User user={fakeUser}/>
                ) : (
                    <form className="SignUp" onSubmit={submitHandler} noValidate>
                    {
                        message ? (
                            <div className="form-group">
                                <label htmlFor="smsCode">
                                    {message || form.smsCode.label}
                                </label>
                                <input 
                                    onChange={inpChangeHandler}
                                    value={form.smsCode.value}
                                    name="smsCode"
                                    type="number"
                                    className={
                                        `form-control ${errorMsg ? 'is-invalid' : form.smsCode.clsName}`
                                    }
                                    id="smsCode"/>
                                <div className="invalid-feedback">
                                    {errorMsg ? errorMsg : form.smsCode.errorMsg}
                                </div>
                            </div>
                        ) : 
                        (<>
                            <div className="form-group">
                                <label htmlFor={"signup-firstName"}>
                                    {form.firstName.label}
                                </label>
                                <input 
                                    onChange={inpChangeHandler}
                                    value={form.firstName.value}
                                    name="firstName"
                                    type="text" 
                                    className={"form-control " + form.firstName.clsName}
                                    id={"signup-firstName"}/>
                                <div className="invalid-feedback">
                                    {form.firstName.errorMsg}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor={"signup-lastName"}>
                                    {form.lastName.label}
                                </label>
                                <input 
                                    onChange={inpChangeHandler}
                                    value={form.lastName.value}
                                    name="lastName"
                                    type="text" 
                                    className={"form-control " + form.lastName.clsName}
                                    id={"signup-lastName"}/>
                                <div className="invalid-feedback">
                                    {form.lastName.errorMsg}
                                </div>
                            </div>

                            <div className="form-group Signup_password-form-group">
                                <label htmlFor={"signup-password"}>
                                    {form.password.label}
                                </label>
                                <input 
                                    onChange={inpChangeHandler}
                                    value={form.password.value}
                                    name="password"
                                    type={passwordType} 
                                    className={"form-control " + form.password.clsName}
                                    id={"signup-password"}/>
                                <img 
                                    onClick={passwordShow}
                                    src={passwordType === "password" ? eyeUrl : hideUrl} 
                                    alt="eye" 
                                    className="Signup_password-eye"/>
                                <div className="invalid-feedback">
                                    {form.password.errorMsg}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor={"signup-phoneNumber"}>
                                    {form.phoneNumber.label}
                                </label>
                                <input 
                                    onChange={inpChangeHandler}
                                    value={form.phoneNumber.value}
                                    name="phoneNumber"
                                    type="text" 
                                    className={`form-control 
                                    ${errorMsg ? 'is-invalid' : form.phoneNumber.clsName}`
                                    }
                                    id={"signup-phoneNumber"}/>
                                <div className="invalid-feedback">
                                    {errorMsg || form.phoneNumber.errorMsg}
                                </div>
                            </div>
                        </>)
                            
                    }
                    <button 
                        type="submit" 
                        className="btn btn-primary mt-5 py-2 px-4">
                            {message ? 'Register' : "Sms Kodni jo'natish"}
                    </button>
                </form>
            
                )
            }
            
        </div>
    )
}

const mapStateToProps = ({message, loading, errorMsg, fakeUser}) => ({
    message,
    loading,
    errorMsg,
    fakeUser
});

const mapDispatchToProps = dispatch => ({
    sendSms: (form) => dispatch(actions.sendSms(form)),
    signup: smsCode => dispatch(actions.signup(smsCode))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);