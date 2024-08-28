import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails, postSpot, postSpotOtherImage, putSpot } from "../../store/spots";
import './CreateSpotForm.css'

export default function CreateSpotForm() {

    const {spotId} = useParams();

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    useEffect(() => {
        if (spotId) {
            if (!user) navigate('/')
            dispatch(getSpotDetails(spotId))
                .then(spot => {
                    if (spot.ownerId !== user.id) {
                        navigate('/');
                        return;
                    } else {
                        setCountry(spot.country);
                        setAddress(spot.address);
                        setCity(spot.city);
                        setState(spot.state);
                        setDescription(spot.description);
                        setName(spot.name);
                        setPrice(spot.price);
                    }
                })
        } else {
            setCountry('');
            setAddress('');
            setCity('');
            setState('');
            setDescription('');
            setName('');
            setPrice('');
        }
    }, [dispatch, spotId, navigate, user])

    const handleSubmit = e => {
        e.preventDefault();
        const newSpot = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        }
        if (!spotId) {
            newSpot.previewImage = previewImage;
            dispatch(postSpot(newSpot))
                .then(async (res) => {
                    const newSpot = await res.json();
                    const images = Object.values(otherImages).filter(i => i);
                    for (const image of images) {
                        dispatch(postSpotOtherImage(newSpot.id, image));
                    }
                    return newSpot;
                })
                .then(({ id }) => navigate(`/spots/${id}`))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                })
        } else {
            dispatch(putSpot(spotId, newSpot))
                .then(() => navigate(`/spots/${spotId}`))
                .catch(async res => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                })
        }
    }

    return <div className="create-spot">
        <h1>{spotId ? "Update Your Spot" : "Create a New Spot"}</h1>
        <form className="create-spot-form">

        <h2>Where’s your place located?</h2>
        <p className="create-spot-caption">Guests will only get your exact address once they booked a reservation.</p>

        <div className="sf-field sf-country">
            <label>
            Country 
            <span className="errors">{errors.country ? ' ' + errors.country : null}</span>
            </label>
            <input 
                className="create-spot-input"
                placeholder="Country"
                value={country}
                onChange={e => setCountry(e.target.value)}
            />
        </div>

        <div className="sf-field sf-address">
            <label>
            Street Address 
            <span className="errors">{errors.address ? ' ' + errors.address : null}</span>
            </label>
            <input 
                className="create-spot-input"
                placeholder="Street Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
            />
        </div>

        <div className="sf-field sf-city-state">
            <div className="sf-field sf-city">
                <label>
                City 
                <span className="errors">{errors.city ? ' ' + errors.city : null}</span>
                </label>
                <input 
                    className="create-spot-input"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            </div>

            <div className="sf-comma">,</div>

            <div className="sf-field sf-state">
                <label>
                State 
                <span className="errors">{errors.state ? ' ' + errors.state : null}</span>
                </label>
                <input 
                    className="create-spot-input"
                    placeholder="State"
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
            </div>
        </div>

        <hr className="sf-field-divider" />

        <h2>Describe your place to guests</h2>
        <p className="create-spot-caption">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</p>

        <textarea 
            className="create-spot-input"
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={e => setDescription(e.target.value)}
        />
        <p className="errors">{errors.description || null}</p>

        <hr className="sf-field-divider" />

        <h2>Create a title for your spot</h2>
        <p className="create-spot-caption">Catch guests’ attention with a spot title that highlights what makes your place special</p>
        <input 
            className="create-spot-input"
            placeholder="Name your spot"
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <p className="errors">{errors.name || null}</p>

        <hr className="sf-field-divider" />

        <h2>Set a base price for your spot</h2>
        <p className="create-spot-caption">Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div className="sf-field sf-price">
            <div className="sf-dollar">$</div>
            <input 
                type="number"
                placeholder="Price per night (USD)"
                className="create-spot-input sf-price-input"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
            <p className="errors sf-price-errors">{errors.price || null}</p>
        </div>

        <hr className="sf-field-divider" />

        {spotId ? null : <>
            <h2>Liven up your spot with photos</h2>
            <p className="create-spot-caption">Submit a link to at least one photo to publish your spot.</p>

            <input 
                className="create-spot-input"
                placeholder="Preview Image URL"
                value={previewImage}
                onChange={e => setPreviewImage(e.target.value)}
            />
            <p className="errors">{errors.url || null}</p>

            {(['0', '1', '2', '3']).map(n => <input 
                key={n}
                className="create-spot-input"
                placeholder="Image URL"
                value={otherImages[n]}
                onChange={e => setOtherImages(prevOtherImages => ({...prevOtherImages, [n]: e.target.value}))}
            />)}
        </>}

        <hr className="sf-field-divider" />

        <button 
            type="submit"
            className="create-form-submit"
            onClick={handleSubmit}
        >{spotId ? "Update Your Spot" : "Create Spot"}</button>

        </form>
    </div>
}