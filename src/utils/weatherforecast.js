const request = require('postman-request')

const checkWeather = ({ latitude = 0, longitude = 0 } , callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6008dc2d16d3e0d8ed2973f7189d7820' +
        '&query=' + latitude + ',' + longitude
    console.log(url)
    request({ url: url, json: true}, (error, { body } = {} ) => {

        if(error) {
            callback('Unable to send request to weatherstack')
        }else if(!body.current) {
            callback('Something is wrong with query')
        }else{
            callback(undefined, 'Current Temerature is ' + body.current.temperature)
        }

    })

}

module.exports = {
    checkWeather: checkWeather
}

