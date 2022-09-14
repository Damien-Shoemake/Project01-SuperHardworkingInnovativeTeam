var fetchButtonEl = document.getElementById('fetch-btn');
var fetchButtonEl2 = document.getElementById('fetch-btn2');
var myApiKeyHotels4 = '8d71a3ad23msh7adad3bfc1157efp18ba6cjsn8e5d192cc4a8';
var queryLocation = 'Austin'
var requestUrlHotels4 = 'https://hotels4.p.rapidapi.com/locations/v2/search?query=' + queryLocation + '&locale=en_US&currency=USD';
var myApiKeySeatgeek = "Mjg5Njc5NTd8MTY2MjY4MzQ5Ny43NzI4ODM0";
var requestUrl2 = "https://api.seatgeek.com/2/events?q=" + queryLocation + "&client_id=" + myApiKeySeatgeek;

const optionsHotels = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': myApiKeyHotels4,
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    }
}


function getApi () {
    fetch(requestUrlHotels4, optionsHotels)
    .then(function(response) {
        return response.json()
    })
    .then(function (response) {
        console.log(response)
        for(let i = 0; i < response.suggestions[1].entities.length; i++){
            
            console.log(response.suggestions[1].entities[i].name)

            if (response.suggestions[1].entities[i].name === undefined){
                break
            } 
            if (i === 3) {
                break
            }

        }
    }) 
}

function getApi2 () {
    fetch(requestUrl2, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(function (response){
        console.log(response)
        // console.log(response.events[0].venue.name)
        // console.log(response.events[0].short_title)
        for (let i = 0; i < response.events.length; i++){
            console.log(response.events[i].venue.name)
            console.log(response.events[i].short_title)
            if (response.events[i].short_title === undefined){
                break
            }
            if (i === 3) {
                break
            }
            
        }
    })
    .catch(err => console.log(err));
}

fetchButtonEl.addEventListener('click', getApi)
fetchButtonEl2.addEventListener('click', getApi2)