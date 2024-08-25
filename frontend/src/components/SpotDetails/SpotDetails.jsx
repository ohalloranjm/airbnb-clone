import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetails } from "../../store/spots";
import { round } from "../../utils"

export default function SpotDetails () {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpotDetails(spotId));
    }, [dispatch])
    const spot = useSelector(state => state.spots[spotId]);

    const {SpotImages} = spot;
    const previewImage = SpotImages.find(img => img.preview);
    const otherImages = [];
    let i = 0;
    while (otherImages.length < 4 && i < SpotImages.length) {
        const img = SpotImages[i];
        if (!img.preview) otherImages.push(img);
        i++;
    }

    return <>
        <h1>{spot.name}</h1>
        <p className="sd-location">{spot.city}, {spot.state}, {spot.country}</p>
        <img className="sd-image-primary" src={previewImage.url} alt={spot.name} />
        {otherImages.map(i => <img className="sd-image-secondary" src={i.url} />)}
        <p className="sd-host">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
        <p className="sd-description">{spot.description}</p>
        <div className="sd-callout">
            <p className="sd-callout-price">${round(spot.price, 2)} /night</p>
            <button 
                className="sd-callout-reserve" 
                type="button"
                onClick={e => alert('Feature coming soon!')}
            >Reserve</button>
        </div>
    </>
}