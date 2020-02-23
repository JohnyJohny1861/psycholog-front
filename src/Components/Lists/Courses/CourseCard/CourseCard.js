import React from 'react';
import './CourseCard.css';
import {Link, withRouter} from 'react-router-dom';

import Stars from './Stars/Stars';

const CourseCard = ({posterImg, title, headline, rate, price, id, rateText, history}) => {
    const to = history.location.pathname.includes('my-courses') ? 'course' : 'course-preview'
    return (
        <Link to={`${to}/${id}`} className="card Course">
            <div className="Course_img-wrapper">
                <img src={posterImg} className="card-img-top Course_img" alt="c"/>
            </div>
            <div className="card-body">
                <h2 className="card-title Course_title" >
                    {title}
                </h2>
                <p className="Course_description">
                    {headline}
                </p>
                <Stars rate={Math.round(rate)}/>
                {rateText && 
                    <span className="Course_rateText">
                        Sizning baxoyingiz
                    </span>
                }

                {price && <div className="Course_price">
                    {price} so'm
                </div> }
            </div>
        </Link>
    )
}

export default withRouter(CourseCard);