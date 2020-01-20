import React, {useRef, useState, useEffect} from 'react';
import './Navbar.css';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// Images
import logoUrl from '../../assets/logo-1.png';
import userUrl from '../../assets/user.svg';
import cartUrl from '../../assets/cart.svg';
import settingUrl from '../../assets/setting.svg';
import logoutUrl from '../../assets/logout-1.svg';

// COMPONENTS
// import User from '../../Components/Lists/User/User';
import Modal from '../../UI/Modal/Modal';
import SigupForm from '../../Components/Forms/Signup/Signup';
import LoginForm from '../../Components/Forms/Login/Login';

let timers = [];

const Navbar = (props) => {
    const [canClick, setCanClick] = useState(false);
    const [mobile, setMobile] = useState(window.innerWidth < 786 ? true : false);

    const navbarRef = useRef(null);
    const collapseRef = useRef(null);
    const toggledNavRef = useRef(null);

    useEffect(() => {
        let cancel = false;
        window.addEventListener('resize', () => {
            if(window.innerWidth < 768) {
                !cancel && setMobile(true)
            } else {
                !cancel && setMobile(false)
            }
        });
        window.addEventListener('scroll', (e) => {
            if(window.scrollY > 0) {
                navbarRef.current.classList.add('widerNavbar');
            } else {
                navbarRef.current.classList.remove('widerNavbar');
            }
        })
        return () => {
            cancel = true;
            timers.forEach(tmr => {
                clearTimeout(tmr);
            })
        }
    }, []);

    const sidebarShow = () => {
        if(window.innerWidth < 768) {
            collapseRef.current.classList.remove('hide');
            collapseRef.current.classList.add('show');
            
            toggledNavRef.current.classList.add('slideInLeft', 'animated');
    
            setCanClick(false);
            timers.push(
                setTimeout(() => {
                    toggledNavRef.current.classList.remove('slideInLeft', 'animated');
                    setCanClick(true);
                }, 870)
            )
        }
    }
    const sidebarHide = (e) => {
        const elClasses =  e.target.classList;
        if(
            window.innerWidth < 768 && 
            canClick && 
            !elClasses.contains('toggled-nav') &&
            !elClasses.contains('dropdown-toggle') &&
            !elClasses.contains('User-navItem')) {
            toggledNavRef.current.classList.add('fadeOutLeftBig', 'animated');
            timers.push(
                setTimeout(() => {
                    collapseRef.current.classList.remove('show');
                    collapseRef.current.classList.add('hide');
                    toggledNavRef.current.classList.remove('fadeOutLeftBig', 'animated');
                }, 300)
            )
        }
    }
    return (
        <nav className="navbar navbar-dark navbar-expand-md sticky-top" ref={navbarRef}>
            <Link 
                className="navbar-brand" 
                to="/">
                <img src={logoUrl} alt="logo" className="navbar-logo"/>
            </Link>

            <button 
                onClick={sidebarShow}
                className="navbar-toggler" 
                type="button">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div 
                className={`collapse navbar-collapse ${mobile && 'navbar-toggled hide'}`} 
                ref={collapseRef} 
                onClick={sidebarHide}>
                <ul 
                    className={`navbar-nav ${mobile && 'toggled-nav'}`} 
                    ref={toggledNavRef}>
                    {window.innerWidth < 768 &&
                    <li className="nav-item">
                        <Link 
                            className="navbar-brand " 
                            to="/">
                            <img 
                                src={logoUrl} 
                                alt="logo" 
                                className="navbar-logo"/>
                        </Link>
                    </li>}
                    <li className="nav-item ml-5">
                        <Link 
                            className="nav-link" 
                            to="/courses">Video Kurslar 
                        </Link>
                    </li>
                    <li className="nav-item ml-3">
                        <Link 
                            className="nav-link" 
                            to="/about">H.Yulduzxon haqida
                        </Link>
                    </li>
                    
                    {props.user ? 
                        <li className={`nav-item User-navItem ${!mobile && 'ml-auto'}`}>
                            <div className="btn-group">
                                <button 
                                    type="button" 
                                    className="btn dropdown-toggle" 
                                    data-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false">
                                    <img 
                                        className="img-fluid" 
                                        src={userUrl} alt="user" />
                                </button>
                                <div className="dropdown-menu">
                                    <Link 
                                        className="dropdown-item" 
                                        to="/cart">
                                            Savatcha 
                                            <img className="ml-2" src={cartUrl} alt="cart" />
                                    </Link>
                                    <Link 
                                        className="dropdown-item" 
                                        to="/setting">
                                            Sozlash 
                                            <img className="ml-2 py-1" src={settingUrl} alt="setting" />
                                    </Link>
                                    <hr />
                                    <Link 
                                        onClick={()=>{props.logout()}}
                                        className="dropdown-item" 
                                        to="/">
                                            Logout
                                            <img className="ml-2 py-1" src={logoutUrl} alt="setting" />
                                    </Link>
                                </div>
                            </div>
                        </li>
                    :
                    <>
                        <li className={`nav-item ${!mobile && 'ml-auto'}`}>
                            <Link 
                                data-toggle="modal" 
                                data-target="#signup"
                                className="nav-link signup" 
                                onClick={() => props.modalHandler(true)}
                                to="/">Registratsiya
                            </Link>
                            <Modal 
                                id="signup" 
                                title="Registratsiya forma" 
                                onClick={() => props.modalHandler(false)}
                                body={props.modal && <SigupForm />}/>
                        </li>
                        <li className={`nav-item ${!mobile && 'mx-3'}`}>
                            <Link 
                                data-toggle="modal" 
                                data-target="#login"
                                className="nav-link login" 
                                onClick={() => props.modalHandler(true)}
                                to="/">Kirish
                            </Link>
                            <Modal 
                                id="login" 
                                title="Login forma" 
                                onClick={() => props.modalHandler(false)}
                                body={props.modal && <LoginForm />}/>
                        </li>
                    </>    
                    }        
                </ul>
            </div>
        </nav>
    )
}

  

const mapStateToProps = ({user, modal}) => ({
    user,
    modal
});

const mapDispatchToProps = dispatch => ({
    modalHandler: (payload) => dispatch(actions.modalHandler(payload)),
    logout: () => dispatch(actions.logout())
})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);