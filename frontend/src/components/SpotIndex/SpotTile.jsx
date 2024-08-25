import { Link } from "react-router-dom";
import { round } from "../../utils";
import { useState } from "react";

export default function SpotTile({spot}) {

    const [showTooltip, setShowTooltip] = useState(false);
    // useEffect(() => {
    //     console.log('ugh')
    //     return;
    // }, [showTooltip])

    let { avgRating } = spot;
    if (!avgRating) avgRating = 'New'
    else avgRating = `★ ${round(avgRating, 1)}`

    const displayTooltip = () => {
        setShowTooltip(true);
    }

    const closeTooltip = () => {
        setShowTooltip(false);
    }

    const tooltipClassName = () => {
        return 'name-tooltip' + (showTooltip ? '' : ' hidden-tooltip');
    }

    return <Link 
            to={`/spots/${spot.id}`}
            className="spot-tile" 
            onPointerEnter={displayTooltip}
            onPointerLeave={closeTooltip}
        >
        <img className="spot-tile-image" src={spot.previewImage} alt={spot.name} />
        <div className={tooltipClassName()}>{spot.name}</div>
        <p className="spot-tile-location">{spot.city}, {spot.state}</p>
        <p className="spot-tile-rating">{avgRating}</p>
        <p className="spot-tile-price">${round(spot.price, 2)}/night</p>
    </Link>
}