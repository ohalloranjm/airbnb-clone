export default function DeleteReviewModal({reviewId}) {
    return <>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
        <div className="confirm-delete-buttons">
            <button className="confirm-delete-yes">Yes (Delete Review)</button>
            <button className="confirm-delete-no" onClick={/*closeModal*/() => {}}>No (Keep Review)</button>
        </div>
    </>
}