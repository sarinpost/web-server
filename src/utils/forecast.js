const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=a97003635def866626b7144ece6bc89d&query=" + latitude + "," + longitude + "&units=f"
    request({
        url,
        json: true,
    }, (error, { body }) => {
        if (error) {    // low-level err
            callback("Unable to connect to weather services!", undefined)
        } else if (body.error) {   // error from service
            callback("Unable to find a location", undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}, ${body.current.temperature} F, `, {
                weather_descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
            })
        }
    })
}

module.exports = forecast