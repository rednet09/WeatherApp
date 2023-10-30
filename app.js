const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = process.env.WEATHER_API_KEY;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&p=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log("dataaaa", weatherData);
      const temp = weatherData.main.temp;
      console.log("---temrature--", temp);
      const weather = weatherData.weather[0].description;

      const img = weatherData.weather[0].icon;
      //   const imgURL = "";
      res.write("<p>the weather is " + weather + "</p>");
      res.write(
        "<h1>the temprature in " +
          query +
          " is " +
          temp +
          " degree celcius</h1>"
      );
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("sever started");
});
