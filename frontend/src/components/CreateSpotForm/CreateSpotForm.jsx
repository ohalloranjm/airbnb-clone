import { useState } from "react"

export default function() {

    const [country, setCountry] = useState('');
    const [errCountry, setErrCountry] = useState('');
    const [address, setAddress] = useState('');
    const [errAddress, setErrAddress] = useState('');
    const [city, setCity] = useState('');
    const [errCity, setErrCity] = useState('');
    const [state, setState] = useState('');
    const [errState, setErrState] = useState('');
    const [description, setDescription] = useState('');

    return <>
        <h1>Create a New Spot</h1>
        <form className="create-spot-form">

        <h2>Where's Your Place Located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <input 
            className="create-spot-form-input"
            placeholder="Country"
            value={country}
            onChange={e => setCountry(e.target.value)}
        />
        <p className="errors">{errCountry}</p>

        <input 
            className="create-spot-form-input"
            placeholder="Street Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
        />
        <p className="errors">{errAddress}</p>
        
        <input 
            className="create-spot-form-input"
            placeholder="City"
            value={city}
            onChange={e => setCity(e.target.value)}
        />
        <p className="errors">{errCity}</p>
        
        <input 
            className="create-spot-form-input"
            placeholder="State"
            value={state}
            onChange={e => setState(e.target.value)}
        />
        <p className="errors">{errState}</p>

        <h2>Describe your place to guests</h2>
        <p>"Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</p>

        <textarea 
            className="create-spot-form-input"
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={e => setDescription(e.target.value)}
        />

        </form>
    </>
}