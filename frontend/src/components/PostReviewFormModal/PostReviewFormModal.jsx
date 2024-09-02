import { useState } from "react"
import { useDispatch } from "react-redux";
import { postReview, getReviewsBySpotId } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './PostReviewFormModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as star0 } from '@fortawesome/free-regular-svg-icons'
import { faStar as star1 } from '@fortawesome/free-solid-svg-icons'

export default function PostReviewFormModal({spotId}) {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [showStars, setShowStars] = useState(0);
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const hover = (n) => () => setShowStars(n);
    const clickStar = (n) => (e) => {
        e.preventDefault();
        setStars(n);
    }

    const submitIsDisabled = review.length < 10 || !stars
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postReview({ review, stars}, spotId))
            .then(dispatch(getReviewsBySpotId(spotId)))
            .then(closeModal)
            .catch(e => setError(e.message));
    }
    
    return <div className="post-review">
        <h1>How was your stay?</h1>
        {error?.length ? <p className="errors">{error}</p> : null}
        <form className="post-review-form">
            <textarea 
                placeholder="Leave your review here…"
                value={review}
                onChange={e => setReview(e.target.value)}
            />
            <label>
                {[1, 2, 3, 4, 5].map(n => <button 
                    key={String(n)} 
                    onPointerEnter={hover(n)}
                    onPointerLeave={hover(stars)}
                    onClick={clickStar(n)}
                    ><FontAwesomeIcon icon={showStars >= n ? star1 : star0} /></button>)
                }
                
            Stars
            </label>
        
            <button
                type='submit'
                className="real-button"
                onClick={handleSubmit}
                disabled={submitIsDisabled}
            >
                Submit Your Review
            </button>
        </form>
    </div>
}