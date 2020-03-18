const request=require('request')

const forecast=(latitude,longitude,callback)=>{
const url='https://api.darksky.net/forecast/4d34f58edd8a1202c5de6b78b1f010f9/'+latitude+','+longitude

request({url,json:true},(error,{body})=>{
    if (error){
        callback('Unable to connect to the web service!',undefined)
    }else if (body.error){
        callback('unable to find location',undefined)
    }else {
callback(undefined,body.daily.data[0].summary+" It is currently "+body.currently.temperature +" degrees out. There is a "+body.currently.precipProbability+"% chances of rain.")
    }

})

};


module.exports=forecast