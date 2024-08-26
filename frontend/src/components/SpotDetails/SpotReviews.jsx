import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getReviewsBySpotId } from "../../store/reviews";
import ReviewTile from "./ReviewTile";

export default function SpotReviews({spot, reviewInfo}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReviewsBySpotId(spot.id));
    }, [dispatch, spot.id]);
    const allReviews = useSelector(state => state.reviews);
    const user = useSelector(state => state.session.user);
    const reviews = Object.values(allReviews).filter(r => r.spotId === spot.id).sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);

    const shouldPromptReview = user && user.id !== spot.ownerId;
        
    return <div className="spot-details-reviews">
        <h2>{reviewInfo}</h2>
        {shouldPromptReview ? <button>Post Your Review</button> : null}
        {reviews.map(r => <ReviewTile key={r.id} review={r} />)}
        {shouldPromptReview && !reviews.length ? <p>Be the first to post a review!</p> : null}
    </div>
}