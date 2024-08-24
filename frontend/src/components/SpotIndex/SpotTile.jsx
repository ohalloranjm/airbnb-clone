export default function SpotTile({spot}) {

    let { avgRating } = spot;
    if (!avgRating) avgRating = 'New'
    else avgRating = `★ ${avgRating % 1 === 0 ? String(avgRating) + '.0' : avgRating}`

    return <div className="spot-tile">
        <img className="spot-tile-image" src={spot.previewImage} alt={spot.name} />
        <p className="spot-tile-location">{spot.city}, {spot.state}</p>
        <p className="spot-tile-rating">{avgRating}</p>
        <p className="spot-tile-price">${spot.price}/night</p>
    </div>
}