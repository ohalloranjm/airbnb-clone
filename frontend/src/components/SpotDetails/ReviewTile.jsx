import { useSelector } from "react-redux";
import { dateFromString } from "../../utils"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal/";

export default function ReviewTile({review, deleteOption}) {

    const {month, year} = dateFromString(review.createdAt);
    const defaultUser = useSelector(state => state.session.user);

    return <div className="review-tile">
        <p className="review-tile-name">{review.User ? review.User.firstName : defaultUser?.firstName}</p>
        <p className="review-tile-date">{month} {year}</p>
        <p  className="review-tile-year">{review.review}</p>
        {deleteOption ? <OpenModalButton 
            modalComponent={<DeleteReviewModal reviewId={review.id} spotId={review.spotId} />}
            buttonText='Delete'
        />: null}
    </div>
}