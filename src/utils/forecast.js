const request = require('request')

const forecast = (longitude,lattitude,callback) =>{
    url = 'http://api.weatherstack.com/current?access_key=9c6d50f5e4c1f500af5bc7a42d543500&query='+encodeURIComponent(lattitude)+','+encodeURIComponent(longitude)+'&units=m'

    request({url , json:true},(error,{body}) => {
        if(error){
            callback("unable to connect to weather service",undefined)
        }
        else if(body.error){
            callback("Unable to find location",undefined)
        }
        else{
            temp = body.current.temperature
            feelsLike = body.current.feelslike
            callback(undefined,"current temperature is "+temp+" but it feels like "+feelsLike)
        }


    })
}
module.exports = forecast