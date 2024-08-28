import { useState } from "react"
import { useDispatch } from "react-redux";
import { postReview, getReviewsBySpotId } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './PostReviewFormModal.css'

export default function PostReviewFormModal({spotId, setRefresh}) {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const submitIsDisabled = review.length < 10 || stars === ''
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postReview({ review, stars}, spotId))
            .then(dispatch(getReviewsBySpotId(spotId)))
            .then(setRefresh(prev => prev + 1))
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
            <select 
                value={stars}
                onChange={e => setStars(e.target.value)}
            >
                <option value=""></option>
                <option value="1">★</option>
                <option value="2">★★</option>
                <option value="3">★★★</option>
                <option value="4">★★★★</option>
                <option value="5">★★★★★</option>
            </select>
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