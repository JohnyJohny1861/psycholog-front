import React, {useEffect, useRef, useState} from 'react';
import './Header.css';

import bg_1 from '../../../assets/1.jpg';
import bg_2 from '../../../assets/2.jpg';
import bg_3 from '../../../assets/3.jpg';

import telegram from '../../../assets/telegram-64.png';
import instagram from '../../../assets/instagram-64.png';
import youtube from '../../../assets/youtube-64.png';
import facebook from '../../../assets/facebook-64.png';

const infos = {
    info_1: {
        prof: "Tajribali psixolog",
        name: "Yulduzxon Holmurodova",
        text: "Auctor cursus dolor gravida laoreet mi nostra nunc placerat pretium primis rhoncus. Ac adipiscing aenean facilisis felis iaculis ipsum lacus magnis non quisque rhoncus ridiculus sociosqu tincidu.",
        iterator: 1,
        bg: bg_1
    },
    info_2: {
        prof: "Ichki instinkt",
        name: "Boy bo'lish sirlari",
        text: "Ipsum dolor sit amet consectetur, adipisicing elit. Similique omnis officia quisquam eius ducimus iure, fugiat pariatur fuga corporis? In recusandae iusto excepturi maxime eligendi!",
        iterator: 2,
        bg: bg_2
    },
    info_3: {
        prof: "Oila mavzusi",
        name: "Baxtli kelajak",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam amet iure, eos corporis magni quod eum, atque enim aliquid corrupti commodi eveniet iste quis similique quae velit maxime ea in.",
        iterator: 3,
        bg: bg_3
    }
} 

let timers = [];

export default () => {
    const [info, setInfo] = useState(infos.info_1);
    const [index, setIndex] = useState(1);
    const [canClick, setCanClick] = useState(true);
    const [leftStyle, setLeftStyle] = useState(window.screen.width < 786 ? true : false);

    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const infoRef = useRef(null);
    const profRef = useRef(null);
    const nameRef = useRef(null);
    const textRef = useRef(null);
    const info_iteratorRef = useRef(null);

    useEffect(() => {
        let cancel = false;
        
        toggleClass(leftRef.current, 900, 'fadeInDown', 'animated');
        toggleClass(rightRef.current, 900, 'fadeInUp', 'animated');
        toggleClass(profRef.current, 2500, 'fadeInLeft', 'animated');
        toggleClass(nameRef.current, 2500, 'fadeInRight', 'animated');
        toggleClass(textRef.current, 2500, 'bounceInDown', 'animated');
        toggleClass(info_iteratorRef.current, 2500, 'bounceInUp', 'animated');

        window.addEventListener('resize', () => {
            if(window.screen.width < 768) {
                !cancel && setLeftStyle(true)
            } else {
                !cancel && setLeftStyle(false)
            }
        });
        return () => {
            cancel = true;
            timers.forEach(tmr => {
                clearTimeout(tmr);
            })
        }
    }, []);

    const handleIterators = (type) => {
        if(canClick) {
            if(window.screen.width < 768) {
                toggleClass(leftRef.current, 900, 'fadeOut', 'animated');
            }
            toggleClass(infoRef.current, 900,
                type === "top" ? 'fadeOutUp' : 'fadeOutDown', 'animated');
            toggleClass(rightRef.current, 900,
                type === "top" ? 'fadeOutDown' : 'fadeOutUp', 'animated');
    
            timers.push(
                setTimeout(() => {
                    if(window.screen.width < 768) {
                        toggleClass(leftRef.current, 900, 'fadeIn', 'animated');
                    }
                    if(type === 'top') {
                        if(index === 1){
                            setInfo(infos[`info_${3}`]);
                            setIndex(3);
                        } else {
                            setInfo(infos[`info_${index-1}`]);
                            setIndex(index-1)
                        }
                        toggleClass(infoRef.current, 900, 'fadeInDown', 'animated');
                        toggleClass(rightRef.current, 900, 'fadeInUp', 'animated');
                    } else {
                        if(index >= 3) {
                            setInfo(infos[`info_${1}`]);
                            setIndex(1)}
                        else {
                            setInfo(infos[`info_${index+1}`]);
                            setIndex(index+1)
                        }
                        toggleClass(infoRef.current, 900, 'fadeInUp', 'animated');
                        toggleClass(rightRef.current, 900, 'fadeInDown', 'animated');
                    }
                }, 900)
            )
        }
    }

    const toggleClass = (el, time, ...args) => {
        setCanClick(false);
        if(el) {
            el.classList.add(...args);
            timers.push(
                setTimeout(() => {
                    el.classList.remove(...args);
                    setCanClick(true);
                }, time)
            )
        }
    }

    return (
        <div className="Header">
            <div className="row h-100">
                <div 
                    className="col-md-6 col-sm-12  Header_left" 
                    ref={leftRef}
                    style={{
                        backgroundImage: leftStyle && `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${info.bg})`,
                        backgroundPosition: "0 0",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                    <div className="Header_info-wrapper" ref={infoRef}>
                        <p className="info_prof" ref={profRef}>{info.prof}</p>
                        <h2 className="info_name" ref={nameRef}>
                            {info.name}
                            <span className="info_name-iterator">0{info.iterator}</span>
                        </h2>
                        <p className="info_text" ref={textRef}>
                            {info.text}
                        </p>
                        <a className="info_iterator" ref={info_iteratorRef} href="/">
                            <span className="info_iterator-text">To'liq ma'lumot</span>
                            <span className="info_iterator-array"></span>
                        </a>
                    </div>
                    <div className="Header_iterators" >
                        <div 
                            className="iterators-top-wrapper" 
                            onClick={() => handleIterators('top')}>
                            <div className="iterators-top"></div>
                        </div>
                        <div 
                            className="iterators-bottom-wrapper"
                            onClick={() => handleIterators('bottom')}>
                            <div className="iterators-bottom"></div>
                        </div>
                    </div>
                    <div className="Header_socials">
                        <a href="/telegram">
                            <img src={telegram} alt="tg"/>
                        </a>
                        <a 
                            href="https://www.instagram.com/masteryulduzxon/" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <img src={instagram} alt="tg"/>
                        </a>
                        
                        <a 
                            href="https://www.youtube.com/channel/UCXWlJPlVkkzako7nCjDJYkw" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <img src={youtube} alt="tg"/>
                        </a>
                        <a 
                            href="https://www.facebook.com/profile.php?id=100039957722295" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <img src={facebook} alt="tg"/>
                        </a>
                    </div>
                </div>
                <div 
                    className="col-md-6 d-none d-md-block Header_right" 
                    ref={rightRef}
                    style={{backgroundImage: `url(${info.bg})`}}>
                    
                </div>
            </div>
        </div>
    )
}
