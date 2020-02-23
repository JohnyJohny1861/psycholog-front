import React from 'react';
import './Courses.css';

import CourseCard from './CourseCard/CourseCard';
import Loader from '../../../UI/Loader/Loader';

export default ({title, baseURL, err, courses=[], loader}) => {

    return ( 
        <div className="Main_Courses container px-0">
            {err ? <h1 className="heading-2">{err}</h1> :
            <>
                {title && <h1 className="Main_Courses-title heading-2 mb-md text-center">
                    {title}
                </h1> }
                <div className="d-flex flex-wrap justify-content-center">
                    {
                        loader ? <Loader /> :
                        courses.map(c => {
                            return (
                                <CourseCard
                                    key={c.id}
                                    id={c.id}
                                    posterImg={baseURL + c.posterImage}
                                    price={c.coursePrice} 
                                    title={c.title}
                                    headline={c.headline}
                                    rateText={!title}
                                    rate={c.rating}/>
                            )
                        })
                    }
                </div>
            </>
            }
        </div>
    )
}
