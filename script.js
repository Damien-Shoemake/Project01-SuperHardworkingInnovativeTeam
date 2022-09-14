// Pseudo code for the project

// HTML elements to manipulate declared as variables
// API keys declared as variables
var myApiKeyHotels4 = '8d71a3ad23msh7adad3bfc1157efp18ba6cjsn8e5d192cc4a8';
var myApiKeySeatgeek = 'Mjg5Njc5NTd8MTY2MjY4MzQ5Ny43NzI4ODM0';
var searchBarElement = $('#search-button')
var itineraryEl = $('#itinerary-menu')
//empty array to store itineraries
var previousItineraries = [];

//maybe variables for website url requests

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

    fetch(queryUrl, {
        method: "GET"
    })
    .then(function(response){
        response.json()
    })
    .then(function(data) {
        console.log(data) 
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

//function to search for hotels and lodging
function searchEvents (queryUrl) {

    fetch(queryUrl, {
        method: "GET"
    })
    .then(function(response){
        response.json()
    })
    .then(function(data) {
        console.log(data)
       
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


//loadItineraries()
//displayItineraries(storedItineraries);
//displayLastQuery()