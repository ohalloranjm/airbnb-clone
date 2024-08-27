import { useSelector } from "react-redux";
import { dateFromString } from "../../utils"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal/";

export default function ReviewTile({review, deleteOption, setRefresh}) {

    const {month, year} = dateFromString(review.createdAt);
    const defaultUser = useSelector(state => state.session.user);

    return <div className="review-tile">
        <p>{review.User ? review.User.firstName : defaultUser?.firstName}</p>
        <p>{month} {year}</p>
        <p>{review.review}</p>
        {deleteOption ? <OpenModalButton 
            modalComponent={<DeleteReviewModal reviewId={review.id} spotId={review.spotId} setRefresh={setRefresh} />}
            buttonText='Delete'
        />: null}
    </div>
}