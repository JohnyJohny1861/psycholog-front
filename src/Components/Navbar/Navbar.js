import React, {useRef, useState, useEffect} from 'react';
import './Navbar.css';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import User from './User/User';
import MyCourses from './MyCourses/MyCourses';
// Images
import logoUrl from '../../assets/logo.png';

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
        <nav id="nav" className="navbar navbar-dark navbar-expand-md sticky-top" ref={navbarRef}>
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

                    {mobile &&
                        <li className="nav-item">
                            <Link 
                                className="navbar-brand " 
                                to="/">
                                <img 
                                    src={logoUrl} 
                                    alt="logo" 
                                    className="navbar-logo"/>
                            </Link>
                        </li>
                    }
                    <li className={`nav-item ${!mobile ? 'ml-5' : 'my-4'}`}>
                        <Link 
                            className="nav-link" 
                            to="/courses">Video darslar 
                        </Link>
                    </li>
                    {props.user ? 
                    <>
                        <MyCourses mobile={mobile} user={props.user}/>
                        <User mobile={mobile} logout={props.logout} user={props.user}/>
                    </>
                    :
                    <>
                        <li className={`nav-item ${!mobile && 'ml-auto'}`}>
                            <Link 
                                className="nav-link signup" 
                                to="/signup">Registratsiya
                            </Link>
                        </li>
                        <li className={`nav-item ${!mobile && 'mx-3'}`}>
                            <Link 
                                className="nav-link login" 
                                to="/login">Kirish
                            </Link>
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
    logout: () => dispatch(actions.logout())
})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);