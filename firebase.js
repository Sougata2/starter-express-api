// import { initializeApp } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore-app.js'
// import { getFirestore} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
// import uniqid from "uniqid";
const uniqid = require("uniqid");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADZopFdRMnV2L0QSHixcnqka9FT9cjCV8",
  authDomain: "city-api-4e638.firebaseapp.com",
  databaseURL:
    "https://city-api-4e638-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "city-api-4e638",
  storageBucket: "city-api-4e638.appspot.com",
  messagingSenderId: "246825446657",
  appId: "1:246825446657:web:4206a9cad7629703117f00",
  measurementId: "G-QL8JEQ17GH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

async function createCity(cityObject) {
  const cityId = uniqid();
  const docRef = db.collection("cities").doc(cityId);
  await docRef.set({ ...cityObject, id: cityId });
  return cityId;
}

async function getCityList(collectionName = "cities") {
  const cityList = { cities: [] };
  const snapShot = await db.collection(collectionName).get();
  snapShot.forEach((doc) => {
    const { country, notes, cityName, emoji, position, id } = doc.data();
    cityList.cities.push({ country, notes, cityName, emoji, position, id });
  });
  return cityList;
}

async function getCityById(cityId) {
  const snapShot = await db.collection("cities").doc(cityId).get();
  const { country, notes, cityName, emoji, position, id } = snapShot.data();
  return { country, notes, cityName, emoji, position, id };
}

module.exports = { getCityById, getCityList, createCity };
