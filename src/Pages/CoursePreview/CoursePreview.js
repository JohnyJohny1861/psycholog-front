import React, {useEffect, useState} from 'react';

import {withRouter} from 'react-router-dom';
import axios from '../../axios';
import {stringify} from 'query-string';

import Loader from '../../UI/Loader/Loader';
import Top from './Top/Top';
import Bottom from './Bottom/Bottom';

const loaderStyle = {
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const CoursePreview = ({history}) => {
    const [course, setCourse] = useState(null);
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let cancel = false;
        let comments = [];
        const id = history.location.pathname.split('course-preview/')[1];
        setLoader(true);
        !cancel && axios(`course/${id}`)
            .then(res => {
                setCourse(res.data.data);
                comments = res.data.data.comments;
                const query = {
                    filter: JSON.stringify({ ids: comments.map(c => c.userId) })
                };
                return axios(`user?${stringify(query)}`);
            })
            .then(res => {
                setUsers(comments.map((cmt, i) => ({
                    ...cmt,
                    user: res.data.data[i]
                })));
                setLoader(false);
                setErr(null);
            })
            .catch(err => {
                setLoader(false);
                setErr("Serverda xatolik bor!")
            })
        return () => cancel = true;
    }, [history])

    return (
        loader ?  <div style={loaderStyle}><Loader /></div> : 
        err ? <h1>{err}</h1> :
        course &&
        <>
            <Top 
                title={course.title}
                headline={course.headline}
                rate={course.rating}
                boughtCount={course.boughtCount}
                lastUpdate={course.updatedAt}/>
            <Bottom 
                course={course}
                users={users}/>
        </>
    )
}

export default withRouter(CoursePreview);