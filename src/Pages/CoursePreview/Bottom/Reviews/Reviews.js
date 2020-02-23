import React from 'react';
import './Reviews.css';

import userUrl from '../../../../assets/user.svg';
import Stars from '../../../../Components/Lists/Courses/CourseCard/Stars/Stars';

import {baseURL} from '../../../../axios';

const Reviews = ({users}) => {
    return (
        <div className="CP-RVS mb-5">
            {users.length > 0 && 
            <>
                <h1 className="CP_title">Sotib olganlarning bildirgan fikri:</h1>
                {users.map((el, i) => (
                    <div className="CP-RVS_list" key={el._id}>
                        <div className="CP-RVS_reviewWrap">
                            <div className="reviewUser">
                                <div className="reviewUser-avatar">
                                    <img src={(baseURL + el.user.avatar) || userUrl} alt="user"/>
                                </div>
                                <div className="reviewUser-fullname">
                                    <span>{el.user.firstName}</span>
                                    <span>{el.user.lastName}</span>
                                </div>
                            </div>
                            <div className="reviewComment">
                                <Stars rate={el.rating}/>
                                <div className="reviewText">{el.text}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
            }
        </div>
    )
}

export default Reviews