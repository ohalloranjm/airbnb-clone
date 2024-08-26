import { useState } from "react"
import { useDispatch } from 'react-redux';
import { postSpot } from "../../store/spots";

export default function CreateSpotForm() {

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [otherImages, setOtherImages] = useState({
        '0': '',
        '1': '',
        '2': '',
        '3': '',
    });
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const newSpot = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            previewImage
        }
        dispatch(postSpot(newSpot))
            .then(() => console.log('success'))
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            })
    }

    return <>
        <h1>Create a New Spot</h1>
        <form className="create-spot-form">

        <h2>Where's your place located?</h2>
        <p className="create-spot-caption">Guests will only get your exact address once they booked a reservation.</p>

        <input 
            className="create-spot-input"
            placeholder="Country"
            value={country}
            onChange={e => setCountry(e.target.value)}
        />
        <p className="errors">{errors.country || null}</p>

        <input 
            className="create-spot-input"
            placeholder="Street Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
        />
        <p className="errors">{errors.address || null}</p>
        
        <input 
            className="create-spot-input"
            placeholder="City"
            value={city}
            onChange={e => setCity(e.target.value)}
        />
        <p className="errors">{errors.city || null}</p>
        
        <input 
            className="create-spot-input"
            placeholder="State"
            value={state}
            onChange={e => setState(e.target.value)}
        />
        <p className="errors">{errors.state || null}</p>

        <h2>Describe your place to guests</h2>
        <p className="create-spot-caption">"Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</p>

        <textarea 
            className="create-spot-input"
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={e => setDescription(e.target.value)}
        />
        <p className="errors">{errors.description || null}</p>

        <h2>Create a title for your spot</h2>
        <p className="create-spot-caption">Catch guests' attention with a spot title that highlights what makes your place special</p>
        <input 
            className="create-spot-input"
            placeholder="Name your spot"
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <p className="errors">{errors.name || null}</p>

        <h2>Set a base price for your spot</h2>
        <p className="create-spot-caption">Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <input 
            type="number"
            placeholder="Price per night (USD)"
            value={price}
            onChange={e => setPrice(e.target.value)}
        />
        <p className="errors">{errors.price || null}</p>

        <h2>Liven up your spot with photos</h2>
        <p className="create-spot-caption">Submit a link to at least one photo to publish your spot.</p>

        <input 
            className="create-spot-input"
            placeholder="Preview Image URL"
            value={previewImage}
            onChange={e => setPreviewImage(e.target.value)}
        />
        <p className="errors">{errors.previewImage || null}</p>

        {(['0', '1', '2', '3']).map(n => <input 
            key={n}
            className="create-spot-input"
            placeholder="Image URL"
            value={otherImages[n]}
            onChange={e => setOtherImages(prevOtherImages => ({...prevOtherImages, [n]: e.target.value}))}
        />)}

        <button 
            type="submit"
            className="create-form-submit"
            onClick={handleSubmit}
        >Create Spot</button>

        </form>
    </>
}