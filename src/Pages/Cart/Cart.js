import React, {useState, useEffect} from 'react';
import './Cart.css';

import {stringify} from 'query-string';
import {connect} from 'react-redux';
import {user} from '../../store/actions';
import {withRouter, Link} from 'react-router-dom';
import axios, {baseURL} from '../../axios';

import cartBg from '../../assets/cartBg.jpg';
import emptyCart from '../../assets/emptyCart.svg';
import trash from '../../assets/trash.svg';
import Heading from '../../UI/Heading/Heading';
import Loader from '../../UI/Loader/Loader';
import Empty from '../../UI/Empty/Empty';

let newUser = null;

const Cart = ({user, setUser, history}) => {
    const [cart, setCart] = useState([]);
    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let cancel = false;
        if(!cancel && user){
            const courseIds = user.cart.map(c => c.courseId);
            if(courseIds.length > 0) {
                setLoader(true);
                let filter = JSON.stringify({ids: courseIds});
                const query = {
                    filter,
                };
                axios.get(`course?${stringify(query)}`)
                    .then(res => {
                        setCart(res.data.data);
                        setErr(null);
                        setLoader(false);
                    })
                    .catch(err => {
                        console.log(err)
                        setErr('Serverda xatolik bor!');
                        setLoader(false);
                    })
            }
        } 

        return () => cancel = true
    }, [user, setUser]);

    useEffect(() => {
        return () => {
            newUser && setUser(newUser);
        }
    }, [setUser]);

    const cartDelete = (e, courseId) => {
        e.stopPropagation();
        e.preventDefault();
        setLoader(true);
        axios('cartDelete', {
            method: "DELETE",
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: { courseId }
        })
            .then(res => {
                newUser = res.data.user;
                let newCart = cart.filter(course => course._id !== courseId);
                setCart(newCart);
                setLoader(false);
                setErr(null);
            })
            .catch(err => {
                console.log(err);
                setErr('Serverda xatolik bor!');
            })
    }

    const buyCourses = () => {
            axios(`boughtAdd`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                data: {
                    courseIds: JSON.stringify(cart.map(c => c._id))
                }
            })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                    setErr('Serverda xatolik bor!');
                    setLoader(false);
                })
    }

    let totalPrice = 0;
    cart.forEach(c => {
        totalPrice += c.coursePrice
    })
    return (
        <div className="Cart">
            <Heading bgImage={cartBg} title="Mening savatcham"/>    
            <div className="container">
                <div className="row Cart_bottom">
                    {
                        err ? <h1 className="Error">{err}</h1> :
                        loader ? <Loader /> :
                        cart.length > 0 ?
                        <>
                            <div className="col-md-9">
                                <h1 className="C_total">
                                    Jami darsliklar soni: {cart.length}
                                </h1>
                                <div className="C_courseWrapper">
                                    {cart.map(c => (
                                        <Link 
                                            to={`course-preview/${c._id}`} 
                                            className="C_course" key={c._id}>
                                            <img 
                                                className="C_posterImage" 
                                                src={baseURL + c.posterImage} 
                                                alt="" />
                                            <div className="C_infos">
                                                <h1 className="C_title">{c.title}</h1>
                                                <p className="C_category">{c.category}</p>
                                                <p className="C_coursePrice">{c.coursePrice} so'm</p>
                                            </div>
                                            <div 
                                                onClick={(e) => cartDelete(e, c._id)} 
                                                className="C_delete">
                                                    <img 
                                                        src={trash} 
                                                        alt=""/>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="C_Right">
                                    <h1 className="C_total">Jami summa:</h1>
                                    <h1 className="C_totalPrice">
                                        {totalPrice} so'm
                                    </h1>
                                    <button 
                                        onClick={buyCourses}
                                        className="custom-btn">
                                            Sotib olish
                                    </button>
                                </div>
                            </div>
                        </> :
                        <Empty text="Sizning savatchangiz bo'sh" imgUrl={emptyCart}/>
                    }
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setUser: (payload) => dispatch(user(payload))
});
const mapStateToProps = ({user}) => ({
    user
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));