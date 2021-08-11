const request = require('postman-request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2FyaW5wb3N0IiwiYSI6ImNrcncxdWIyMTBjYjUyb25wZWg1NXlqeW0ifQ.8TJjQZZrCsbkUFuwcnq80A&limit=1"
    request({
        url,
        json: true,
    }, (error, { body }) => {
        if (error) {    // low-level err
            callback("Unable to connect to geocoding services!", undefined);
        } else if (body.features.length == 0) {   // error from service
            callback("Unable to find location, Try another search.", undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode