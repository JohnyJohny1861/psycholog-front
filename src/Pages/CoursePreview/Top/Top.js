import React, {useEffect, useState} from 'react';
import './Top.css';

import Stars from '../../../Components/Lists/Courses/CourseCard/Stars/Stars';

const Top = ({title, headline, rate, boughtCount, lastUpdate}) => {
    const [date, setDate] = useState('');

    useEffect(() => {
        const time = new Date(lastUpdate);
        const month = time.getMonth() + 1;
        const year = time.getFullYear();
        setDate(`${month}/${year}`);
    }, [title, headline, rate, boughtCount, lastUpdate])
    return (
        <div className="CP_top">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 px-5">
                        <h1 className="CP-title">{title}</h1>
                        <h3 className="CP-headline">{headline}</h3>
                        <div className="CP-rating">
                            <Stars rate={Math.round(rate)}/>
                            <div className="CP-rBought">{boughtCount} marta sotib olingan</div>
                        </div>
                        <div className="CP-lastUpdate">
                            Oxirgi marta yangilandi {date} sanada
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Top;