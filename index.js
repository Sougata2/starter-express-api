const express = require("express");
const fs = require("fs-extra");
const bodyParser = require("body-parser");
const app = express();
const { createCity, getCityList, getCityById } = require("./firebase");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Express api");
});

app.get("/:name", async (req, res) => {
  console.log("Just got a request!");
  const name = req.params.name;
  if (name !== "cities") return;
  const data = await getCityList(name);
  res.json(data[name]);
});

app.get("/:name/:id", async function (req, res) {
  console.log("Just got a request!");
  const name = req.params.name;
  const id = req.params.id;
  const data = await getCityById(id);
  res.json(data);
});

app.post("/cities/add", async function (req, res) {
  const data = req.body;
  console.log(data);
  const createId = await createCity(data);
  res.send(createId);
});

app.listen(process.env.PORT || 3000);
