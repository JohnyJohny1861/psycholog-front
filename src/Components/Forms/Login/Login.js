import React, {useState} from 'react';
import './Login.css';

import Loader from '../../../UI/Loader/Loader';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

const Login = (props) => {
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
            props.login(form);
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
    let formGroups = [];
    for(let key in form) {
        const f = form[key];
        formGroups.push(
            <div className="form-group" key={f.label + new Date().getTime()}>
                <label htmlFor={"login" + key}>{f.label}</label>
                <input 
                    onChange={inpChangeHandler}
                    value={f.value}
                    name={key}
                    type={key === 'password' ? 'password' : 'text'} 
                    className={"form-control " + f.clsName}
                    id={"login" + key}/>
                <div className="invalid-feedback">
                    {f.errorMsg}
                </div>
            </div>
        )
    }

    return (
        <div>
            <form className="Login" onSubmit={submitHandler} noValidate>
                {
                    props.loading ? <Loader /> :
                    formGroups
                }
                <button 
                    type="submit" 
                    className="btn btn-primary mt-5 py-2 px-4">
                        {props.message ? 'Kirish' : "Sms Kodni jo'natish"}
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