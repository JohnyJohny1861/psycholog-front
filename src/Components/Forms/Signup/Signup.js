import React, {useState} from 'react';
import './SignUp.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

import Loader from '../../../UI/Loader/Loader';
import User from '../../Lists/User/User';

const SignUp = (props) => {
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
            label: 'Sms kodni kiriting!',
            value: '',
            errorMsg: null,
            clsName: ''
        }
    });
    
    const submitHandler = (e) => {
        e.preventDefault();
        let err = false;
        let updatedForm = {...form};
        for(let key in form) {
            if(!props.message && key === 'smsCode') continue;
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
        } else if (props.message) {
            props.signup(form.smsCode.value);
        } else {
            props.sendSms(form) 
        }
    }

    const inpChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: {
                ...form[e.target.name],
                value: e.target.value,
                errorMsg: e.target.value.length===0?`${form[e.target.name].label} ni kiriting`:null,
                clsName: `is-${e.target.value.length === 0 ? 'in' : ''}valid`
            }
        })
    }

    return (
        <div>
            {
                props.user ? (
                    <User user={props.user}/>
                ) : (
                    <form className="SignUp" onSubmit={submitHandler} noValidate>
                    {
                        props.loading ? <Loader /> :

                        props.message ? (
                            <div className="form-group">
                                <label htmlFor="smsCode">
                                    {props.message || form.smsCode.label}
                                </label>
                                <input 
                                    onChange={inpChangeHandler}
                                    value={form.smsCode.value}
                                    name="smsCode"
                                    type="text"
                                    className={
                                        `form-control ${props.errorMsg ? 'is-invalid' : form.smsCode.clsName}`
                                    }
                                    id="smsCode"/>
                                <div className="invalid-feedback">
                                    {props.errorMsg || form.smsCode.errorMsg}
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

                            <div className="form-group">
                                <label htmlFor={"signup-password"}>
                                    {form.password.label}
                                </label>
                                <input 
                                    onChange={inpChangeHandler}
                                    value={form.password.value}
                                    name="password"
                                    type="text" 
                                    className={"form-control " + form.password.clsName}
                                    id={"signup-password"}/>
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
                                    ${props.errorMsg ? 'is-invalid' : form.phoneNumber.clsName}`
                                    }
                                    id={"signup-phoneNumber"}/>
                                <div className="invalid-feedback">
                                    {props.errorMsg || form.phoneNumber.errorMsg}
                                </div>
                            </div>
                        </>)
                            
                    }
                    <button 
                        type="submit" 
                        className="btn btn-primary mt-5 py-2 px-4">
                            {props.message ? 'Register' : "Sms Kodni jo'natish"}
                    </button>
                </form>
            
                )
            }
            
        </div>
    )
}

const mapStateToProps = ({message, loading, errorMsg, user}) => ({
    message,
    loading,
    errorMsg,
    user
});

const mapDispatchToProps = dispatch => ({
    sendSms: (form) => dispatch(actions.sendSms(form)),
    signup: smsCode => dispatch(actions.signup(smsCode)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);