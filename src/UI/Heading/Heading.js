import React from 'react';
import './Heading.css';

const Heading = ({bgImage, title}) => {
    return (
        <section id="page-header" style={{backgroundImage: `url(${bgImage})`}}>
            <div id="cover">
                <div className="container">
                    <div className="row">
                    <div className="col-md-6 m-auto text-center">
                        <h1>{title}</h1>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Heading;