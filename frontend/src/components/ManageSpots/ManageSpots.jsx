import { useDispatch, useSelector } from "react-redux"
import { getSpots } from "../../store/spots"
import { useEffect } from "react"
import { Link, Navigate } from "react-router-dom";
import SpotTile from "../SpotIndex/SpotTile";

export default function ManageSpots() {
    const user = useSelector(store => store.session.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);
    const allSpots = useSelector(store => store.spots);

    if (user) {
        const spots = Object.values(allSpots).filter(s => s.ownerId === user.id)
        return <main>
            <h1>Manage Spots</h1>
            {spots.length ? <div className="spot-index">
                {spots.map(spot => <SpotTile key={spot.id} spot={spot} manage={true} />)}
            </div> : <Link to="/spots/new">Create a new spot</Link>}
        </main>
    } else {
        return <Navigate to="/" />
    }

}