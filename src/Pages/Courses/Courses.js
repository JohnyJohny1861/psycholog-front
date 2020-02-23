import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import './Courses.css';

import axios, {baseURL} from '../../axios';
import { stringify } from 'query-string';

import Hidden from '../../UI/Hidden/Hidden';
import Courses from '../../Components/Lists/Courses/Courses';
import Pagination from './Pagination/Pagination';
import CoursesSection from '../Main/CoursesSection/CoursesSection';

const PER_PAGE = 10

const CoursesPage = ({categories=[]}) => {
    const [title, setTitle] = useState('Barcha darslar');
    const [courses, setCourses] = useState([]);
    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState(null);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        let cancel = false;
        setLoader(true);
        let sort = '';
        let filter = '';
        let range = JSON.stringify([
            (page - 1) * PER_PAGE,
            page * PER_PAGE - 1,
        ])

        switch(title){
            case "Barcha darslar": {sort = ''; break
            }
            default: {
                filter = JSON.stringify({'category': title});
            }
        }
        const query = {
            sort,
            range,
            filter,
        };
        !cancel && axios.get(`course?${stringify(query)}`)
            .then(res => {
                setTotal(Math.ceil(res.data.total / PER_PAGE));
                setCourses(res.data.data);
                setErr(null);
                setLoader(false);
            })
            .catch(err => {
                setErr('Serverda xatolik bor!');
                setLoader(false);
            })
        return () => cancel = true
    }, [title, page]);

    const categoryHandler = (cat) => {
        setTitle(cat);
        setPage(1);
    }

    return (
        <div className="CoursesPage">
            <div className="CoursePage_categories">
                {categories && categories.map(cat => (
                    <div 
                        key={cat} 
                        className={`CoursePage_categories-cat ${title === cat ? 'CatActive': ''}`}
                        onClick={(e) => categoryHandler(cat)}>
                        {cat}
                    </div>
                ))}
            </div>
            <Courses 
                title={title} 
                baseURL={baseURL} 
                loader={loader}
                err={err} 
                courses={courses}/>
            {total > 1 ? <Pagination total={total} setPage={setPage} page={page}/> : null }

            <CoursesSection title="Ratingi yuqori darslar"/>
            <CoursesSection title="Ko'p sotilgan darslar"/> 
            <CoursesSection title="Yangi darslar"/>  
            <Hidden />
        </div>
    )
}

const mapStateToProps = ({categories}) => ({
    categories
})

export default connect(mapStateToProps)(CoursesPage);