// Pseudo code for the project

// HTML elements to manipulate declared as variables
var searchBarElement = $('#search-bar')
var itineraryEl = $('#itinerary-menu')
var headerEl = $('#travel-coordination')
var hotelEl = $('#lodging')
var eventEl = $('#events')
var hotelList = $('#hotelCard')
var eventsList = $('#eventCard')




// API keys declared as variables
var queryLocationHotels;
var queryLocationEvents;
var myApiKeyHotels4 = '8d71a3ad23msh7adad3bfc1157efp18ba6cjsn8e5d192cc4a8';
var myApiKeySeatgeek = 'Mjg5Njc5NTd8MTY2MjY4MzQ5Ny43NzI4ODM0';
var hotelsRequest = 'https://hotels4.p.rapidapi.com/locations/v2/search?query=' + queryLocationHotels + '&locale=en_US&currency=USD';
var seatgeekRequest = "https://api.seatgeek.com/2/events?q=" + queryLocationEvents + "&client_id=" + myApiKeySeatgeek;


//javascript object to pass in the fetch request
const optionsHotels = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': myApiKeyHotels4,
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    }
}
//empty array to store variables
var hotelsList = [];
var eventsList = [];
var previousItineraries = [];
const mainNav = document.getElementById("main-nav");
const toggleMenuIcon = document.getElementById("toggleicon");

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
}

// function to store itineraries
function storeItineraries() {
    localStorage.setItem('searchedCities', JSON.stringify(previousItineraries));
}

// function to build a request url from inputs
function buildUrlFromInputs (city) {
    if (city) {
        // let seatgeekSearchCity = https:// syntax + search queries
        // let hotels4SearchCity = https:// syntax + search queries
        return //api call urls via array for a city related search for both apis [seatgeekSearchCity, hotels4SearchCity]
    }
}

//function to display itineraries

function displayItineraries (storedItineraries) {

    // empty the container elements with a method
    ItineraryEl.empty();
    // .splice up to 4 stored itineraries
    storedItineraries.splice(4);

    // append the stored elements to the page
    var makeItineraries = [...storedItineraries];

    makeItineraries.forEach(function (location){
        var locationDiv = itineraryEl.addClass(); //TODO: Figure out what classes we're adding to the divs for itinerary functionality
        var locationBtn = $('<button>').addClass() //TODO: Figure out what classes we're adding to the buttons for itinerary functionality

        locationDiv.append(locationBtn)
    })

}

//function to search for hotels and lodging
function searchHotels (queryUrl) {

    fetch(queryUrl, optionsHotels)
    .then(function(response){
        return response.json()
    })
    .then(function(response) {
        console.log(response) 



        //! LIST OF HOTELS THAT WILL BE APPENDED TO THE PAGE, AND A LOOP TO GET 4 HOTELS OR AS MANY AS POSSIBLE
        for(let i = 0; i < response.suggestions[1].entities.length; i++){
            hotelsList.push(response.suggestions[1].entities[i].name)
            console.log(response.suggestions[1].entities[i].name)

            if (response.suggestions[1].entities[i].name === undefined){
                break
            } 
            if (i === 3) {
                break
            }

        }
        // html elements manipulated with .text(data.name) (or whatever other syntax)
        //for loop that looks something like this: 
        //for(var i = 0; i <= 4; i++){
        //  var hotelsReturned = data.lodging[i] (or whatever the syntax truly is)
        //  var pricingReturned = data.lodging[i].pricing (or whatever the syntax truly is)
        //  elementManipulated.innerHTML = hotelsReturned;
        //  otherElementManipulated.innerHTML = pricingReturned; 
        //}
    })

}

//function to search for events and venues
function searchEvents (queryUrl) {

    fetch(queryUrl, {
        method: "GET"
    })
    .then(response => response.json())
    .then(function(response) {
        console.log(response)
       
        for (let i = 0; i < response.events.length; i++){
            var venueName = response.events[i].venue.name
            var eventName = response.events[i].short_title
            var returnedEvents = {}
            returnedEvents['Venue Name'] = venueName;
            returnedEvents['Event Name'] = eventName;
            eventsList.push(returnedEvents);

            // console.log(response.events[i].venue.name)
            // console.log(response.events[i].short_title)
 
            if (response.events[i].short_title === undefined){
                break
            }
            if (i === 3) {
                break
            }
            
        }
        // html elements manipulated with .text(data.name) (or whatever other syntax)
        //variables declared to store multiple events
        //for loop that looks something like this: 
        //for(var i = 0; i <= 4; i++){
        //  var eventsReturned = data.lodging[i] (or whatever the syntax truly is)
        //  var pricingReturned = data.lodging[i].pricing (or whatever the syntax truly is)
        //  elementManipulated.innerHTML = eventsReturned;
        //  otherElementManipulated.innerHTML = pricingReturned; 
        //}
    })

}

//function to display previous search query
function displayLastQuery() {
    if(storedItineraries[0]) {
        //var queryUrl = function to build query to search both apis, stored as an array
        searchEvents(queryUrl[0]);
        searchHotels(queryUrl[1]);
    }
    else {
        searchBarElement.innerHTML = "Search for where you want to go!";
    }
}

//event listener for search button 
$('search-btn').on('click', function(event){

    //prevent default
    event.preventDefault();

    //call the city from the input, test with trim is better or not
    var city = searchBarElement.val().trim()
    city = city.replace(' ', '%20'); // this is so cities with whitespace in the name can be searched for
    
    //clear the input without default refresh
    searchBarElement.val('');

    //build the query url with the city and call the functions
    if(searchBarElement) {
        var queryUrl = buildUrlFromInputs(searchBarElement);
        searchEvents(queryUrl);
        searchHotels(queryUrl);
    }
})

//event listener for create itinerary button

$('create-itinerary-btn').on('click', function(event){

    //store elements into local storage
    storeItineraries();
    //append all of the elements of the data into a new itinerary card

})

// Variables declared to grab List Elements and Modal Buttons
const saveModal = document.getElementById("save-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalOkBtn = document.getElementById("modal-ok");
let hotelLinks = document.getElementById("hotelCard");
let eventLinks = document.getElementById("eventCard");

function popUpModal() {
  saveModal.classList.remove("hidden");
}
function closeModal() {
  saveModal.classList.add("hidden");
}

  closeModalBtn.addEventListener("click", closeModal);
  modalOkBtn.addEventListener("click", closeModal);
  hotelLinks.children.addEventListener("click", popUpModal);
  eventLinks.children.addEventListener("click", popUpModal);


//loadItineraries()
//displayItineraries(storedItineraries);
//displayLastQuery()