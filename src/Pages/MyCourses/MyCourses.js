import React, {useEffect, useState} from 'react';
import './MyCourses.css';

import {connect} from 'react-redux';
import {stringify} from 'query-string';
import axios, {baseURL} from '../../axios';

import bgImage from '../../assets/myCoursesBgImg.jpg';
import emptyCart from '../../assets/emptyCart.svg';

import Hidden from '../../UI/Hidden/Hidden'
import Empty from '../../UI/Empty/Empty'
import Heading from '../../UI/Heading/Heading';
import Courses from '../../Components/Lists/Courses/Courses';

const MyCourses = ({user}) => {
    const [courses, setCourses] = useState([]);
    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let cancel = false;
        if(!cancel && user){
            const courseIds = user.boughtCourses.map(c => c.courseId);
            setLoader(true);
            if(courseIds.length > 0) {
                axios.get(`course?${stringify({filter: JSON.stringify({ids: courseIds})})}`)
                    .then(res => {
                        const cs = res.data.data.map(c => {
                            let rating;
                            c.comments.forEach(cmt => {
                                if(cmt.userId === user._id){
                                    rating = cmt.rating
                                }
                            })
                            return {
                                ...c,
                                coursePrice: null,
                                rating
                            }
                        });
                        setCourses(cs);
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
    }, [user]);

    return (
        <div className="MyCourses">
            <Heading bgImage={bgImage} title="Mening video darsliklarim"/>
            <div className="MC_courses">
            {courses.length > 0 ? 
                <Courses 
                    baseURL={baseURL} 
                    err={err} 
                    courses={courses} 
                    loader={loader}/> : 
                <Empty 
                    text="Sizda darsliklar mavjud emas" 
                    imgUrl={emptyCart} />
                }
            </div>
            <Hidden />
        </div>
    )
}

const mapStateToProps = ({user}) => ({
    user
})

export default connect(mapStateToProps)(MyCourses)