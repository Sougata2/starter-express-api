const express = require("express");
const fs = require("fs-extra");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

async function readDataFile() {
  const obj = await fs.readJSON("./data/cities.json");
  return obj;
}

async function writeDataFile(writeData, writeObj) {
  const readData = await readDataFile();
  // console.log(readData);
  const id = Math.ceil(Math.random() * 99999999);
  const newData = { ...writeData, id };
  const finalData = {
    cities: Object.values(readData[writeObj]).concat(newData),
  };
  console.log(finalData);
  try {
    await fs.writeJSON("./data/cities.json", finalData);
  } catch (err) {
    console.log(err);
  }
}


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
  const data = await readDataFile();
  res.json(data[name]);
});

app.get("/:name/:id", async function (req, res) {
  console.log("Just got a request!");
  const name = req.params.name;
  const id = req.params.id;
  const data = await readDataFile();
  res.json(data[name].filter((city) => city.id === +id));
});

app.post("/cities/add", function (req, res) {
  const data = req.body;
  console.log(data);
  writeDataFile(data, 'cities');
  res.send(JSON.stringify(data));
});

app.listen(process.env.PORT || 3000);
