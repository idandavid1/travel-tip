import { storageService } from './async-storage.service.js'

export const locService = {
    get,
    post,
    query,
    remove
}

const LOC_KEY = 'locDB'

function _createLoc(name, lat, lng) {
    return {
            id: _makeId(),
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
    return storageService.post(LOC_KEY, _createLoc(name, lat, lng))
}

function remove(locId) {
     return storageService.remove(LOC_KEY, locId)
} 

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


