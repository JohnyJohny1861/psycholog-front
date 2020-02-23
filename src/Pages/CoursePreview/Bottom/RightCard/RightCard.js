import React, {useState, useEffect} from 'react';
import './RightCard.css';
import {connect} from 'react-redux';
import axios from '../../../../axios';
import {user} from '../../../../store/actions';
import {Link, withRouter} from 'react-router-dom';

import {baseURL} from '../../../../axios';
import playButton from '../../../../assets/play.svg';

import Loader from '../../../../UI/Loader/Loader';
import ModalDialog from './ModalDialog'

const RightCard = ({course, user, setUser, history}) => {
    const [modalBody, setModalBody] = useState(false);
    const [BC, setBC] = useState(-1);
    const [cart, setCart] = useState(-1);
    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState(null);
    const [alertMsg, setAlertMsg] = useState(null);

    useEffect(() => {
        if(user) {
            const bought = user.boughtCourses.findIndex(c => c.courseId === course._id);
            const c = user.cart.findIndex(c => c.courseId === course._id);
            setBC(bought);
            setCart(c);
        }
    }, [course, user])

    const openModal = () => {
        setModalBody(true);
    }

    const closeModal = () => {
        setModalBody(false)
    }

    const addToCart = () => {
        const options = {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: {
                courseId: course._id
            }
        }
        setLoader(true);
        axios('cartAdd', options)
            .then(res => {
                setCart(user.cart.length + 1);
                setLoader(false);
                setErr(null);
                setAlertMsg(res.data.message);
                setTimeout(() => {
                    setUser(res.data.user);
                    history.push('/cart')
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                setLoader(false);
                setErr('Serverda xatolik bor!');
                setTimeout(() => setErr(null), 2000);
            });
    }

    const alertSuccess = (
        <div className="alert alert-success RC-Alert" role="alert">
            <h4 className="alert-heading">{alertMsg}</h4>
        </div>
    )
    const alertError = (
        <div className="alert alert-danger RC-Alert" role="alert">
            <h4 className="alert-heading">{err}</h4>
        </div>
    )

    return (
        <>
        {alertMsg ? alertSuccess : err ? alertError : null}
        <div className="card RigtCard">
            <button 
                onClick={openModal}
                className="RC-imgWrapper" 
                type="button" 
                data-toggle="modal" 
                data-target="#staticBackdrop">
                <img 
                    src={baseURL + course.posterImage} 
                    className="card-img-top p-2" 
                    alt="img"/>
                <div className="RC_play">
                    <img                        
                        src={playButton}
                        alt="play"/>
                </div>
            </button>
            <ModalDialog modalBody={modalBody} closeModal={closeModal} course={course}/>
            <div className="card-body RC-body">
                {BC === -1 && <h3 className="card-title CP-CPrice">{course.coursePrice} so'm</h3> }
                {
                    (BC !== -1) ? (
                        <Link 
                            to={`/course/${course._id}`}
                            className="custom-btn mt-5 mb-4">Darsni ko'rish
                        </Link>
                    ) : 
                    (cart === -1) ? (
                        <>
                        <button 
                            onClick={addToCart}
                            className="custom-btn mt-5 mb-4">
                                {loader ? <Loader /> : "Karzinkaga qo'shish"}
                        </button>
                        <Link 
                            to={`/payment${course._id}`}
                            className="custom-btn-2">Sotib olish
                        </Link>
                        </>
                    ) : (
                        <>
                        <Link 
                            to="/cart"
                            className="custom-btn mt-5 mb-4">Karzinkani ko'rish
                        </Link>
                        <Link 
                            to={`/payment${course._id}`}
                            className="custom-btn-2">Sotib olish
                        </Link>
                        </>
                    )}
            </div>
        </div>
        </>
    )
}

const mapStateToProps = ({user}) => ({
    user
})

const mapDispatchToProps = dispatch => ({
    setUser: (payload) => dispatch(user(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RightCard));