
// HTML elements to manipulate declared as variables
var searchBarEl = $('#search-bar');
var itineraryEl = $('#itinerary-menu');
var headerEl = $('#travel-coordination');
var hotelEl = $('#lodging');
var eventEl = $('#events');
var hotelList = $('#hotelCard');
var eventsList = $('#eventCard');

// API keys declared as variables
var queryLocationHotels;
var queryLocationEvents;
var myApiKeyHotels4 = '8d71a3ad23msh7adad3bfc1157efp18ba6cjsn8e5d192cc4a8';
var myApiKeySeatgeek = 'Mjg5Njc5NTd8MTY2MjY4MzQ5Ny43NzI4ODM0';
var hotelsRequest =
  'https://hotels4.p.rapidapi.com/locations/v2/search?query=' +
  queryLocationHotels +
  '&locale=en_US&currency=USD';
var seatgeekRequest =
  'https://api.seatgeek.com/2/events?q=' +
  queryLocationEvents +
  '&client_id=' +
  myApiKeySeatgeek;

//javascript object to pass in the fetch request
const optionsHotels = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': myApiKeyHotels4,
    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
  },
};

//empty array to store variables
var hotelsList;
var eventsList;
var previousItineraries = [];
const mainNav = document.getElementById('main-nav');
const toggleMenuIcon = document.getElementById('toggleicon');

//maybe variables for website url requests

//Function to change menu button depending on if opened or closed
function toggleMenu() {
  mainNav.classList.toggle('hidden');

  toggleMenuIcon.classList.toggle('fa-bars');
  toggleMenuIcon.classList.toggle('fa-circle-xmark');
}

// function to load itineraries
function loadItineraries() {
  var storedItineraries = JSON.parse(localStorage.getItem('storedItineraries'));
  if (storedItineraries) {
    previousItineraries = storedItineraries;
  }
  
  var storedItineraryModal = document.getElementById('storage-modal-list');
  var savedListItem = document.createElement('li');
  savedListItem.setAttribute('id', 'dynamicListItem')
  savedListItem.textContent = previousItineraries;
  if (storedItineraryModal != null){
    //if (savedListItem.textContent && storedItineraryModal.children[0]){
    //  storedItineraryModal.removeChild(savedListItem);
   // }else {
      
      storedItineraryModal.append(savedListItem);
    //}
    }
  }


function popUpSaveModal() {
  storageModal.classList.remove('hidden');
  var checkForAppend = document.getElementById('dynamicListItem')
    loadItineraries();
}

var saveDropDown = document.getElementById('savedropdown');
saveDropDown.children[0].addEventListener('click', popUpSaveModal);


// function to close storage modal
function closeStorageModal() {
  storageModal.classList.add('hidden');
  var storedItineraryModal = document.getElementById('storage-modal-list');
  let listItemToRemove = document.getElementById('dynamicListItem')
  storedItineraryModal.removeChild(listItemToRemove)
}

var storedModalCloseButton = document.getElementById('close-storage-modal');
storedModalCloseButton.addEventListener('click', closeStorageModal);

// Function to clear clicked item from modal and local storage

function clearStorageModal() {

    var storedItineraryModal = document.getElementById('storage-modal-list');
    let listItemToRemove = document.getElementById('dynamicListItem')
    if (storedItineraryModal !== null) {
      storedItineraryModal.removeChild(listItemToRemove);
      previousItineraries = []
    }
    localStorage.clear();

}

var clearStorageModalButton = document.getElementById('storage-modal-clear')
clearStorageModalButton.addEventListener('click', clearStorageModal);


// function to build a request url from inputs
function buildUrlFromInputs(city) {

  if (city) {
    queryLocationEvents = city;
    queryLocationHotels = city;
    let seatgeekSearchCity =
      'https://api.seatgeek.com/2/events?q=' +
      queryLocationEvents +
      '&client_id=' +
      myApiKeySeatgeek;
    let hotels4SearchCity =
      'https://hotels4.p.rapidapi.com/locations/v2/search?query=' +
      queryLocationHotels +
      '&locale=en_US&currency=USD';
    return [seatgeekSearchCity, hotels4SearchCity];
  }
}


