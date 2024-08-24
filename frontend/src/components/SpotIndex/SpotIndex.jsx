import { csrfFetch } from "../../store/csrf"
import { useEffect, useState } from "react" 

function SpotIndex() {
    const [spots, setSpots] = useState({});
    useEffect(() => {
        
    })

    return <>
        <h1>Look at All These Spots</h1>
        {Object.values(spots).map(s => <p>{s.name}</p>)}
    </>
}

export default SpotIndex