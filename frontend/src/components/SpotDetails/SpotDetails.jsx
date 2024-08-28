import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetails } from "../../store/spots";
import { round } from "../../utils"
import './SpotDetails.css'
import SpotReviews from "./SpotReviews";
import SpotInfo from "./SpotInfo";

export default function SpotDetails () {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(0);
    useEffect(() => {
        console.log('Back at it again at crispy creme')
        dispatch(getSpotDetails(spotId));
    }, [dispatch, spotId, refresh])
    const spot = useSelector(state => state.spots[spotId]);

    if (spot) {

        const reviewInfo = '★ ' + (spot.avgRating ? round(spot.avgRating, 1) : 'New!') + (spot.numReviews ? ` · ${spot.numReviews} review${spot.numReviews === 1 ? '' : 's'}` : '')

        return <main>
            <SpotInfo spot={spot} reviewInfo={reviewInfo} />
            <SpotReviews spot={spot} reviewInfo={reviewInfo} refresh={refresh} setRefresh={setRefresh} />
        </main>
    } else {
        return <h2>Could not find spot</h2>
    }
}