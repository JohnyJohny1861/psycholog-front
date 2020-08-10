import React, {useState} from 'react';
import Loader from '../../../../UI/Loader/Loader';
import InputMask from 'react-input-mask';

export default ({errorMsg, setForgotPage, forgotSendSms, loading, setLoading}) => {
    const [form, setForm] = useState({
        phoneNumber: { 
            label: 'Parolni tiklash uchun telefon nomeri',
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
            console.log('err')
            setForm(updatedForm);
        } else {
            const phoneNumber = form.phoneNumber.value
                .replace("+(998)", "+998")
                .split(" ")
                .join("")
            forgotSendSms({
                phoneNumber
            })
        }
    }

    const inpChangeHandler = (e) => {
        let hasError = false;
        let errText = null;
        if(e.target.value.length === 0) {
            hasError = true;
            errText = `Telefon nomerini kiriting`
        } else if(e.target.name === 'phoneNumber') {
            hasError = e.target.value.includes("_");
            errText = ``
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

    const setForgotHandler = () => {
        setLoading(true);
        setTimeout(() => {
            setForgotPage(false);
            setLoading(false);
        }, 300);
    }

    return (
        <>
            {loading ? 
                <Loader /> : (
                <form className="Login" onSubmit={submitHandler} noValidate>
                    <h1 className="heading-4--dark text-center mb-5">Parolni unutdingizmi?</h1>
                    <div className="form-group">
                        <label htmlFor="login phoneNumber">
                            {form.phoneNumber.label}
                        </label>
                        <InputMask 
                            onChange={inpChangeHandler}
                            value={form.phoneNumber.value}
                            placeholder="+(998) __ ___ __ __"
                            name="phoneNumber"
                            type="text"
                            className={
                                `form-control ${errorMsg ? 'is-invalid' : form.phoneNumber.clsName}`
                            }
                            mask="+(\9\98) 99 999 99 99" 
                            maskChar="_" />
                        <div className="invalid-feedback">
                            {errorMsg || form.phoneNumber.errorMsg}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="custom-btn mt-4 mb-5 py-2 px-4 align-self-stretch">
                            Sms Kodini jo'natish
                    </button>

                    <div 
                        onClick={setForgotHandler}
                        className="Login_forgot-password">Kirish
                    </div>
                </form> )
            }
        </>
    )
}
