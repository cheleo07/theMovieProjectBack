const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const api = require('../api_key.js');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const methods = require('./methods.js')

module.exports = (app) => {

    app.get('/api/discover/movie', async (req, res) => {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key='+ api +'&language=fr-FR',
            {       method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
        const data = await response.json();
        return res.status(200).send(JSON.stringify(data));
    });

}

// Connect to MongoDB
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }

    // Specify database you want to access
    const db = client.db('theMovies');
    const movies = db.collection('Films');
    console.log(`MongoDB Connected: ${url}`);
    //methods.createCollection(db)
});

