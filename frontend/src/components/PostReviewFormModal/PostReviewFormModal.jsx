import { useState } from "react"

export default function PostReviewFormModal() {
    const [comment, setComment] = useState('');
    const [stars, setStars] = useState('');

    const submitIsDisabled = comment.length < 10 || stars === ''
    
    return <>
        <h1>How was your stay?</h1>
        <form>
            <textarea 
                placeholder="Leave your review here…"
                value={comment}
                onChange={e => setComment(e.target.value)}
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
                onClick={e => e.preventDefault()}
                disabled={submitIsDisabled}
            >
                Submit Your Review
            </button>
        </form>
    </>
}