import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getReviewsBySpotId } from "../../store/reviews";
import ReviewTile from "./ReviewTile";

export default function SpotReviews({spotId, reviewInfo}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReviewsBySpotId(spotId));
    }, [dispatch, spotId]);
    const allReviews = useSelector(state => state.reviews);
    const reviews = Object.values(allReviews).filter(r => r.spotId === spotId).sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
    
    return <div className="spot-details-reviews">
        <h2>{reviewInfo}</h2>
        {reviews.map(r => <ReviewTile key={r.id} review={r} />)}
    </div>
}