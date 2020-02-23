import React from 'react';
import './Story.css';
import bg from '../../../assets/story-back.jpg';
import story1 from '../../../assets/story-1.jpeg';
import story2 from '../../../assets/story2.jpeg';

import {Link} from 'react-router-dom';

const storyPictures = {
    backgroundImage: `
        linear-gradient(rgba(198, 153, 99, 0.5), 
        rgba(198, 153, 99, 0.5)), 
        url("${bg}")`
};

const Story = () => {
    return (
        <div className="row">
            <div className="story__pictures col-md-6 col-12" style={storyPictures}>
                <img src={story1} alt="" className="story__img--1" />
                <img src={story2} alt="" className="story__img--2" />
            </div>
            <div className="story__content col-md-6 col-12">
                <h3 className="heading-3 mb-sm">Sanodor bu sizning baxt kalitingiz</h3>
                <h2 className="heading-2 heading-2--dark mb-md">&ldquo;Xayotingizdagi muhim qarorlarni qabul qilish vaqti keldi&rdquo;</h2>
                <p className="story__text">Sanodor ta'lim markazida siz o'zingizni qiziqtirgan barcha mavzulardagi video kurslarni topishingiz aniq bizni kuzatishda davom eting</p>
                <Link to="/courses" className="custom-btn">Video darsliklarni ko'rish</Link>
            </div>
        </div>
    )
}


export default Story;