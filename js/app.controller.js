import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onClickMap = onClickMap

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            renderTable()
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
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
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onClickMap(location) {
    mapService.getNameByCoords(location).then(name => {
        locService.post(name, location.lat, location.lng)
        renderTable()
    })
}

function renderTable() {
    locService.query().then(locations => {
        const strHTMLs = locations.map(location => {
            return `
            <tr>
             <td>${location.name}</td>
             <td>${location.lat, location.lng}</td>
             <td><button onclick="onGo('${location.id}')">Go</button></td>
             <td><button onclick="onDelete('${location.id}')">Delete</button></td>
            </tr>`
        })
        document.querySelector('.table-content').innerHTML = strHTMLs.join('')
    })
}