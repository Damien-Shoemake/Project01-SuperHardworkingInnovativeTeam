// Pseudo code for the project

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
  var storedInineraryModalList = document.getElementById('storage-modal-list');
  var savedListItem = document.createElement('li');
  savedListItem.textContent = previousItineraries;
  storedInineraryModalList.append(savedListItem);
}

function popUpSaveModal() {
  storageModal.classList.remove('hidden');

  loadItineraries();
}

var saveDropDown = document.getElementById('savedropdown');
saveDropDown.children[0].addEventListener('click', popUpSaveModal);
saveDropDown.children[1].addEventListener('click', popUpSaveModal);
saveDropDown.children[2].addEventListener('click', popUpSaveModal);
saveDropDown.children[3].addEventListener('click', popUpSaveModal);

// function to close storage modal
function closeStorageModal() {
  storageModal.classList.add('hidden');
}

var storedModalOkButton = document.getElementById('storage-modal-ok');
storedModalOkButton.addEventListener('click', closeStorageModal);

// function to build a request url from inputs
function buildUrlFromInputs(city) {
  // if (typeof(input) !== String || typeof(input) == undefined) {
  //     $(search-bar).attr("placeholder","Please enter a valid city.")
  //return
  //Modal that says "Please enter a city"

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

//function to display itineraries

function displayItineraries(storedItineraries) {
  // empty the container elements with a method
  ItineraryEl.empty();
  // .splice up to 4 stored itineraries
  storedItineraries.splice(4);

  // append the stored elements to the page
  var makeItineraries = [...storedItineraries];

  makeItineraries.forEach(function (location) {
    var locationDiv = itineraryEl.addClass(); //TODO: Figure out what classes we're adding to the divs for itinerary functionality
    var locationBtn = $('<button>').addClass(); //TODO: Figure out what classes we're adding to the buttons for itinerary functionality

    locationDiv.append(locationBtn);
  });
}

//function to search for hotels and lodging
function searchHotels(queryUrl) {
  hotelsList = [];

  fetch(queryUrl, optionsHotels)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

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
    console.log(hotelsList[i]);
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
      console.log(response);

      for (let i = 0; i < response.events.length; i++) {
        var venueName = response.events[i].venue.name;
        var eventName = response.events[i].short_title;
        var returnedEvents = {};
        returnedEvents['venueName'] = venueName;
        returnedEvents['eventName'] = eventName;
        eventsList.push(returnedEvents);

        // console.log(response.events[i].venue.name)
        // console.log(response.events[i].short_title)

        if (response.events[i].short_title === undefined) {
          break;
        }
        if (i === 3) {
          break;
        }
        console.log(eventsList);
      }
      return eventsList;
    })
    .then(function () {
      printEventsData();
      // html elements manipulated with .text(data.name) (or whatever other syntax)
      //variables declared to store multiple events
      //for loop that looks something like this:
      //for(var i = 0; i <= 4; i++){
      //  var eventsReturned = data.lodging[i] (or whatever the syntax truly is)
      //  var pricingReturned = data.lodging[i].pricing (or whatever the syntax truly is)
      //  elementManipulated.innerHTML = eventsReturned;
      //  otherElementManipulated.innerHTML = pricingReturned;
      //}
    });
}

//function to display previous search query
// function displayLastQuery() {
//     if(storedItineraries[0]) {
//         //var queryUrl = function to build query to search both apis, stored as an array
//         searchEvents(queryUrl[0]);
//         searchHotels(queryUrl[1]);
//     }
//     else {
//         searchBarElement.innerHTML = "Search for where you want to go!";
//     }
// }

//event listener for search button
$('#search-button').on('click', function (event) {
  //prevent default
  event.preventDefault();

  //call the city from the input, test with trim is better or not
  var city = searchBarEl.val().trim();
  //console.log(city)
  // city = city.replace(' ', '%20'); // this is so cities with whitespace in the name can be searched for

  //clear the input without default refresh
  searchBarEl.val('');

  //build the query url with the city and call the functions
  if (city) {
    var queryUrl = buildUrlFromInputs(city);
    //console.log(queryUrl)
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
    console.log(eventsList[i].venueName);
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
    console.log(eventsList[i]);
  }
}

//event listener for create itinerary button

$('create-itinerary-btn').on('click', function (event) {
  //store elements into local storage
  storeItineraries();
  //append all of the elements of the data into a new itinerary card
});

//!DEBUGGING
// Variables declared to grab List Elements and Modal Buttons
const saveModal = document.getElementById('save-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalOkBtn = document.getElementById('modal-ok');
let hotelLinks = document.getElementById('hotelCard');
let eventLinks = document.getElementById('eventCard');
let storageModal = document.getElementById('storage-modal');
// let event1 = document.getElementById('eventlist1');
// let event2 = document.getElementById('eventlist2');
// let event3 = document.getElementById('eventlist3');
// let event4 = document.getElementById('eventlist4');
// let hotel1 = document.getElementById('hotellist1');
// let hotel2 = document.getElementById('hotellist2');
// let hotel3 = document.getElementById('hotellist3');
// let hotel4 = document.getElementById('hotellist4');

// function popUpModal() {
//   saveModal.classList.remove('hidden');
//   storeItineraries(event1.innerText);
// }

// function popUpModal1() {
//   saveModal.classList.remove('hidden');
//   storeItineraries(event1.innerText);
// }
// function popUpModal2() {
//   saveModal.classList.remove('hidden');
//   storeItineraries(event2.innerText);
// }
// function popUpModal3() {
//   saveModal.classList.remove('hidden');
//   storeItineraries(event3.innerText);
// }
// function popUpModal4() {
//   saveModal.classList.remove('hidden');
//   storeItineraries(event4.innerText);
// }

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

//!DEBUGGING
// $('#search-button').on('click', function(event){
//     event.preventDefault();
//     queryLocationEvents = searchBarEl.val().trim();
//     console.log('Button works')
//     if (event){
//     fetch(seatgeekRequest, {
//         method: 'GET'
//     }).then(response => response.json())
//     .then(function(response){
//         console.log(response)
//     })
//     }
//})
//loadItineraries()
//displayItineraries(storedItineraries);
//displayLastQuery()
