import './ConfirmDeleteModal.css'

export default function ConfirmDeleteModal() {
    return <>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <div className="delete-spot-buttons">
            <button className="delete-spot-yes">Yes (Delete Spot)</button>
            <button className="delete-spot-no">No (Keep Spot)</button>
        </div>
    </>
}