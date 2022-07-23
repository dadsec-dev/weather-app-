const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

   // res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

const query = req.body.cityName
const apiKey = "e2a053fe3c66d6c5fb424786d20e54dd"
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey +"&units="+ unit;

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
           const weatherData = JSON.parse(data)
           const weatherDesc = weatherData.weather[0].description
           const temp = weatherData.main.temp
           const weatherIcon = weatherData.weather[0].icon
           const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"

            res.write("<h1>The temperature in is " + temp + " Degrees Celcius.</h1>");
            res.write("<p>Currently the weather description is " + weatherDesc + "</P>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
       });


})


app.listen(3000, function(){
    console.log("Server Has Started!!!");
});