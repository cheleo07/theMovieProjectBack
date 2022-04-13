const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(cors());
require('./routes/movies')(app);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});