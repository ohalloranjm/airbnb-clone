import { Link, useNavigate } from "react-router-dom";
import { round } from "../../utils";
import { useState } from "react";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import ConfirmDeleteModal from "../../ConfirmDeleteModal/ConfirmDeleteModal";

export default function SpotTile({spot, manage}) {

    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate();

    let { avgRating } = spot;
    avgRating = `★ ${avgRating ? round(avgRating, 1) : 'New!'}`
    
    const displayTooltip = () => {
        setShowTooltip(true);
    }

    const closeTooltip = () => {
        setShowTooltip(false);
    }

    const tooltipClassName = () => {
        return 'name-tooltip' + (showTooltip ? '' : ' hidden-tooltip');
    }

    return <>
    <div 
            className="spot-tile-wrapper" >
    <Link 
            to={`/spots/${spot.id}`}
            onPointerEnter={displayTooltip}
            onPointerLeave={closeTooltip}
            className="spot-tile"
        >
        <img className="spot-tile-image" src={spot.previewImage} alt={spot.name} />
        <div className={tooltipClassName()}>{spot.name}</div>
        <p className="spot-tile-location">{spot.city}, {spot.state}</p>
        <p className="spot-tile-rating">{avgRating}</p>
        <p className="spot-tile-price">${round(spot.price, 2)}/night</p>
    </Link>
    { manage ? <div className="spot-tile-manage">
        <button className="real-button spot-tile-manage-button" onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button>
        <OpenModalButton
            itemText="Delete" 
            modalComponent={<ConfirmDeleteModal spotId={spot.id} />}
        />
    </div> : null}
    </div>
    </>
}