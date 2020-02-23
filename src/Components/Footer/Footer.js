import React from 'react'
import './Footer.css';
// import logoUrl from '../../assets/logo.png';
import telegram from '../../assets/social-1.png';
import instagram from '../../assets/social-2.png';
import youtube from '../../assets/social-3.png';
import facebook from '../../assets/social-4.png';

export default () => {
    return (
        <div className="Footer-wrapper">
            <div className="Footer container">
                <p>
                    <span className="Footer_companyname">Sanodor</span> 
                    &copy; 2010-{new Date().getFullYear()} sertifikatlashtirilgan ta'lim markazi 
                </p>

                <div className="Footer_socials">
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
        </div>
    )
}
