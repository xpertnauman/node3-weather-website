const request = require('postman-request')

const getLatLong = (location, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?type=address&access_token=pk.eyJ1IjoieHBlcnRuYXVtYW4iLCJhIjoiY2tza2lrNW90Mm9iZzMwb202enprcW5zMyJ9.PJ18Lk4V-8D7hGGi5j_aPQ'

    request({ url: url, json: true}, (error, { body } = {}) => {

        if(error) {
            callback('Unable to send request to mapbox')
        }else if(body.features.length === 0) {
            callback('Location is not valid')
        }else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            callback(undefined, { latitude, longitude })
        }
    })

}

module.exports = {
    getLatLong: getLatLong
}

