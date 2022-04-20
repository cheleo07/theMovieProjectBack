const dataFile = require('../local-data.js')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const api = require('../api_key.js');


module.exports = (app) => {

    app.get('/api/discover/movie', async (req, res) => {
        console.log('working');

        const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key='+ api +'&language=fr-FR',
            {       method: 'GET',
                    headers: {'Content-Type': 'application/json'}
            });
        const data = await response.json();
        return res.status(200).send(JSON.stringify(data));
    });

}