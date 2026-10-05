const axios = require('axios');
const captainModel = require('../models/captain.model');

// 1. Geocoding API
module.exports.getAddressCoordinate = async (address) => {
    if (!address) throw new Error('Address is required');

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Geocoding error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('getAddressCoordinate error:', error.message);
        throw error;
    }
};

// 2. Distance Matrix API
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return element;
        } else {
            throw new Error(`Distance Matrix error: ${response.data.status}`);
        }
    } catch (err) {
        console.error('getDistanceTime error:', err.message);
        throw err;
    }
};

// 3. Places API (New V1 Endpoint with Field Masking)
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query input is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = 'https://places.googleapis.com/v1/places:autocomplete';

    try {
        const response = await axios.post(
            url,
            { input },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': apiKey,
                    'X-Goog-FieldMask': 'suggestions.placePrediction.text'
                }
            }
        );

        if (response.data && response.data.suggestions) {
            return response.data.suggestions
                .map(s => s.placePrediction?.text?.text)
                .filter(Boolean);
        }
        return [];
    } catch (err) {
        console.error('getAutoCompleteSuggestions error:', err.response?.data || err.message);
        throw err;
    }
};

// 4. Geospatial Query (Corrected [lng, ltd] Order)
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // Earth's mean radius in kilometers = 6371
    const captains = await captainModel.find({
        location: {
            $geoWithin: {$centerSphere: [ [ parseFloat(lng), parseFloat(ltd) ], radius / 6371 ]
            }
        }
    });

    return captains;
};