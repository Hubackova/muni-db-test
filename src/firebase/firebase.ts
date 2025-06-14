// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { child, getDatabase, push, ref, set } from "firebase/database";
import { EXTRACTIONS } from "../constants";
import { getAuth } from "firebase/auth";
import { DnaExtractionsType, StorageType } from "../types";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDnH3ayxvbthxfhOs7ybFRmRFGne3ijlE8",
  authDomain: "dna-mollusca-test.firebaseapp.com",
  databaseURL: "https://dna-mollusca-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dna-mollusca-test",
  storageBucket: "dna-mollusca-test.firebasestorage.app",
  messagingSenderId: "514476554865",
  appId: "1:514476554865:web:2b79900af2107aea9039d0",
  measurementId: "G-CZQRTVZQDE"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const extractions = ref(db, EXTRACTIONS);
const storage = ref(db, "storage/");
const locations = ref(db, "locations/");

function writeExtractionData(extractionItem: DnaExtractionsType) {
  const db = getDatabase();
  const newKey = push(child(ref(db), "extractions")).key;
  set(ref(db, EXTRACTIONS + newKey), extractionItem);
}
function writeStorageData(storageItem: StorageType) {
  const db = getDatabase();
  const newKey = push(child(ref(db), "storage")).key;
  set(ref(db, "storage/" + newKey), storageItem);
}
function writeLocationData(location: any) {
  const db = getDatabase();
  const newKey = push(child(ref(db), "locations")).key;
  set(ref(db, "locations/" + newKey), location);
}

function writePrimersData(primer: any) {
  const db = getDatabase();
  const newKey = push(child(ref(db), "primers")).key;
  set(ref(db, "primers/" + newKey), primer);
}

function writePcrProgramsData(primer: any) {
  const db = getDatabase();
  const newKey = push(child(ref(db), "pcrPrograms")).key;
  set(ref(db, "pcrPrograms/" + newKey), primer);
}

const auth = getAuth(app);

export {
  auth,
  extractions,
  locations,
  storage,
  writeExtractionData,
  writeLocationData,
  writePcrProgramsData,
  writePrimersData,
  writeStorageData,
};