//function to search for hotels and lodging
function searchHotels(queryUrl) {
  hotelsList = [];

  fetch(queryUrl, optionsHotels)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {

      //! LIST OF HOTELS THAT WILL BE APPENDED TO THE PAGE, AND A LOOP TO GET 4 HOTELS OR AS MANY AS POSSIBLE
      for (let i = 0; i < response.suggestions[1].entities.length; i++) {
        hotelsList.push(response.suggestions[1].entities[i].name);
        //console.log(response.suggestions[1].entities[i].name)

        if (response.suggestions[1].entities[i].name === undefined) {
          break;
        }
        if (i === 3) {
          break;
        }
      }
    })
    .then(function () {
      printHotelData();
    });
}

function printHotelData() {
  for (i = 0; i < hotelsList.length; i++) {
    let appendNum = i + 1;
    var eventToAppend = $('#hotellist' + appendNum);
    eventToAppend.text(hotelsList[i].replace('&amp;', '&'));
    eventToAppend.attr('data-hotel-name', hotelsList[i].replace('&amp;', '&'));
  }
}

//function to search for events and venues
function searchEvents(queryUrl) {
  eventsList = [];

  fetch(queryUrl, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(function (response) {

      for (let i = 0; i < response.events.length; i++) {
        var venueName = response.events[i].venue.name;
        var eventName = response.events[i].short_title;
        var returnedEvents = {};
        returnedEvents['venueName'] = venueName;
        returnedEvents['eventName'] = eventName;
        eventsList.push(returnedEvents);


        if (response.events[i].short_title === undefined) {
          break;
        }
        if (i === 3) {
          break;
        }
  
      }
      return eventsList;
    })
    .then(function () {
      printEventsData();

    });
}


//event listener for search button
$('#search-button').on('click', function (event) {
  //prevent default
  event.preventDefault();

  //call the city from the input
  var city = searchBarEl.val().trim();

  //clear the input without default refresh
  searchBarEl.val('');

  //build the query url with the city and call the functions
  if (city) {
    var queryUrl = buildUrlFromInputs(city);
    searchEvents(queryUrl[0]);
    searchHotels(queryUrl[1]);
  }
});

function printEventsData() {
  for (i = 0; i < eventsList.length; i++) {
    let appendNum = i + 1;
    var listToAppend = $('#eventlist' + appendNum);
    var venueToAppend = eventsList[i].venueName;
    var eventToAppend = eventsList[i].eventName;
    
    listToAppend.text(
      eventToAppend.replace('&amp;', '&') +
        ' @ ' +
        venueToAppend.replace('&amp;', '&'),
    );
    listToAppend.attr(
      'data-event-name',
      eventToAppend.replace('&amp;', '&') +
        ' @ ' +
        venueToAppend.replace('&amp;', '&'),
    );
    
  }
}


// Variables declared to grab List Elements and Modal Buttons
const saveModal = document.getElementById('save-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalOkBtn = document.getElementById('modal-ok');
let hotelLinks = document.getElementById('hotelCard');
let eventLinks = document.getElementById('eventCard');
let storageModal = document.getElementById('storage-modal');


function popUpModalEvent(data) {
  saveModal.classList.remove('hidden');
  let event_name = data.getAttribute('data-event-name');
  storeItineraries(event_name);
}

function popUpModalHotel(data) {
  saveModal.classList.remove('hidden');
  let hotel_name = data.getAttribute('data-hotel-name');
  storeItineraries(hotel_name);
}

function closeModal() {
  saveModal.classList.add('hidden');
}

closeModalBtn.addEventListener('click', closeModal);
modalOkBtn.addEventListener('click', closeModal);

// function to store itineraries
function storeItineraries(item) {
  previousItineraries.push(item);
  localStorage.setItem(
    'storedItineraries',
    JSON.stringify(previousItineraries),
  );
}