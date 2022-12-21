// import { util } from './services/util.service.js'
import { mapService } from './map.service.js'
import { storageService } from './services/async-storage.service.js'

export const locService = {
    getLocs,
    get,
    post,
    query,
    remove
}

const LOC_KEY = 'locDB'

const locs = [
    { id: _makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: '', createdAt: Date.now(), updatedAt: Date.now() },
    { id: _makeId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581, weather: '', createdAt: Date.now(), updatedAt: Date.now() }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function _createLoc(name, lat, lng) {
    return {
        name,
        lat,
        lng,
        weather: '',
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
}

function get(locId) {
    return storageService.get(LOC_KEY, locId)
}

function query() {
    return storageService.query(LOC_KEY)
}

function post(name, lat, lng) {
    storageService.post(LOC_KEY, _createLoc(name, lat, lng))
}

function remove(locId) {
     storageService.remove(LOC_KEY, locId)
} 

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


