import React, {useState, useEffect} from 'react';
import Video from 'react-player';
import './ModalDialog.css';
import {stringify} from 'query-string';
import {baseURL} from '../../../../axios';

import playButton from '../../../../assets/play.svg';

const ModalDialog = ({modalBody, closeModal, course}) => {
    const [active, setActive] = useState({
        ...course.previews[0],
        path:`${baseURL}video/?${stringify({path: JSON.stringify(course.previews[0].previewUrl)})}`
    });
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if(!modalBody) {
            setPlaying(false);
            setActive({
                ...course.previews[0],
                path:`${baseURL}video/?${stringify({path: JSON.stringify(course.previews[0].previewUrl)})}`
            })
        }
    }, [modalBody, course]);

    const videoChange = (preview) => {
        setActive({
            ...preview,
            path: `${baseURL}video/?${stringify({path: JSON.stringify(preview.previewUrl)})}`
        });
        setPlaying(true);
    }

    return (
        <div 
            className="modal fade" 
            data-backdrop="static"
            id="staticBackdrop"
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="staticBackdropLabel" 
            aria-hidden="true">
            <div className="modal-dialog ModalDialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{course.title}</h5>
                        <button 
                            onClick={closeModal}
                            type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {modalBody && (
                        <div className="modal-body">
                            <Video 
                                playing={playing}
                                url={active.path}
                                controls
                                width="100%"/>
                            <h1 className="MD-S-title">Darslikning kirish videolari:</h1>
                            {course.previews.map(pv => (
                                <div 
                                    key={pv._id}
                                    onClick={() => videoChange(pv)}
                                    className={
                                        `MD-Sample ${pv._id === active._id ? 'MD-Active' : null}`
                                    }>
                                    <video 
                                        className="MD-S_img" 
                                        alt="img" 
                                        src={baseURL + pv.previewUrl}>
                                    </video>

                                    <div className="MD-S_content">
                                        <div className="MD-S_play">
                                            <img                        
                                                src={playButton}
                                                alt="play"/>
                                        </div>
                                        <div className="MD-S_title">
                                            {pv.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default ModalDialog;