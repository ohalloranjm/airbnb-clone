import { useDispatch } from "react-redux";
import '../../ConfirmDeleteModal/ConfirmDeleteModal.css';
import { deleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { getSpotDetails } from "../../store/spots";

export default function DeleteReviewModal({reviewId, setRefresh, spotId}) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [error, setError] = useState('');

    const onDelete = () => {
        dispatch(deleteReview(reviewId))
            .then(setRefresh(prev => prev + 1))
            .then(() => dispatch(getSpotDetails(spotId)))
            .then(closeModal)
            .catch(async res => {
                const data = res.json();
                setError(data?.message || "Something went wrong with your request. Please try refreshing the page, or logging out then logging back in.")
            })
    }

    return <div className="confirm-delete">
        <h2>Confirm Delete</h2>
        <p className="errors">{error}</p>
        <p>Are you sure you want to delete this review?</p>
        <div className="confirm-delete-buttons">
            <button className="confirm-delete-yes" onClick={onDelete}>Yes (Delete Review)</button>
            <button className="confirm-delete-no" onClick={closeModal}>No (Keep Review)</button>
        </div>
    </div>
}