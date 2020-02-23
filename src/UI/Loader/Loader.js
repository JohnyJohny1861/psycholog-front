import React from 'react';
import './Loader.css';

export default ({white}) => {
    const style = white && ({
        borderColor: '#fff',
        border: '8px solid #fff'
    })
    return (
        <div className="lds-ring"><div style={style}></div><div></div><div></div><div></div></div>
    )
}
