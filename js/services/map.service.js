export const mapService = {
    initMap,
    addMarker,
    panTo,
    getNameByCoords,
    zoom,
    getUserLocation,
    getCoordsByName
}


// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMap.addListener("click", (mapsMouseEvent) => {
                onClickMap({ lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng() })
            })
            console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function zoom() {
    gMap.setZoom(15)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBhgU0OVYbmyW3C1-byx_BErfU5kfPVkxY' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getNameByCoords(location) {
    const API_KEY = 'AIzaSyBPSnSB3KM1tGH3au7TEh0NXRhzvaRQZlA'
    var coords = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`
    return axios.get(coords).then(res => res.data.results[0].formatted_address)
}

function getCoordsByName(name) {
    const API_KEY = 'AIzaSyBPSnSB3KM1tGH3au7TEh0NXRhzvaRQZlA'
    var coords = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY}`
    return axios.get(coords).then(res => res.data.results[0].geometry.location)
}

function getUserLocation() {
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
}

function showLocation(position) {     
    console.log(position)
    const {latitude: lat, longitude: lng} = position.coords
    panTo(lat, lng)
    zoom()
}

function handleLocationError(error){
    var locationError
    switch (error.code) {
        case 0:
            locationError = "There was an error while retrieving your location: " + error.message
            break
        case 1:
            locationError = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            locationError = "The browser was unable to determine your location: " + error.message
            break
        case 3:
            locationError = "The browser timed out before retrieving the location."
            break
    }
    console.log('locationError:', locationError)
}



