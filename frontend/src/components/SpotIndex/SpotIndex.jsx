import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react" 
import { getSpots } from "../../store/spots";
import SpotTile from "./SpotTile";
import './SpotIndex.css'

export default function SpotIndex() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);
    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch])

    return <div className="spot-index">
        {Object.values(spots).map(spot => <SpotTile key={spot.id} spot={spot} />)}
    </div>
}