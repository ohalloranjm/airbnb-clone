import { useEffect } from "react";
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
    useEffect(() => {
        dispatch(getSpotDetails(spotId));
    }, [dispatch, spotId])
    const spot = useSelector(state => state.spots[spotId]);

    if (spot) {

        const reviewInfo = '★ ' + (spot.avgRating ? round(spot.avgRating, 1) : 'New!') + (spot.numReviews ? ` · ${spot.numReviews} review${spot.numReviews === 1 ? '' : 's'}` : '')

        return <main>
            <SpotInfo spot={spot} reviewInfo={reviewInfo} />
            <SpotReviews spot={spot} reviewInfo={reviewInfo} />
        </main>
    } else {
        return <h2>Could not find spot</h2>
    }
}