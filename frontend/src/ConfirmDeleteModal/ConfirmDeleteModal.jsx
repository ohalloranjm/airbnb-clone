import { useDispatch } from 'react-redux'
import './ConfirmDeleteModal.css'
import { deleteSpot } from '../store/spots';
import { useModal } from '../context/Modal';
import { useState } from 'react';

export default function ConfirmDeleteModal({spotId}) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [error, setError] = useState('');

    const onDelete = () => {
        dispatch(deleteSpot(spotId))
            .then(closeModal)
            .catch(async res => {
                const data = res.data;
                if (data?.message) setError(data.message);
                else setError("Something went wrong with your request. Please try refreshing the page, or logging out then logging back in.")
            })
    }

    return <>
        <h2>Confirm Delete</h2>
        <p className="errors">{error}</p>
        <p>Are you sure you want to remove this spot?</p>
        <div className="delete-spot-buttons">
            <button className="delete-spot-yes" onClick={onDelete}>Yes (Delete Spot)</button>
            <button className="delete-spot-no" onClick={closeModal}>No (Keep Spot)</button>
        </div>
    </>
}