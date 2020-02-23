import React, {useRef, useEffect} from 'react';
import './Bottom.css';

import checkUrl from '../../../assets/check.svg';

import Reviews from './Reviews/Reviews';
import RightCard from './RightCard/RightCard';

const Bottom = ({course=[], users=[]}) => {
    const descRef = useRef(null);
    useEffect(() => {
        descRef.current.innerHTML = course.description;
    }, [course])
    return (
        <div className="container CP-bottom">
            <div className="row">
                <div className="col-md-8 px-5 d-none d-md-block">
                    <div className="CP-WYL">
                        <div className="CP_title">Ushbu darsda o'rganasiz:</div>
                        <ul className="CP-WYL_items">
                            {course.whatYouLearn.map(el => (
                                <li className="CP-WYL_item" key={el._id}>
                                    <img className="CP-WYL_check" src={checkUrl} alt="check"/>
                                    <span className="CP-WYL_itemText">
                                        {el.skill}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="CP_title mt-5">Ushbu dars haqida qisqacha ma'lumot:</div>
                    <div className="CP-DESC" ref={descRef}></div>
                    <Reviews users={users}/>
                </div>

                <div className="col-md-4" style={{position: 'relative'}}>
                    <RightCard course={course}/>
                </div>
            </div>
        </div>
    )
}

export default Bottom;