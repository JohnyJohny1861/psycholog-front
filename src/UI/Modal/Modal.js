import React, {useRef, useEffect} from 'react';
import './Modal.css';

export default (props) => {
    return (
        <div 
            className="modal fade" 
            id={props.id} 
            tabIndex="-1" 
            role="dialog" 
            ref={props.reference}
            onClick={() => console.log('Modal')}
            aria-labelledby={props.id + 'label'} 
            aria-hidden="true">
            <div className="modal-dialog" role="document" style={{zIndex: "1050"}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark" id={props.id + 'label'}>{props.title}</h5>
                        <button 
                            type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.body}
                    </div>
                </div>
            </div>
        </div>
    )
}
