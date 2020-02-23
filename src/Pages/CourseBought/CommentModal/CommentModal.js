import React, {useState} from 'react';
import './CommentModal.css';
import Rating from 'react-rating';

import star from '../../../assets/star.svg';
import star_empty from '../../../assets/star_empty.svg';

const CommentModal = ({saveComment, modalOpenerRef, modalCloserRef}) => {
    const [ratingText, setRatingText] = useState('Darajani belgilang!');
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');

    const changeRateText = (e) => {
        switch(e){
            case 1 : { setRatingText('Darslik yomon'); break; }
            case 2 : { setRatingText('Darslikda kamchiliklar mavjud'); break; }
            case 3 : { setRatingText('Darslik yaxshi '); break; }
            case 4 : { setRatingText('Darslik juda yaxshi'); break; }
            case 5 : { setRatingText("Darslik alo darajada ko'p narsa o'rgansa bo'ladi"); break; }
            default: {  break; }
        }
    }

    const onClick = (e) => {
        changeRateText(e);
        setRating(e);
    }
    
    const onChange = e => {
        setText(e.target.value)
    }

    const closeModal = () => {
        setRating(0);
        setText('');
        setRatingText('Darajani belgilang!');
    }

    return (
        <>
        <button 
            ref={modalOpenerRef}
            className="CM-toggler" 
            type="button" 
            data-toggle="modal" 
            data-target="#CM">
        </button>
        <div 
            className="modal fade CM" 
            id="CM" 
            data-backdrop="static" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="CMLabel" 
            aria-hidden="true">
            <div className="modal-dialog CM-dialog" role="document">
                <div className="modal-content CM-content">

                    <div className="modal-header CM-header">
                        <h5 
                            className="modal-title CM-title" 
                            id="CMLabel">Ushbu darslikni baholang!
                        </h5>
                        <button 
                            ref={modalCloserRef}
                            type="button" 
                            onClick={closeModal}
                            className="close CM-close" 
                            data-dismiss="modal" 
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body CM-body">
                        <h3 className="CM-ratingText">{ratingText}</h3>
                        <Rating
                            start={0}
                            stop={5}
                            step={1}
                            initialRating={rating}
                            onClick={onClick}
                            emptySymbol={
                                <img 
                                    src={star_empty} 
                                    className="icon CM-icon" 
                                    alt="i"/>
                            }
                            fullSymbol={
                                <img 
                                    src={star} 
                                    className="icon CM-icon" 
                                    alt="i"/>
                            }/>
                            <textarea 
                                onChange={onChange}
                                placeholder={ratingText}
                                className="form-control CM-text"
                                value={text} 
                                rows="5">
                            </textarea>
                    </div>
                    <div className="modal-footer CM-footer">
                        <button 
                            onClick={() => saveComment(rating, text, ratingText)}
                            type="button" 
                            className="custom-btn">Saqlash
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CommentModal;