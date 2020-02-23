import React, {useState} from 'react';

import Loader from '../../../../UI/Loader/Loader';

import eyeUrl from '../../../../assets/eye-show.svg';
import hideUrl from '../../../../assets/eye-hide.svg';

const NewPassword = ({errorMsg, forgotNewPassword, loading}) => {
    const [form, setForm] = useState({
        password: { 
            label: 'Yangi parol',
            value: '', 
            errorMsg: null, 
            clsName: ''
        },
        confirmPassword: { 
            label: 'Parolni tasdiqlash',
            value: '', 
            errorMsg: null, 
            clsName: ''
        },
        smsCode: {
            label: 'Sms kodi',
            value: '', 
            errorMsg: null, 
            clsName: ''
        }
    });

    const [passwordType, setPasswordType] = useState('password');
    const passwordShow = () => setPasswordType(passwordType === 'password' ? 'text' : 'password');

    const inpChangeHandler = (e) => {
        const inp = e.target;
        if(inp.name === 'confirmPassword') {
            const errMsg = inp.value.length === 0 ? 
                `Yangi parolni tasdiqlang!` : 
                inp.value !== form.password.value ? 
                `Parol bir xil emas` : null;
            
            const clsName = `is-${(inp.value.length === 0 || inp.value !== form.password.value) ? 'in' : ''}valid`;
            setForm({
                ...form,
                confirmPassword: {
                    ...form.confirmPassword,
                    value: inp.value,
                    errorMsg: errMsg,
                    clsName: clsName
                }
            })
        } else {
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
            setForm(updatedForm);
        } else {
            forgotNewPassword({
                password: form.password.value,
                confirmPassword: form.confirmPassword.value,
                smsCode: form.smsCode.value
            })
        }
    }

    let smsErr;
    let passErr
    if(errorMsg) {
        if(errorMsg.includes('Sms')){
            smsErr = errorMsg;
        } else {
            passErr = errorMsg
        }
    }


    return (
        <>
            {
                loading ? <Loader /> : (
                    <form className="Login" onSubmit={submitHandler} noValidate>
                        {/* SMS CODE */}
                        <div className="form-group">
                            <label htmlFor="login-smsCode">
                                {form.smsCode.label}
                            </label>
                            <input 
                                onChange={inpChangeHandler}
                                value={form.smsCode.value}
                                name="smsCode"
                                type="text" 
                                className={
                                    `form-control ${smsErr ? 'is-invalid' : form.smsCode.clsName}`
                                }
                                id={"login-smsCode"}/>
                            <img 
                                onClick={passwordShow}
                                src={passwordType === "password" ? eyeUrl : hideUrl} 
                                alt="eye" 
                                className="Login_password-eye"/>
                            <div className="invalid-feedback">
                                {smsErr ? smsErr : form.smsCode.errorMsg}
                            </div>
                        </div>
                        
                        {/* PASSWORD */}
                        <div className="form-group">
                            <label htmlFor="login-password">
                                {form.password.label}
                            </label>
                            <input 
                                disabled={form.smsCode.value.length <= 4}
                                onChange={inpChangeHandler}
                                value={form.password.value}
                                name="password"
                                type={passwordType} 
                                className={
                                    `form-control ${passErr ? 'is-invalid' : form.password.clsName}`
                                }
                                id={"login-password"}/>
                            <img 
                                onClick={passwordShow}
                                src={passwordType === "password" ? eyeUrl : hideUrl} 
                                alt="eye" 
                                className="Login_password-eye"/>
                            <div className="invalid-feedback">
                                {passErr ? passErr : form.password.errorMsg}
                            </div>
                        </div>
                        
                        {/* CONFIRM PASSWORD */}
                        <div className="form-group">
                            <label htmlFor="login-confirmPassword">
                                {form.confirmPassword.label}
                            </label>
                            <input 
                                disabled={form.smsCode.value.length <= 4}
                                onChange={inpChangeHandler}
                                value={form.confirmPassword.value}
                                name="confirmPassword"
                                type={passwordType} 
                                className={
                                    `form-control ${passErr ? 'is-invalid' : form.confirmPassword.clsName}`
                                }
                                id={"login-confirmPassword"}/>
                            <img 
                                onClick={passwordShow}
                                src={passwordType === "password" ? eyeUrl : hideUrl} 
                                alt="eye" 
                                className="Login_password-eye"/>
                            <div className="invalid-feedback">
                                {passErr ? passErr : form.confirmPassword.errorMsg}
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="custom-btn mt-4 mb-5 py-2 px-4 align-self-stretch">
                                Yangi parolni o'rnatish
                        </button>
                    </form>)
            }
        </>
    )
}

export default NewPassword
