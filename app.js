const express= require("express");
const bodyParser = require("body-parser");
const app= express();
const https=require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/index.html");
});

app.post("/", function(req,res) {
  console.log(req.body.cityName);
  const city = req.body.cityName;
  const apiKey= "2942da670131425794ff8f6bf7aa48a6";
  const units= "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+units;
  https.get(url,function(response) {
    console.log(response);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp= weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(weatherData);
      res.write("<p>Weather currently is "+weatherDesc +"<p>");
      res.write("<h1> The temperature in "+city+" is "+temp +"<h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });
});

app.listen(3000, function(req,res) {
  console.log("Server is up and running");
});
