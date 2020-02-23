import React from 'react';
import './Stars.css';

import starUrl from '../../../../../assets/star.svg';
import starEmptyUrl from '../../../../../assets/star_empty.svg';

const Stars = ({rate}) => {
    const stars = [];
    for(let i=1; i<=5; i++) {
        if(i <= rate){
            stars.push(
                <img 
                    key={i + new Date().getTime()} 
                    className="Stars_star" 
                    src={starUrl} 
                    alt="."/>
            );
        } else {
            stars.push(
                <img 
                    key={i + new Date().getTime()} 
                    className="Stars_star" 
                    src={starEmptyUrl} 
                    alt="."/>
            );
        }
    }
    return (
        <div className="Stars">
            {stars}
        </div>
    )
}

export default Stars
