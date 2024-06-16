// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe3Ds40992d55G9_H0zqDff0nbi9zkS4I",
  authDomain: "aviaa-e4a59.firebaseapp.com",
  databaseURL: "https://aviaa-e4a59-default-rtdb.firebaseio.com",
  projectId: "aviaa-e4a59",
  storageBucket: "aviaa-e4a59.appspot.com",
  messagingSenderId: "41825275937",
  appId: "1:41825275937:web:e1ce96aecaa5dd8fff9360"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// State variables to keep track of user selections
let selectedRegion = '';
let selectedStatus = '';

// Function to handle region selection
function selectRegion(region) {
    selectedRegion = region;
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('endangered').style.display = 'block';
}

// Function to handle status selection and fetch data
function selectStatus(status) {
    selectedStatus = status;
    document.getElementById('endangered').style.display = 'none';
    document.getElementById('birdInfo').style.display = 'block';
    fetchBirdData();
}

// Function to fetch bird data from Firebase based on selections
function fetchBirdData() {
    const path = `birds/${selectedRegion === 'nz' ? 'nzBirds' : 'nonNzBirds'}/${selectedStatus}`;
    const birdsRef = ref(database, path);

    onValue(birdsRef, (snapshot) => {
        const data = snapshot.val();
        displayBirds(data);
    }, {
        onlyOnce: true
    });
}

// Function to display bird data in the UI
function displayBirds(birds) {
    const birdList = document.getElementById('birdList');
    birdList.innerHTML = '';
    if (birds) {
        for (const bird in birds) {
            const birdData = birds[bird];
            const li = document.createElement('li');
            li.textContent = `${bird}: Habitat - ${birdData.habitat}, Diet - ${birdData.diet}`;
            birdList.appendChild(li);
        }
    } else {
        birdList.innerHTML = '<li>No birds found</li>';
    }
}

// Attach functions to the window object to make them globally accessible
window.selectRegion = selectRegion;
window.selectStatus = selectStatus;
