import React, {useEffect, useState} from 'react';
import './SendSms.css';

import Loader from '../../../../UI/Loader/Loader';

const SendSms = ({message, errorMsg, sendSms, signup, loading}) => {
    const [timer, setTimer] = useState(10);
    const [form, setForm] = useState({
        smsCode: {
            label: `Sms Kodi`,
            value: '',
            errorMsg: null,
            clsName: ''
        }
    });

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if(timer > 0) {
                setTimer(timer-1);
            }
        }, 1000);
        return () => clearTimeout(timeOut);
    }, [timer]);

    const inpChangeHandler = (e) => {
        let hasError = false;
        let errText = null;
        if(e.target.value.length === 0) {
            hasError = true;
            errText = `Sms ni kiriting`
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
        const f = form.smsCode;
        if(f.value.length <= 0){
            updatedForm = {
                ...updatedForm,
                smsCode: {
                    ...f,
                    errorMsg: `${f.label} ni kiriting`,
                    clsName: `is-invalid`
                }
            }
            err = true;
        }
        setForm(updatedForm);
        if(err) {
            setForm(updatedForm)
        } else {
            signup(form.smsCode.value);
        }
    }

    const reSendSms = () => {
        if(timer === 0){
            sendSms && sendSms();
            setTimer(10)
        }
    }

    return (
        <>
            {
                loading ? <Loader /> : (
                    <form className="SignUp" onSubmit={submitHandler} noValidate> 
                        <div className="form-group SendSms">
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
                            <button 
                                type="button"
                                onClick={reSendSms} 
                                className="Message_timer btn">
                                    Qaytadan jonatish? {timer}
                            </button>
                        </div> 
                        <button 
                            type="submit" 
                            className="custom-btn mt-4 mb-5 py-2 px-4 align-self-stretch">
                                Registratsiyadan o'tish
                        </button>
                    </form>
                )
            }
        </>
    )
}

export default SendSms