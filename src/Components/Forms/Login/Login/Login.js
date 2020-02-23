import React, {useState} from 'react';
import './Login.css';

import Loader from '../../../../UI/Loader/Loader';

import eyeUrl from '../../../../assets/eye-show.svg';
import hideUrl from '../../../../assets/eye-hide.svg';

const Login = ({errorMsg, login, setForgotPage, loading, setLoading}) => {
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

    const submitHandler = async(e) => {
        e.preventDefault();
        let err = false;
        let updatedForm = {...form};
        for(let key in form) {
            const f = form[key];
            if(f.value.length === 0){
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

        if(err || form.password.value.length < 6) {
            setForm(updatedForm);
        } else {
            login({
                phoneNumber: form.phoneNumber.value,
                password: form.password.value
            });
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

    const forgotPageHandler = () => {
        setLoading(true);
        setTimeout(() => {
            setForgotPage(true);
            setLoading(false);
        }, 500)
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
        <>
            {loading ? 
                <Loader /> : (
                <form className="Login" onSubmit={submitHandler} noValidate>
                    <h1 className="heading-4--dark text-center mb-5">Tizimga kirish</h1>

                    <div className="form-group">
                        <label htmlFor="login-phoneNumber">
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
                            id="login-phoneNumber"/>
                        <div className="invalid-feedback">
                            {errorPhone ? errorPhone : form.phoneNumber.errorMsg}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="login--password">
                            {form.password.label}
                        </label>
                        <input 
                            onChange={inpChangeHandler}
                            value={form.password.value}
                            name="password"
                            type={passwordType} 
                            className={
                                `form-control ${errorPassword ? 'is-invalid' : form.password.clsName}`
                            }
                            id={"login--password"}/>
                        <img 
                            onClick={passwordShow}
                            src={passwordType === "password" ? eyeUrl : hideUrl} 
                            alt="eye" 
                            className="Login_password-eye"/>
                        <div className="invalid-feedback">
                            {errorPassword ? errorPassword : form.password.errorMsg}
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="custom-btn mt-4 mb-5 py-2 px-4 align-self-stretch">
                            Kirish
                    </button>

                    <div 
                        onClick={forgotPageHandler}
                        className="Login_forgot-password text-center">Kiraolmayapman
                    </div>
                </form>)
            }
        </>
    )
}

export default Login;
