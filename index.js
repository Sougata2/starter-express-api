const express = require("express");
const app = express();
const json = {
  cities: [
    {
      cityName: "Lisbon",
      country: "Portugal",
      emoji: "🇵🇹",
      date: "2027-10-31T15:59:59.138Z",
      notes: "My favorite city so far!",
      position: {
        lat: 38.727881642324164,
        lng: -9.140900099907554,
      },
      id: 73930385,
    },
    {
      cityName: "Madrid",
      country: "Spain",
      emoji: "🇪🇸",
      date: "2027-07-15T08:22:53.976Z",
      notes: "",
      position: {
        lat: 40.46635901755316,
        lng: -3.7133789062500004,
      },
      id: 17806751,
    },
    {
      cityName: "Berlin",
      country: "Germany",
      emoji: "🇩🇪",
      date: "2027-02-12T09:24:11.863Z",
      notes: "Amazing 😃",
      position: {
        lat: 52.53586782505711,
        lng: 13.376933665713324,
      },
      id: 98443197,
    },
  ],
};
// Add middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Express api");
});
app.all("/:name", (req, res) => {
  const name = req.params.name;
  console.log("Just got a request!");
  res.json(json[name]);
});
app.all("/:name/:id", function (req, res) {
  const name = req.params.name;
  const id = req.params.id;
  res.json(json[name].filter((city) => city.id === +id));
});
app.listen(process.env.PORT || 3000);
