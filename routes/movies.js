const dataFile = require('../local-data.js')

module.exports = (app) => {

    app.get('/api/discover/movie', async (req, res) => {
        console.log('working');
        return res.status(200).send(JSON.stringify(dataFile));
    });
}