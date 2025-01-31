const CyclicDb = require("@cyclic.sh/dynamodb");
const db = CyclicDb("misty-gold-sombreroCyclicDB");
const uniqid = require("uniqid");

async function createCity(cityObject) {
  const cityId = uniqid();
  const cities = db.collection("cities");
  const city = await cities.set(cityId, { ...cityObject, id: cityId });
  console.log(Object.values(city)[2]);
  return Object.values(city)[2];
}

async function getCityList(collectionName = "cities") {
  const cityList = { cities: [] };
  const cities = await db.collection(collectionName).list();
  const cityKeys = Object.values(cities.results).map((city) => city.key);

  for (const key of cityKeys) {
    const city = await getCityById(key);
    cityList.cities.push(city);
  }

  return cityList;
}

async function getCityById(cityId) {
  const cities = await db.collection("cities");
  const city = await cities.get(cityId);
  const { country, notes, cityName, emoji, date, position, id } =
    Object.values(city)[2];
  return { country, notes, cityName, emoji, date, position, id };
}

async function deleteCity(cityId) {
  const cities = await db.collection("cities");
  cities.delete(cityId);
  return cityId;
}

module.exports = { getCityById, getCityList, createCity, deleteCity };
