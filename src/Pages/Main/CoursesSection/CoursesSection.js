import React, {useEffect, useState} from 'react';
import './CoursesSection.css';
import axios, {baseURL} from '../../../axios';
import { stringify } from 'query-string';

import Courses from '../../../Components/Lists/Courses/Courses';

const CoursesSection = ({title}) => {
    const [courses, setCourses] = useState([]);
    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let cancel = false;
        setLoader(true);
        let sort = '';
        let range = JSON.stringify([0, 9])

        switch(title) {
            case "Ko'p sotilgan darslar": {
                sort = JSON.stringify(['boughtCount', "DESC"]); break;
            }
            case "Yangi darslar": {
                sort = JSON.stringify(['createdAt', "DESC"]); break;
            }
            default: sort = JSON.stringify(['rating', "DESC"]);
        }

        const query = {
            sort,
            range,
        };
        !cancel && axios.get(`course?${stringify(query)}`)
            .then(res => {
                setCourses(res.data.data);
                setErr(null);
                setLoader(false);
            })
            .catch(err => {
                setErr('Serverda xatolik bor!');
                setLoader(false);
            })
    }, [title]);
    return (
        <div className="CoursesSection">
           <Courses 
                title={title} 
                baseURL={baseURL}
                err={err}
                courses={courses} 
                loader={loader}/> 
        </div>
    )
}

export default CoursesSection
