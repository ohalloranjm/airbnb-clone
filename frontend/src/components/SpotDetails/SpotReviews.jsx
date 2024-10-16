import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getReviewsBySpotId } from "../../store/reviews";
import ReviewTile from "./ReviewTile";
import PostReviewFormModal from "../PostReviewFormModal/PostReviewFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

export default function SpotReviews({spot, reviewInfo}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReviewsBySpotId(spot.id));
    }, [dispatch, spot.id]);
    const allReviews = useSelector(state => state.reviews);
    const user = useSelector(state => state.session.user);
    const reviews = Object.values(allReviews).filter(r => r.spotId === spot.id).sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);

    const shouldPromptReview = user 
        && user.id !== spot.ownerId 
        && !reviews.some(r => r.userId === user.id);
        
    return <div className="spot-details-reviews">
        <h2>{reviewInfo}</h2>
        {shouldPromptReview ? <OpenModalButton 
            buttonText="Post Your Review"
            modalComponent={<PostReviewFormModal spotId={spot.id} />}
        /> : null}
        {reviews.map(r => <ReviewTile key={r.id} review={r} deleteOption={r.userId === user?.id} />)}
        {shouldPromptReview && !reviews.length ? <p className="spot-reviews-befirst">Be the first to post a review!</p> : null}
    </div>
}