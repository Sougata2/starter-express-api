const express = require("express");
const fs = require("fs-extra");
const bodyParser = require("body-parser");
const app = express();
const {
  createCity,
  getCityById,
  getCityList,
  deleteCity,
} = require("./dynamoDb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
// For future referance only
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
    return "Opps! something went wrong";
  }
  return "City Added";
}
*/

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

app.get("/cities/:id", async function (req, res) {
  console.log("Just got a request! ID");
  const id = req.params.id;
  const data = await getCityById(id);
  res.json(data);
});

app.post("/cities/add", async function (req, res) {
  console.log("Just got a request! CREATE");
  const data = req.body;
  console.log(data);
  const city = await createCity(data);
  res.json(city);
});

app.post("/cities/delete", async function (req, res) {
  console.log("Just got a request! DELETE");
  const id = req.body.id;
  deleteCity(id);
  res.json({ deleteId: id });
});

app.listen(process.env.PORT || 3000);
