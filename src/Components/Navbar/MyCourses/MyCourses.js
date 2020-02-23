import React, {useState, useEffect, useRef} from 'react';
import './MyCourses.css';
import { stringify } from 'query-string';
import axios, {baseURL} from '../../../axios';
import {Link} from 'react-router-dom';

import playButton from '../../../assets/play.svg';
import Loader from '../../../UI/Loader/Loader';

const MyCourses = ({mobile, user}) => {
    const [myC, setMyC] = useState([]);
    const [loader, setLoader] = useState(false);
    const dropMenuRef = useRef(null);
    useEffect(() => {
        let cancel = false;
        const query = {
            filter: JSON.stringify({ids: user.boughtCourses.map(c => c.courseId)}),
        };
        if(user.boughtCourses.length > 0 && !cancel) {
            setLoader(true);
            axios.get(`course?${stringify(query)}`)
                .then(res => {
                    const courses = res.data.data.map(c => (
                        <Link 
                            key={c._id} 
                            className="dropdown-item" 
                            to={`/course/${c._id}`}>
                            <div className="MyCourses_left">
                                <img 
                                    className="MyCourses_posterImage" 
                                    src={baseURL + c.posterImage} 
                                    alt="img"/>
                                <img 
                                    className="MyCourses_play"
                                    src={playButton}
                                    alt="play"/>
                            </div>
                            <div className="MyCourses_right">
                                <h2 className="MyCourses_title">{c.title}</h2>
                                <p className="MyCourses_category">{c.category}</p>
                            </div>
                        </Link>
                    ))
                    setMyC(courses);
                    setLoader(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoader(false);
                })
        } else {setMyC('Kurs sotib olmagan')}
        return () => cancel = true;
    }, [mobile, user])
    
    const toggleDropMenu = (payload) => {
        if(payload) {
            dropMenuRef.current.classList.add('show');
        } else {
            dropMenuRef.current.classList.remove('show');
        }
    }
    return (
        <li className={`MyCourses-navItem nav-item ${!mobile ? 'ml-auto' : 'mb-4'}`}>
            <div 
                className="btn-group" 
                onMouseEnter={() => toggleDropMenu(true)} 
                onMouseLeave={() => toggleDropMenu(false)}>
                <Link type="button" className="btn dropdown-toggle" to="/my-courses">
                    Mening darslarim
                </Link>
                <div className="dropdown-menu" ref={dropMenuRef}>
                    {
                        loader ? <Loader white/> : myC
                    }
                </div>
            </div>
        </li>
    )
}
export default MyCourses;