import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getReviewsBySpotId } from "../../store/reviews";
import ReviewTile from "./ReviewTile";

export default function SpotReviews({spotId, reviewInfo}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReviewsBySpotId(spotId));
    }, [dispatch, spotId]);
    const reviews = useSelector(state => {
        const reviewsArr = Object.values(state.reviews)
        const filteredReviews = reviewsArr.filter(r => r.spotId === spotId);
        const sortedReviews = filteredReviews.slice().sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        return sortedReviews;
    });
    
    return <div className="spot-details-reviews">
        <h2>{reviewInfo}</h2>
        {reviews.map(r => <ReviewTile key={r.id} review={r} />)}
    </div>
}