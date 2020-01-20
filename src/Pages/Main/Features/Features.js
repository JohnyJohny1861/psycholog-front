import React from 'react';
import './Features.css';

import feature_1 from '../../../assets/1.jpg';
import feature_2 from '../../../assets/feature-2.svg';
import feature_3 from '../../../assets/feature-3.svg';
import feature_4 from '../../../assets/feature-4.svg';
import feature_5 from '../../../assets/feature-5.svg';
import feature_6 from '../../../assets/feature-6.svg';

const Features = () => {
    return (
        <div className="features container">
            <div className="feature">
                <img className="feature__icon" href={feature_1} alt="icon" />
                <h4 className="heading-4 heading-4--dark">Xavotirlanmaslik</h4>
                <p className="feature__text">Agar muammoni yechish mumkin bo‘lsa, xavotirga o‘rin yo‘q. Agar uni yechish imkoni bo‘lmasa xavotirdan foyda yo‘q</p>
            </div>

            <div className="feature">
                <svg className="feature__icon">
                    <use xlinkHref={feature_2}></use>
                </svg>
                <h4 className="heading-4 heading-4--dark">Do'stlik</h4>
                <p className="feature__text">Yaxshi odamning dushmani bo‘lish, yomon odamning do‘sti bo‘lishdan afzal.</p>
            </div>

            <div className="feature">
                <svg className="feature__icon">
                    <use xlinkHref={feature_3}></use>
                </svg>
                <h4 className="heading-4 heading-4--dark">Ilm olish</h4>
                <p className="feature__text">Yuqoriga intilishni xohlagan odam narvonni ixtiro qiladi.</p>
            </div>

            <div className="feature">
                <svg className="feature__icon">
                    <use xlinkHref={feature_4}></use>
                </svg>
                <h4 className="heading-4 heading-4--dark">Vaqtni qadrlang</h4>
                <p className="feature__text">10 yoshda mo‘jiza, 20 da daho, 30 dan keyin esa oddiy odam.</p>
            </div>

            <div className="feature">
                <svg className="feature__icon">
                    <use xlinkHref={feature_5}></use>
                </svg>
                <h4 className="heading-4 heading-4--dark">Oilani asrash</h4>
                <p className="feature__text">Farzandlar gardaniga tushgan eng katta qayg‘uli vazifa, bu ota-onalarining yashay olmagan hayotini yashashdir.</p>
            </div>

            <div className="feature">
                <svg className="feature__icon">
                    <use xlinkHref={feature_6}></use>
                </svg>
                <h4 className="heading-4 heading-4--dark">Ziddiyat asosi</h4>
                <p className="feature__text">O‘z ichingdagi qorong‘ulikni tushuna olsang, boshqalarnikini tushunish unchalik qiyin bo‘lmaydi.</p>
            </div>
        </div>
    )
}

export default Features
