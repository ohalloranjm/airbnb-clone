import { useParams } from "react-router-dom";

export default function SpotDetails () {
    const { spotId } = useParams();
    return <h1>Spot #{spotId}</h1>
}