import React, {useState} from 'react';
import Loader from '../../../../UI/Loader/Loader';

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
            forgotSendSms({
                phoneNumber: form.phoneNumber.value
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
                        <input 
                            onChange={inpChangeHandler}
                            value={form.phoneNumber.value}
                            name="phoneNumber"
                            type="text"
                            className={
                                `form-control ${errorMsg ? 'is-invalid' : form.phoneNumber.clsName}`
                            }
                            id="login phoneNumber"/>
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
