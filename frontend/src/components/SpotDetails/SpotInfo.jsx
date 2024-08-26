import { round } from "../../utils";

export default function SpotInfo({spot, reviewInfo}) {
    let SpotImages = spot.SpotImages ?? [];
    let previewImage = spot.previewImage ?? SpotImages.find(img => img.preview);
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
        {otherImages.map(i => <img className="sd-image-secondary" src={i.url} key={i.id} />)}
        <p className="sd-host">{spot.Owner ? 'Hosted by ' + spot.Owner.firstName + ' ' + spot.Owner.lastName : ''}</p>
        <p className="sd-description">{spot.description}</p>
        
        <div className="sd-callout">
            <p className="sd-callout-price">${round(spot.price, 2)} /night</p>
            <p className="sd-callout-reviews">{reviewInfo}</p>
            <button 
                className="sd-callout-reserve" 
                type="button"
                onClick={() => alert('Feature coming soon!')}
            >Reserve</button>
        </div>
    </>
}