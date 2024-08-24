import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react" 
import { getSpots } from "../../store/spots";

function SpotIndex() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);
    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch])

    return <>
        <h1>Look at All These Spots</h1>
        {Object.values(spots).map(s => <p key={s.id}>{s.name}, {s.city}, {s.state}</p>)}
    </>
}

export default SpotIndex