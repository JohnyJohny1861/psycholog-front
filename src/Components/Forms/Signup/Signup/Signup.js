import React, {useState} from 'react';

import eyeUrl from '../../../../assets/eye-show.svg';
import hideUrl from '../../../../assets/eye-hide.svg';

import Loader from '../../../../UI/Loader/Loader';

const Signup = ({errorMsg, sendSms, loading}) => {
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
        }
    });
    const [passwordType, setPasswordType] = useState('password');

    const passwordShow = () => setPasswordType(passwordType === 'password' ? 'text' : 'password');

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
            setForm(updatedForm)
        } else {
            sendSms({
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                password: form.password.value,
                phoneNumber: form.phoneNumber.value
            }) 
        }
    }

    return (
        <>
            {
                loading ? <Loader /> : (
                    <form className="SignUp" onSubmit={submitHandler} noValidate>
                        <h1 className="heading-4--dark text-center mb-5">Ro'yhatdan o'tish</h1>
                        {/* FIRST NAME */}
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

                        {/* LAST NAME */}
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

                        {/* PASSWORD */}
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

                        {/* PHONE NUMBER */}
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
                    
                        <button 
                            type="submit" 
                            className="custom-btn mt-4 mb-5 py-2 px-4 align-self-stretch">
                                Sms jo'natish
                        </button>
                    </form>
                )
            }
        </>
    )
}

export  default Signup