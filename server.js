const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = '0c9fa77e372f6e8564e1eec59f7d67a6';

app.use(express.static(__dirname));

app.get('/weather', async (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.json({ error: 'Please provide a location...' });
    }

    try {
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: apiKey,
                query: location
            }
        });

        if (response.data.error || !response.data.location) {
            return res.json({ error: 'Please enter a valid location'});
        }

        res.json(response.data);
    } catch (error) {
        res.json({ error: 'Error connecting to the weather service' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
