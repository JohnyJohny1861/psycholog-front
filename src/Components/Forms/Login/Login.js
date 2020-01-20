import React, {useState} from 'react';
import './Login.css';

import Loader from '../../../UI/Loader/Loader';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import eyeUrl from '../../../assets/eye-show.svg';
import hideUrl from '../../../assets/eye-hide.svg';

const Login = ({loading, errorMsg, login}) => {
    const [form, setForm] = useState({
        phoneNumber: { 
            label: 'Telefon Nomeri',
            value: '', 
            errorMsg: null, 
            clsName: ''
        },
        password: { 
            label: 'Parol',
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
            setForm(updatedForm);
        } else {
            login({
                phoneNumber: form.phoneNumber.value,
                password: form.password.value
            })
        }
    }

    const inpChangeHandler = (e) => {
        const inp = e.target
        setForm({
            ...form,
            [inp.name]: {
                ...form[inp.name],
                value: inp.value,
                errorMsg: inp.value.length===0?`${form[inp.name].label} ni kiriting`:null,
                clsName: `is-${e.target.value.length === 0 ? 'in' : ''}valid`
            }
        })
    }

    let errorPhone;
    let errorPassword;
    if(errorMsg) {
        if(errorMsg.includes('Telefon')){
            errorPhone = errorMsg;
        } else {
            errorPassword = errorMsg
        }
    }

    return (
        <div>
            <form className="Login" onSubmit={submitHandler} noValidate>
                {
                    loading ? <Loader /> :
                    <>
                        <div className="form-group">
                            <label htmlFor="login phoneNumber">
                                {form.phoneNumber.label}
                            </label>
                            <input 
                                onChange={inpChangeHandler}
                                value={form.phoneNumber.value}
                                name="phoneNumber"
                                type="text"
                                className={
                                    `form-control ${errorPhone ? 'is-invalid' : form.phoneNumber.clsName}`
                                }
                                id="login phoneNumber"/>
                            <div className="invalid-feedback">
                                {errorPhone ? errorPhone : form.phoneNumber.errorMsg}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login password">
                                {form.password.label}
                            </label>
                            <input 
                                onChange={inpChangeHandler}
                                value={form.password.value}
                                name="password"
                                type={passwordType} 
                                className={"form-control " + form.password.clsName}
                                id={"login-password"}/>
                            <img 
                                onClick={passwordShow}
                                src={passwordType === "password" ? eyeUrl : hideUrl} 
                                alt="eye" 
                                className="Login_password-eye"/>
                            <div className="invalid-feedback">
                                {errorPassword ? errorPassword : form.password.errorMsg}
                            </div>
                        </div>
                    </>
                }
                <button 
                    type="submit" 
                    className="btn btn-primary mt-5 py-2 px-4">
                    Kirish
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = ({loading, errorMsg}) => ({
    loading,
    errorMsg
});

const mapDispatchToProps = dispatch => ({
    login: (form) => dispatch(actions.login(form))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);