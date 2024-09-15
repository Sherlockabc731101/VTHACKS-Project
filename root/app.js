import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        location: '',
        budget: '',
        preferences: {
            pets: false,
            smoking: false,
            cleanliness: 'average',
        }
    });

    const [matches, setMatches] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevState => ({
                ...prevState,
                preferences: {
                    ...prevState.preferences,
                    [name]: checked,
                }
            }));
        } else if (name === 'cleanliness') {
            setFormData(prevState => ({
                ...prevState,
                preferences: {
                    ...prevState.preferences,
                    cleanliness: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the user data to the backend
        await axios.post('mongodb+srv://smmayfield3:wmJJogNtpOK3iMsb@cluster0.wx6un.mongodb.net/', formData);//http://localhost:5000/api/users
        alert('User registered!');
    };

    const handleMatch = async () => {
        const response = await axios.post('mongodb+srv://smmayfield3:wmJJogNtpOK3iMsb@cluster0.wx6un.mongodb.net/', {//http://localhost:5000/api/match
            budget: formData.budget,
            preferences: formData.preferences,
        });
        setMatches(response.data);
    };

    return (
        <div className="App">
            <h1>Find a Roommate</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                />

                {/* Gender Dropdown */}
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="NB">Non-binary</option>
                    <option value="Other">Other/Prefer not to say</option>
                </select>

                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                />
                <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Budget"
                    required
                />

                <div>
                    <label>
                        Pets Allowed:
                        <input
                            type="checkbox"
                            name="pets"
                            checked={formData.preferences.pets}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Smoking Allowed:
                        <input
                            type="checkbox"
                            name="smoking"
                            checked={formData.preferences.smoking}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                {/* Cleanliness Dropdown */}
                <div>
                    <label>
                        Cleanliness:
                        <select name="cleanliness" value={formData.preferences.cleanliness} onChange={handleChange}>
                            <option value="neat">Neat</option>
                            <option value="average">Average</option>
                            <option value="messy">Messy</option>
                        </select>
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>

            <button onClick={handleMatch}>Find Matches</button>

            <h2>Matches</h2>
            <ul>
                {matches.map(match => (
                    <li key={match._id}>{match.name}, {match.location} - Budget: {match.budget}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;