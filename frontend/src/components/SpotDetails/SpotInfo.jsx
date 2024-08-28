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

    return <div className="spot-info">
        <h1>{spot.name}</h1>
        <p className="si-location">{spot.city}, {spot.state}, {spot.country}</p>
        <div className="si-images">
            <img className="si-image-primary" src={previewImage.url} alt={spot.name} />
            <div className="si-images-secondary">
                {otherImages.map(i => <img className="si-image-secondary" src={i.url} key={i.id} />)}
            </div>
        </div>
        <div className="si-below-images">
            
            <div className="si-below-left">
                <h2 className="si-host">{spot.Owner ? 'Hosted by ' + spot.Owner.firstName + ' ' + spot.Owner.lastName : ''}</h2>
                <p className="si-description">{spot.description}</p>
            </div>
            
            <div className="si-callout">
                <p className="si-callout-price"><span className="si-callout-price-number">${round(spot.price, 2)}</span> night</p>
                <p className="si-callout-reviews">{reviewInfo}</p>
                <button 
                    className="si-callout-reserve" 
                    type="button"
                    onClick={() => alert('Feature coming soon!')}
                >Reserve</button>
            </div>
        </div>
    </div>
}