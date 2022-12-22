import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetUserPos = onGetUserPos
window.onClickMap = onClickMap
window.onGo = onGo
window.onDelete = onDelete
window.onMyLocation = onMyLocation
window.onEnterLocation = onEnterLocation
window.onCopyLocation = onCopyLocation

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            renderTable()
            renderFilterByQueryStringParams()
        })
        .catch(() => console.log('Error: cannot init map'))
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(lat = 35, lng = 139) {
    mapService.panTo(lat, lng)
}

function onZoom() {
    mapService.zoom()
}

function onClickMap(location) {
    mapService.getNameByCoords(location).then(name => {
        changeLocationOnMap(location.lat, location.lng)
        locService.post(name, location.lat, location.lng)
        renderNameLocation(name)
        renderTable()
    })
}

function renderTable() {
    locService.query().then(locations => {
        const strHTMLs = locations.map(location => {
            return `
            <tr>
                <td>${location.name}</td>
                <td>${location.lat}, ${location.lng}</td>
                <td><button onclick="onGo('${location.id}')">Go</button></td>
                <td><button onclick="onDelete('${location.id}')">Delete</button></td>
            </tr>`
        })
        document.querySelector('.table-content').innerHTML = strHTMLs.join('')
    })
}

function onDelete(locId) {
    locService.remove(locId).then(renderTable)
}

function onGo(locId) {
    locService.get(locId).then(location => {
        changeLocationOnMap(location.lat, location.lng)
        renderNameLocation(location.name)
    })
}

function changeLocationOnMap(lat, lng) {
    onSetUrlByLoc(lat, lng)
    onPanTo(lat, lng)
    onZoom()
    renderWeather(mapService.getWeather(lat, lng))

}

function onMyLocation() {
    mapService.getUserLocation()
}

function onEnterLocation(ev) {
    ev.preventDefault()
    const name = document.querySelector('input').value
    mapService.getCoordsByName(name).then(location => {
        locService.post(name, location.lat, location.lng)
        changeLocationOnMap(location.lat, location.lng)
        renderTable()
        renderNameLocation(name)
    })
}

function renderNameLocation(name) {
    document.querySelector('.curr-location-name span').innerText = name
}

function onCopyLocation() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const lat = +queryStringParams.get('lat') || 0
    const lng = +queryStringParams.get('lng') || 0
    navigator.clipboard.writeText(`https://github.io/me/travelTip/index.html?lat=${lat}&lng=${lng}`)
}

function onSetUrlByLoc(lat, lng) {
    const queryStringParams = `?lat=${lat}&lng=${lng}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const lat = +queryStringParams.get('lat') || 0
    const lng = +queryStringParams.get('lng') || 0
    if (!lat && !lng) return
    changeLocationOnMap(lat, lng)
}


function renderWeather(weather) {
    weather.then(weather => {
      const strHTML =  `<h2>Weather Today</h2>
            <div class="icon">&#x${weather.weather[0].icon};</div>
           <div class="desc">${weather.weather[0].description}</div>
           <div class="temp">${weather.main.temp} F temperature from ${weather.main.temp_min} F to ${weather.main.temp_max} F, wind ${weather.wind.speed} m/s</div>`
           document.querySelector('.weather').innerHTML = strHTML
    })
}