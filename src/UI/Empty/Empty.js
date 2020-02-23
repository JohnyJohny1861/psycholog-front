import React from 'react';
import './Empty.css';
import {Link} from 'react-router-dom';

const Empty = ({imgUrl, text}) => {
    return (
        <div className="Empty">
            <img src={imgUrl} alt="emptyCart"/>
            <h1>{text}</h1>
            <Link className="btn btn-danger" to="/courses">
                Video darsliklar
            </Link>
        </div>
    )
}

export default Empty