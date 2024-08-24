import { round } from "../../utils";

export default function SpotTile({spot}) {

    let { avgRating } = spot;
    if (!avgRating) avgRating = 'New'
    else avgRating = `★ ${round(avgRating, 1)}`

    return <div className="spot-tile">
        <img className="spot-tile-image" src={spot.previewImage} alt={spot.name} />
        <p className="spot-tile-location">{spot.city}, {spot.state}</p>
        <p className="spot-tile-rating">{avgRating}</p>
        <p className="spot-tile-price">${round(spot.price, 2)}/night</p>
    </div>
}