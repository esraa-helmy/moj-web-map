const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('./geoCode.js')

// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/api/geocode', (req, res) => {
    async () => {
        let token = "AAPKc43a0cc3050c492a88a850c32c5d330dI110bXfbWLj9rSgLqhJ5I3mwND8H4LeXVIjvqDtVT3tSKnpZciTL0sR1aV5nZchf";
        let serviceUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?"
        let address = ""
        var geocoder = new GeoCoder(address, serviceUrl, token);
        var coords =  await geocoder.geoCode();
        // var x = await coords[0]
        // var y = await coords[1]
        return ""
    }
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});