import React from 'react';
import './Modal.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const Modal = (props) => {

    const clickHandler = (e) => {
        if(e.target.classList.contains('close') || e.target.getAttribute('aria-hidden') === "true"){
            props.modalHandler(false);
            // props.modalHandler(false);
            // props.onClick()
        }
    }

    return (
        <div 
            onClick={clickHandler}
            className="modal fade" 
            id={props.id} 
            tabIndex="-1" 
            role="dialog" 
            ref={props.reference}
            aria-labelledby={props.id + 'label'} 
            aria-hidden="true">
            <div 
                className="modal-dialog" 
                role="document" 
                style={{zIndex: "1052"}}>
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

const mapDispatchToProps = dispatch => ({
    modalHandler: (payload) => dispatch(actions.modalHandler(payload))
})

export default connect(null, mapDispatchToProps)(Modal)